import { BaseProvider } from '../base/BaseProvider';
import { ChatOptions, ChatResponse, StreamResponse } from '../base/types';

export class AnthropicProvider extends BaseProvider {
    constructor(apiKey: string) {
        super(apiKey, 'https://api.anthropic.com/v1');
    }

    protected async fetch(url: string, init?: RequestInit) {
        return super.fetch(url, {
            ...init,
            headers: {
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json',
                ...init?.headers,
                'Authorization': '', // Anthropic doesn't use Bearer token in the same way
            },
        });
    }

    async chat(options: ChatOptions): Promise<ChatResponse> {
        const response = await this.fetch(`${this.baseUrl}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                model: options.model,
                messages: options.messages,
                max_tokens: options.maxTokens || 1024,
                temperature: options.temperature,
                stream: false,
            }),
        });

        const data = await response.json();
        return {
            id: data.id,
            content: data.content[0].text,
            role: data.role,
            model: data.model,
            usage: {
                promptTokens: data.usage?.input_tokens,
                completionTokens: data.usage?.output_tokens,
                totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
            },
        };
    }

    async *streamChat(options: ChatOptions): AsyncIterable<StreamResponse> {
        const response = await this.fetch(`${this.baseUrl}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                model: options.model,
                messages: options.messages,
                max_tokens: options.maxTokens || 1024,
                temperature: options.temperature,
                stream: true,
            }),
        });

        if (!response.body) throw new Error('No response body');
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const content = line.slice(6);
                    try {
                        const data = JSON.parse(content);
                        if (data.type === 'content_block_delta') {
                            yield {
                                id: '', // Anthropic doesn't always provide ID in delta
                                delta: data.delta.text || '',
                                model: options.model,
                                done: false,
                            };
                        }
                    } catch (_e) {
                        // Ignore non-json lines or errors
                    }
                }
            }
        }
    }
}
