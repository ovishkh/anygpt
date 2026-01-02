import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { UsageChart } from '@/components/dashboard/UsageChart';
import { Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Welcome Back, Explorer</h1>
                <p className="text-muted-foreground">Monitor your AI usage and manage your provider connections.</p>
            </div>

            <StatsOverview />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <UsageChart />
                </div>

                <div className="space-y-6">
                    <div className="glass p-6 rounded-2xl h-full flex flex-col">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Layers size={20} className="text-primary" />
                            Recent Providers
                        </h3>
                        <div className="space-y-4 flex-1">
                            {['OpenAI', 'Anthropic', 'Google Gemini'].map((p) => (
                                <div key={p} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-sm font-medium">{p}</span>
                                    <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/providers/manage"
                            className="mt-6 flex items-center justify-between text-sm text-primary hover:underline group"
                        >
                            Manage all providers
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
