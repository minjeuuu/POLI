const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf-8');

const componentsToLazyLoad = [
    'ExploreTab', 'CountriesTab', 'TranslateTab', 'ComparativeTab', 
    'TheoryTab', 'PersonsTab', 'LearnTab', 'SimTab', 'GamesTab', 
    'RatesTab', 'ProfileTab', 'LibraryTab', 'AlmanacTab', 'HubTab',
    'CountryDetailScreen', 'PersonDetailScreen', 'EventDetailScreen',
    'IdeologyDetailScreen', 'OrgDetailScreen', 'PartyDetailScreen',
    'ReaderView', 'ConceptDetailModal', 'DisciplineDetailScreen',
    'GenericKnowledgeScreen'
];

componentsToLazyLoad.forEach(comp => {
    // Find import
    const importRegex = new RegExp(`import\\s+(?:{\\s*)?${comp}(?:\\s*})?\\s+from\\s+['"](.+)['"];?`, 'g');
    content = content.replace(importRegex, (match, path) => {
        return `const ${comp} = React.lazy(() => import('${path}'));`;
    });
});

// Update HubTab to a default export or handle it
content = content.replace(
    /const HubTab = React.lazy\(\(\) => import\('\.\/components\/tabs\/HubTab'\)\);/g, 
    `const HubTab = React.lazy(() => import('./components/tabs/HubTab').then(m => ({ default: m.HubTab })));`
);

// Add Suspense to Layout content wrapping the overlays and tabs
// Let's replace: <div className="h-full w-full relative">
content = content.replace(
    /<div className="h-full w-full relative">/,
    `<div className="h-full w-full relative"><React.Suspense fallback={<div className="flex-1 flex justify-center items-center h-full w-full"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>`
);

content = content.replace(
    /<\/Layout>/,
    `</React.Suspense></Layout>`
);

// Also need to wrap Overlay Stack:
content = content.replace(
    /\{renderOverlay\(\)\}/,
    `<React.Suspense fallback={<div className="fixed inset-0 z-[60] bg-academic-bg dark:bg-stone-950 flex justify-center items-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>\n        {renderOverlay()}\n      </React.Suspense>`
);


fs.writeFileSync('App.tsx', content);
