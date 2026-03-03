
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Globe, BookOpen, Layers } from 'lucide-react';
import { fetchPoliticalRecord } from '../services/searchService';
import LoadingScreen from './LoadingScreen';
import Timeline from './Timeline';

interface AlmanacDetailScreenProps {
  mode: 'Year' | 'Era' | 'Date';
  title: string;
  onClose: () => void;
}

const AlmanacDetailScreen: React.FC<AlmanacDetailScreenProps> = ({ mode, title, onClose }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      // Reusing the generic record fetcher which handles historical contexts well
      const result = await fetchPoliticalRecord(title);
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [title]);

  if (loading) return (
      <div className="fixed inset-0 z-[80] bg-academic-bg dark:bg-stone-950">
          <LoadingScreen message={`Retrieving Archives for ${title}...`} />
      </div>
  );

  return (
    <div className="fixed inset-0 z-[80] bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* HEADER */}
        <div className="flex-none h-16 border-b border-academic-line dark:border-stone-800 bg-academic-paper dark:bg-stone-900 flex items-center px-4 gap-4">
            <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-500">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-academic-gold">{mode} Record</span>
                <h1 className="text-xl font-serif font-bold text-academic-text dark:text-stone-100">{title}</h1>
            </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full pb-32">
            {data ? (
                <div className="space-y-12">
                    <section>
                         <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> Historical Context</h3>
                         <div className="prose prose-stone dark:prose-invert font-serif leading-loose">
                             <p>{data.historicalContext || data.entity?.description}</p>
                         </div>
                    </section>
                    
                    {data.timeline && (
                        <Timeline events={data.timeline} />
                    )}
                </div>
            ) : (
                <div className="text-center py-20 text-stone-400">Record not found.</div>
            )}
        </div>
    </div>
  );
};

export default AlmanacDetailScreen;
