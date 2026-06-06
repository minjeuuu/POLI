
import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface TrendItem {
    topic: string;
    volume: string;
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    velocity: number; // 1-100
}

const TRENDS: TrendItem[] = [
    { topic: "Neo-Realism", volume: "125k", sentiment: "Neutral", velocity: 85 },
    { topic: "Carbon Tax", volume: "98k", sentiment: "Negative", velocity: 60 },
    { topic: "AI Governance", volume: "240k", sentiment: "Positive", velocity: 95 },
    { topic: "Space Treaty", volume: "45k", sentiment: "Neutral", velocity: 40 },
];

export const TrendRadar: React.FC = () => {
    return (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-academic-accent" /> Discourse Velocity
                </h3>
                <span className="text-[9px] bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded text-stone-400">Live 24h</span>
            </div>
            
            <div className="space-y-4">
                {TRENDS.map((t, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                t.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                                t.sentiment === 'Negative' ? 'bg-red-100 text-red-700' :
                                'bg-stone-100 text-stone-600'
                            }`}>
                                {t.sentiment === 'Positive' ? <ArrowUpRight className="w-4 h-4" /> :
                                 t.sentiment === 'Negative' ? <ArrowDownRight className="w-4 h-4" /> :
                                 <Minus className="w-4 h-4" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-stone-800 dark:text-stone-200 group-hover:text-academic-accent transition-colors">{t.topic}</h4>
                                <span className="text-[10px] text-stone-400 font-mono">{t.volume} Posts</span>
                            </div>
                        </div>
                        
                        <div className="w-24 h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${t.velocity > 80 ? 'bg-red-500' : t.velocity > 50 ? 'bg-orange-400' : 'bg-blue-400'}`} 
                                style={{ width: `${t.velocity}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
