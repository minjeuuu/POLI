import React, { useState, useEffect } from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';

interface FBIWantedWidgetProps {
    queryText?: string;
}

export const FBIWantedWidget: React.FC<FBIWantedWidgetProps> = ({ queryText }) => {
    const [wanted, setWanted] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = queryText 
                    ? `https://api.fbi.gov/wanted/v1/list?title=${encodeURIComponent(queryText)}` 
                    : `https://api.fbi.gov/wanted/v1/list`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.items && data.items.length > 0) {
                        setWanted(data.items.slice(0, 4));
                    }
                }
            } catch (e) {
                console.warn("FBI API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [queryText]);

    if (loading || wanted.length === 0) return null;

    return (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-700 dark:text-red-500 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Federal Bureau of Investigation (Open Cases)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wanted.map((item, idx) => (
                    <a 
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="group flex items-start gap-4 p-3 rounded-lg bg-white dark:bg-stone-900 border border-red-100 dark:border-red-900/40 hover:border-red-400 transition-colors"
                    >
                        {item.images && item.images.length > 0 && (
                            <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-stone-100 dark:bg-stone-800">
                                <img src={item.images[0].thumb || item.images[0].original} alt={item.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 leading-tight mb-1">{item.title}</h4>
                            <p className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 mb-1 line-clamp-1">{item.subjects?.join(', ') || 'Wanted'}</p>
                            {item.reward_text && <p className="text-[10px] text-stone-600 dark:text-stone-400 line-clamp-1">Reward: {item.reward_text}</p>}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
