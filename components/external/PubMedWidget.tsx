import React, { useState, useEffect } from 'react';
import { Microscope, ExternalLink } from 'lucide-react';

interface PubMedWidgetProps {
    queryText: string;
}

export const PubMedWidget: React.FC<PubMedWidgetProps> = ({ queryText }) => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First get IDs
                const searchRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=${encodeURIComponent(queryText)}&retmax=3`);
                if (searchRes.ok) {
                    const searchData = await searchRes.json();
                    if (searchData.esearchresult?.idlist?.length > 0) {
                        const ids = searchData.esearchresult.idlist.join(',');
                        // Get Summaries
                        const summaryRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids}`);
                        if (summaryRes.ok) {
                            const summaryData = await summaryRes.json();
                            const resultArr = Object.values(summaryData.result).filter((a: any) => a.uid);
                            setArticles(resultArr);
                        }
                    }
                }
            } catch (e) {
                console.warn("PubMed API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [queryText]);

    if (loading || articles.length === 0) return null;

    return (
        <div className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2181bc] dark:text-[#52b3ee] mb-4 flex items-center gap-2">
                <Microscope className="w-4 h-4" /> Medical Research (PubMed NCBI)
            </h3>
            <div className="space-y-4">
                {articles.map((item, idx) => (
                    <a 
                        key={idx}
                        href={`https://pubmed.ncbi.nlm.nih.gov/${item.uid}/`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="block p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-[#2181bc] transition-colors"
                    >
                        <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-1 leading-tight">{item.title}</h4>
                        <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold text-stone-500">
                           {item.authors && item.authors.length > 0 && <span>{item.authors[0].name} {item.authors.length > 1 ? 'et al.' : ''}</span>}
                           {item.source && <span>• {item.source}</span>}
                           {item.pubdate && <span>• {item.pubdate}</span>}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
