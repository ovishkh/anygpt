import { OpenAIProvider } from './openai/adapter';
import { AnthropicProvider } from './anthropic/adapter';
import { GeminiProvider } from './gemini/adapter';
import { OpenRouterProvider } from './openrouter/adapter';
import { BaseProvider } from './base/BaseProvider';

export type ProviderId = 'openai' | 'anthropic' | 'gemini' | 'openrouter';

export class ProviderFactory {
    static getProvider(id: ProviderId, apiKey: string): BaseProvider {
        switch (id) {
            case 'openai':
                return new OpenAIProvider(apiKey);
            case 'anthropic':
                return new AnthropicProvider(apiKey);
            case 'gemini':
                return new GeminiProvider(apiKey);
            case 'openrouter':
                return new OpenRouterProvider(apiKey);
            default:
                throw new Error(`Unsupported provider: ${id}`);
        }
    }
}

export * from './base/types';
export * from './base/BaseProvider';
