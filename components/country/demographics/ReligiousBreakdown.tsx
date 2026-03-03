
import React from 'react';
import { DemographicsProfile } from '../../../types';
import { PieChart } from 'lucide-react';

export const ReligiousBreakdown: React.FC<{ data: DemographicsProfile }> = ({ data }) => {
    if (!data.religions || data.religions.length === 0) return null;

    return (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                <PieChart className="w-4 h-4" /> Religious Composition
            </h4>
            <div className="space-y-3">
                {data.religions.map((rel, i) => (
                    <div key={i} className="relative">
                        <div className="flex justify-between text-sm mb-1 z-10 relative">
                            <span className="font-serif text-stone-700 dark:text-stone-300">{rel.name}</span>
                            <span className="font-bold text-academic-accent dark:text-indigo-400">{rel.percentage}</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-academic-gold/50 dark:bg-indigo-500/50" 
                                style={{ width: rel.percentage.includes('%') ? rel.percentage : '0%' }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
