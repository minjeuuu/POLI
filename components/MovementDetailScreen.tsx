import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Clock, Users, FileText, Compass, AlertTriangle, Printer, Download, Bookmark, Globe, Library } from 'lucide-react';
import { fetchMovementDetail } from '../services/geminiService';

import { generateAestheticPDF } from '../utils/pdfGenerator';
import { playSFX } from '../services/soundService';

interface MovementDetailScreenProps {
    movementName: string;
    onClose: () => void;
    isSaved?: boolean;
    onToggleSave?: () => void;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'leadership', label: 'Leadership', icon: Users },
    { id: 'tactics', label: 'Tactics & Texts', icon: FileText },
    { id: 'events', label: 'Major Events', icon: Clock },
    { id: 'impact', label: 'Impact', icon: Compass },
    { id: 'opposition', label: 'Opposition', icon: AlertTriangle },
];

const SectionTitle: React.FC<{ title: string, icon: any, subtitle?: string }> = ({ title, icon: Icon, subtitle }) => (
    <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-stone-100 dark:border-stone-800 pt-12">
        <div className="p-3 bg-academic-bg dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-academic-gold shadow-sm">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold uppercase tracking-[0.25em] text-academic-text dark:text-stone-100">{title}</h3>
            {subtitle && <p className="text-xs text-stone-400 font-mono uppercase tracking-widest mt-1">{subtitle}</p>}
        </div>
    </div>
);

const MovementDetailScreen: React.FC<MovementDetailScreenProps> = ({ movementName, onClose, isSaved, onToggleSave }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
                    type: "Social Movement / Revolution",
                    activeYears: "Unknown", 
                    coreGoals: "Information currently unavailable or generation failed." 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [movementName]);

    const handleDownload = () => {
        playSFX('click');
        if (!data) return;
        try {
            const sections = [];
            if (data.coreGoals) {
                sections.push({ title: "Core Goals", content: data.coreGoals });
            }
            if (data.leaders && data.leaders.length > 0) {
                sections.push({ title: "Key Leadership & Figures", content: data.leaders });
            }
            if (data.tactics && data.tactics.length > 0) {
                sections.push({ title: "Tactics & Operations", content: data.tactics });
            }
            if (data.keyTexts && data.keyTexts.length > 0) {
                sections.push({ title: "Key Texts & Slogans", content: data.keyTexts });
            }
            if (data.majorEvents && data.majorEvents.length > 0) {
                sections.push({ title: "Major Historical Events", content: data.majorEvents });
            }
            if (data.historicalImpact) {
                sections.push({ title: "Historical Legacy & Outcomes", content: data.historicalImpact });
            }
            if (data.politicalInfluence) {
                sections.push({ title: "Political & Legal Influence", content: data.politicalInfluence });
            }
            if (data.opposition) {
                sections.push({ title: "Opposition & Backlash", content: data.opposition });
            }

            generateAestheticPDF(
                data.name || movementName,
                "Social & Political Movement Dossier",
                `Diplomatic and sociological dossier outlining the history, tactics, leaders, and legislative impact of ${data.name || movementName}.`,
                sections,
                `${(data.name || movementName).replace(/\s+/g, '_')}_Dossier.pdf`
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

    const renderProse = (text: string) => {
        if (!text) return null;
        return text.split('\n\n').map((para, i) => {
            if (!para.trim()) return null;
            return (
                <p key={i} className="mb-6 leading-loose text-justify text-stone-700 dark:text-stone-300 font-serif text-base md:text-lg">
                    {para.trim()}
                </p>
            );
        });
    };

    if (loading) {
        return (
            <div className="fixed inset-0 top-16 z-[60] bg-academic-bg dark:bg-stone-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <Users className="w-12 h-12 text-emerald-500 animate-bounce" />
                    <p className="text-stone-500 dark:text-stone-400 font-serif font-bold uppercase tracking-widest text-sm">Mobilizing Archives...</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="fixed inset-0 top-16 z-[60] bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
            {/* HEADER */}
            <div className="flex-none h-16 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-6 z-50 shadow-sm print:hidden">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="font-serif font-bold text-lg text-academic-text dark:text-stone-100">{data.name}</h1>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-academic-gold">Political Movement</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => window.print()} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-academic-accent dark:hover:text-indigo-400 transition-colors" title="Print Dossier">
                        <Printer className="w-4 h-4" />
                    </button>
                    <button onClick={handleDownload} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-academic-accent dark:hover:text-indigo-400 transition-colors" title="Download Dossier">
                        <Download className="w-4 h-4" />
                    </button>
                    <button onClick={onToggleSave} className={`p-2 rounded-full transition-colors ${isSaved ? 'text-academic-gold bg-stone-50 dark:bg-stone-800' : 'text-stone-400 hover:text-academic-accent hover:bg-stone-100 dark:hover:bg-stone-800'}`}>
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="flex-none bg-stone-50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 px-6 py-2 overflow-x-auto no-scrollbar flex gap-4">
                {TABS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => scrollToSection(t.id)}
                        className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all whitespace-nowrap flex items-center gap-2
                        ${activeTab === t.id ? 'bg-academic-text dark:bg-stone-100 text-white dark:text-stone-900 border-transparent shadow-sm' : 'bg-white dark:bg-stone-900 text-stone-500 border-stone-200 dark:border-stone-700 hover:border-academic-accent'}`}
                    >
                        <t.icon className="w-3 h-3" /> {t.label}
                    </button>
                ))}
            </div>

            {/* SCROLL CONTAINER */}
            <div className="flex-1 overflow-y-auto scroll-smooth pb-32 bg-stone-50/30 dark:bg-black/20">
                <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 space-y-12">
                    
                    {/* Hero stats summary */}
                    <div className="text-center space-y-6 pt-6">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-inner">
                            <Users className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-stone-900 dark:text-white tracking-tight">{data.name}</h1>
                        <div className="flex items-center justify-center flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1"><FileText className="w-4 h-4 text-blue-500" /> {data.type}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-500" /> {data.activeYears}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-emerald-500" /> {data.location}</span>
                        </div>
                    </div>

                    {/* OVERVIEW SECTION */}
                    <div id="overview" ref={el => { sectionRefs.current['overview'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Core Goals & Summary" icon={BookOpen} subtitle="Movement Objectives" />
                        <div className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif text-lg text-justify">{renderProse(data.coreGoals)}</div>
                    </div>

                    {/* LEADERSHIP SECTION */}
                    <div id="leadership" ref={el => { sectionRefs.current['leadership'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Leadership & Key Figures" icon={Users} subtitle="Central Organizers & Ideologues" />
                        <div className="flex flex-wrap gap-3 mt-4">
                            {data.leaders?.map((d: string, i: number) => (
                                <span key={i} className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-bold border border-stone-200 dark:border-stone-700">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* TACTICS & TEXTS SECTION */}
                    <div id="tactics" ref={el => { sectionRefs.current['tactics'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Tactics & Key Texts" icon={FileText} subtitle="Methodologies & Slogans" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-550 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2">Operational Tactics</h4>
                                <ul className="space-y-2">
                                    {data.tactics?.map((t: string, i: number) => (
                                        <li key={i} className="font-serif text-base text-stone-700 dark:text-stone-300 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-550 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2">Key Texts, Slogans & Manifestos</h4>
                                <ul className="space-y-2">
                                    {data.keyTexts?.map((t: string, i: number) => (
                                        <li key={i} className="font-serif italic text-base text-stone-700 dark:text-stone-300 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded bg-academic-gold"></div> "{t}"
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* MAJOR EVENTS SECTION */}
                    <div id="events" ref={el => { sectionRefs.current['events'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Major Historical Events" icon={Clock} subtitle="Key Milestones" />
                        <ul className="space-y-4">
                            {data.majorEvents?.map((e: string, i: number) => (
                                <li key={i} className="flex font-serif text-base leading-relaxed items-start gap-3 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-lg border border-stone-100 dark:border-stone-800/80">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 flex-shrink-0" />
                                    <span className="text-stone-700 dark:text-stone-300 text-justify">{e}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* IMPACT SECTION */}
                    <div id="impact" ref={el => { sectionRefs.current['impact'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Historical Impact & Legacy" icon={Compass} subtitle="Legislative & Social Changes" />
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-2">Social & Historical Outcomes</h4>
                                <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.historicalImpact}</p>
                            </div>
                            <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-2">Legislative & Policy Shifts</h4>
                                <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.politicalInfluence}</p>
                            </div>
                        </div>
                    </div>

                    {/* OPPOSITION SECTION */}
                    <div id="opposition" ref={el => { sectionRefs.current['opposition'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Opposition & Backlash" icon={AlertTriangle} subtitle="Counter-movements & State Actions" />
                        <div className="bg-red-50 dark:bg-red-950/10 p-6 rounded-xl border border-red-200 dark:border-red-950/30 text-stone-750 dark:text-stone-250 font-serif leading-relaxed text-justify">
                            {renderProse(data.opposition)}
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default MovementDetailScreen;
