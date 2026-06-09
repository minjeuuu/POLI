import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Clock, Users, FileText, Compass, AlertTriangle, Printer, Download, Bookmark, Globe, Library } from 'lucide-react';
import { fetchTreatyDetail } from '../services/geminiService';
import { WikipediaWidget } from './external/WikipediaWidget';
import { RedditWidget } from './external/RedditWidget';
import { OpenAlexWidget } from './external/OpenAlexWidget';
import { CrossrefWidget } from './external/CrossrefWidget';
import { generateAestheticPDF } from '../utils/pdfGenerator';
import { playSFX } from '../services/soundService';

interface TreatyDetailScreenProps {
    treatyName: string;
    onClose: () => void;
    isSaved?: boolean;
    onToggleSave?: () => void;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'terms', label: 'Key Terms', icon: FileText },
    { id: 'parties', label: 'Signatories', icon: Users },
    { id: 'history', label: 'Impact & Legacy', icon: Clock },
    { id: 'violations', label: 'Violations', icon: AlertTriangle },
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

const TreatyDetailScreen: React.FC<TreatyDetailScreenProps> = ({ treatyName, onClose, isSaved, onToggleSave }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const parsed = await fetchTreatyDetail(treatyName);
                if (parsed) {
                    setData(parsed);
                } else {
                    throw new Error("Failed to load");
                }
            } catch (err) {
                console.error(err);
                setData({ 
                    name: treatyName, 
                    type: "Treaty / Agreement",
                    dateSigned: "Unknown", 
                    historicalImpact: "Information currently unavailable or generation failed." 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [treatyName]);

    const handleDownload = () => {
        playSFX('click');
        if (!data) return;
        try {
            const sections = [];
            if (data.objective) {
                sections.push({ title: "Primary Objective", content: data.objective });
            }
            if (data.context) {
                sections.push({ title: "Historical Context", content: data.context });
            }
            if (data.keyTerms && data.keyTerms.length > 0) {
                sections.push({ title: "Key Provisions & Terms", content: data.keyTerms });
            }
            if (data.signatories && data.signatories.length > 0) {
                sections.push({ title: "Signatories", content: data.signatories });
            }
            if (data.historicalImpact) {
                sections.push({ title: "Historical Impact", content: data.historicalImpact });
            }
            if (data.aftermath) {
                sections.push({ title: "Long-Term Legacy & Aftermath", content: data.aftermath });
            }
            if (data.violations && data.violations.length > 0) {
                sections.push({ title: "Documented Violations", content: data.violations });
            }

            generateAestheticPDF(
                data.name || treatyName,
                "Treaty & Geopolitical Accord Dossier",
                `Official diplomatic briefing detailing the terms, context, signatories, and compliance history of ${data.name || treatyName}.`,
                sections,
                `${(data.name || treatyName).replace(/\s+/g, '_')}_Dossier.pdf`
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
                    <FileText className="w-12 h-12 text-blue-500 animate-bounce" />
                    <p className="text-stone-500 dark:text-stone-400 font-serif font-bold uppercase tracking-widest text-sm">Retrieving Archives...</p>
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
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-academic-gold">Geopolitical Accord</span>
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
                                <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-stone-900 dark:text-white tracking-tight">{data.name}</h1>
                        <div className="flex items-center justify-center flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1"><FileText className="w-4 h-4 text-blue-500" /> {data.type}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-500" /> {data.dateSigned}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-emerald-500" /> {data.location}</span>
                        </div>
                    </div>

                    {/* OVERVIEW SECTION */}
                    <div id="overview" ref={el => { sectionRefs.current['overview'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Objective & Context" icon={BookOpen} subtitle="Diplomatic Intent" />
                        <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-xl border-l-4 border-academic-accent mb-6">
                            <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 mb-2">Primary Objective</h4>
                            <p className="font-serif text-base text-stone-850 dark:text-stone-150 leading-relaxed text-justify">{data.objective}</p>
                        </div>
                        <div className="pt-4">
                            <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-3">Historical Context & Diplomatic Climate</h4>
                            <div className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif">{renderProse(data.context)}</div>
                        </div>
                    </div>

                    {/* TERMS SECTION */}
                    <div id="terms" ref={el => { sectionRefs.current['terms'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Key Provisions & Terms" icon={FileText} subtitle="Core Articles of Agreement" />
                        <ul className="space-y-4">
                            {data.keyTerms?.map((t: string, i: number) => (
                                <li key={i} className="flex font-serif text-base leading-relaxed items-start gap-3 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-lg border border-stone-100 dark:border-stone-800/80">
                                    <div className="w-2 h-2 rounded-full bg-academic-gold mt-2.5 flex-shrink-0" />
                                    <span className="text-stone-700 dark:text-stone-300 text-justify">{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SIGNATORIES SECTION */}
                    <div id="parties" ref={el => { sectionRefs.current['parties'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Signatories & Parties" icon={Users} subtitle="Signatory Nations" />
                        <div className="flex flex-wrap gap-3 mt-4">
                            {data.signatories?.map((d: string, i: number) => (
                                <span key={i} className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-bold border border-stone-200 dark:border-stone-700">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* IMPACT SECTION */}
                    <div id="history" ref={el => { sectionRefs.current['history'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Geopolitical Impact & Legacy" icon={Clock} subtitle="Historical Significance" />
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-2">Immediate Outcomes</h4>
                                <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.historicalImpact}</p>
                            </div>
                            <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                                <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-2">Long-term Aftermath & Compliance</h4>
                                <p className="font-serif text-base text-stone-700 dark:text-stone-300 leading-relaxed text-justify">{data.aftermath}</p>
                            </div>
                        </div>
                    </div>

                    {/* VIOLATIONS SECTION */}
                    <div id="violations" ref={el => { sectionRefs.current['violations'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Violations & Disputes" icon={AlertTriangle} subtitle="Compliance Record" />
                        <div className="bg-red-50 dark:bg-red-950/10 p-6 rounded-xl border border-red-200 dark:border-red-950/30">
                            <ul className="space-y-3">
                                {data.violations?.length > 0 ? data.violations.map((v: string, i: number) => (
                                    <li key={i} className="text-base font-serif text-red-900 dark:text-red-300 leading-relaxed bg-white/50 dark:bg-black/20 p-4 rounded border border-red-100 dark:border-red-950/40">• {v}</li>
                                )) : <li className="text-base italic text-red-800 dark:text-red-300">No major violations or non-compliance documented.</li>}
                            </ul>
                        </div>
                    </div>

                    {/* RESOURCES SECTION */}
                    <div id="resources" ref={el => { sectionRefs.current['resources'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="External Databases & Research" icon={Library} subtitle="Linked Academic Repository" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-6">
                                <WikipediaWidget title={data.name} description="treaty" />
                                <RedditWidget queryText={data.name} />
                            </div>
                            <div className="space-y-6">
                                <OpenAlexWidget queryText={data.name} />
                                <CrossrefWidget queryText={data.name} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TreatyDetailScreen;
