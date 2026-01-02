'use client';

import { useState, useCallback } from 'react';
import { Message, ProviderId } from '@/lib/providers';

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentResponse, setCurrentResponse] = useState('');

    const sendMessage = useCallback(async (content: string, model: string, providerId: ProviderId) => {
        const userMessage: Message = { role: 'user', content };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setCurrentResponse('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    model,
                    providerId,
                    stream: true,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') break;

                            try {
                                const parsed = JSON.parse(data);
                                accumulatedResponse += parsed.delta || '';
                                setCurrentResponse(accumulatedResponse);
                            } catch (_e) {
                                // Ignore parsing errors for partial chunks
                            }
                        }
                    }
                }
            }

            setMessages(prev => [...prev, { role: 'assistant', content: accumulatedResponse }]);
            setCurrentResponse('');
        } catch (error) {
            console.error('Chat error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    return {
        messages,
        isLoading,
        currentResponse,
        sendMessage,
    };
}
