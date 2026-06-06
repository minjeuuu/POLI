
import React from 'react';
import { User, TrendingUp, TrendingDown } from 'lucide-react';

interface Minister {
    role: string;
    name: string;
    loyalty: number;
    competence: number;
}

const MOCK_CABINET: Minister[] = [
    { role: 'Defense', name: 'Gen. Ironwood', loyalty: 80, competence: 90 },
    { role: 'Economy', name: 'Lady Sterling', loyalty: 60, competence: 95 },
    { role: 'Interior', name: 'Sir Watcher', loyalty: 95, competence: 70 },
];

export const SimMinisters: React.FC = () => {
    return (
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Cabinet Council
            </h3>
            <div className="space-y-3">
                {MOCK_CABINET.map((min, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-stone-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-xs font-bold text-stone-300">
                                {min.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-stone-200">{min.name}</div>
                                <div className="text-[9px] uppercase text-stone-500 tracking-wider">{min.role}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-[10px] text-emerald-400">
                                <TrendingUp className="w-3 h-3" /> {min.competence}% Comp
                            </div>
                            <div className="flex items-center gap-1 justify-end text-[10px] text-amber-400">
                                <TrendingDown className="w-3 h-3" /> {min.loyalty}% Loyal
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
