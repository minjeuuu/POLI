import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Clock, Users, Flame, Building2, AlertCircle, Lightbulb, Zap, Printer, Download, Bookmark, Globe, Library, ShieldAlert } from 'lucide-react';
import { fetchReligionDetail } from '../services/geminiService';
import { WikipediaWidget } from './external/WikipediaWidget';
import { RedditWidget } from './external/RedditWidget';
import { OpenAlexWidget } from './external/OpenAlexWidget';
import { WikiquoteWidget } from './external/WikiquoteWidget';
import { generateAestheticPDF } from '../utils/pdfGenerator';
import { playSFX } from '../services/soundService';

interface ReligionDetailScreenProps {
    religionName: string;
    onClose: () => void;
    isSaved?: boolean;
    onToggleSave?: () => void;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'philosophy', label: 'Philosophy', icon: Lightbulb },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'practices', label: 'Practices', icon: Flame },
    { id: 'impact', label: 'Political Impact', icon: Building2 },
    { id: 'critique', label: 'Critique', icon: AlertCircle },
    { id: 'resources', label: 'Library', icon: Library },
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

const ReligionDetailScreen: React.FC<ReligionDetailScreenProps> = ({ religionName, onClose, isSaved, onToggleSave }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const parsed = await fetchReligionDetail(religionName);
                if (parsed) {
                    setData(parsed);
                } else {
                    throw new Error("Failed to load");
                }
            } catch (err) {
                console.error(err);
                setData({ 
                    name: religionName, 
                    type: "Belief System",
                    origin: "Unknown", 
                    historicalImpact: "Information currently unavailable or generation failed." 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [religionName]);

    const handleDownload = () => {
        playSFX('click');
        if (!data) return;
        try {
            const sections = [];
            if (data.coreTenets && data.coreTenets.length > 0) {
                sections.push({ title: "Core Tenets", content: data.coreTenets });
            }
            if (data.historicalImpact) {
                sections.push({ title: "Historical Impact", content: data.historicalImpact });
            }
            if (data.politicalInfluence) {
                sections.push({ title: "Political Influence", content: data.politicalInfluence });
            }
            if (data.rituals && data.rituals.length > 0) {
                sections.push({ title: "Rituals & Practices", content: data.rituals });
            }
            if (data.controversies && data.controversies.length > 0) {
                sections.push({ title: "Controversies", content: data.controversies });
            }

            generateAestheticPDF(
                data.name || religionName,
                "Belief System Dossier",
                `Dossier outlining the origins, core tenets, political influence, and historical impact of ${data.name || religionName}.`,
                sections,
                `${(data.name || religionName).replace(/\s+/g, '_')}_Dossier.pdf`
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
                    <Flame className="w-12 h-12 text-orange-500 animate-bounce" />
                    <p className="text-stone-500 dark:text-stone-400 font-serif font-bold uppercase tracking-widest text-sm">Consulting Sacred Texts...</p>
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
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-academic-gold">Belief System</span>
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
                        {data.imageUrl ? (
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-stone-200 dark:border-stone-800 shadow-md">
                                <img src={data.imageUrl} alt={data.name} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-inner">
                                <Flame className="w-12 h-12 text-orange-600 dark:text-orange-400" />
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-stone-900 dark:text-white tracking-tight">{data.name}</h1>
                        <div className="flex items-center justify-center flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-orange-500" /> {data.type}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-indigo-500" /> {data.origin}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4 text-emerald-500" /> {data.adherents}</span>
                        </div>
                    </div>

                    {/* OVERVIEW SECTION */}
                    <div id="overview" ref={el => { sectionRefs.current['overview'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Overview & Focus" icon={BookOpen} subtitle="General Dossier" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            <div className="space-y-6">
                                <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl border border-stone-200 dark:border-stone-700">
                                    <h4 className="font-bold flex items-center gap-2 mb-3 uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700 pb-2">Deities & Spiritual Focus</h4>
                                    <ul className="space-y-2">
                                        {data.deities?.map((d: string, i: number) => (
                                            <li key={i} className="font-serif text-base text-stone-800 dark:text-stone-200 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl border border-stone-200 dark:border-stone-700">
                                    <h4 className="font-bold flex items-center gap-2 mb-3 uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700 pb-2">Primary Symbolism</h4>
                                    <p className="text-sm font-serif leading-relaxed text-stone-700 dark:text-stone-300">{data.symbolDescription || "No primary symbol widely recognized or specified."}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHILOSOPHY SECTION */}
                    <div id="philosophy" ref={el => { sectionRefs.current['philosophy'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Core Tenets & Philosophy" icon={Lightbulb} subtitle="Intellectual & Spiritual Framework" />
                        
                        <div className="space-y-6">
                            <div className="border-l-4 border-academic-gold pl-6 py-2">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-3">Sacred Texts & Liturgy</h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.sacredTexts?.map((d: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded text-xs font-serif italic border border-stone-200 dark:border-stone-700">{d}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-3">Central Philosophies</h4>
                                <ul className="space-y-4">
                                    {data.coreTenets?.map((t: string, i: number) => (
                                        <li key={i} className="flex font-serif text-base leading-relaxed items-start gap-3 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-lg border border-stone-100 dark:border-stone-800/80">
                                            <div className="w-2 h-2 rounded-full bg-academic-gold mt-2.5 flex-shrink-0" />
                                            <span className="text-stone-700 dark:text-stone-300 text-justify">{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* HISTORY SECTION */}
                    <div id="history" ref={el => { sectionRefs.current['history'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Origins & History" icon={Clock} subtitle="Historical Evolution" />
                        
                        <div className="space-y-6">
                            <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl border border-stone-200 dark:border-stone-700">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700 pb-2 mb-4">Foundational Figures</h4>
                                <div className="flex flex-wrap gap-3">
                                    {data.founders?.map((d: string, i: number) => (
                                        <span key={i} className="px-4 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-md text-sm font-serif font-bold text-stone-800 dark:text-stone-200">{d}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-3">Historical Context & Development</h4>
                                <div className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif">{renderProse(data.historicalImpact)}</div>
                            </div>
                        </div>
                    </div>

                    {/* PRACTICES SECTION */}
                    <div id="practices" ref={el => { sectionRefs.current['practices'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Rituals & Practices" icon={Flame} subtitle="Sects & Spiritual Expression" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2">Central Rituals</h4>
                                <ul className="space-y-3">
                                    {data.rituals?.map((r: string, i: number) => (
                                        <li key={i} className="flex font-serif text-base leading-relaxed items-start gap-2 text-stone-700 dark:text-stone-300">
                                            <span className="text-orange-500 font-bold">•</span>
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2">Denominations & Sects</h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.sects?.map((s: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-full text-xs font-bold border border-stone-200 dark:border-stone-700">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* POLITICAL IMPACT SECTION */}
                    <div id="impact" ref={el => { sectionRefs.current['impact'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Statecraft & Geopolitics" icon={Building2} subtitle="Political Footprint" />
                        
                        <div className="space-y-6">
                            <div className="bg-academic-paper dark:bg-stone-800/30 p-8 rounded-2xl border border-academic-line dark:border-stone-700">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-academic-gold mb-3">Relationship with State Leaders & Governance</h4>
                                <p className="font-serif text-lg leading-relaxed text-stone-800 dark:text-stone-200 text-justify">{data.politicalInfluence}</p>
                            </div>

                            <div className="bg-stone-50 dark:bg-stone-900/50 p-6 rounded-xl border-l-4 border-indigo-500">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 dark:text-stone-400 mb-2">Global Demographics & Geographic Scope</h4>
                                <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed">{data.demographics}</p>
                            </div>
                        </div>
                    </div>

                    {/* CRITIQUE SECTION */}
                    <div id="critique" ref={el => { sectionRefs.current['critique'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Critiques & Controversy" icon={AlertCircle} subtitle="Theological and Political Oppositions" />
                        
                        <div className="bg-red-50 dark:bg-red-950/10 p-6 rounded-xl border border-red-200 dark:border-red-950/30">
                            <h4 className="font-bold uppercase tracking-widest text-xs text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" /> Notable Historical and Modern Critique
                            </h4>
                            <ul className="space-y-3">
                                {data.controversies?.length > 0 ? data.controversies.map((c: string, i: number) => (
                                    <li key={i} className="text-base font-serif text-red-900 dark:text-red-300 leading-relaxed bg-white/50 dark:bg-black/20 p-4 rounded border border-red-100 dark:border-red-950/40">• {c}</li>
                                )) : <li className="text-base italic text-red-800 dark:text-red-300">None documented.</li>}
                            </ul>
                        </div>
                    </div>

                    {/* RESOURCES SECTION */}
                    <div id="resources" ref={el => { sectionRefs.current['resources'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="External Databases & Literature" icon={Library} subtitle="Linked Academic Repository" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-6">
                                <WikipediaWidget title={data.name} description="religion" />
                                <RedditWidget queryText={data.name} />
                            </div>
                            <div className="space-y-6">
                                <OpenAlexWidget queryText={data.name} />
                                <WikiquoteWidget queryText={data.name} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReligionDetailScreen;
