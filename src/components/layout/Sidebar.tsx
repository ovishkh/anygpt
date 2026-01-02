'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    MessageSquare,
    Layers,
    BarChart2,
    Settings,
    PlusCircle,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navigation = [
    { name: 'Chat', href: '/chat/new', icon: MessageSquare },
    { name: 'Providers', href: '/providers/manage', icon: Layers },
    { name: 'Analytics', href: '/analytics/usage', icon: BarChart2 },
    { name: 'Settings', href: '/settings/preferences', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 260 }}
            className="h-screen glass border-r flex flex-col transition-all duration-300 ease-in-out"
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold gradient-text"
                    >
                        AnyGPT
                    </motion.h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <div className="px-3 flex-1">
                <Link
                    href="/chat/new"
                    className="flex items-center gap-3 w-full bg-primary/20 hover:bg-primary/30 text-primary-foreground p-3 rounded-lg mb-6 transition-all group"
                >
                    <PlusCircle size={20} />
                    {!isCollapsed && <span className="font-medium">New Chat</span>}
                </Link>

                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname?.startsWith(item.href) ?? false;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-lg transition-all group",
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon size={20} className={cn(isActive ? "text-primary" : "")} />
                                {!isCollapsed && <span>{item.name}</span>}
                                {isActive && !isCollapsed && (
                                    <motion.div
                                        layoutId="active"
                                        className="ml-auto w-1 h-4 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 w-full p-3 text-muted-foreground hover:text-white transition-all">
                    <LogOut size={20} />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
}
