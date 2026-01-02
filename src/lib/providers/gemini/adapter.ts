import { BaseProvider } from '../base/BaseProvider';
import { ChatOptions, ChatResponse, StreamResponse } from '../base/types';

export class GeminiProvider extends BaseProvider {
    constructor(apiKey: string) {
        super(apiKey, 'https://generativelanguage.googleapis.com/v1beta');
    }

    protected async fetch(url: string, init?: RequestInit) {
        // Gemini uses API key in query param or header
        const finalUrl = `${url}?key=${this.apiKey}`;
        return super.fetch(finalUrl, {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...init?.headers,
                'Authorization': '', // Remove Bearer token
            },
        });
    }

    async chat(options: ChatOptions): Promise<ChatResponse> {
        const response = await this.fetch(`${this.baseUrl}/models/${options.model}:generateContent`, {
            method: 'POST',
            body: JSON.stringify({
                contents: options.messages.map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }],
                })),
                generationConfig: {
                    temperature: options.temperature,
                    maxOutputTokens: options.maxTokens,
                },
            }),
        });

        const data = await response.json();
        return {
            id: '', // Gemini doesn't always provide an ID in the same way
            content: data.candidates[0].content.parts[0].text,
            role: 'assistant',
            model: options.model,
        };
    }

    async *streamChat(options: ChatOptions): AsyncIterable<StreamResponse> {
        const response = await this.fetch(`${this.baseUrl}/models/${options.model}:streamGenerateContent`, {
            method: 'POST',
            body: JSON.stringify({
                contents: options.messages.map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }],
                })),
                generationConfig: {
                    temperature: options.temperature,
                    maxOutputTokens: options.maxTokens,
                },
            }),
        });

        if (!response.body) throw new Error('No response body');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            // Gemini stream is a JSON array of objects, this simplicity might fail for complex streams
            // but for basic text it usually works
            try {
                const data = JSON.parse(chunk);
                if (Array.isArray(data)) {
                    for (const item of data) {
                        yield {
                            id: '',
                            delta: item.candidates[0].content.parts[0].text || '',
                            model: options.model,
                            done: false,
                        };
                    }
                } else {
                    yield {
                        id: '',
                        delta: data.candidates[0].content.parts[0].text || '',
                        model: options.model,
                        done: false,
                    };
                }
            } catch {
                // Handle partial JSON or other stream issues
            }
        }
    }
}
