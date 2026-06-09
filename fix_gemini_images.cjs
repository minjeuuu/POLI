const fs = require('fs');
const path = require('path');

const geminiPath = path.join(__dirname, 'services/geminiService.ts');
let content = fs.readFileSync(geminiPath, 'utf-8');

// We want to replace the whole let wikipediaImage = ""; try { ... } catch (err) { ... }
// with const imageUrl = ... based on the function name.
// Since each has slightly different query, let's do a regex replacement on the body of the function.

function replaceWikiFetch(funcName, bingQueryFunc) {
    const startIdx = content.indexOf(`export const ${funcName} =`);
    if (startIdx === -1) return;
    const endIdx = content.indexOf(`export const`, startIdx + 1);
    const substr = endIdx !== -1 ? content.slice(startIdx, endIdx) : content.slice(startIdx);
    
    // Find the wikipedia block
    const wikiRegex = /let wikipediaImage = "";[\s\S]*?catch \(err\) \{ console\.warn\('wiki image fetch failed'\); \}/;
    const match = substr.match(wikiRegex) || substr.match(/let wikiImage = "";[\s\S]*?catch \(e\) \{ console\.warn\("Wiki fetch failed"\); \}/);
    
    if (match) {
        const replacement = `const wikipediaImage = \`https://tse1.mm.bing.net/th?q=\${encodeURIComponent(${bingQueryFunc})}&w=400&h=400&c=7&pid=Api\`;`;
        const newSubstr = substr.replace(match[0], replacement);
        content = content.replace(substr, newSubstr);
    }
}

replaceWikiFetch('fetchUniversityDetail', 'name + " university logo shield crest vector"');
replaceWikiFetch('fetchThinkTankDetail', 'name + " think tank logo official clear vector"');
replaceWikiFetch('fetchReligionDetail', 'name + " religion primary symbol icon flat clear"');
replaceWikiFetch('fetchAgencyDetail', 'name + " intelligence agency seal logo crest vector"');
// Wait, PartyDetail doesn't have it? Let's check if it does
replaceWikiFetch('fetchPartyDetail', 'name + " political party logo symbol vector clear"');
replaceWikiFetch('fetchIdeologyDetail', 'name + " ideology political symbol clear vector"');

replaceWikiFetch('fetchPersonDetail', 'name + " historical figure portrait clear photo"');
replaceWikiFetch('fetchEventDetail', 'name + " historical event prominent clear photo"');
replaceWikiFetch('fetchRegionalDetail', 'region + " landscape map clear photo"');


fs.writeFileSync(geminiPath, content);
console.log('geminiService.ts updated to use direct Bing image queries for logos/symbols/clearest photos.');
