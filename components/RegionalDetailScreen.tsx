
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Globe, Flag, AlertTriangle, Lightbulb, History, Users, TrendingUp, Building2, MapPin, BookOpen, Landmark } from 'lucide-react';
import { RegionalDetail } from '../types';
import { fetchRegionalDetail } from '../services/geminiService';
import LoadingScreen from './LoadingScreen';
import { ExportButton } from './shared/ExportButton';
import { ShareButton } from './shared/ShareButton';
import { simpleExportData } from '../utils/exportUtils';
import { playSFX } from '../services/soundService';

interface RegionalDetailScreenProps {
  region: string;
  disciplineContext: string;
  onClose: () => void;
  onNavigate: (type: string, payload: any) => void;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'history', label: 'History', icon: History },
    { id: 'geopolitics', label: 'Geopolitics', icon: MapPin },
    { id: 'economy', label: 'Economy', icon: TrendingUp },
    { id: 'figures', label: 'Figures', icon: Users },
    { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
];

const RegionalDetailScreen: React.FC<RegionalDetailScreenProps> = ({ region, disciplineContext, onClose, onNavigate }) => {
  const [data, setData] = useState<RegionalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const result = await fetchRegionalDetail(region, disciplineContext);
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [region, disciplineContext]);

  const scrollToSection = (id: string) => {
    playSFX('click');
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) return (
      <div className="fixed inset-0 z-[60] bg-academic-bg dark:bg-stone-950">
          <LoadingScreen message={`Analyzing ${region} Context...`} />
      </div>
  );

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-500">

      {/* HEADER */}
      <div className="flex-none bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm z-50">
          <div className="flex items-center justify-between px-6 h-16">
              <div className="flex items-center gap-4">
                  <button onClick={onClose} className="p-2 -ml-2 text-stone-500 hover:text-academic-accent dark:text-stone-400 dark:hover:text-indigo-400 transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div>
                      <span className="text-[10px] font-mono text-academic-gold uppercase tracking-widest block">{disciplineContext}</span>
                      <h2 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100">{region}</h2>
                  </div>
              </div>
              <div className="flex gap-2">
                  <ExportButton compact data={simpleExportData(region, 'Regional Profile', data.summary || '', disciplineContext)} />
                  <ShareButton compact title={region} text={`Regional Profile: ${region} — ${disciplineContext}`} />
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

              {/* HERO */}
              <div className="relative bg-gradient-to-br from-academic-accent via-indigo-700 to-stone-900 text-white p-8 md:p-12 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-5">
                      <Globe className="w-64 h-64" />
                  </div>
                  <div className="relative z-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-academic-gold block mb-3">Regional Dossier</span>
                      <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-2">{region}</h1>
                      <span className="text-white/60 font-mono text-sm">{disciplineContext} Perspective</span>
                  </div>
              </div>

              {/* OVERVIEW / SUMMARY */}
              <div id="overview" ref={el => { sectionRefs.current['overview'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                      <Globe className="w-5 h-5" />
                      <h3 className="text-xs font-bold uppercase tracking-widest">Regional Overview</h3>
                  </div>
                  <p className="font-serif text-lg leading-loose text-stone-800 dark:text-stone-200 whitespace-pre-line text-justify">
                      {data.summary}
                  </p>
              </div>

              {/* KEY COUNTRIES */}
              {data.keyCountries?.length > 0 && (
                  <div className="bg-stone-50 dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                          <Flag className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Focal Countries</h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                          {data.keyCountries.map((c, i) => (
                              <button
                                  key={i}
                                  onClick={() => onNavigate('Country', c)}
                                  className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm rounded-full font-serif font-bold text-stone-700 dark:text-stone-300 hover:border-academic-accent dark:hover:border-indigo-500 hover:text-academic-accent dark:hover:text-indigo-400 transition-colors"
                              >
                                  {c}
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              {/* DOMINANT THEMES */}
              {data.politicalThemes?.length > 0 && (
                  <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                          <Lightbulb className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Dominant Themes</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.politicalThemes.map((theme, i) => (
                              <div key={i} className="p-4 bg-stone-50 dark:bg-stone-800 border-l-4 border-academic-accent dark:border-indigo-500 rounded-r-xl">
                                  <span className="font-serif text-sm font-medium text-stone-800 dark:text-stone-200">{theme}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* HISTORICAL BACKGROUND */}
              {data.historicalBackground && (
                  <div id="history" ref={el => { sectionRefs.current['history'] = el; }} className="bg-stone-50 dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 text-academic-gold">
                          <History className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Historical Background</h3>
                      </div>
                      <p className="font-serif text-lg leading-loose text-stone-800 dark:text-stone-200 whitespace-pre-line text-justify">
                          {data.historicalBackground}
                      </p>
                  </div>
              )}

              {/* GEOPOLITICAL SIGNIFICANCE */}
              {data.geopoliticalSignificance && (
                  <div id="geopolitics" ref={el => { sectionRefs.current['geopolitics'] = el; }} className="bg-stone-900 dark:bg-stone-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 opacity-5">
                          <Landmark className="w-48 h-48" />
                      </div>
                      <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6 text-academic-gold">
                              <MapPin className="w-5 h-5" />
                              <h3 className="text-xs font-bold uppercase tracking-widest">Geopolitical Significance</h3>
                          </div>
                          <p className="font-serif text-lg leading-loose opacity-90 whitespace-pre-line">
                              {data.geopoliticalSignificance}
                          </p>
                      </div>
                  </div>
              )}

              {/* ECONOMIC OVERVIEW */}
              {data.economicOverview && (
                  <div id="economy" ref={el => { sectionRefs.current['economy'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                          <TrendingUp className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Economic Overview</h3>
                      </div>
                      <p className="font-serif text-lg leading-loose text-stone-800 dark:text-stone-200 whitespace-pre-line text-justify">
                          {data.economicOverview}
                      </p>
                  </div>
              )}

              {/* KEY ORGANIZATIONS */}
              {data.keyOrganizations && data.keyOrganizations.length > 0 && (
                  <div className="bg-stone-50 dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                          <Building2 className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Key Organizations</h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                          {data.keyOrganizations.map((org, i) => (
                              <button
                                  key={i}
                                  onClick={() => onNavigate('Org', org)}
                                  className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full text-sm font-serif font-bold text-stone-700 dark:text-stone-300 hover:border-academic-accent dark:hover:border-indigo-500 hover:text-academic-accent dark:hover:text-indigo-400 transition-colors"
                              >
                                  {org}
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              {/* KEY FIGURES */}
              {data.keyFigures && data.keyFigures.length > 0 && (
                  <div id="figures" ref={el => { sectionRefs.current['figures'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                          <Users className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Key Figures</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {data.keyFigures.map((name, i) => (
                              <button
                                  key={i}
                                  onClick={() => onNavigate('Person', name)}
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

              {/* CULTURAL NOTES */}
              {data.culturalNotes && (
                  <div className="bg-stone-50 dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 text-academic-muted dark:text-stone-400">
                          <BookOpen className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Cultural Landscape</h3>
                      </div>
                      <p className="font-serif text-lg leading-loose text-stone-800 dark:text-stone-200 whitespace-pre-line text-justify">
                          {data.culturalNotes}
                      </p>
                  </div>
              )}

              {/* CHALLENGES */}
              {data.challenges?.length > 0 && (
                  <div id="challenges" ref={el => { sectionRefs.current['challenges'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-6 text-red-500 dark:text-red-400">
                          <AlertTriangle className="w-5 h-5" />
                          <h3 className="text-xs font-bold uppercase tracking-widest">Core Challenges</h3>
                      </div>
                      <ul className="space-y-4">
                          {data.challenges.map((chal, i) => (
                              <li key={i} className="flex items-start gap-4 p-4 bg-red-50/50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                                  <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
                                  <span className="font-serif text-stone-700 dark:text-stone-300 leading-relaxed">{chal}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
              )}

          </div>
      </div>
    </div>
  );
};

export default RegionalDetailScreen;
