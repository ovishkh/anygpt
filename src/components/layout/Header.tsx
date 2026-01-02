'use client';

import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Header() {
    return (
        <header className="h-16 border-b glass flex items-center justify-between px-8">
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/5 rounded-full text-muted-foreground transition-all">
                    <Bell size={20} />
                </button>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center border border-white/20 cursor-pointer hover:scale-105 transition-all">
                    <User size={18} className="text-white" />
                </div>
            </div>
        </header>
    );
}
