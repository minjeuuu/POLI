
import React from 'react';
import { Clock, ExternalLink, Newspaper, ArrowUpRight } from 'lucide-react';

interface NewsItem {
    headline: string;
    summary: string;
    source: string;
    date: string;
    url?: string;
    sources?: { title: string; uri: string }[];
}

interface NewsWidgetProps {
    news: NewsItem[];
}

export const NewsWidget: React.FC<NewsWidgetProps> = ({ news }) => {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <h2 className="text-[10px] font-bold text-academic-muted dark:text-stone-500 uppercase tracking-[0.2em] mb-4 px-1 flex items-center gap-2">
                <Newspaper className="w-3 h-3" /> Global Briefing
            </h2>
            
            {Array.isArray(news) && news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.map((item, idx) => (
                        <div key={idx} className="flex flex-col justify-between p-6 border border-academic-line dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 hover:bg-white dark:hover:bg-stone-900 transition-all duration-300 rounded-lg shadow-sm group relative overflow-hidden">
                            
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="w-4 h-4 text-academic-accent dark:text-indigo-400" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-academic-accent dark:bg-indigo-600 px-2 py-1 rounded-sm">
                                        {item.source || 'Wire'}
                                    </span>
                                    <span className="text-[9px] font-mono text-stone-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {item.date || 'Today'}
                                    </span>
                                </div>
                                
                                <h3 className="font-serif text-lg font-bold text-academic-text dark:text-stone-100 mb-2 leading-snug group-hover:text-academic-accent dark:group-hover:text-indigo-400 transition-colors">
                                    {item.headline}
                                </h3>
                                
                                <p className="font-serif text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                                    {item.summary}
                                </p>
                            </div>

                            {/* ROBUST LINK RENDERING */}
                            <div className="pt-4 border-t border-stone-200/50 dark:border-stone-800 flex flex-wrap gap-2">
                                {item.url && (
                                    <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-academic-gold dark:text-stone-400 dark:hover:text-white flex items-center gap-1 transition-colors"
                                    >
                                        Read Source <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}

                                {item.sources && item.sources.map((s, i) => (
                                    <a 
                                        key={i} 
                                        href={s.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-academic-gold dark:text-stone-400 dark:hover:text-white flex items-center gap-1 transition-colors"
                                    >
                                        {s.title || 'Source'} <ExternalLink className="w-3 h-3" />
                                    </a>
                                ))}
                                
                                {!item.url && (!item.sources || item.sources.length === 0) && (
                                     <span className="text-[10px] text-stone-300 italic">Source unavailable</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-6 border border-academic-line dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-center text-stone-400 text-xs italic rounded-lg">
                    No briefing available for this date.
                </div>
            )}
        </section>
    );
};
