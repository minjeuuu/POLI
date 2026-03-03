
import React from 'react';
import { EconomyProfile } from '../../../types';

export const TradePartners: React.FC<{ data: EconomyProfile }> = ({ data }) => {
    if (!data.partners || data.partners.length === 0) return null;

    return (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 mt-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Strategic Trade Partners</h4>
            <div className="flex flex-wrap gap-3">
                {data.partners.map((partner, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 border border-stone-100 dark:border-stone-800 rounded bg-stone-50 dark:bg-stone-900/50">
                        <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{partner.country}</span>
                        <span className="text-[10px] uppercase text-stone-400 border-l pl-2 border-stone-200 dark:border-stone-700">{partner.type}</span>
                        <span className="text-[10px] font-mono text-academic-accent dark:text-indigo-400">{partner.percentage}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
