
import React, { useState, useEffect, useMemo } from 'react';
import { MainTab, DailyContext, SavedItem, UserProfile, ThemeScope, SpecialTheme, UserPreferences } from './types';
import { fetchDailyContext, aiOnline as homeAiOnline } from './services/homeService';
import { FALLBACK_DAILY_CONTEXT } from './data/homeData';
import { db } from './services/database';

// Screens & Tabs
import AuthScreen from './components/AuthScreen';
import LaunchScreen from './components/LaunchScreen';
import IntroScreen from './components/IntroScreen';
import Layout from './components/Layout';
import HomeTab from './components/tabs/HomeTab';
import SocialTab from './components/tabs/SocialTab';
import ExploreTab from './components/tabs/ExploreTab';
import CountriesTab from './components/tabs/CountriesTab';
import TranslateTab from './components/tabs/TranslateTab';
import ComparativeTab from './components/tabs/ComparativeTab';
import TheoryTab from './components/tabs/TheoryTab';
import PersonsTab from './components/tabs/PersonsTab';
import LearnTab from './components/tabs/LearnTab';
import SimTab from './components/tabs/SimTab';
import GamesTab from './components/tabs/GamesTab';
import RatesTab from './components/tabs/RatesTab';
import ProfileTab from './components/tabs/ProfileTab';
import LibraryTab from './components/tabs/LibraryTab';
import MessageTab from './components/tabs/MessageTab';
import AlmanacTab from './components/tabs/AlmanacTab';
import AILabTab from './components/tabs/AILabTab';

// Detail Screens
import CountryDetailScreen from './components/country/CountryDetailScreen';
import PersonDetailScreen from './components/PersonDetailScreen';
import EventDetailScreen from './components/EventDetailScreen';
import IdeologyDetailScreen from './components/IdeologyDetailScreen';
import OrgDetailScreen from './components/OrgDetailScreen';
import PartyDetailScreen from './components/PartyDetailScreen';
import ReaderView from './components/ReaderView';
import ConceptDetailModal from './components/ConceptDetailModal';
import DisciplineDetailScreen from './components/DisciplineDetailScreen';
import GenericKnowledgeScreen from './components/GenericKnowledgeScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import PWAInstallButton from './components/PWAInstallButton';

type OverlayItem = { type: string; payload: any; id: string };

const LS_LAUNCHED = 'poli_launched';
const LS_AUTH = 'poli_auth';
const LS_INTRO = 'poli_intro_shown';
const LS_USER = 'poli_user';
const LS_PREFS = 'poli_prefs';

export default function App() {
  // Lifecycle State — persisted so users don't repeat onboarding every reload
  const [hasLaunched, setHasLaunched] = useState(() => localStorage.getItem(LS_LAUNCHED) === 'true');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(LS_AUTH) === 'true');
  const [showIntro, setShowIntro] = useState(() => localStorage.getItem(LS_INTRO) !== 'true');

  // App State
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyData, setDailyData] = useState<DailyContext>(FALLBACK_DAILY_CONTEXT);
  const [isDailyLoading, setIsDailyLoading] = useState(true);
  const [isAiOnline, setIsAiOnline] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [appLang, setAppLang] = useState('English');
  const [user, setUser] = useState<UserProfile | null>(() => {
    try { const s = localStorage.getItem(LS_USER); return s ? JSON.parse(s) : null; } catch { return null; }
  });

  // THEME STATE (Source of Truth)
  const [themeMode, setThemeMode] = useState<SpecialTheme>(() => {
    try { const p = localStorage.getItem(LS_PREFS); return p ? JSON.parse(p).themeMode || 'Default' : 'Default'; } catch { return 'Default'; }
  });
  const [themeScope, setThemeScope] = useState<ThemeScope>(() => {
    try { const p = localStorage.getItem(LS_PREFS); return p ? JSON.parse(p).themeScope || 'None' : 'None'; } catch { return 'None'; }
  });
  const [myCountry, setMyCountry] = useState<string>(() => {
    try { const p = localStorage.getItem(LS_PREFS); return p ? JSON.parse(p).myCountry || 'Global Citizen' : 'Global Citizen'; } catch { return 'Global Citizen'; }
  });

  // Global Navigation Stack
  const [overlayStack, setOverlayStack] = useState<OverlayItem[]>([]);

  // Initialize DB and Load Data
  useEffect(() => {
    const initApp = async () => {
        await db.init();
        const saved = await db.execute("SELECT * FROM saved_items");
        if (saved.success) {
            setSavedItems(saved.rows);
        }
    };
    initApp();
  }, []);

  // Track which tabs have ever been visited so we lazy-mount them
  // (only mount a tab when first visited — prevents all 17 tabs crashing simultaneously)
  const [mountedTabs, setMountedTabs] = useState<Set<MainTab>>(new Set(['home']));

  const handleTabChange = (t: MainTab) => {
    setMountedTabs(prev => { const next = new Set(prev); next.add(t); return next; });
    setActiveTab(t);
    setOverlayStack([]);
  };

  // Calculate Dynamic Theme based on Context (Overrides manual setting if specific conditions met, otherwise uses manual)
  const currentTheme = useMemo<SpecialTheme>(() => {
      // 1. If explicit manual theme is set (and not default), prioritize it unless a strong override exists?
      // Actually, user settings should generally take precedence unless it's a "Scope" override.
      
      const month = currentDate.getMonth();
      const day = currentDate.getDate();

      // Holiday Overrides (Optional feature, can be toggleable)
      if (month === 11 && day >= 20 && day <= 26) return 'Christmas';
      if (month === 0 && day === 1) return 'NewYear';
      
      // Scope-Based Overrides
      if (themeScope === 'National' && myCountry) {
          if (myCountry === 'China') return 'ChineseNewYear'; 
          if (myCountry === 'United Kingdom') return 'Royal';
          if (myCountry === 'Russia' || myCountry === 'Ukraine') return 'War';
      }
      
      // Fallback to the user's selected mode
      return themeMode;
  }, [currentDate, themeScope, myCountry, themeMode]);

  // Load Daily Data
  useEffect(() => {
    const loadDaily = async () => {
      setIsDailyLoading(true);
      try {
        const data = await fetchDailyContext(currentDate);
        setDailyData(data);
        setIsAiOnline(homeAiOnline);
      } catch (e) {
        console.error("Failed to load daily context", e);
        setIsAiOnline(false);
      } finally {
        setIsDailyLoading(false);
      }
    };
    loadDaily();
  }, [currentDate]);

  // Handlers
  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem(LS_AUTH, 'true');
    localStorage.setItem(LS_USER, JSON.stringify(userData));
    if (userData.preferences) {
        if (userData.preferences.themeMode) setThemeMode(userData.preferences.themeMode);
        if (userData.preferences.themeScope) setThemeScope(userData.preferences.themeScope);
        if (userData.preferences.language) setAppLang(userData.preferences.language);
    }
  };

  const handleUpdatePreferences = async (newPrefs: UserPreferences) => {
      if (user) {
          const updatedUser = { ...user, preferences: newPrefs };
          setUser(updatedUser);
          localStorage.setItem(LS_USER, JSON.stringify(updatedUser));
          await db.execute("UPDATE users", [updatedUser]);
      }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setHasLaunched(false);
    setShowIntro(true);
    localStorage.removeItem(LS_AUTH);
    localStorage.removeItem(LS_USER);
  };

  const handleNavigate = (type: string, payload: any) => {
    if (['Country', 'Person', 'Event', 'Ideology', 'Org', 'Party', 'Reader', 'Concept', 'Discipline', 'Generic'].includes(type)) {
        setOverlayStack(prev => [...prev, { type, payload, id: Date.now().toString() }]);
    } else if (type === 'Back') {
        setOverlayStack(prev => prev.slice(0, -1));
    } else if (type === 'Home') {
        setOverlayStack([]); 
        setActiveTab('home');
    } else if (type === 'Logout') {
        handleLogout();
    } else {
        if (['home','read','explore','messages','social','countries','sim','games','translate','comparative','theory','persons','learn','rates','profile', 'almanac', 'ailab'].includes(type.toLowerCase())) {
            setActiveTab(type.toLowerCase() as MainTab);
            setOverlayStack([]);
        }
    }
  };

  const handleAddToCompare = (compareItem: {name: string, type: string}) => {
    setActiveTab('comparative');
    setOverlayStack([]); 
    console.log("Add to compare:", compareItem);
  };

  const handleToggleSave = async (item: SavedItem) => {
    const exists = savedItems.find(i => i.id === item.id || (i.title === item.title && i.type === item.type));
    if (exists) {
        await db.deleteItem('saved_items', exists.id);
        setSavedItems(prev => prev.filter(i => i.id !== exists.id));
    } else {
        await db.saveItem('saved_items', item);
        setSavedItems(prev => [item, ...prev]);
    }
  };

  const handleDeleteSaved = async (id: string) => {
    await db.deleteItem('saved_items', id);
    setSavedItems(prev => prev.filter(i => i.id !== id));
  }

  const isSaved = (title: string, type: string) => {
    return savedItems.some(i => i.title === title && i.type === type);
  };

  const handleSetLanguage = (lang: string) => {
    setAppLang(lang);
  };

  const renderOverlay = () => {
      if (overlayStack.length === 0) return null;
      
      const top = overlayStack[overlayStack.length - 1];
      const closeHandler = () => handleNavigate('Back', null);

      const overlayClass = "fixed inset-0 z-[60] bg-academic-bg dark:bg-stone-950 flex flex-col animate-in slide-in-from-right duration-300";

      switch (top.type) {
          case 'Country': return (
              <div className={overlayClass}>
                  <CountryDetailScreen 
                    countryName={top.payload} 
                    onClose={closeHandler}
                    onNavigate={handleNavigate}
                    onAddToCompare={(n, t) => handleAddToCompare({name: n, type: t})}
                    isSaved={isSaved(top.payload, 'Country')}
                    onToggleSave={() => handleToggleSave({id: Date.now().toString(), type: 'Country', title: top.payload, subtitle: 'Country', dateAdded: new Date().toLocaleDateString()})}
                  />
              </div>
          );
          case 'Person': return (
              <div className={overlayClass}>
                  <PersonDetailScreen 
                    personName={top.payload} 
                    onClose={closeHandler}
                    onNavigate={handleNavigate}
                    isSaved={isSaved(top.payload, 'Person')}
                    onToggleSave={() => handleToggleSave({id: Date.now().toString(), type: 'Person', title: top.payload, subtitle: 'Person', dateAdded: new Date().toLocaleDateString()})}
                  />
              </div>
          );
          case 'Event': return (
              <div className={overlayClass}>
                  <EventDetailScreen 
                    eventName={top.payload} 
                    onClose={closeHandler}
                    onNavigate={handleNavigate}
                    isSaved={isSaved(top.payload, 'Event')}
                    onToggleSave={() => handleToggleSave({id: Date.now().toString(), type: 'Event', title: top.payload, subtitle: 'Event', dateAdded: new Date().toLocaleDateString()})}
                  />
              </div>
          );
          case 'Ideology': return (
              <div className={overlayClass}>
                  <IdeologyDetailScreen 
                    ideologyName={top.payload} 
                    onClose={closeHandler}
                    onNavigate={handleNavigate}
                    isSaved={isSaved(top.payload, 'Ideology')}
                    onToggleSave={() => handleToggleSave({id: Date.now().toString(), type: 'Ideology', title: top.payload, subtitle: 'Ideology', dateAdded: new Date().toLocaleDateString()})}
                  />
              </div>
          );
          case 'Org': return (
              <div className={overlayClass}>
                  <OrgDetailScreen 
                    orgName={top.payload} 
                    onClose={closeHandler}
                    onNavigate={handleNavigate}
                    onAddToCompare={(n, t) => handleAddToCompare({name: n, type: t})}
                    isSaved={isSaved(top.payload, 'Org')}
                    onToggleSave={() => handleToggleSave({id: Date.now().toString(), type: 'Org', title: top.payload, subtitle: 'Org', dateAdded: new Date().toLocaleDateString()})}
                  />
              </div>
          );
          case 'Party': return (
              <div className={overlayClass}>
                  <PartyDetailScreen 
                    partyName={top.payload.name || top.payload} 
                    country={top.payload.country || "Unknown"}
                    onClose={closeHandler}
                  />
              </div>
          );
          case 'Reader': return (
              <div className={overlayClass}>
                  <ReaderView 
                    title={top.payload.title || top.payload} 
                    author={top.payload.author || "Archive"} 
                    onClose={closeHandler}
                  />
              </div>
          );
          case 'Concept': return (
               <ConceptDetailModal 
                    term={top.payload.term || top.payload} 
                    context={top.payload.context || "General"} 
                    onClose={closeHandler} 
               />
          );
          case 'Discipline': return (
              <div className={overlayClass}>
                  <DisciplineDetailScreen 
                    disciplineName={top.payload}
                    onBack={closeHandler}
                    onNavigate={(d) => handleNavigate('Discipline', d)}
                  />
              </div>
          );
          case 'Generic': return (
              <div className={overlayClass}>
                  <GenericKnowledgeScreen
                    query={top.payload}
                    onClose={closeHandler}
                    onNavigate={handleNavigate}
                  />
              </div>
          );
          default: return null;
      }
  };

  if (!hasLaunched) return <LaunchScreen onComplete={() => { setHasLaunched(true); localStorage.setItem(LS_LAUNCHED, 'true'); }} />;
  if (!isAuthenticated) return <AuthScreen onLogin={handleLogin} onGuest={() => { setIsAuthenticated(true); localStorage.setItem(LS_AUTH, 'true'); }} />;
  if (showIntro) return <IntroScreen onContinue={() => { setShowIntro(false); localStorage.setItem(LS_INTRO, 'true'); }} />;

  const commonTabProps = { 
    onNavigate: handleNavigate,
    onAddToCompare: (name: string, type: string) => handleAddToCompare({name, type}),
    onToggleSave: (item: SavedItem) => handleToggleSave(item),
    isSaved: (title: string, type: string) => isSaved(title, type)
  };

  // Helper: render a tab only after it's been visited for the first time
  const lazyTab = (id: MainTab, node: React.ReactNode, name: string) =>
    mountedTabs.has(id) ? (
      <div key={id} style={{ display: activeTab === id ? 'block' : 'none', height: '100%' }}>
        <ErrorBoundary name={name}>{node}</ErrorBoundary>
      </div>
    ) : null;

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange} onNavigate={handleNavigate} themeMode={currentTheme}>
      {renderOverlay()}

      <div className="h-full w-full relative">
        {lazyTab('home',        <HomeTab data={dailyData} isLoading={isDailyLoading} aiOnline={isAiOnline} currentDate={currentDate} onDateChange={setCurrentDate} savedItems={savedItems} onDeleteSaved={handleDeleteSaved} initialSubTab="Today" {...commonTabProps} />, 'Home')}
        {lazyTab('explore',     <ExploreTab {...commonTabProps} />, 'Explore')}
        {lazyTab('countries',   <CountriesTab {...commonTabProps} />, 'Countries')}
        {lazyTab('ailab',       <AILabTab />, 'AI Lab')}
        {lazyTab('persons',     <PersonsTab {...commonTabProps} />, 'People')}
        {lazyTab('theory',      <TheoryTab {...commonTabProps} />, 'Theory')}
        {lazyTab('read',        <LibraryTab {...commonTabProps} />, 'Library')}
        {lazyTab('almanac',     <AlmanacTab onNavigate={handleNavigate} />, 'Almanac')}
        {lazyTab('comparative', <ComparativeTab {...commonTabProps} />, 'Compare')}
        {lazyTab('learn',       <LearnTab {...commonTabProps} />, 'Learn')}
        {lazyTab('games',       <GamesTab />, 'Games')}
        {lazyTab('sim',         <SimTab />, 'Simulator')}
        {lazyTab('rates',       <RatesTab />, 'Markets')}
        {lazyTab('social',      <SocialTab {...commonTabProps} />, 'Feed')}
        {lazyTab('messages',    <MessageTab onNavigate={handleNavigate} />, 'Chat')}
        {lazyTab('translate',   <TranslateTab />, 'Translate')}
        {mountedTabs.has('profile') && (
          <div style={{ display: activeTab === 'profile' ? 'block' : 'none', height: '100%' }}>
            <ErrorBoundary name="Profile">
              <ProfileTab
                  {...commonTabProps}
                  user={user}
                  appLang={appLang}
                  setAppLang={(lang) => {
                      setAppLang(lang);
                      if (user) handleUpdatePreferences({ ...user.preferences, language: lang } as UserPreferences);
                  }}
                  savedItems={savedItems}
                  onDeleteSaved={handleDeleteSaved}
                  updateThemeScope={(s, c) => {
                      setThemeScope(s);
                      if(c) setMyCountry(c);
                      const prefs = JSON.parse(localStorage.getItem(LS_PREFS) || '{}');
                      localStorage.setItem(LS_PREFS, JSON.stringify({ ...prefs, themeScope: s, myCountry: c || myCountry }));
                      if (user) handleUpdatePreferences({ ...user.preferences, themeScope: s } as UserPreferences);
                  }}
                  setGlobalTheme={(t) => {
                      setThemeMode(t);
                      const prefs = JSON.parse(localStorage.getItem(LS_PREFS) || '{}');
                      localStorage.setItem(LS_PREFS, JSON.stringify({ ...prefs, themeMode: t }));
                      if (user) handleUpdatePreferences({ ...user.preferences, themeMode: t } as UserPreferences);
                  }}
                  currentTheme={themeMode}
              />
            </ErrorBoundary>
          </div>
        )}
      </div>
      <PWAInstallButton />
    </Layout>
  );
}
