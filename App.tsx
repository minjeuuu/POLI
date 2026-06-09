
import React, { useState, useEffect, useMemo } from 'react';
import { MainTab, DailyContext, SavedItem, UserProfile, ThemeScope, SpecialTheme, UserPreferences, DEFAULT_STATS, DEFAULT_PREFS } from './types';
import { fetchDailyContext } from './services/homeService';
import { FALLBACK_DAILY_CONTEXT } from './data/homeData';
import { db } from './services/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebaseService';

// Screens & Tabs
import AuthScreen from './components/AuthScreen';
import LaunchScreen from './components/LaunchScreen';
import IntroScreen from './components/IntroScreen';
import Layout from './components/Layout';
import HomeTab from './components/tabs/HomeTab';
const ExploreTab = React.lazy(() => import('./components/tabs/ExploreTab'));
const CountriesTab = React.lazy(() => import('./components/tabs/CountriesTab'));
const TranslateTab = React.lazy(() => import('./components/tabs/TranslateTab'));
const ComparativeTab = React.lazy(() => import('./components/tabs/ComparativeTab'));
const TheoryTab = React.lazy(() => import('./components/tabs/TheoryTab'));
const PersonsTab = React.lazy(() => import('./components/tabs/PersonsTab'));
const LearnTab = React.lazy(() => import('./components/tabs/LearnTab'));
const SimTab = React.lazy(() => import('./components/tabs/SimTab'));
const GamesTab = React.lazy(() => import('./components/tabs/GamesTab'));
const RatesTab = React.lazy(() => import('./components/tabs/RatesTab'));
const ProfileTab = React.lazy(() => import('./components/tabs/ProfileTab'));
const LibraryTab = React.lazy(() => import('./components/tabs/LibraryTab'));
const AlmanacTab = React.lazy(() => import('./components/tabs/AlmanacTab'));
const HubTab = React.lazy(() => import('./components/tabs/HubTab').then(m => ({ default: m.HubTab })));

// Detail Screens
const CountryDetailScreen = React.lazy(() => import('./components/country/CountryDetailScreen'));
const PersonDetailScreen = React.lazy(() => import('./components/PersonDetailScreen'));
const EventDetailScreen = React.lazy(() => import('./components/EventDetailScreen'));
const IdeologyDetailScreen = React.lazy(() => import('./components/IdeologyDetailScreen'));
const OrgDetailScreen = React.lazy(() => import('./components/OrgDetailScreen'));
const PartyDetailScreen = React.lazy(() => import('./components/PartyDetailScreen'));
const ReaderView = React.lazy(() => import('./components/ReaderView'));
const ConceptDetailModal = React.lazy(() => import('./components/ConceptDetailModal'));
const DisciplineDetailScreen = React.lazy(() => import('./components/DisciplineDetailScreen'));
const GenericKnowledgeScreen = React.lazy(() => import('./components/GenericKnowledgeScreen'));
// Extra Detail Screens
const AgencyDetailScreen = React.lazy(() => import('./components/AgencyDetailScreen'));
const ElectionDetailScreen = React.lazy(() => import('./components/ElectionDetailScreen'));
const LegalCaseDetailScreen = React.lazy(() => import('./components/LegalCaseDetailScreen'));
const MovementDetailScreen = React.lazy(() => import('./components/MovementDetailScreen'));
const ReligionDetailScreen = React.lazy(() => import('./components/ReligionDetailScreen'));
const ScandalDetailScreen = React.lazy(() => import('./components/ScandalDetailScreen'));
const ThinkTankDetailScreen = React.lazy(() => import('./components/ThinkTankDetailScreen'));
const TreatyDetailScreen = React.lazy(() => import('./components/TreatyDetailScreen'));
const UniversityDetailScreen = React.lazy(() => import('./components/UniversityDetailScreen'));

type OverlayItem = { type: string; payload: any; id: string };

export default function App() {
  // Lifecycle State
  const [hasLaunched, setHasLaunched] = useState(sessionStorage.getItem('poli_launched') === 'true');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showIntro, setShowIntro] = useState(localStorage.getItem('poli_intro_done') !== 'true');
  
  // App State
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyData, setDailyData] = useState<DailyContext>(FALLBACK_DAILY_CONTEXT);
  const [isDailyLoading, setIsDailyLoading] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [appLang, setAppLang] = useState('English');
  const [user, setUser] = useState<UserProfile | null>(null);
  
  // THEME STATE (Source of Truth)
  const [themeMode, setThemeMode] = useState<SpecialTheme>('Default');
  const [themeScope, setThemeScope] = useState<ThemeScope>('None');
  const [myCountry, setMyCountry] = useState<string>('Global Citizen');
  
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

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            await db.init();
            const res = await db.execute(`SELECT * FROM users WHERE email = '${firebaseUser.email}'`);
            if (res.rows.length > 0) {
                handleLogin(res.rows[0]);
            } else {
                handleLogin({
                    id: firebaseUser.uid,
                    username: firebaseUser.displayName || 'Scholar',
                    email: firebaseUser.email,
                    level: 1,
                    xp: 0,
                    coins: 100,
                });
            }
        } else {
            const isGuest = localStorage.getItem('poli_guest');
            if (isGuest === 'true') {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }
    });
    return () => unsubscribe();
  }, []);

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
        const { fetchDailyContext } = await import('./services/homeService');
        const data = await fetchDailyContext(currentDate, myCountry);
        setDailyData(data);
      } catch (e) {
        console.error("Failed to load daily context", e);
      } finally {
        setIsDailyLoading(false);
      }
    };
    loadDaily();
  }, [currentDate, myCountry]);

  // Handlers
  const handleLogin = (userData: any) => {
    const finalUserData = { ...userData };
    finalUserData.stats = { ...DEFAULT_STATS, ...(finalUserData.stats || {}) };
    finalUserData.preferences = { ...DEFAULT_PREFS, ...(finalUserData.preferences || {}) };
    
    setUser(finalUserData);
    setIsAuthenticated(true);
    if (finalUserData.country) {
        setMyCountry(finalUserData.country);
    }
    if (finalUserData.preferences) {
        if (finalUserData.preferences.themeMode) setThemeMode(finalUserData.preferences.themeMode);
        if (finalUserData.preferences.themeScope) setThemeScope(finalUserData.preferences.themeScope);
        if (finalUserData.preferences.language) setAppLang(finalUserData.preferences.language);
    }
  };

  const handleUpdatePreferences = async (newPrefs: UserPreferences) => {
      if (user) {
          const updatedUser = { ...user, preferences: newPrefs };
          setUser(updatedUser);
          await db.execute("UPDATE users", [updatedUser]);
      }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('poli_guest');
    setUser(null);
    setIsAuthenticated(false);
    setHasLaunched(false);
    sessionStorage.removeItem('poli_launched');
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
        if (['home','read','explore','countries','sim','games','translate','comparative','theory','persons','learn','rates','profile', 'almanac'].includes(type.toLowerCase())) {
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
          case 'Agency': return (
              <div className={overlayClass}>
                  <AgencyDetailScreen agencyName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'Election': return (
              <div className={overlayClass}>
                  <ElectionDetailScreen electionName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'LegalCase': return (
              <div className={overlayClass}>
                  <LegalCaseDetailScreen caseName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'Movement': return (
              <div className={overlayClass}>
                  <MovementDetailScreen movementName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'Religion': return (
              <div className={overlayClass}>
                  <ReligionDetailScreen religionName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'Scandal': return (
              <div className={overlayClass}>
                  <ScandalDetailScreen scandalName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'ThinkTank': return (
              <div className={overlayClass}>
                  <ThinkTankDetailScreen entityName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'Treaty': return (
              <div className={overlayClass}>
                  <TreatyDetailScreen treatyName={top.payload} onClose={closeHandler} />
              </div>
          );
          case 'University': return (
              <div className={overlayClass}>
                  <UniversityDetailScreen entityName={top.payload} onClose={closeHandler} />
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

  if (!hasLaunched) return <LaunchScreen onComplete={() => { setHasLaunched(true); sessionStorage.setItem('poli_launched', 'true'); }} />;
  if (!isAuthenticated) return <AuthScreen onLogin={handleLogin} onGuest={() => { localStorage.setItem('poli_guest', 'true'); setIsAuthenticated(true); }} />;
  if (showIntro) return <IntroScreen onContinue={() => { setShowIntro(false); localStorage.setItem('poli_intro_done', 'true'); }} />;

  const commonTabProps = { 
    onNavigate: handleNavigate,
    onAddToCompare: (name: string, type: string) => handleAddToCompare({name, type}),
    onToggleSave: (item: SavedItem) => handleToggleSave(item),
    isSaved: (title: string, type: string) => isSaved(title, type)
  };

  return (
    <Layout activeTab={activeTab} onTabChange={(t) => { setActiveTab(t); setOverlayStack([]); }} onNavigate={handleNavigate} themeMode={currentTheme} userPrefs={user?.preferences}>
      <React.Suspense fallback={<div className="fixed inset-0 z-[60] bg-academic-bg dark:bg-stone-950 flex justify-center items-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        {renderOverlay()}
      </React.Suspense>

      <div className="h-full w-full relative"><React.Suspense fallback={<div className="flex-1 flex justify-center items-center h-full w-full"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        {activeTab === 'home' && (
            <HomeTab 
                data={dailyData} 
                isLoading={isDailyLoading} 
                currentDate={currentDate} 
                onDateChange={setCurrentDate} 
                savedItems={savedItems} 
                onDeleteSaved={handleDeleteSaved} 
                initialSubTab="Today" 
                myCountry={myCountry}
                {...commonTabProps} 
            />
        )}
        {activeTab === 'almanac' && (
            <AlmanacTab onNavigate={handleNavigate} />
        )}
        {activeTab === 'read' && (
            <LibraryTab {...commonTabProps} />
        )}
        {activeTab === 'explore' && (
            <ExploreTab {...commonTabProps} />
        )}
        {activeTab === 'countries' && (
            <CountriesTab {...commonTabProps} />
        )}
        {activeTab === 'sim' && (
            <SimTab />
        )}
        {activeTab === 'games' && (
            <GamesTab />
        )}
        {activeTab === 'translate' && (
            <TranslateTab />
        )}
        {activeTab === 'comparative' && (
            <ComparativeTab {...commonTabProps} />
        )}
        {activeTab === 'theory' && (
            <TheoryTab {...commonTabProps} />
        )}
        {activeTab === 'persons' && (
            <PersonsTab {...commonTabProps} />
        )}
        {activeTab === 'learn' && (
            <LearnTab {...commonTabProps} />
        )}
        {activeTab === 'rates' && (
            <RatesTab />
        )}
        {activeTab === 'profile' && (
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
                    if (user) handleUpdatePreferences({ ...user.preferences, themeScope: s } as UserPreferences);
                }}
                setGlobalTheme={(t) => {
                    setThemeMode(t);
                    if (user) handleUpdatePreferences({ ...user.preferences, themeMode: t } as UserPreferences);
                }}
                currentTheme={themeMode}
            />
        )}
        {activeTab === 'hub' && (
            <HubTab onNavigate={(t) => { setActiveTab(t); setOverlayStack([]); }} />
        )}
      </React.Suspense></div>
    </Layout>
  );
}
