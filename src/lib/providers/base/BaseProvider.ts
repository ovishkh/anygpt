import { ChatOptions, ChatResponse, StreamResponse } from './types';

export abstract class BaseProvider {
    constructor(protected apiKey: string, protected baseUrl?: string) { }

    abstract chat(options: ChatOptions): Promise<ChatResponse>;

    abstract streamChat(options: ChatOptions): AsyncIterable<StreamResponse>;

    protected async fetch(url: string, init?: RequestInit) {
        const response = await fetch(url, {
            ...init,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                ...init?.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(`API error (${response.status}): ${JSON.stringify(error)}`);
        }

        return response;
    }
}
