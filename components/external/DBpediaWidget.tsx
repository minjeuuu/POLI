import React, { useState, useEffect } from 'react';
import { Network, ExternalLink } from 'lucide-react';

interface DBpediaWidgetProps {
    queryText: string;
}

export const DBpediaWidget: React.FC<DBpediaWidgetProps> = ({ queryText }) => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Remove parentheticals
                const query = queryText.split(' (')[0];
                const res = await fetch(`https://lookup.dbpedia.org/api/search?query=${encodeURIComponent(query)}&format=json&maxResults=3`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.docs && data.docs.length > 0) {
                        setResults(data.docs);
                    }
                }
            } catch (e) {
                console.warn("DBpedia API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [queryText]);

    if (loading || results.length === 0) return null;

    return (
        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-700 dark:text-purple-400 mb-4 flex items-center gap-2">
                <Network className="w-4 h-4" /> Linked Open Data (DBpedia Search)
            </h3>
            <div className="space-y-4">
                {results.map((item, idx) => (
                    <a 
                        key={idx}
                        href={item.resource[0]}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="block p-3 rounded-lg bg-white dark:bg-stone-900 border border-purple-100 dark:border-purple-900/40 hover:border-purple-400 transition-colors"
                    >
                        <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200" dangerouslySetInnerHTML={{ __html: item.label?.[0] || 'Unknown' }} />
                        
                        {item.comment && item.comment.length > 0 && (
                            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.comment[0] }} />
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {item.typeName && item.typeName.slice(0, 3).map((type: string, tIdx: number) => (
                                <span key={tIdx} className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                                    {type}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
