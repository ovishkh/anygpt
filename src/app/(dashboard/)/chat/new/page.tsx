import { ChatInterface } from '@/components/chat/ChatInterface';

export default function NewChatPage() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center mb-8 px-4 text-center">
                <h2 className="text-3xl font-bold mb-2">How can I help you today?</h2>
                <p className="text-muted-foreground max-w-md">
                    AnyGPT connects you to OpenAI, Anthropic, Gemini and more via a single, premium interface.
                </p>
            </div>
            <ChatInterface />
        </div>
    );
}
