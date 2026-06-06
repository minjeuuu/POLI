
import React, { useEffect, useState } from 'react';
import { X, BookOpen, Clock, Globe } from 'lucide-react';
import { fetchConceptDetail } from '../services/geminiService';
import LoadingScreen from './LoadingScreen';
import { ConceptDetail } from '../types';

interface ConceptDetailModalProps {
  term: string;
  context: string;
  onClose: () => void;
}

const ConceptDetailModal: React.FC<ConceptDetailModalProps> = ({ term, context, onClose }) => {
  const [data, setData] = useState<ConceptDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const result = await fetchConceptDetail(term, context);
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [term, context]);

  return (
    <div className="fixed inset-0 z-[90] flex justify-center items-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-academic-paper shadow-2xl rounded-sm overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-academic-line bg-white">
            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-academic-gold block mb-1">{context}</span>
                <h2 className="text-2xl font-serif font-bold text-academic-text">{term}</h2>
            </div>
            <button onClick={onClose} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors">
                <X className="w-5 h-5 text-stone-500" />
            </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 bg-stone-50 flex-1">
            {loading ? (
                <div className="py-20 flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-academic-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-xs font-mono uppercase tracking-widest text-stone-400">Defining Concept...</span>
                </div>
            ) : data ? (
                <div className="space-y-8">
                    {/* Definition */}
                    <div className="prose prose-stone prose-lg max-w-none font-serif leading-relaxed">
                        <p>{data.definition}</p>
                    </div>

                    {/* Examples */}
                    {data.examples && data.examples.length > 0 && (
                        <div className="bg-white p-6 border border-stone-200 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-academic-muted mb-4 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Examples & Applications
                            </h3>
                            <ul className="space-y-2">
                                {data.examples.map((ex, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-serif text-stone-700">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-academic-gold flex-shrink-0"></span>
                                        {ex}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* History */}
                    {data.history && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-academic-muted mb-4 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Historical Context
                            </h3>
                            <div className="text-sm font-serif text-stone-600 leading-relaxed bg-white/50 p-4 border-l-4 border-academic-accent">
                                {data.history}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20 text-stone-400 font-serif italic">
                    Definition unavailable.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailModal;
