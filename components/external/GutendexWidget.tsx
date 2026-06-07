import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface GutendexWidgetProps {
    queryText: string;
}

export const GutendexWidget: React.FC<GutendexWidgetProps> = ({ queryText }) => {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(queryText)}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.results && data.results.length > 0) {
                        setBooks(data.results.slice(0, 3)); // Top 3 books
                    }
                }
            } catch (e) {
                console.warn("Gutendex API failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [queryText]);

    if (loading || books.length === 0) return null;

    return (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm mb-6 animate-in fade-in">
            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-academic-gold" /> Public Domain Literature (Project Gutenberg)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {books.map((book, idx) => (
                    <a 
                        key={idx}
                        href={book.formats['text/html'] || `https://www.gutenberg.org/ebooks/${book.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col p-4 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 hover:border-academic-gold dark:hover:border-yellow-600 transition-colors"
                    >
                         <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-2 leading-tight line-clamp-2">{book.title}</h4>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2 line-clamp-1">
                             {book.authors && book.authors.length > 0 ? book.authors.map((a: any) => a.name).join(', ') : 'Unknown Author'}
                         </p>
                         <div className="flex-1" />
                         <span className="text-[10px] font-mono text-academic-gold bg-academic-gold/10 px-2 py-1 rounded inline-block w-max mt-2">
                            {book.download_count.toLocaleString()} Downloads <ExternalLink className="w-3 h-3 inline ml-1" />
                         </span>
                    </a>
                ))}
            </div>
        </div>
    );
};
