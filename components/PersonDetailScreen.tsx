import { ImageWithFallback } from './atoms/ImageWithFallback';

import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, User, Book, Flag, ExternalLink, Calendar, Lightbulb, Quote, Bookmark, Download, Search, BookOpen, Bell, ArrowRightLeft, Clock, Users, GraduationCap, MapPin, Target, Zap, Share2, Swords, Heart, AlertCircle, Award, Brain, Globe, Printer } from 'lucide-react';
import { PersonDetail } from '../types';
import { fetchPersonDetail } from '../services/personService';
import LoadingScreen from './LoadingScreen';
import ReaderView from './ReaderView';
import { generateAestheticPDF } from '../utils/pdfGenerator';
import { playSFX } from '../services/soundService';
import { IconRenderer } from './IconMap';

interface PersonDetailScreenProps {
  personName: string;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onNavigate?: (type: string, payload: any) => void;
}

const TABS = [
    { id: 'biography', label: 'Biography', icon: BookOpen },
    { id: 'earlyLife', label: 'Early Life', icon: GraduationCap },
    { id: 'career', label: 'Career Arc', icon: Flag },
    { id: 'personal', label: 'Personal', icon: Heart },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'psychology', label: 'Psychology', icon: Brain },
    { id: 'media', label: 'Media', icon: Share2 },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'controversies', label: 'Controversies', icon: AlertCircle },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'legacy', label: 'Legacy', icon: Target },
];

const PersonDetailScreen: React.FC<PersonDetailScreenProps> = ({ personName, onClose, isSaved, onToggleSave, onNavigate }) => {
  const [data, setData] = useState<PersonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('biography');
  const [readingDoc, setReadingDoc] = useState<{title: string, author: string} | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const result = await fetchPersonDetail(personName);
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [personName]);

  const handleNavigateSafe = (type: string, payload: any) => {
      if (onNavigate) onNavigate(type, payload);
  };

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

  const scrollToSection = (id: string) => {
    playSFX('click');
    setActiveTab(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleWebSearch = () => {
      playSFX('click');
      window.open(`https://www.google.com/search?q=${encodeURIComponent(personName)}&tbm=isch`, '_blank');
  };

  if (loading) return (
      <div className="h-full w-full relative bg-academic-bg dark:bg-stone-950 flex items-center justify-center">
          <LoadingScreen message={`Profiling ${personName}...`} />
      </div>
  );

  if (!data) return <div className="h-full w-full relative bg-academic-bg dark:bg-stone-950 flex items-center justify-center"><p className="text-stone-500">Data unavailable.</p></div>;

  return (
    <>
    <div className="h-full w-full relative bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden relative">
      
      {/* HEADER */}
      <div className="bg-academic-paper/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-academic-line dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-4">
                <button onClick={() => { playSFX('close'); onClose(); }} className="p-2 -ml-2 text-stone-500 hover:text-academic-accent dark:text-stone-400 dark:hover:text-indigo-400 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-academic-gold" />
                    <div>
                        <h1 className="text-sm font-serif font-bold text-academic-text dark:text-stone-100">{data.name}</h1>
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">{data.role}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <button onClick={handleDownload} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 transition-colors" title="Print Record"><Printer className="w-5 h-5" /></button>
                 <button onClick={handleDownload} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 transition-colors" title="Download Record"><Download className="w-5 h-5" /></button>
                 <button onClick={handleWebSearch} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 transition-colors" title="Search Images"><Search className="w-5 h-5" /></button>
                 <button onClick={onToggleSave} className={`p-2 rounded-full transition-colors ${isSaved ? 'text-academic-gold' : 'text-stone-400 hover:text-academic-accent dark:hover:text-indigo-400'}`}>
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
            </div>
          </div>
          <div className="flex overflow-x-auto no-scrollbar border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 px-4">
              {TABS.map((tab) => (
                  <button key={tab.id} onClick={() => scrollToSection(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id ? 'border-academic-gold text-academic-gold bg-stone-100 dark:bg-stone-800' : 'border-transparent text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'}`}>
                      <tab.icon className="w-3 h-3" /> {tab.label}
                  </button>
              ))}
          </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth pb-32 bg-stone-50/30 dark:bg-black/20">
          <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10 space-y-12">
              
              <div id="biography" ref={el => { sectionRefs.current['biography'] = el; }} className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
                  <div className="md:col-span-1">
                      <div className="aspect-[3/4] bg-stone-200 dark:bg-stone-800 rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-700 relative group">
                          {data.imageUrl ? (
                              <ImageWithFallback src={data.imageUrl} alt={data.name} className="w-full h-full object-cover" />
                          ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
                                  <User className="w-20 h-20 mb-4" />
                                  <span className="text-xs uppercase font-bold tracking-widest">No Image</span>
                              </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={handleWebSearch} className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">Find Images</button>
                          </div>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                              <span className="text-[10px] font-bold uppercase text-stone-400 block mb-1">Allegiance</span>
                              <div className="flex items-center gap-2 cursor-pointer hover:text-academic-accent transition-colors" onClick={() => handleNavigateSafe('Country', data.country)}>
                                  <Flag className="w-4 h-4" />
                                  <span className="font-serif font-bold text-stone-800 dark:text-stone-200">{data.country}</span>
                              </div>
                          </div>
                          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                              <span className="text-[10px] font-bold uppercase text-stone-400 block mb-1">Ideology</span>
                              <div className="flex items-center gap-2 cursor-pointer hover:text-academic-gold transition-colors" onClick={() => handleNavigateSafe('Ideology', data.ideology)}>
                                  <Lightbulb className="w-4 h-4" />
                                  <span className="font-serif font-bold text-stone-800 dark:text-stone-200">{data.ideology}</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="">
                      <h1 className="text-3xl font-serif font-bold text-academic-text dark:text-stone-100 mb-6 tracking-tight">{data.name}</h1>
                      <div className="prose prose-stone dark:prose-invert font-serif text-lg leading-relaxed text-justify max-w-none">
                           {data.bio.split('\n\n').map((para, i) => (
                               <p key={i} className="mb-4">{para}</p>
                           ))}
                      </div>
                      
                      {/* EARLY LIFE */}
                      {data.earlyLife && (
                          <div id="earlyLife" ref={el => { sectionRefs.current['earlyLife'] = el; }} className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
                               <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-3">
                                   <GraduationCap className="w-6 h-6 text-academic-gold" /> Early Life & Education
                               </h3>
                               <div className="prose prose-stone dark:prose-invert font-serif text-lg leading-relaxed text-justify max-w-none">
                                   <p>{data.earlyLife}</p>
                               </div>
                          </div>
                      )}

                      {/* EDUCATION */}
                      {(data as any).education && (
                          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
                               <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Education</h4>
                               <div className="flex flex-wrap gap-2">
                                   {(data as any).education.map((edu: string, i: number) => (
                                       <span key={i} className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-serif text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">{edu}</span>
                                   ))}
                               </div>
                          </div>
                      )}
                  </div>
              </div>

              {/* CAREER */}
              {Array.isArray(data.officesHeld) && data.officesHeld.length > 0 && (
                  <div id="career" ref={el => { sectionRefs.current['career'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-8 border-b border-stone-100 dark:border-stone-800 pb-4">
                          <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-academic-accent"><Flag className="w-5 h-5" /></div>
                          <h3 className="text-xl font-bold font-serif">Offices & Roles</h3>
                      </div>
                      <div className="space-y-6">
                           {data.officesHeld.map((office: any, i: number) => (
                               <div key={i} className="flex gap-4 relative group">
                                   <div className="flex-col items-center hidden sm:flex">
                                       <div className="w-3 h-3 rounded-full bg-academic-gold border-2 border-white dark:border-stone-900 z-10 group-hover:scale-125 transition-transform"></div>
                                       <div className="w-0.5 flex-1 bg-stone-200 dark:bg-stone-800 -mt-1"></div>
                                   </div>
                                   <div className="flex-1 pb-6">
                                       <span className="text-xs font-bold text-stone-400 font-mono block mb-1">{office.years}</span>
                                       <h4 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200 cursor-pointer hover:text-academic-accent transition-colors" onClick={() => handleNavigateSafe('Concept', office.role)}>{office.role}</h4>
                                   </div>
                               </div>
                           ))}
                      </div>
                  </div>
              )}

              {/* PERSONAL LIFE */}
              {data.personalLife && (
                  <div id="personal" ref={el => { sectionRefs.current['personal'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 border-b border-stone-100 dark:border-stone-800 pb-4">
                          <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-500"><Heart className="w-5 h-5" /></div>
                          <h3 className="text-xl font-bold font-serif">Personal Life</h3>
                      </div>
                      <p className="font-serif text-lg leading-relaxed text-justify text-stone-700 dark:text-stone-300">{data.personalLife}</p>
                  </div>
              )}

              {/* NETWORK */}
              {((Array.isArray((data as any).allies) && (data as any).allies.length > 0) || (Array.isArray((data as any).rivals) && (data as any).rivals.length > 0)) && (
                  <div id="network" ref={el => { sectionRefs.current['network'] = el; }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {Array.isArray((data as any).allies) && (data as any).allies.length > 0 && (
                              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2"><Users className="w-4 h-4" /> Allies & Mentors</h4>
                                  <div className="space-y-3">
                                      {(data as any).allies.map((ally: string, i: number) => (
                                          <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-lg shadow-sm cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => handleNavigateSafe('Person', ally)}>
                                              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300 font-bold text-xs">{ally.charAt(0)}</div>
                                              <span className="font-serif font-bold text-sm text-stone-700 dark:text-stone-200">{ally}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}
                          {Array.isArray((data as any).rivals) && (data as any).rivals.length > 0 && (
                              <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-6 flex items-center gap-2"><Swords className="w-4 h-4" /> Rivals & Opponents</h4>
                                  <div className="space-y-3">
                                      {(data as any).rivals.map((rival: string, i: number) => (
                                          <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-lg shadow-sm cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => handleNavigateSafe('Person', rival)}>
                                              <div className="w-8 h-8 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-300 font-bold text-xs">{rival.charAt(0)}</div>
                                              <span className="font-serif font-bold text-sm text-stone-700 dark:text-stone-200">{rival}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              )}

              {/* PSYCHOLOGY (NEW) */}
              {data.psychologicalProfile && (
                  <div id="psychology" ref={el => { sectionRefs.current['psychology'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 border-b border-stone-100 dark:border-stone-800 pb-4">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500"><Brain className="w-5 h-5" /></div>
                          <h3 className="text-xl font-bold font-serif">Psychological Profile</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Leadership Style</h4>
                              <p className="font-serif text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.psychologicalProfile.leadershipStyle}</p>
                          </div>
                          <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Public Perception</h4>
                              <p className="font-serif text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.psychologicalProfile.publicPerception}</p>
                          </div>
                          <div className="">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Personality Traits</h4>
                              <div className="flex flex-wrap gap-2">
                                  {(Array.isArray(data.psychologicalProfile.traits) ? data.psychologicalProfile.traits : []).map((trait, i) => (
                                      <span key={i} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold border border-purple-100 dark:border-purple-900/20">{trait}</span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {/* MEDIA PRESENCE (NEW) */}
              {data.mediaPresence && (
                  <div id="media" ref={el => { sectionRefs.current['media'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-3 mb-6 border-b border-stone-100 dark:border-stone-800 pb-4">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500"><Share2 className="w-5 h-5" /></div>
                          <h3 className="text-xl font-bold font-serif">Media Presence</h3>
                      </div>
                      <div className="space-y-6">
                          <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Social Media Style</h4>
                              <p className="font-serif text-stone-700 dark:text-stone-300 italic">"{data.mediaPresence.socialMediaStyle}"</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Key Interviews</h4>
                                  <ul className="space-y-2">
                                      {(Array.isArray(data.mediaPresence?.interviews) ? data.mediaPresence.interviews : []).map((item, i) => (
                                          <li key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                              {item}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                              <div>
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Major Speeches</h4>
                                  <ul className="space-y-2">
                                      {(Array.isArray(data.mediaPresence?.speeches) ? data.mediaPresence.speeches : []).map((item, i) => (
                                          <li key={i} className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                              {item}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {/* TIMELINE */}
              {Array.isArray(data.timeline) && data.timeline.length > 0 && (
                  <div id="timeline" ref={el => { sectionRefs.current['timeline'] = el; }} className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                       <div className="flex items-center gap-3 mb-8 border-b border-stone-100 dark:border-stone-800 pb-4">
                          <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-academic-gold"><Clock className="w-5 h-5" /></div>
                          <h3 className="text-xl font-bold font-serif">Life Timeline</h3>
                      </div>
                      <div className="space-y-6 relative border-l-2 border-stone-200 dark:border-stone-800 ml-3 pl-8">
                           {data.timeline.map((evt: any, i: number) => (
                               <div key={i} className="relative group cursor-pointer" onClick={() => handleNavigateSafe('Event', evt.event)}>
                                    <div className="absolute -left-[39px] top-1 w-3 h-3 bg-stone-400 rounded-full border-2 border-white dark:border-stone-900 group-hover:bg-academic-accent transition-colors"></div>
                                    <span className="text-xs font-mono font-bold text-stone-500 mb-1 block">{evt.year}</span>
                                    <h4 className="text-base font-serif font-bold text-academic-text dark:text-stone-200 group-hover:text-academic-accent transition-colors">{evt.event}</h4>
                               </div>
                           ))}
                      </div>
                  </div>
              )}

              {/* CONTROVERSIES */}
              {data.controversies && data.controversies.length > 0 && (
                  <div id="controversies" ref={el => { sectionRefs.current['controversies'] = el; }} className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border border-red-100 dark:border-red-900/30">
                       <div className="flex items-center gap-3 mb-6 border-b border-red-100 dark:border-red-900/30 pb-4">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400"><AlertCircle className="w-5 h-5" /></div>
                          <h3 className="text-xl font-bold font-serif text-red-900 dark:text-red-100">Controversies & Criticisms</h3>
                      </div>
                      <ul className="space-y-4">
                          {(Array.isArray(data.controversies) ? data.controversies : []).map((item, i) => (
                              <li key={i} className="flex gap-3">
                                  <span className="text-red-400 font-bold">•</span>
                                  <span className="font-serif text-stone-800 dark:text-stone-200 text-justify leading-relaxed">{item}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
              )}

              {/* AWARDS */}
              {data.awards && data.awards.length > 0 && (
                  <div id="awards" ref={el => { sectionRefs.current['awards'] = el; }} className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                       <div className="flex items-center gap-3 mb-6 border-b border-amber-100 dark:border-amber-900/30 pb-4">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400"><Award className="w-5 h-5" /></div>
                          <h3 className="text-xl font-bold font-serif text-amber-900 dark:text-amber-100">Honors & Awards</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(Array.isArray(data.awards) ? data.awards : []).map((item, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-lg shadow-sm border border-amber-100 dark:border-amber-900/20">
                                  <Award className="w-4 h-4 text-amber-500" />
                                  <span className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200">{item}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* QUOTES & LEGACY */}
              {(((data as any).quotes && (data as any).quotes.length > 0) || (Array.isArray(data.politicalWorks) && data.politicalWorks.length > 0)) && (
                  <div id="legacy" ref={el => { sectionRefs.current['legacy'] = el; }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {((data as any).quotes && (data as any).quotes.length > 0) && (
                          <div className="bg-academic-text dark:bg-stone-100 text-white dark:text-stone-900 p-8 rounded-2xl relative overflow-hidden">
                               <Quote className="absolute top-6 right-6 w-16 h-16 text-white/10 dark:text-black/10" />
                               <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-70">Notable Quotes</h4>
                               <div className="space-y-6 relative z-10">
                                   {((data as any).quotes || []).map((quote: string, i: number) => (
                                       <blockquote key={i} className="font-serif text-lg leading-relaxed text-justify italic">
                                           "{quote}"
                                       </blockquote>
                                   ))}
                               </div>
                          </div>
                      )}
                      
                      {Array.isArray(data.politicalWorks) && data.politicalWorks.length > 0 && (
                          <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6 flex items-center gap-2"><Target className="w-4 h-4" /> Political Works</h4>
                              <div className="space-y-3">
                                  {data.politicalWorks.map((work, i) => (
                                      <div key={i} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800 rounded-lg cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-700 group" onClick={() => setReadingDoc({title: work, author: data.name})}>
                                          <span className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200">{work}</span>
                                          <BookOpen className="w-4 h-4 text-stone-400 group-hover:text-academic-gold" />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              )}
              
          </div>
      </div>
    </div>
    
    {readingDoc && (
        <ReaderView title={readingDoc.title} author={readingDoc.author} onClose={() => setReadingDoc(null)} />
    )}
    </>
  );
};

export default PersonDetailScreen;
