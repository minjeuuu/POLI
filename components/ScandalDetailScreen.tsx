import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, Clock, Users, TriangleAlert, Building2, Eye, Shield, Printer, Download, Bookmark, Globe, Library } from 'lucide-react';
import { fetchScandalDetail } from '../services/geminiService';

import { generateAestheticPDF } from '../utils/pdfGenerator';
import { playSFX } from '../services/soundService';

interface ScandalDetailScreenProps {
    scandalName: string;
    onClose: () => void;
    isSaved?: boolean;
    onToggleSave?: () => void;
}

const TABS = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'figures', label: 'Key Figures', icon: Users },
    { id: 'exposure', label: 'Exposure', icon: Eye },
    { id: 'fallout', label: 'Fallout', icon: TriangleAlert },
    { id: 'reforms', label: 'Reforms', icon: Shield },
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

const ScandalDetailScreen: React.FC<ScandalDetailScreenProps> = ({ scandalName, onClose, isSaved, onToggleSave }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const parsed = await fetchScandalDetail(scandalName);
                if (parsed) {
                    setData(parsed);
                } else {
                    throw new Error("Failed to load");
                }
            } catch (err) {
                console.error(err);
                setData({ 
                    name: scandalName, 
                    type: "Political Scandal",
                    year: "Unknown", 
                    historicalImpact: "Information currently unavailable or generation failed." 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [scandalName]);

    const handleDownload = () => {
        playSFX('click');
        if (!data) return;
        try {
            const sections = [];
            if (data.coreIssue) {
                sections.push({ title: "Core Issue", content: data.coreIssue });
            }
            if (data.exposure) {
                sections.push({ title: "Public Exposure", content: data.exposure });
            }
            if (data.historicalImpact) {
                sections.push({ title: "Historical & Geopolitical Impact", content: data.historicalImpact });
            }
            if (data.fallout) {
                sections.push({ title: "Political Fallout", content: data.fallout });
            }
            if (data.reforms && data.reforms.length > 0) {
                sections.push({ title: "Reforms Instituted", content: data.reforms });
            }

            generateAestheticPDF(
                data.name || scandalName,
                "Political Scandal / Crisis Dossier",
                `Dossier detailing the core events, key actors, exposure methods, and systemic reforms related to ${data.name || scandalName}.`,
                sections,
                `${(data.name || scandalName).replace(/\s+/g, '_')}_Dossier.pdf`
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
                    <TriangleAlert className="w-12 h-12 text-red-500 animate-bounce" />
                    <p className="text-stone-500 dark:text-stone-400 font-serif font-bold uppercase tracking-widest text-sm">Declassifying Documents...</p>
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
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-academic-gold">Political Crisis / Scandal</span>
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
                                <TriangleAlert className="w-12 h-12 text-red-600 dark:text-red-400" />
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-stone-900 dark:text-white tracking-tight">{data.name}</h1>
                        <div className="flex items-center justify-center flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1"><TriangleAlert className="w-4 h-4 text-red-500" /> {data.type}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-500" /> {data.year}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-emerald-500" /> {data.country}</span>
                        </div>
                    </div>

                    {/* OVERVIEW SECTION */}
                    <div id="overview" ref={el => { sectionRefs.current['overview'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="The Core Issue" icon={BookOpen} subtitle="Case Details" />
                        <div className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif bg-red-50/50 dark:bg-red-950/5 p-6 rounded-xl border-l-4 border-red-500">{renderProse(data.coreIssue)}</div>
                    </div>

                    {/* KEY FIGURES SECTION */}
                    <div id="figures" ref={el => { sectionRefs.current['figures'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Key Figures & Actors" icon={Users} subtitle="Central Protagonists & Antagonists" />
                        <div className="flex flex-wrap gap-3 mt-4">
                            {data.keyFigures?.map((d: string, i: number) => (
                                <span key={i} className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-bold border border-stone-200 dark:border-stone-700">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* EXPOSURE SECTION */}
                    <div id="exposure" ref={el => { sectionRefs.current['exposure'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Exposure & Uncovering" icon={Eye} subtitle="How it came to light" />
                        <div className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif">{renderProse(data.exposure)}</div>
                    </div>

                    {/* FALLOUT SECTION */}
                    <div id="fallout" ref={el => { sectionRefs.current['fallout'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Political Fallout & Impact" icon={TriangleAlert} subtitle="Systemic Outcomes & Impact" />
                        <div className="bg-academic-paper dark:bg-stone-800/30 p-8 rounded-2xl border border-academic-line dark:border-stone-700 font-serif text-lg leading-relaxed text-stone-800 dark:text-stone-200 text-justify mb-6">
                            {renderProse(data.fallout)}
                        </div>
                        <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                            <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 dark:text-stone-500 mb-3">Geopolitical & Historical Significance</h4>
                            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif">{data.historicalImpact}</p>
                        </div>
                    </div>

                    {/* REFORMS SECTION */}
                    <div id="reforms" ref={el => { sectionRefs.current['reforms'] = el; }} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-sm">
                        <SectionTitle title="Institutional Reforms" icon={Shield} subtitle="Policy & Legislative Actions" />
                        <ul className="space-y-4">
                            {data.reforms?.map((r: string, i: number) => (
                                <li key={i} className="flex font-serif text-base leading-relaxed items-start gap-3 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-lg border border-stone-100 dark:border-stone-800/80">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                                    <span className="text-stone-700 dark:text-stone-300">{r}</span>
                                </li>
                            ))}
                        </ul>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default ScandalDetailScreen;
