import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Clock, Users, Eye, Lock, Target, ShieldAlert, Printer, Download, Bookmark, Globe, Library, Shield } from 'lucide-react';
import { fetchAgencyDetail } from '../services/geminiService';
import { WikipediaWidget } from './external/WikipediaWidget';
import { RedditWidget } from './external/RedditWidget';
import { GDELTWidget } from './external/GDELTWidget';
import { generateAestheticPDF } from '../utils/pdfGenerator';
import { playSFX } from '../services/soundService';

interface AgencyDetailScreenProps {
    agencyName: string;
    onClose: () => void;
    isSaved?: boolean;
    onToggleSave?: () => void;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'figures', label: 'Leadership', icon: Users },
    { id: 'operations', label: 'Operations', icon: Target },
    { id: 'capabilities', label: 'Capabilities', icon: Shield },
    { id: 'impact', label: 'Geopolitical Impact', icon: Globe },
    { id: 'critique', label: 'Controversies', icon: ShieldAlert },
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

const AgencyDetailScreen: React.FC<AgencyDetailScreenProps> = ({ agencyName, onClose, isSaved, onToggleSave }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const parsed = await fetchAgencyDetail(agencyName);
                if (parsed) {
                    setData(parsed);
                } else {
                    throw new Error("Failed to load");
                }
            } catch (err) {
                console.error(err);
                setData({ 
                    name: agencyName, 
                    type: "Intelligence Agency",
                    country: "Unknown", 
                    historicalImpact: "Information currently unavailable or generation failed." 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [agencyName]);

    const handleDownload = () => {
        playSFX('click');
        if (!data) return;
        try {
            const sections = [];
            if (data.jurisdiction) {
                sections.push({ title: "Scope & Jurisdiction", content: data.jurisdiction });
            }
            if (data.coreFocus && data.coreFocus.length > 0) {
                sections.push({ title: "Core Operational Focus", content: data.coreFocus });
            }
            if (data.keyFigures && data.keyFigures.length > 0) {
                sections.push({ title: "Key Leadership & Figures", content: data.keyFigures });
            }
            if (data.majorOperations && data.majorOperations.length > 0) {
                sections.push({ title: "Notable Operations", content: data.majorOperations });
            }
            if (data.capabilities && data.capabilities.length > 0) {
                sections.push({ title: "Intelligence Capabilities", content: data.capabilities });
            }
            if (data.historicalImpact) {
                sections.push({ title: "Role in Geopolitics", content: data.historicalImpact });
            }
            if (data.politicalInfluence) {
                sections.push({ title: "Relations with State Leaders", content: data.politicalInfluence });
            }
            if (data.controversies && data.controversies.length > 0) {
                sections.push({ title: "Scandals & Controversies", content: data.controversies });
            }

            generateAestheticPDF(
                data.name || agencyName,
                "Intelligence Agency Dossier",
                `Classified briefing outlining the capabilities, leadership, history, and operations of ${data.name || agencyName}.`,
                sections,
                `${(data.name || agencyName).replace(/\s+/g, '_')}_Dossier.pdf`
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
                    <Eye className="w-12 h-12 text-stone-500 animate-bounce" />
                    <p className="text-stone-500 dark:text-stone-400 font-serif font-bold uppercase tracking-widest text-sm">Decrypting Dossier...</p>
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
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-academic-gold">Intelligence Dossier</span>
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
                                <Lock className="w-12 h-12 text-stone-650 dark:text-stone-400" />
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-stone-900 dark:text-white tracking-tight">{data.name}</h1>
                        <div className="flex items-center justify-center flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-blue-500" /> {data.type}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-500" /> Formed {data.foundedYear}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-emerald-500" /> {data.country}</span>
                        </div>
                    </div>

                    {/* OVERVIEW SECTION */}
                    <div id="overview" ref={el => { sectionRefs.current['overview'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Operational Focus & Scope" icon={BookOpen} subtitle="Agency Mandate" />
                        <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl border-l-4 border-academic-accent mb-6">
                            <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 mb-2">Operational Scope & Jurisdiction</h4>
                            <p className="font-serif text-base text-stone-800 dark:text-stone-200 leading-relaxed">{data.jurisdiction}</p>
                        </div>
                        <div className="pt-4">
                            <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-3">Core Strategic Focus</h4>
                            <div className="flex flex-wrap gap-2">
                                {data.coreFocus?.map((f: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded text-xs font-bold border border-stone-200 dark:border-stone-700">{f}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* LEADERSHIP SECTION */}
                    <div id="figures" ref={el => { sectionRefs.current['figures'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Leadership & Key Figures" icon={Users} subtitle="Directors & Officers" />
                        <ul className="space-y-4">
                            {data.keyFigures?.map((f: string, i: number) => (
                                <li key={i} className="flex font-serif text-base leading-relaxed items-start gap-3 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-lg border border-stone-100 dark:border-stone-800/80">
                                    <div className="w-2 h-2 rounded-full bg-academic-gold mt-2.5 flex-shrink-0" />
                                    <span className="text-stone-700 dark:text-stone-300">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* OPERATIONS SECTION */}
                    <div id="operations" ref={el => { sectionRefs.current['operations'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Notable Missions & Operations" icon={Target} subtitle="Declassified Operations" />
                        <ul className="space-y-4">
                            {data.majorOperations?.map((op: string, i: number) => (
                                <li key={i} className="flex font-serif text-base leading-relaxed items-start gap-3 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-lg border border-stone-100 dark:border-stone-800/80">
                                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                                    <span className="text-stone-700 dark:text-stone-300 text-justify">{op}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CAPABILITIES SECTION */}
                    <div id="capabilities" ref={el => { sectionRefs.current['capabilities'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Operational Capabilities" icon={Shield} subtitle="HUMINT, SIGINT & Cyber Operations" />
                        <div className="flex flex-wrap gap-2 mt-4">
                            {data.capabilities?.map((c: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-full text-xs font-bold border border-stone-200 dark:border-stone-700">{c}</span>
                            ))}
                        </div>
                    </div>

                    {/* GEOPOLITICAL IMPACT SECTION */}
                    <div id="impact" ref={el => { sectionRefs.current['impact'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Role in Geopolitics" icon={Globe} subtitle="Impact & State Relations" />
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-2">Influence on Geopolitical Events</h4>
                                <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.historicalImpact}</p>
                            </div>
                            <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-2">Relationship with Executive Leadership</h4>
                                <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.politicalInfluence}</p>
                            </div>
                        </div>
                    </div>

                    {/* CONTROVERSIES SECTION */}
                    <div id="critique" ref={el => { sectionRefs.current['critique'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Scandals & controversies" icon={ShieldAlert} subtitle="Leaks & Investigations" />
                        <div className="bg-red-50 dark:bg-red-950/10 p-6 rounded-xl border border-red-200 dark:border-red-950/30">
                            <ul className="space-y-3">
                                {data.controversies?.length > 0 ? data.controversies.map((c: string, i: number) => (
                                    <li key={i} className="text-base font-serif text-red-900 dark:text-red-300 leading-relaxed bg-white/50 dark:bg-black/20 p-4 rounded border border-red-100 dark:border-red-950/40">• {c}</li>
                                )) : <li className="text-base italic text-red-800 dark:text-red-300">No major public controversies documented.</li>}
                            </ul>
                        </div>
                    </div>

                    {/* RESOURCES SECTION */}
                    <div id="resources" ref={el => { sectionRefs.current['resources'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="External Databases & News" icon={Library} subtitle="Linked Academic Repository" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-6">
                                <WikipediaWidget title={data.name} description="intelligence agency" />
                                <RedditWidget queryText={data.name} />
                            </div>
                            <div className="space-y-6">
                                <GDELTWidget queryText={data.name} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AgencyDetailScreen;
