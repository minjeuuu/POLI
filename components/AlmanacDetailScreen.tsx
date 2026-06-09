
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Globe, BookOpen, Layers, Download } from 'lucide-react';
import { fetchPoliticalRecord } from '../services/searchService';
import LoadingScreen from './LoadingScreen';
import Timeline from './Timeline';

import { generateAestheticPDF } from '../utils/pdfGenerator';
import { playSFX } from '../services/soundService';

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

  const handleDownload = () => {
      if (typeof playSFX === 'function') playSFX('click');
      if (!data) return;
      try {
          const sections = [];
          
          if (data.bio) sections.push({ title: "Biography", content: data.bio });
          if (data.biography) sections.push({ title: "Biography", content: data.biography });
          if (data.overview) sections.push({ title: "Overview", content: data.overview });
          if (data.historicalImpact) sections.push({ title: "Historical Impact", content: data.historicalImpact });
          if (data.context) sections.push({ title: "Context", content: data.context });
          if (data.earlyLife) sections.push({ title: "Early Life", content: data.earlyLife });
          if (data.ideology) sections.push({ title: "Ideology", content: data.ideology });
          if (data.legacy) sections.push({ title: "Legacy", content: data.legacy });
          
          Object.entries(data).forEach(([key, val]) => {
              const ignoreKeys = ["name", "type", "imageUrl", "bio", "biography", "overview", "historicalImpact", "context", "earlyLife", "ideology", "legacy", "role", "country", "era", "year", "location"];
              if (ignoreKeys.includes(key) || !val) return;
              
              const title = key.replace(/([A-Z])/g, ' $1').toUpperCase();
              
              if (typeof val === 'string' && val.length > 20) {
                  sections.push({ title, content: val });
              } else if (Array.isArray(val) && val.length > 0) {
                  if (typeof val[0] === 'string') {
                      sections.push({ title, content: val });
                  } else if (typeof val[0] === 'object') {
                      sections.push({ title, content: val.map(v => JSON.stringify(v).replace(/[{}"]/g, '').replace(/:/g, ': ')) });
                  }
              } else if (typeof val === 'object' && !Array.isArray(val)) {
                  const arr = [];
                  Object.entries(val).forEach(([k, v]) => {
                      if (typeof v === 'string') arr.push(`${k.toUpperCase()}: ${v}`);
                      else if (Array.isArray(v)) arr.push(`${k.toUpperCase()}: ${v.join(', ')}`);
                  });
                  if (arr.length > 0) sections.push({ title, content: arr });
              }
          });

          generateAestheticPDF(
              data.name || "Dossier",
              data.type || data.role || data.country || "Intelligence Record",
              data.shortBio || data.bio?.substring(0, 100) || data.overview?.substring(0, 100) || "Fact Sheet",
              sections,
              `${(data.name || "Document").replace(/\s+/g, '_')}_Dossier.pdf`
          );
      } catch (err) {
          console.error("PDF generation failed:", err);
      }
  };

  if (loading) return (
      <div className="fixed inset-0 z-[80] bg-academic-bg dark:bg-stone-950">
          <LoadingScreen message={`Retrieving Archives for ${title}...`} />
      </div>
  );

  return (
    <div className="fixed inset-0 z-[80] bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* HEADER */}
        <div className="flex-none h-16 border-b border-academic-line dark:border-stone-800 bg-academic-paper dark:bg-stone-900 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-500">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-academic-gold">{mode} Record</span>
                    <h1 className="text-xl font-serif font-bold text-academic-text dark:text-stone-100">{title}</h1>
                </div>
            </div>
            {data && (
                <button onClick={handleDownload} className="p-2 rounded-full text-stone-400 hover:text-academic-accent hover:bg-stone-100 dark:hover:bg-stone-800 transition-all" title="Download Report">
                    <Download className="w-5 h-5" />
                </button>
            )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full pb-32">
            {data ? (
                <div className="space-y-12">
                    <section>
                         <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> Historical Context</h3>
                         <div className="prose prose-stone dark:prose-invert font-serif leading-loose text-justify">
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
