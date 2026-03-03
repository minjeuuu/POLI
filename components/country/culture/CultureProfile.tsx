
import React from 'react';
import { Music, Palette, Utensils, Calendar } from 'lucide-react';

export const CultureProfile = ({ data }: { data: any }) => {
    if (!data) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Utensils className="w-4 h-4" /> Cuisine</h4>
                <div className="flex flex-wrap gap-2">
                    {data.cuisine?.map((item: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded text-xs border border-orange-100 dark:border-orange-900/30">{item}</span>
                    ))}
                </div>
            </div>
            <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Palette className="w-4 h-4" /> Arts</h4>
                <div className="flex flex-wrap gap-2">
                    {data.arts?.map((item: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded text-xs border border-purple-100 dark:border-purple-900/30">{item}</span>
                    ))}
                </div>
            </div>
             <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4" /> Holidays</h4>
                <ul className="space-y-2">
                    {data.holidays?.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-stone-600 dark:text-stone-300">• {item}</li>
                    ))}
                </ul>
            </div>
             <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border border-stone-200 dark:border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Music className="w-4 h-4" /> Music & Folklore</h4>
                <div className="space-y-2">
                     <div className="text-xs font-bold text-stone-500">Music</div>
                     <div className="flex flex-wrap gap-2 mb-2">
                        {data.music?.map((item: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded text-xs">{item}</span>
                        ))}
                    </div>
                    <div className="text-xs font-bold text-stone-500">Folklore</div>
                     <div className="flex flex-wrap gap-2">
                        {data.folklore?.map((item: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded text-xs">{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
