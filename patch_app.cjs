const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'App.tsx');
let content = fs.readFileSync(appPath, 'utf-8');

// Imports to add
const imports = `
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
`;

if (!content.includes('AgencyDetailScreen')) {
    content = content.replace("const GenericKnowledgeScreen = React.lazy(() => import('./components/GenericKnowledgeScreen'));", 
        "const GenericKnowledgeScreen = React.lazy(() => import('./components/GenericKnowledgeScreen'));\n" + imports.trim());
}

// Map the Types from ExploreHierarchy back to App.tsx cases.
const cases = `
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
`;

if (!content.includes("case 'Agency': return")) {
    content = content.replace("case 'Generic': return", cases.trim() + "\n          case 'Generic': return");
}

fs.writeFileSync(appPath, content);
console.log('App.tsx updated to support all new screens!');
