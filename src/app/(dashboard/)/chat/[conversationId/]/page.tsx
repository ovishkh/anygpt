import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ConversationPage({ params }: { params: { conversationId: string } }) {
    // In a real app, you would fetch initial messages here based on conversationId
    return <ChatInterface />;
}
