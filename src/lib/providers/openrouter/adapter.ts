import { BaseProvider } from '../base/BaseProvider';
import { ChatOptions, ChatResponse, StreamResponse } from '../base/types';

export class OpenRouterProvider extends BaseProvider {
    constructor(apiKey: string) {
        super(apiKey, 'https://openrouter.ai/api/v1');
    }

    protected async fetch(url: string, init?: RequestInit) {
        return super.fetch(url, {
            ...init,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'HTTP-Referer': 'https://anygpt.ai', // Optional but recommended
                'X-Title': 'AnyGPT',
                'Content-Type': 'application/json',
                ...init?.headers,
            },
        });
    }

    async chat(options: ChatOptions): Promise<ChatResponse> {
        const response = await this.fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            body: JSON.stringify({
                model: options.model,
                messages: options.messages,
                temperature: options.temperature,
                max_tokens: options.maxTokens,
                stream: false,
            }),
        });

        const data = await response.json();
        return {
            id: data.id,
            content: data.choices[0].message.content,
            role: data.choices[0].message.role,
            model: data.model,
            usage: {
                promptTokens: data.usage?.prompt_tokens,
                completionTokens: data.usage?.completion_tokens,
                totalTokens: data.usage?.total_tokens,
            },
        };
    }

    async *streamChat(options: ChatOptions): AsyncIterable<StreamResponse> {
        const response = await this.fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            body: JSON.stringify({
                model: options.model,
                messages: options.messages,
                temperature: options.temperature,
                max_tokens: options.maxTokens,
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
                    if (content === '[DONE]') return;

                    try {
                        const data = JSON.parse(content);
                        yield {
                            id: data.id,
                            delta: data.choices[0].delta.content || '',
                            role: data.choices[0].delta.role,
                            model: data.model,
                            done: false,
                        };
                    } catch {
                        // Error parsing JSON
                    }
                }
            }
        }
    }
}
