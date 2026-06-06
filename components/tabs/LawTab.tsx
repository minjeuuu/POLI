
import React, { useState } from 'react';
import { LEGAL_HIERARCHY } from '../../data/homeData';
import { ChevronRight, Scale, Globe, BookOpen, FileText, ChevronLeft, Search, Landmark, Clock, FileCheck, Gavel, Scroll } from 'lucide-react';
import { IconRenderer } from '../IconMap';
import ReaderView from '../ReaderView';

// Legal Categories
const LEGAL_CATS = [
    { id: 'Constitutions', label: 'Constitutions', icon: Scroll },
    { id: 'Codes', label: 'Codes & Statutes', icon: Scale },
    { id: 'Case Law', label: 'Case Law', icon: Gavel },
    { id: 'Books', label: 'Legal Theory', icon: BookOpen },
    { id: 'Journals', label: 'Journals', icon: FileText },
    { id: 'Treaties', label: 'Treaties', icon: FileCheck },
];

// Recursive type for navigation stack items
interface NavItem {
    name: string;
    data: any; // Can be a list of items or a specific entity
    type: 'List' | 'Reader' | 'Document' | 'RegionFolder';
}

const LawTab: React.FC = () => {
  const [navStack, setNavStack] = useState<NavItem[]>([]);
  const [activeRootTab, setActiveRootTab] = useState<string>('Constitutions');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Specific State for Document Searching
  const [docSearchQuery, setDocSearchQuery] = useState('');

  // --- NAVIGATION HANDLERS ---
  const handleItemClick = (item: any) => {
      // FORCE READER FOR DOCUMENTS
      if (item.type === 'Document' || item.type === 'Book' || item.type === 'Journal') {
          // Open Reader directly
          setNavStack([...navStack, { name: item.name, data: null, type: 'Reader' }]);
      } else if (item.items) {
          // Drill down into folder
          setNavStack([...navStack, { name: item.name || item.category, data: item.items, type: 'List' }]);
      }
  };

  const handleDocSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (docSearchQuery.trim()) {
          // Redirect to Reader for ANY title input
          setNavStack([...navStack, { name: docSearchQuery, data: null, type: 'Reader' }]);
          setDocSearchQuery('');
      }
  };

  const goBack = () => {
      setNavStack(prev => prev.slice(0, -1));
  };

  const getActiveData = () => {
      if (navStack.length > 0) {
          const top = navStack[navStack.length - 1];
          return top.data; // Should be a list if we are in 'List' mode
      }
      // Root Level Data
      return LEGAL_HIERARCHY[activeRootTab] || [];
  };

  const currentList = getActiveData();
  const currentTitle = navStack.length > 0 ? navStack[navStack.length - 1].name : activeRootTab;
  const isReaderSection = activeRootTab === 'Books' || activeRootTab === 'Journals' || activeRootTab === 'Treaties' || activeRootTab === 'Codes';

  const getPlaceholder = () => {
      if (activeRootTab === 'Journals') return "Enter legal journal or article name...";
      if (activeRootTab === 'Treaties') return "Enter treaty or convention name...";
      if (activeRootTab === 'Books') return "Enter legal treatise or book title...";
      if (activeRootTab === 'Codes') return "Enter legal code or statute...";
      return "Enter document title...";
  }

  // --- DETAIL VIEW HANDLING ---
  // If the top of the stack is a Reader type, render that instead of the list
  if (navStack.length > 0) {
      const current = navStack[navStack.length - 1];
      if (current.type === 'Reader') return <ReaderView title={current.name} author="Legal Archive" onClose={goBack} />;
  }

  return (
    <div className="h-full flex flex-col pb-24">
        
        {/* ROOT TABS (Only visible at root level) */}
        {navStack.length === 0 && (
            <div className="sticky top-0 bg-academic-bg z-20 pt-2 pb-4 -mx-6 px-6 border-b border-academic-line mb-6 flex overflow-x-auto gap-2 no-scrollbar">
                {LEGAL_CATS.map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => {
                            setActiveRootTab(tab.id);
                            setSearchQuery('');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-full border
                        ${activeRootTab === tab.id ? 'bg-academic-accent text-white border-academic-accent' : 'bg-transparent text-stone-400 border-transparent hover:bg-stone-100'}`}
                    >
                        {tab.icon && React.createElement(tab.icon, { className: "w-3 h-3" })}
                        {tab.label}
                    </button>
                ))}
            </div>
        )}

        {/* HEADER (For Nested Levels) */}
        {navStack.length > 0 && (
            <div className="flex items-center gap-2 mb-6 border-b border-academic-line pb-4">
                <button onClick={goBack} className="p-1 rounded-full hover:bg-stone-100">
                    <ChevronLeft className="w-5 h-5 text-stone-500" />
                </button>
                <h2 className="font-serif font-bold text-lg text-academic-text">{currentTitle}</h2>
            </div>
        )}

        {/* DIRECT DOCUMENT SEARCH (For flat sections like Books, Journals) */}
        {isReaderSection && navStack.length === 0 && (
            <div className="mb-8">
                <form onSubmit={handleDocSearch} className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-academic-gold" />
                    <input 
                        type="text" 
                        placeholder={getPlaceholder()}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-academic-line text-sm font-serif focus:border-academic-accent outline-none shadow-sm placeholder:italic"
                        value={docSearchQuery}
                        onChange={(e) => setDocSearchQuery(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-stone-100 text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:bg-academic-accent hover:text-white transition-colors"
                    >
                        Access
                    </button>
                </form>
            </div>
        )}

        {/* FILTER SEARCH (Within current list) */}
        {!isReaderSection && (
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400" />
                <input 
                    type="text" 
                    placeholder={`Filter ${currentTitle}...`}
                    className="w-full pl-8 pr-4 py-2 bg-white border border-stone-200 text-xs font-serif focus:border-academic-accent outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        )}

        {/* LIST CONTENT */}
        <div className="flex-1 animate-in fade-in slide-in-from-right-2 duration-500">
            {currentList && currentList.length > 0 ? (
                <div className="space-y-8">
                    {/* Render Categories if data has structure [Category -> Items] */}
                    {currentList[0]?.category ? (
                        currentList.map((section: any, idx: number) => (
                            <div key={idx} className="space-y-4">
                                <div className="flex items-center gap-3 border-b border-academic-line pb-2">
                                    <div className="p-1.5 bg-stone-100 rounded-md text-academic-accent">
                                        <IconRenderer name={section.icon || 'Scale'} className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-serif text-base font-bold text-academic-text">{section.category}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {section.items.filter((i: any) => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item: any, i: number) => (
                                        <div 
                                            key={i} 
                                            onClick={() => handleItemClick(item)} 
                                            className="flex items-center justify-between p-3 bg-white border border-stone-200 hover:border-academic-accent cursor-pointer transition-all rounded-sm group"
                                        >
                                            <div className="flex items-center gap-2">
                                                {item.type === 'RegionFolder' && <Globe className="w-4 h-4 text-stone-300" />}
                                                {item.type === 'Document' && <Scroll className="w-4 h-4 text-stone-300" />}
                                                {item.type === 'Book' && <BookOpen className="w-4 h-4 text-stone-300" />}
                                                {item.type === 'Journal' && <FileText className="w-4 h-4 text-stone-300" />}
                                                <span className="text-xs font-bold text-stone-600 group-hover:text-academic-text">{item.name}</span>
                                            </div>
                                            {item.items ? <ChevronRight className="w-4 h-4 text-stone-300" /> : <FileText className="w-3 h-3 text-stone-300 group-hover:text-academic-gold" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Flat List Renderer (e.g. inside a Region Folder) */
                        <div className="grid grid-cols-1 gap-2">
                            {currentList.filter((i: any) => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item: any, i: number) => (
                                <div 
                                    key={i} 
                                    onClick={() => handleItemClick(item)} 
                                    className="flex items-center justify-between p-4 bg-white border border-stone-200 hover:border-academic-accent cursor-pointer transition-all rounded-sm group"
                                >
                                    <div className="flex items-center gap-3">
                                        <IconRenderer name="Scroll" className="w-4 h-4 text-stone-300 group-hover:text-academic-gold" />
                                        <span className="text-sm font-serif font-bold text-stone-700 group-hover:text-academic-text">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-academic-gold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read <BookOpen className="w-3 h-3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20 text-stone-400 italic font-serif">
                    No legal documents found in this section.
                </div>
            )}
        </div>
    </div>
  );
};

export default LawTab;
