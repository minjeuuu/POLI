
import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { CountryNews } from '../../../types';

export const NewsFeed: React.FC<{ news: CountryNews[] }> = ({ news }) => {
    if (!news || news.length === 0) return <div className="p-8 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl text-stone-400 italic">No real-time intelligence available.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((item, i) => (
                <div key={i} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-academic-accent dark:text-indigo-400 bg-academic-accent/5 dark:bg-indigo-500/10 px-2 py-0.5 rounded">{item.source}</span>
                        <span className="text-[9px] font-mono text-stone-400">{item.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-2 group-hover:text-academic-gold transition-colors line-clamp-3 leading-snug">{item.headline}</h4>
                    <div className="flex gap-2 mt-3">
                        {item.tags?.map((tag, idx) => (
                            <span key={idx} className="text-[9px] bg-stone-100 dark:bg-stone-800 text-stone-500 px-2 py-0.5 rounded">{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
