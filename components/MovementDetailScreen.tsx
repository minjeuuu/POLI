import { playSFX } from '../services/soundService';
import { generateAestheticPDF } from '../utils/pdfGenerator';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Building2, Map as MapIcon, Users, FileText, Sparkles, AlertCircle, BookOpen, Clock, Fingerprint, Compass, ShieldAlert, Zap, Search, Printer, Megaphone, Flag } from 'lucide-react';
import { fetchMovementDetail } from '../services/geminiService';

interface MovementDetailScreenProps {
    movementName: string;
    onClose: () => void;
}

const MovementDetailScreen: React.FC<MovementDetailScreenProps> = ({ movementName, onClose }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const parsed = await fetchMovementDetail(movementName);
                if (parsed) {
                    setData(parsed);
                } else {
                    throw new Error("Failed to load");
                }
            } catch (err) {
                console.error(err);
                setData({ 
                    name: movementName, 
                    type: "Social Movement",
                     
                    historicalImpact: "Information currently unavailable or generation failed." 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [movementName]);

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

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-stone-50 dark:bg-stone-950">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <Flag className="w-12 h-12 text-red-500 animate-bounce" />
                    <p className="text-stone-500 dark:text-stone-400 font-serif font-bold uppercase tracking-widest text-sm">Organizing Information...</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="h-full w-full relative bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden relative">
      <div className="bg-academic-paper/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-academic-line dark:border-stone-800 shadow-sm flex-none h-16 flex items-center justify-between px-6 z-50 print:hidden">
                <button onClick={onClose} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors uppercase tracking-widest text-xs font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to Directory
                </button>
                <div className="flex items-center gap-4">
                    <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-md text-xs font-bold uppercase tracking-widest transition-colors shadow-sm">
                        <Printer className="w-4 h-4" /> Print Dossier
                    </button>
                </div>
            </div>
<div className="flex-1 overflow-y-auto scroll-smooth pb-32 bg-stone-50/30 dark:bg-black/20">
<div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
                
                {/* HERO TITLE */}
                <div className="text-center space-y-6">
                    {data.imageUrl ? (
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-stone-200 dark:border-stone-800 shadow-md">
                            <img src={data.imageUrl} alt={data.name} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-stone-200 dark:bg-stone-800 shadow-inner mb-4">
                            <Flag className="w-12 h-12 text-red-600 dark:text-red-400" />
                        </div>
                    )}
                    <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-stone-900 dark:text-white tracking-tight">{data.name}</h1>
                    <div className="flex items-center justify-center flex-wrap gap-4 text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        <span className="flex items-center gap-1"><Fingerprint className="w-4 h-4" /> {data.type}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {data.activeYears}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1"><MapIcon className="w-4 h-4" /> {data.location}</span>
                    </div>
                </div>

                {/* MODULAR GRID */}
                <div className="flex flex-col gap-8">
                    
                    {/* LEFT COLUMN - Quick Facts */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm print:border-black print:shadow-none">
                            <h3 className="font-bold flex items-center gap-2 mb-4 uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2"><Users className="w-4 h-4" /> Key Figures</h3>
                            <ul className="space-y-2">
                                {(Array.isArray(data.leaders) ? data.leaders : []).map((d: string, i: number) => <li key={i} className="font-serif text-md">{d}</li>)}
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm print:border-black print:shadow-none">
                            <h3 className="font-bold flex items-center gap-2 mb-4 uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2"><BookOpen className="w-4 h-4" /> Key Texts</h3>
                            <ul className="space-y-2 text-sm font-serif text-stone-600 dark:text-stone-300">
                                {(Array.isArray(data.keyTexts) ? data.keyTexts : []).map((d: string, i: number) => <li key={i}>• {d}</li>)}
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm print:border-black print:shadow-none">
                            <h3 className="font-bold flex items-center gap-2 mb-4 uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2"><Megaphone className="w-4 h-4" /> Core Goals</h3>
                            <p className="text-sm font-serif leading-relaxed">{data.coreGoals || "No specific goals mentioned."}</p>
                        </div>
                    </div>

                    {/* MAIN COLUMN - Core Analysis */}
                    <div className=" space-y-8">
                        
                        <div className="bg-academic-paper dark:bg-stone-800/50 p-8 rounded-2xl border border-academic-line dark:border-stone-700 print:bg-stone-100 print:border-black">
                            <h3 className="text-xl font-serif font-bold border-b border-academic-line dark:border-stone-800 pb-2 text-stone-900 dark:text-white mb-6 flex items-center gap-3"><Building2 className="w-6 h-6 text-red-500" /> Outcomes & Historical Impact</h3>
                            <p className="font-serif text-lg leading-relaxed text-stone-800 dark:text-stone-200 mb-6">{data.historicalImpact}</p>
                            
                            <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 mb-2 mt-6">Political Influence</h4>
                            <p className="font-serif text-md leading-relaxed text-stone-700 dark:text-stone-300">{data.politicalInfluence}</p>
                        </div>

                        <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm print:border-black print:shadow-none">
                            <h3 className="text-xl font-serif font-bold border-b border-academic-line dark:border-stone-800 pb-2 text-stone-900 dark:text-white mb-6 border-b border-stone-100 dark:border-stone-800 pb-4">Major Events & Milestones</h3>
                            <ul className="space-y-4">
                                {(Array.isArray(data.majorEvents) ? data.majorEvents : []).map((t: string, i: number) => (
                                    <li key={i} className="flex font-serif text-lg leading-relaxed items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tactics & Oppositions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm print:border-black">
                                <h3 className="font-bold flex items-center gap-2 mb-4 uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2"><Zap className="w-4 h-4" /> Primary Tactics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(data.tactics) ? data.tactics : []).map((s: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-full text-xs font-bold">{s}</span>
                                    ))}
                                </div>
                            </div>
                             <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-200 dark:border-red-900/30 print:border-red-500">
                                <h3 className="font-bold flex items-center gap-2 mb-4 uppercase tracking-widest text-xs text-red-800 dark:text-red-400 border-b border-red-200 dark:border-red-900/30 pb-2"><ShieldAlert className="w-4 h-4" /> Opposition & Backlash</h3>
                                <p className="text-sm font-serif text-red-900 dark:text-red-300 leading-relaxed">{data.opposition}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
</div>
        </div>
    );
};

export default MovementDetailScreen;
