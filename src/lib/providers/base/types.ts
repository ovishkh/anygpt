export type MessageRole = 'system' | 'user' | 'assistant';

export interface Message {
    role: MessageRole;
    content: string;
}

export interface ChatOptions {
    model: string;
    messages: Message[];
    stream?: boolean;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
}

export interface ChatResponse {
    id: string;
    content: string;
    role: MessageRole;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

export interface StreamResponse {
    id: string;
    delta: string;
    role?: MessageRole;
    model: string;
    done: boolean;
}

export interface ProviderMetadata {
    id: string;
    name: string;
    models: string[];
}
