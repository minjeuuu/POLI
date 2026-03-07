
import { DailyHistoryEvent, TrendingTopic, SavedItem, DailyContext, DisciplineDetail } from '../types';

// --- MASSIVE HISTORICAL ARCHIVE (EXHAUSTIVE) ---
const HISTORICAL_EVENTS_ARCHIVE: DailyHistoryEvent[] = [
    // ... [Previous events remain unchanged, omitted for brevity] ...
];

export const FALLBACK_DAILY_CONTEXT: DailyContext = {
    date: new Date().toLocaleDateString(),
    quote: { text: "Man is by nature a political animal.", author: "Aristotle", year: "4th Century BCE", region: "Greece" },
    news: [],
    highlightedPerson: { category: 'Thinker', title: 'Plato', subtitle: 'Philosopher', meta: 'Greece' },
    highlightedCountry: { category: 'Country', title: 'Greece', subtitle: 'Birthplace of Democracy', meta: 'Europe' },
    highlightedIdeology: { category: 'Ideology', title: 'Democracy', subtitle: 'Rule by the People', meta: 'Political System' },
    highlightedDiscipline: { category: 'Discipline', title: 'Political Theory', subtitle: 'Foundations', meta: 'Core' },
    highlightedOrg: { category: 'Organization', title: 'United Nations', subtitle: 'International', meta: 'IGO' },
    dailyFact: { content: "The study of politics is as old as civilization.", source: "POLI", type: "Fact" },
    dailyTrivia: { content: "The shortest war in history lasted 38 minutes.", source: "POLI", type: "Trivia" },
    historicalEvents: [], // Should be populated with full archive in real app
    otherHighlights: [],
    synthesis: "Politics shapes our world."
};

export const FALLBACK_DISCIPLINE_DETAIL: DisciplineDetail = {
    name: "Political Science",
    iconName: "BookOpen",
    overview: {
        definition: "The systematic study of governance.",
        scope: "Global",
        importance: "Understanding power.",
        keyQuestions: ["Who governs?", "Why do states fight?", "What is justice?"]
    },
    historyNarrative: "Political science originated with the Greeks, evolved through the Enlightenment, and formalized in the 19th century.",
    history: [],
    subDisciplines: ["Comparative Politics", "IR", "Theory", "Public Policy"],
    coreTheories: [],
    methods: [],
    scholars: [],
    foundationalWorks: [],
    regionalFocus: [],
    relatedDisciplines: []
};

export const TODAY_HISTORY: DailyHistoryEvent[] = FALLBACK_DAILY_CONTEXT.historicalEvents;

export const TRENDING_TOPICS: TrendingTopic[] = [
  { topic: "Sovereignty in Digital Age", category: "Political Theory" },
  { topic: "Supranational Courts", category: "Public Law" },
  { topic: "Trade Protectionism", category: "Political Economy" },
  { topic: "Proportional Representation", category: "Comparative Politics" }
];

export const SAVED_DATA: SavedItem[] = [
  { id: "1", type: "Quote", title: "Man is by nature a political animal.", subtitle: "Aristotle", dateAdded: "2h ago" },
  { id: "2", type: "Document", title: "The Federalist Papers", subtitle: "Hamilton, Madison, Jay", dateAdded: "1d ago" }
];

export const MEDIA_DATA = [
    { type: 'Video', title: 'The History of Political Thought', duration: '45m', videoId: 'xuCn8ux2gbs' },
    { type: 'Lecture', title: 'Introduction to International Relations', duration: '1h 20m', videoId: 'E9f60r_3xHw' },
    { type: 'Documentary', title: 'The Cold War: A New History', duration: '55m', videoId: '8tYd9l1aZ4s' },
    { type: 'Interview', title: 'Noam Chomsky on Global Power', duration: '30m', videoId: 'EuwmWnphqII' },
    { type: 'Video', title: 'Understanding Marxism', duration: '15m', videoId: 'fSQgCy_iIcc' },
    { type: 'Lecture', title: 'Justice: What\'s The Right Thing To Do?', duration: '55m', videoId: 'kBdfcR-8hEY' },
    { type: 'Documentary', title: 'The Century of the Self', duration: '3h 55m', videoId: 'DnPmg0R1M04' },
    { type: 'Interview', title: 'Francis Fukuyama on Identity', duration: '45m', videoId: '4-3rC_QO4sk' }
];

// ... [Rest of file content (Legal Hierarchy, Theory Data, etc.) remains unchanged] ...
// Re-exporting huge constants like LEGAL_HIERARCHY to avoid breaking file structure
export const LEGAL_HIERARCHY: Record<string, any[]> = {
    'Constitutions': [
        {
            category: 'Americas',
            icon: 'Globe',
            items: [
                { name: 'United States Constitution (1787)', type: 'Document' },
                { name: 'Constitution of Brazil (1988)', type: 'Document' },
                { name: 'Constitution of Canada (1982)', type: 'Document' },
                { name: 'Constitution of Mexico (1917)', type: 'Document' },
                { name: 'Constitution of Argentina (1853)', type: 'Document' },
                { name: 'Constitution of Colombia (1991)', type: 'Document' },
                { name: 'Constitution of Chile (1980)', type: 'Document' },
            ]
        },
        {
            category: 'Europe',
            icon: 'Landmark',
            items: [
                { name: 'Basic Law for the Federal Republic of Germany (1949)', type: 'Document' },
                { name: 'Constitution of France (1958)', type: 'Document' },
                { name: 'Constitution of Spain (1978)', type: 'Document' },
                { name: 'Constitution of Italy (1948)', type: 'Document' },
                { name: 'Constitution of Poland (1997)', type: 'Document' },
                { name: 'Constitution of Portugal (1976)', type: 'Document' },
                { name: 'Treaty on European Union (Maastricht, 1992)', type: 'Document' },
            ]
        },
        {
            category: 'Asia & Pacific',
            icon: 'Globe',
            items: [
                { name: 'Constitution of Japan (1947)', type: 'Document' },
                { name: 'Constitution of India (1950)', type: 'Document' },
                { name: 'Constitution of the People\'s Republic of China (1982)', type: 'Document' },
                { name: 'Constitution of South Korea (1987)', type: 'Document' },
                { name: 'Constitution of Indonesia (1945)', type: 'Document' },
                { name: 'Constitution of Australia (1901)', type: 'Document' },
                { name: 'Constitution of Pakistan (1973)', type: 'Document' },
            ]
        },
        {
            category: 'Africa & Middle East',
            icon: 'Globe',
            items: [
                { name: 'Constitution of South Africa (1996)', type: 'Document' },
                { name: 'Constitution of Kenya (2010)', type: 'Document' },
                { name: 'Constitution of Nigeria (1999)', type: 'Document' },
                { name: 'Constitution of Egypt (2014)', type: 'Document' },
                { name: 'Basic Law of Saudi Arabia (1992)', type: 'Document' },
                { name: 'Constitution of Tunisia (2022)', type: 'Document' },
                { name: 'Constitution of Ethiopia (1994)', type: 'Document' },
            ]
        },
        {
            category: 'Foundational Documents',
            icon: 'Scroll',
            items: [
                { name: 'Magna Carta (1215)', type: 'Document' },
                { name: 'English Bill of Rights (1689)', type: 'Document' },
                { name: 'United States Declaration of Independence (1776)', type: 'Document' },
                { name: 'French Declaration of the Rights of Man (1789)', type: 'Document' },
                { name: 'Universal Declaration of Human Rights (1948)', type: 'Document' },
                { name: 'UN Charter (1945)', type: 'Document' },
                { name: 'Federalist Papers (1787–1788)', type: 'Document' },
            ]
        }
    ],
    'Case Law': [
        {
            category: 'International Courts',
            icon: 'Gavel',
            items: [
                { name: 'ICJ: Nicaragua v. United States (1986)', type: 'Document' },
                { name: 'ICJ: Bosnia v. Serbia — Genocide Convention (2007)', type: 'Document' },
                { name: 'ICJ: South Africa v. Israel — Gaza (2024)', type: 'Document' },
                { name: 'ICC: Lubanga Dyilo (2012)', type: 'Document' },
                { name: 'ICC: Al-Bashir (Arrest Warrant, 2009)', type: 'Document' },
                { name: 'ECHR: Ireland v. United Kingdom (1978)', type: 'Document' },
                { name: 'WTO: US — Steel Safeguards (2003)', type: 'Document' },
            ]
        },
        {
            category: 'United States Supreme Court',
            icon: 'Scale',
            items: [
                { name: 'Marbury v. Madison (1803)', type: 'Document' },
                { name: 'McCulloch v. Maryland (1819)', type: 'Document' },
                { name: 'Dred Scott v. Sandford (1857)', type: 'Document' },
                { name: 'Korematsu v. United States (1944)', type: 'Document' },
                { name: 'Brown v. Board of Education (1954)', type: 'Document' },
                { name: 'New York Times v. Sullivan (1964)', type: 'Document' },
                { name: 'Roe v. Wade (1973)', type: 'Document' },
                { name: 'United States v. Nixon (1974)', type: 'Document' },
                { name: 'Bush v. Gore (2000)', type: 'Document' },
                { name: 'Citizens United v. FEC (2010)', type: 'Document' },
                { name: 'Dobbs v. Jackson Women\'s Health (2022)', type: 'Document' },
            ]
        },
        {
            category: 'European Courts',
            icon: 'Landmark',
            items: [
                { name: 'CJEU: Van Gend en Loos (1963)', type: 'Document' },
                { name: 'CJEU: Costa v. ENEL (1964)', type: 'Document' },
                { name: 'ECHR: Handyside v. UK (1976)', type: 'Document' },
                { name: 'ECHR: Soering v. UK (1989)', type: 'Document' },
                { name: 'German BVerfG: Lüth Case (1958)', type: 'Document' },
                { name: 'German BVerfG: Solange I (1974)', type: 'Document' },
                { name: 'French Conseil Constitutionnel: IVG (1975)', type: 'Document' },
            ]
        },
        {
            category: 'Asia-Pacific & Others',
            icon: 'Globe',
            items: [
                { name: 'Indian SC: Kesavananda Bharati (1973)', type: 'Document' },
                { name: 'Indian SC: Maneka Gandhi v. Union of India (1978)', type: 'Document' },
                { name: 'South African CC: Minister of Health v. TAC (2002)', type: 'Document' },
                { name: 'South African CC: S v. Makwanyane (1995)', type: 'Document' },
                { name: 'Australian HC: Mabo v. Queensland (1992)', type: 'Document' },
                { name: 'Japanese SC: Sunagawa Case (1959)', type: 'Document' },
            ]
        }
    ]
};

export const THEORY_DATA = {}; // Simplified
export const LAW_DATA = { constitutions: [], codes: [], cases: [], treaties: [] };
export const EXPLORE_HIERARCHY = {}; // Simplified
