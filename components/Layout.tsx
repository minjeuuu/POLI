
import React, { useState, useEffect, useMemo } from 'react';
import {
  Home, Compass, Globe, Languages, Scale, BookOpen, Users, GraduationCap,
  DollarSign, User, Gamepad2, MessageSquare, Library, Mail, Calendar,
  Brain, Sparkles, Grid, X, ChevronUp,
} from 'lucide-react';
import { MainTab, SpecialTheme } from '../types';
import GlobalHeader from './GlobalHeader';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  onNavigate: (type: string, payload: any) => void;
  themeMode?: SpecialTheme;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onNavigate, themeMode = 'Default' }) => {
  const [isDark, setIsDark] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // --- CONTEXTUAL THEME ENGINE ---
  const themeClasses = useMemo(() => {
    const base = 'bg-academic-bg dark:bg-stone-950 text-academic-text dark:text-stone-100';
    switch (themeMode) {
      case 'War': return 'bg-stone-900 text-stone-300 font-mono tracking-tight border-red-900';
      case 'Tech': case 'Cyberpunk': return 'bg-slate-950 text-cyan-400 font-mono tracking-widest selection:bg-cyan-900';
      case 'Christmas': return isDark ? 'bg-green-950 text-red-100' : 'bg-red-50 text-green-900';
      case 'NewYear': return 'bg-stone-950 text-amber-200 selection:bg-amber-900';
      case 'ChineseNewYear': return 'bg-red-950 text-yellow-200 border-yellow-600';
      case 'Royal': return 'bg-indigo-950 text-yellow-100 font-serif';
      case 'Revolution': return 'bg-stone-800 text-red-500 font-bold uppercase';
      case 'Retro': return 'bg-orange-50 dark:bg-orange-950 text-orange-900 dark:text-orange-100 font-mono';
      case 'Neon': return 'bg-black text-pink-500 font-bold selection:bg-pink-900';
      case 'Nature': return 'bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100';
      case 'Corporate': return 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans tracking-tight';
      case 'Midnight': return 'bg-indigo-950 text-indigo-100 selection:bg-indigo-700';
      case 'Sunset': return 'bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-100';
      case 'Ocean': return 'bg-sky-50 dark:bg-sky-950 text-sky-900 dark:text-sky-100';
      case 'Forest': return 'bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100';
      case 'Desert': return 'bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-100';
      case 'Lavender': return 'bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100';
      case 'Mint': return 'bg-teal-50 dark:bg-teal-950 text-teal-900 dark:text-teal-100';
      case 'Coffee': return 'bg-[#f5f5dc] dark:bg-[#3e2723] text-[#4b3621] dark:text-[#d7ccc8]';
      case 'Steel': return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono';
      case 'Matrix': return 'bg-black text-green-500 font-mono tracking-widest';
      case 'Steampunk': return 'bg-[#2b2b2b] text-[#d4af37] font-serif border-[#b8860b]';
      case 'Vaporwave': return 'bg-purple-900 text-cyan-300 font-mono';
      case 'Noir': return 'bg-black text-gray-400 font-sans grayscale';
      case 'Synth': return 'bg-fuchsia-950 text-yellow-300 font-bold';
      case 'Solar': return 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200';
      case 'Lunar': return 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
      case 'Arctic': return 'bg-cyan-50 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-100';
      case 'Volcanic': return 'bg-red-950 text-orange-500';
      case 'Jungle': return 'bg-green-900 text-lime-300';
      case 'Monochrome': return 'bg-white dark:bg-black text-black dark:text-white grayscale';
      case 'Sepia': return 'bg-[#f4ecd8] text-[#5b4636]';
      case 'Velvet': return 'bg-fuchsia-950 text-fuchsia-100';
      case 'Slate': return 'bg-slate-800 text-slate-200';
      default: return base;
    }
  }, [themeMode, isDark]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    const accentMap: Record<string, string> = {
      War: '#ef4444', Tech: '#06b6d4', Christmas: '#166534',
      Neon: '#ec4899', Nature: '#22c55e', Ocean: '#0ea5e9',
      Forest: '#10b981', Desert: '#f59e0b', Lavender: '#a855f7',
      Mint: '#14b8a6', Coffee: '#795548', Matrix: '#22c55e',
      Steampunk: '#d4af37', Vaporwave: '#d946ef', Volcanic: '#f97316',
    };
    if (accentMap[themeMode]) root.style.setProperty('--color-accent', accentMap[themeMode]);
    else root.style.removeProperty('--color-accent');
  }, [isDark, themeMode]);

  // Close More drawer when tab changes
  useEffect(() => { setMoreOpen(false); }, [activeTab]);

  const toggleTheme = () => setIsDark(!isDark);

  const allNavItems: { id: MainTab; label: string; icon: React.ElementType; emoji?: string }[] = [
    { id: 'home',        label: 'Home',      icon: Home          },
    { id: 'explore',     label: 'Explore',   icon: Compass       },
    { id: 'countries',   label: 'Nations',   icon: Globe         },
    { id: 'ailab',       label: 'AI Lab',    icon: Sparkles      },
    { id: 'learn',       label: 'Learn',     icon: GraduationCap },
    { id: 'profile',     label: 'Profile',   icon: User          },
    { id: 'persons',     label: 'People',    icon: Users         },
    { id: 'theory',      label: 'Theory',    icon: BookOpen      },
    { id: 'read',        label: 'Library',   icon: Library       },
    { id: 'almanac',     label: 'Almanac',   icon: Calendar      },
    { id: 'comparative', label: 'Compare',   icon: Scale         },
    { id: 'games',       label: 'Games',     icon: Brain         },
    { id: 'sim',         label: 'Sim',       icon: Gamepad2      },
    { id: 'rates',       label: 'Markets',   icon: DollarSign    },
    { id: 'social',      label: 'Feed',      icon: MessageSquare },
    { id: 'messages',    label: 'Chat',      icon: Mail          },
    { id: 'translate',   label: 'Translate', icon: Languages     },
  ];

  // 5 primary tabs always visible on mobile (most used)
  const primaryTabs: MainTab[] = ['home', 'explore', 'countries', 'ailab', 'profile'];
  const primaryItems = allNavItems.filter(i => primaryTabs.includes(i.id));
  // All other tabs go into More drawer
  const moreItems = allNavItems.filter(i => !primaryTabs.includes(i.id));

  // Is active tab in "more" section?
  const moreIsActive = moreItems.some(i => i.id === activeTab);

  const getActiveColor = () => {
    if (themeMode === 'War') return { text: 'text-red-500', bg: 'bg-red-500/15', dot: 'bg-red-500' };
    if (themeMode === 'Tech' || themeMode === 'Matrix') return { text: 'text-cyan-400', bg: 'bg-cyan-400/15', dot: 'bg-cyan-400' };
    if (themeMode === 'Neon') return { text: 'text-pink-400', bg: 'bg-pink-400/15', dot: 'bg-pink-400' };
    if (themeMode === 'Christmas') return { text: 'text-red-500 dark:text-red-400', bg: 'bg-green-100 dark:bg-green-900/30', dot: 'bg-red-500' };
    return { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10', dot: 'bg-indigo-500' };
  };

  const activeColor = getActiveColor();

  const navBg = ['War', 'Steampunk', 'Volcanic', 'Coffee'].includes(themeMode)
    ? 'bg-stone-900 border-red-900/40'
    : ['Tech', 'Matrix', 'Cyberpunk', 'Neon'].includes(themeMode)
    ? 'bg-slate-950 border-cyan-900/40'
    : 'bg-white/98 dark:bg-stone-900/98 border-stone-200/80 dark:border-stone-800/80';

  return (
    <div className={`flex flex-col h-screen transition-colors duration-500 overflow-hidden ${themeClasses}`}>

      <GlobalHeader toggleTheme={toggleTheme} isDark={isDark} onNavigate={onNavigate} />

      <main className="flex-1 overflow-hidden relative pt-16 min-h-0">
        {(themeMode === 'War' || themeMode === 'Steampunk') && <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />}
        {themeMode === 'Christmas' && <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/snow.png')]" />}
        {(themeMode === 'Tech' || themeMode === 'Matrix' || themeMode === 'Cyberpunk') && <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" />}
        {themeMode === 'Nature' && <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />}
        {children}
      </main>

      {/* ── BOTTOM NAV ─────────────────────────────────────────── */}
      <nav className={`flex-none border-t z-50 backdrop-blur-xl shadow-[0_-1px_0_0_rgba(0,0,0,0.06)] transition-colors duration-500 ${navBg}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>

        {/* ── MOBILE: 5-item primary bar + More ── */}
        <div className="flex md:hidden items-center justify-around h-[62px] px-2">
          {primaryItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                aria-label={item.label}
                className="flex flex-col items-center justify-center flex-1 h-full gap-[3px] relative transition-all duration-200 active:scale-90"
              >
                {/* Active dot indicator */}
                {isActive && (
                  <span className={`absolute top-2 w-1 h-1 rounded-full ${activeColor.dot} transition-all duration-300`} />
                )}
                <div className={`flex items-center justify-center w-10 h-8 rounded-2xl transition-all duration-200 ${isActive ? activeColor.bg : ''}`}>
                  <item.icon className={`w-[22px] h-[22px] transition-all duration-200 ${isActive ? `${activeColor.text} stroke-[2.5px]` : 'text-stone-400 dark:text-stone-500 stroke-[2px]'}`} />
                </div>
                <span className={`text-[10px] font-semibold leading-none tracking-wide transition-colors duration-200 ${isActive ? activeColor.text : 'text-stone-400 dark:text-stone-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(o => !o)}
            aria-label="More"
            className="flex flex-col items-center justify-center flex-1 h-full gap-[3px] relative transition-all duration-200 active:scale-90"
          >
            {moreIsActive && !moreOpen && (
              <span className={`absolute top-2 w-1 h-1 rounded-full ${activeColor.dot}`} />
            )}
            <div className={`flex items-center justify-center w-10 h-8 rounded-2xl transition-all duration-200 ${moreOpen || moreIsActive ? activeColor.bg : ''}`}>
              {moreOpen
                ? <X className={`w-[22px] h-[22px] stroke-[2.5px] ${activeColor.text}`} />
                : <Grid className={`w-[22px] h-[22px] transition-colors duration-200 ${moreIsActive ? `${activeColor.text} stroke-[2.5px]` : 'text-stone-400 dark:text-stone-500 stroke-[2px]'}`} />
              }
            </div>
            <span className={`text-[10px] font-semibold leading-none tracking-wide transition-colors duration-200 ${moreOpen || moreIsActive ? activeColor.text : 'text-stone-400 dark:text-stone-500'}`}>
              {moreOpen ? 'Close' : 'More'}
            </span>
          </button>
        </div>

        {/* ── DESKTOP: full scrollable nav (unchanged) ── */}
        <div className="hidden md:flex items-center h-16 px-2 overflow-x-auto no-scrollbar gap-1">
          {allNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                aria-label={item.label}
                className={`flex flex-col items-center justify-center min-w-[68px] h-full px-2 flex-shrink-0 transition-all duration-300 group rounded-xl ${isActive ? activeColor.text : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'}`}
              >
                <div className={`p-1.5 rounded-xl transition-all duration-300 mb-0.5 ${isActive ? `${activeColor.bg} -translate-y-0.5` : 'group-hover:bg-stone-50 dark:group-hover:bg-stone-800'}`}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-80 leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── MORE DRAWER (mobile only) ──────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${moreOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMoreOpen(false)}
      />

      {/* Sheet */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[45] transition-transform duration-300 ease-out rounded-t-3xl overflow-hidden shadow-2xl border-t border-stone-200/60 dark:border-stone-700/60
        ${['War','Steampunk','Volcanic'].includes(themeMode) ? 'bg-stone-900' :
          ['Tech','Matrix','Cyberpunk','Neon'].includes(themeMode) ? 'bg-slate-950' :
          'bg-white dark:bg-stone-900'}
        ${moreOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 72px)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
        </div>

        {/* Section label */}
        <p className="px-5 pb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">All Sections</p>

        {/* Grid of all extra tabs — 3 columns for better readability */}
        <div className="px-3 pb-2 grid grid-cols-3 gap-2">
          {moreItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); setMoreOpen(false); }}
                className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl transition-all duration-200 active:scale-95 border
                  ${isActive
                    ? `${activeColor.bg} border-indigo-200 dark:border-indigo-700 shadow-sm`
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-100 dark:border-stone-800'}`}
              >
                <item.icon className={`w-6 h-6 transition-colors ${isActive ? `${activeColor.text} stroke-[2.5px]` : 'text-stone-500 dark:text-stone-400 stroke-2'}`} />
                <span className={`text-[11px] font-semibold leading-tight text-center ${isActive ? activeColor.text : 'text-stone-600 dark:text-stone-400'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Layout;
