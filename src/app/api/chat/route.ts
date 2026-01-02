import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { ProviderFactory, ProviderId } from '@/lib/providers';
import prisma from '@/lib/db';
import { decrypt } from '@/lib/utils/encryption';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { messages, model, providerId, stream = false } = await req.json();

        if (!messages || !model || !providerId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Determine which API key to use (User's custom key or System key)
        let apiKey: string | undefined;

        // Check if user has a custom key for this provider
        const userKey = await prisma.apiKey.findFirst({
            where: {
                userId: (session.user as { id: string }).id,
                providerId: providerId as string,
                enabled: true,
            },
            include: { provider: true },
        });

        if (userKey) {
            apiKey = decrypt(userKey.key);
        } else {
            // Fallback to system key from env
            const envKeyName = `${(providerId as string).toUpperCase()}_API_KEY`;
            apiKey = process.env[envKeyName];
        }

        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const provider = ProviderFactory.getProvider(providerId as ProviderId, apiKey);

        if (stream) {
            const streamResponse = provider.streamChat({ model, messages, stream: true });

            const encoder = new TextEncoder();
            const readableStream = new ReadableStream({
                async start(controller) {
                    for await (const part of streamResponse) {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify(part)}\n\n`));
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    controller.close();
                },
            });

            return new NextResponse(readableStream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                },
            });
        } else {
            const response = await provider.chat({ model, messages });

            // Log usage in background
            // ... async logging ...

            return NextResponse.json(response);
        }
    } catch (error: unknown) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: (error as Error).message || 'Internal Server Error' }, { status: 500 });
    }
}
