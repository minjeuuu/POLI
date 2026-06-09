const fs = require('fs');
const path = require('path');

const filesToFix = [
    './services/country/countryMapService.ts',
    './services/country/countryNewsService.ts',
    './services/country/countryLegalService.ts',
    './services/country/countryHealthService.ts',
    './services/country/countryEducationService.ts',
    './services/orgService.ts',
    './services/partyService.ts',
    './services/eventService.ts',
    './services/personService.ts',
    './services/homeService.ts'
];

for (const file of filesToFix) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/responseMimeType:\s*"application\/json",?/g, '');
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
}

// Fix common.ts separately
let commonTs = fs.readFileSync('./services/common.ts', 'utf8');
commonTs = commonTs.replace(
    /config:\s*\{\s*\.\.\.params\.config,\s*responseMimeType:\s*"application\/json"\s*\}/g,
    'config: { ...params.config, ...(params.config?.tools ? {} : { responseMimeType: "application/json" }) }'
);
fs.writeFileSync('./services/common.ts', commonTs);
console.log('Fixed common.ts');
