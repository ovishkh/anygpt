'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { useChat } from '@/hooks/useChat';
import { ProviderId } from '@/lib/providers';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ChatInterface() {
    const { messages, isLoading, currentResponse, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const [provider, setProvider] = useState<ProviderId>('openai');
    const [model, setModel] = useState('gpt-4o');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, currentResponse]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;
        sendMessage(input, model, provider);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-8 scrollbar-hide"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                        <MessageBubble key={i} role={msg.role} content={msg.content} />
                    ))}
                    {currentResponse && (
                        <MessageBubble role="assistant" content={currentResponse} />
                    )}
                </AnimatePresence>
                {isLoading && !currentResponse && (
                    <div className="flex justify-start mb-6">
                        <div className="glass px-5 py-3 rounded-2xl rounded-tl-none">
                            <div className="flex gap-1">
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-primary" />
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary" />
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-transparent">
                <div className="glass rounded-2xl p-2 relative shadow-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary opacity-20 animate-pulse" />

                    <div className="flex items-center gap-2 px-3 py-1 border-b border-white/5 mb-2">
                        <select
                            value={provider}
                            onChange={(e) => setProvider(e.target.value as ProviderId)}
                            className="bg-transparent text-xs text-muted-foreground focus:outline-none cursor-pointer hover:text-white transition-colors"
                        >
                            <option value="openai">OpenAI</option>
                            <option value="anthropic">Anthropic</option>
                            <option value="gemini">Gemini</option>
                            <option value="openrouter">OpenRouter</option>
                        </select>
                        <div className="w-[1px] h-3 bg-white/10" />
                        <input
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="bg-transparent text-xs text-muted-foreground focus:outline-none w-24 hover:text-white transition-colors"
                            placeholder="Model ID"
                        />
                    </div>

                    <div className="flex items-end gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Message AnyGPT..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 min-h-[44px] max-h-48 resize-none scrollbar-hide outline-none"
                            rows={1}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className={cn(
                                "p-2.5 rounded-xl transition-all",
                                input.trim() && !isLoading
                                    ? "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                                    : "bg-white/5 text-muted-foreground cursor-not-allowed"
                            )}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
                <p className="text-[10px] text-center mt-3 text-muted-foreground flex items-center justify-center gap-1">
                    <Sparkles size={10} className="text-primary" />
                    AnyGPT uses multiple AI models and can make mistakes. Check important info.
                </p>
            </div>
        </div>
    );
}
