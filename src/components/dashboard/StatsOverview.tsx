'use client';

import React from 'react';
import { Activity, Zap, Server, DollarSign } from 'lucide-react';

const stats = [
    { name: 'Total Requests', value: '1,234', change: '+12%', icon: Activity, color: 'text-blue-500' },
    { name: 'Tokens Used', value: '45.2M', change: '+5%', icon: Zap, color: 'text-yellow-500' },
    { name: 'Active Providers', value: '4', change: '0%', icon: Server, color: 'text-green-500' },
    { name: 'Estimated Cost', value: '$12.45', change: '+18%', icon: DollarSign, color: 'text-purple-500' },
];

export function StatsOverview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <div key={stat.name} className="glass p-6 rounded-2xl hover:scale-[1.02] transition-all cursor-default">
                    <div className="flex items-center justify-between mb-4">
                        <div className={stat.color}>
                            <stat.icon size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                            {stat.change}
                        </span>
                    </div>
                    <h3 className="text-muted-foreground text-sm font-medium">{stat.name}</h3>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}
