'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MessageRole } from '@/lib/providers';

interface MessageBubbleProps {
    role: MessageRole;
    content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
    const isUser = role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex w-full mb-6",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-lg",
                    isUser
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "glass text-foreground rounded-tl-none"
                )}
            >
                <div className="whitespace-pre-wrap">{content}</div>
                <div className={cn(
                    "text-[10px] mt-2 opacity-50 font-bold uppercase tracking-wider",
                    isUser ? "text-right" : "text-left"
                )}>
                    {role}
                </div>
            </div>
        </motion.div>
    );
}
