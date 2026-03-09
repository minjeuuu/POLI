
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Clock, Globe, BookOpen, Layers, Calendar, FileText, Users, MapPin, Scale, Bookmark, History, Search, Library, ScrollText, Landmark } from 'lucide-react';
import { fetchPoliticalRecord } from '../services/searchService';
import LoadingScreen from './LoadingScreen';
import Timeline from './Timeline';
import { ExportButton } from './shared/ExportButton';
import { ShareButton } from './shared/ShareButton';
import { simpleExportData } from '../utils/exportUtils';
import { playSFX } from '../services/soundService';

interface AlmanacDetailScreenProps {
  mode: 'Year' | 'Era' | 'Date';
  title: string;
  onClose: () => void;
  onNavigate?: (type: string, payload: any) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'timeline', label: 'Chronology', icon: Clock },
    { id: 'context', label: 'Context', icon: ScrollText },
    { id: 'figures', label: 'Key Figures', icon: Users },
    { id: 'sources', label: 'Sources', icon: Library },
];

const AlmanacDetailScreen: React.FC<AlmanacDetailScreenProps> = ({ mode, title, onClose, onNavigate, isSaved, onToggleSave }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const result = await fetchPoliticalRecord(title);
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [title]);

  const scrollToSection = (id: string) => {
    playSFX('click');
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleWebSearch = () => {
    playSFX('click');
    window.open(`https://www.google.com/search?q=${encodeURIComponent(title + " history")}`, '_blank');
  };

  if (loading) return (
      <div className="fixed inset-0 z-[80] bg-academic-bg dark:bg-stone-950">
          <LoadingScreen message={`Retrieving Archives for ${title}...`} />
      </div>
  );

  const entity = data?.entity;
  const timeline = data?.timeline || [];
  const disciplines = data?.relatedDisciplines || [];
  const sources = data?.primarySources || [];
  const description = entity?.description || data?.historicalContext || '';
  const historicalContext = data?.historicalContext || '';

  // Extract people mentioned in the description/context for the figures section
  const keyFigures: string[] = [];
  if (timeline.length > 0) {
    timeline.forEach((ev: any) => {
      const text = ev.title || ev.description || '';
      // Look for capitalized multi-word names
      const names = text.match(/[A-Z][a-z]+ [A-Z][a-z]+(?:\s[A-Z][a-z]+)?/g);
      if (names) {
        names.forEach((n: string) => {
          if (!keyFigures.includes(n) && keyFigures.length < 12) keyFigures.push(n);
        });
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[80] bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-500">

        {/* HEADER */}
        <div className="flex-none bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm z-50">
            <div className="flex items-center justify-between px-6 h-16">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 -ml-2 text-stone-500 hover:text-academic-accent dark:text-stone-400 dark:hover:text-indigo-400 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <span className="text-[10px] font-mono text-academic-gold uppercase tracking-widest block">{mode} Record</span>
                        <h2 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100 max-w-[200px] sm:max-w-md truncate">{title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ExportButton compact data={simpleExportData(title, 'Almanac Entry', description, entity?.jurisdiction || mode)} />
                    <ShareButton compact title={title} text={`Almanac Entry: ${title}`} />
                    {onToggleSave && (
                        <button onClick={onToggleSave} className={`p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${isSaved ? 'text-academic-gold' : 'text-stone-400 dark:text-stone-500'}`}>
                            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                    )}
                </div>
            </div>
            {/* TAB BAR */}
            <div className="flex-none bg-stone-50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 px-6 py-2 overflow-x-auto no-scrollbar flex gap-4">
                {TABS.map((tab) => (
                    <button key={tab.id} onClick={() => scrollToSection(tab.id)} className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-academic-text dark:bg-stone-100 text-white dark:text-stone-900 border-transparent shadow-sm' : 'bg-white dark:bg-stone-900 text-stone-500 border-stone-200 dark:border-stone-700 hover:border-academic-accent'}`}>
                        <tab.icon className="w-3 h-3" /> {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto scroll-smooth pb-32 bg-stone-50 dark:bg-black">
            <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-12">

                {!data ? (
                    <div className="text-center py-20 text-stone-400">Record not found.</div>
                ) : (
                    <>
                        {/* HERO CARD */}
                        <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white p-8 md:p-12 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-5">
                                <Landmark className="w-64 h-64" />
                            </div>
                            <div className="relative z-10">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-academic-gold block mb-3">{entity?.type || mode} Record</span>
                                <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">{entity?.name || title}</h1>
                                {entity?.officialName && entity.officialName !== entity.name && (
                                    <p className="text-white/60 font-serif text-lg italic mb-4">{entity.officialName}</p>
                                )}
                                <div className="flex flex-wrap gap-6 text-sm font-mono text-white/80 mt-4">
                                    {entity?.establishedDate && (
                                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {entity.establishedDate}</span>
                                    )}
                                    {entity?.jurisdiction && (
                                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {entity.jurisdiction}</span>
                                    )}
                                    {entity?.status && (
                                        <span className="flex items-center gap-2"><Scale className="w-4 h-4" /> {entity.status}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* OVERVIEW */}
                        <div id="overview" ref={el => { sectionRefs.current['overview'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                                <FileText className="w-5 h-5" />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Overview</h3>
                            </div>
                            <p className="font-serif text-lg leading-loose text-stone-800 dark:text-stone-200 whitespace-pre-line text-justify">
                                {description}
                            </p>
                        </div>

                        {/* CHRONOLOGY */}
                        {timeline.length > 0 && (
                            <div id="timeline" ref={el => { sectionRefs.current['timeline'] = el; }} className="bg-stone-50 dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                                <div className="flex items-center gap-3 mb-8 text-academic-gold">
                                    <Clock className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Chronology</h3>
                                    <span className="ml-auto text-[10px] font-mono text-stone-400">{timeline.length} events</span>
                                </div>
                                <div className="relative border-l-2 border-academic-gold/30 ml-3 pl-8 space-y-8">
                                    {timeline.map((point: any, i: number) => (
                                        <div key={i} className="relative group">
                                            <div className="absolute -left-[39px] top-1 w-3 h-3 bg-academic-gold rounded-full border-2 border-white dark:border-stone-900 group-hover:scale-125 transition-transform"></div>
                                            <span className="font-mono text-xs font-bold text-academic-gold block mb-1">{point.date || "Phase " + (i+1)}</span>
                                            <h4 className="font-serif font-bold text-stone-800 dark:text-stone-200 mb-1">{point.title}</h4>
                                            <p className="font-serif text-stone-600 dark:text-stone-400 leading-relaxed text-sm">{point.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* HISTORICAL CONTEXT */}
                        {historicalContext && historicalContext !== description && (
                            <div id="context" ref={el => { sectionRefs.current['context'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                                    <ScrollText className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Historical Context</h3>
                                </div>
                                <p className="font-serif text-lg leading-loose text-stone-800 dark:text-stone-200 whitespace-pre-line text-justify">
                                    {historicalContext}
                                </p>
                            </div>
                        )}

                        {/* RELATED DISCIPLINES */}
                        {disciplines.length > 0 && (
                            <div className="bg-stone-50 dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                                <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                                    <Layers className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Related Disciplines</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {disciplines.map((d: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => onNavigate?.('Discipline', d)}
                                            className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full text-sm font-serif font-bold text-stone-700 dark:text-stone-300 hover:border-academic-accent dark:hover:border-indigo-500 hover:text-academic-accent dark:hover:text-indigo-400 transition-colors"
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* KEY FIGURES */}
                        {keyFigures.length > 0 && (
                            <div id="figures" ref={el => { sectionRefs.current['figures'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                                <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                                    <Users className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Key Figures</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {keyFigures.map((name, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onNavigate?.('Person', name)}
                                            className="p-4 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 shadow-sm flex items-center gap-3 hover:border-academic-accent dark:hover:border-indigo-500 transition-colors rounded-xl text-left group"
                                        >
                                            <div className="w-10 h-10 bg-white dark:bg-stone-700 rounded-full flex items-center justify-center text-stone-400 font-serif font-bold group-hover:bg-academic-accent dark:group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                {name.charAt(0)}
                                            </div>
                                            <span className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 group-hover:text-academic-accent dark:group-hover:text-indigo-400 transition-colors">{name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* PRIMARY SOURCES */}
                        {sources.length > 0 && (
                            <div id="sources" ref={el => { sectionRefs.current['sources'] = el; }} className="bg-stone-50 dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                                <div className="flex items-center gap-3 mb-6 text-academic-gold">
                                    <Library className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Primary Sources</h3>
                                </div>
                                <div className="space-y-4">
                                    {sources.map((src: any, i: number) => (
                                        <div key={i} className="p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
                                            <h4 className="font-serif font-bold text-stone-800 dark:text-stone-200 text-sm">{src.name || src.title || src}</h4>
                                            {(src.author || src.body) && (
                                                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-mono">{src.author || src.body}{src.year ? ` (${src.year})` : ''}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SEARCH CTA */}
                        <div className="text-center py-8">
                            <button onClick={handleWebSearch} className="px-6 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full text-sm font-bold text-stone-600 dark:text-stone-300 hover:border-academic-accent hover:text-academic-accent dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors shadow-sm flex items-center gap-2 mx-auto">
                                <Search className="w-4 h-4" /> Search External Archives
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

export default AlmanacDetailScreen;
