
import React from 'react';
import { User, Globe, Lightbulb, Building2, Brain } from 'lucide-react';
import { DailyContext } from '../../types';

interface DashboardGridProps {
    data: DailyContext;
    onNavigate: (type: string, payload: any) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ data, onNavigate }) => {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <h2 className="text-[10px] font-bold text-academic-muted dark:text-stone-500 uppercase tracking-[0.2em] mb-4 px-1">Daily Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.highlightedPerson?.title && (
                    <div onClick={() => onNavigate('Person', data.highlightedPerson.title)} className="p-5 border border-academic-line dark:border-stone-800 bg-white dark:bg-stone-900/80 hover:border-academic-accent dark:hover:border-indigo-500 cursor-pointer group rounded-lg transition-all">
                        <div className="flex items-center gap-2 mb-3 text-academic-gold"><User className="w-4 h-4" /><span className="text-[9px] font-bold uppercase tracking-widest">Person of Interest</span></div>
                        <h3 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 group-hover:text-academic-accent dark:group-hover:text-indigo-400">{data.highlightedPerson.title}</h3>
                        <p className="text-xs text-stone-500 mt-1">{data.highlightedPerson.meta}</p>
                    </div>
                )}
                {data.highlightedCountry?.title && (
                    <div onClick={() => onNavigate('Country', data.highlightedCountry.title)} className="p-5 border border-academic-line dark:border-stone-800 bg-white dark:bg-stone-900/80 hover:border-academic-accent dark:hover:border-indigo-500 cursor-pointer group rounded-lg transition-all">
                        <div className="flex items-center gap-2 mb-3 text-academic-gold"><Globe className="w-4 h-4" /><span className="text-[9px] font-bold uppercase tracking-widest">Focus Country</span></div>
                        <h3 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 group-hover:text-academic-accent dark:group-hover:text-indigo-400">{data.highlightedCountry.title}</h3>
                        <p className="text-xs text-stone-500 mt-1">{data.highlightedCountry.meta}</p>
                    </div>
                )}
                {data.highlightedIdeology?.title && (
                    <div onClick={() => onNavigate('Ideology', data.highlightedIdeology.title)} className="p-5 border border-academic-line dark:border-stone-800 bg-white dark:bg-stone-900/80 hover:border-academic-accent dark:hover:border-indigo-500 cursor-pointer group rounded-lg transition-all">
                        <div className="flex items-center gap-2 mb-3 text-academic-gold"><Lightbulb className="w-4 h-4" /><span className="text-[9px] font-bold uppercase tracking-widest">Ideology</span></div>
                        <h3 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 group-hover:text-academic-accent dark:group-hover:text-indigo-400">{data.highlightedIdeology.title}</h3>
                        <p className="text-xs text-stone-500 mt-1">{data.highlightedIdeology.meta}</p>
                    </div>
                )}
                {data.highlightedOrg?.title && (
                    <div onClick={() => onNavigate('Org', data.highlightedOrg.title)} className="p-5 border border-academic-line dark:border-stone-800 bg-white dark:bg-stone-900/80 hover:border-academic-accent dark:hover:border-indigo-500 cursor-pointer group rounded-lg transition-all">
                        <div className="flex items-center gap-2 mb-3 text-academic-gold"><Building2 className="w-4 h-4" /><span className="text-[9px] font-bold uppercase tracking-widest">Organization</span></div>
                        <h3 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 group-hover:text-academic-accent dark:group-hover:text-indigo-400">{data.highlightedOrg.title}</h3>
                        <p className="text-xs text-stone-500 mt-1">{data.highlightedOrg.meta}</p>
                    </div>
                )}
                {data.highlightedDiscipline?.title && (
                    <div onClick={() => onNavigate('Discipline', data.highlightedDiscipline.title)} className="p-5 border border-academic-line dark:border-stone-800 bg-white dark:bg-stone-900/80 hover:border-academic-accent dark:hover:border-indigo-500 cursor-pointer group md:col-span-2 rounded-lg transition-all">
                        <div className="flex items-center gap-2 mb-3 text-academic-gold"><Brain className="w-4 h-4" /><span className="text-[9px] font-bold uppercase tracking-widest">Discipline</span></div>
                        <h3 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 group-hover:text-academic-accent dark:group-hover:text-indigo-400">{data.highlightedDiscipline.title}</h3>
                        <p className="text-xs text-stone-500 mt-1">{data.highlightedDiscipline.meta}</p>
                    </div>
                )}
            </div>
        </section>
    );
};
