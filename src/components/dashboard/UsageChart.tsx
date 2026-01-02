'use client';

import React from 'react';

const usageData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 38 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 64 },
    { day: 'Sat', value: 20 },
    { day: 'Sun', value: 15 },
];

export function UsageChart() {
    const max = Math.max(...usageData.map(d => d.value));

    return (
        <div className="glass p-8 rounded-2xl h-96 flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold">Usage Trends</h3>
                    <p className="text-sm text-muted-foreground">Token consumption over the last 7 days</p>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                </select>
            </div>

            <div className="flex-1 flex items-end justify-between gap-4 px-4">
                {usageData.map((data) => (
                    <div key={data.day} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="w-full relative">
                            <div
                                className="w-full bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-lg relative overflow-hidden"
                                style={{ height: `${(data.value / max) * 160}px` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-bold">
                                {data.value}k
                            </div>
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-white transition-all">{data.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
