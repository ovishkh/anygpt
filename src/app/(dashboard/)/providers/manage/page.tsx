'use client';

import React from 'react';
import { Shield, ExternalLink, Settings2, Power, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const providers = [
    { id: 'openai', name: 'OpenAI', status: 'connected', models: 12, color: 'bg-green-500' },
    { id: 'anthropic', name: 'Anthropic', status: 'connected', models: 8, color: 'bg-purple-500' },
    { id: 'gemini', name: 'Google Gemini', status: 'connected', models: 5, color: 'bg-blue-500' },
    { id: 'openrouter', name: 'OpenRouter', status: 'disconnected', models: 100, color: 'bg-orange-500' },
];

export default function ProviderManagePage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Providers</h1>
                    <p className="text-muted-foreground">Configure and manage your LLM provider connections.</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-all shadow-lg shadow-primary/20">
                    Add Custom Provider
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers.map((provider) => (
                    <div key={provider.id} className="glass p-6 rounded-2xl border border-white/10 group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border border-white/20 shadow-inner", provider.color)}>
                                    <Layers size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{provider.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={cn(
                                            "w-2 h-2 rounded-full",
                                            provider.status === 'connected' ? "bg-green-500 animate-pulse" : "bg-red-500"
                                        )} />
                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                                            {provider.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/5 rounded-lg border border-white/10 transition-all">
                                    <Settings2 size={18} className="text-muted-foreground" />
                                </button>
                                <button className="p-2 hover:bg-white/5 rounded-lg border border-white/10 transition-all">
                                    <Power size={18} className={provider.status === 'connected' ? "text-green-500" : "text-muted-foreground"} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Available Models</p>
                                <p className="text-lg font-bold">{provider.models}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Capabilities</p>
                                <p className="text-lg font-bold">Chat, Vision</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Shield size={14} className="text-primary" />
                                API Keys Encrypted (AES-256)
                            </div>
                            <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                                View Documentation
                                <ExternalLink size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
