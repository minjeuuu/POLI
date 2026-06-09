const fs = require('fs');
const path = require('path');

const geminiPath = path.join(__dirname, 'services/geminiService.ts');
let content = fs.readFileSync(geminiPath, 'utf-8');

const additions = [
  { func: 'fetchLegalCaseDetail', query: 'name + " landmark legal case courthouse historical clear photo"' },
  { func: 'fetchMovementDetail', query: 'name + " social political movement protest official logo clear photo"' },
  { func: 'fetchElectionDetail', query: 'name + " election campaign official clear photo"' },
  { func: 'fetchScandalDetail', query: 'name + " historical political scandal news clear photo"' },
  { func: 'fetchTreatyDetail', query: 'name + " treaty document signing ceremony historical clear photo"' },
  { func: 'fetchPartyDetail', query: 'name + " political party logo symbol flat transparent clear vector"' },
  { func: 'fetchIdeologyDetail', query: 'name + " ideology political concept symbol icon clear vector"' },
  { func: 'fetchPersonDetail', query: 'name + " historical figure portrait clear photo"' },
  { func: 'fetchOrganizationDetail', query: 'name + " organization official logo shield crest transparent vector"' },
];

additions.forEach(({ func, query }) => {
    // If the function already uses wikipediaImage or something, let's just make sure we set parsed.imageUrl
    // Some functions don't even have "let wikipediaImage".
    // We will find `const parsed: any = safeParse(` or `return safeParse(` and inject.
    
    // Check if we already inject it
    if (content.includes(`https://tse1.mm.bing.net/th?q=\${encodeURIComponent(${query})}`)) {
        return;
    }

    const startIdx = content.indexOf(`export const ${func} =`);
    if (startIdx === -1) return;
    const endIdx = content.indexOf(`export const`, startIdx + 1);
    const substr = endIdx !== -1 ? content.slice(startIdx, endIdx) : content.slice(startIdx);

    const safeParseMatch = substr.match(/return safeParse\(response\.text \|\| '\{\}', \{.*\}\)(as [A-Za-z]+)?;/);
    const safeParseMatch2 = substr.match(/return safeParse\(response\.text \|\| '\{\}', \[.*\]\)(as [A-Za-z]+)?;/);
    const safeParseMatch3 = substr.match(/const parsed: any = safeParse\(response\.text \|\| '\{\}', \{.*\}\);/);
    const safeParseMatch4 = substr.match(/return safeParse\(response\.text \|\| '\{\}'\)(as [A-Za-z]+)?;/);
    const safeParseMatch5 = substr.match(/const result = safeParse\(/);

    if (safeParseMatch || safeParseMatch2 || safeParseMatch4) {
        const match = safeParseMatch || safeParseMatch2 || safeParseMatch4;
        const replacement = `
            const parsed: any = ${match[0].replace('return ', '').replace(/ as [A-Za-z]+;$/, ';')}
            parsed.imageUrl = \`https://tse1.mm.bing.net/th?q=\${encodeURIComponent(${query})}&w=400&h=400&c=7&pid=Api\`;
            return parsed;
        `.trim();
        const newSubstr = substr.replace(match[0], replacement);
        content = content.replace(substr, newSubstr);
    } else if (safeParseMatch3) {
        // already has parsed, just add imageUrl if it doesn't have it
        if (!substr.includes('parsed.imageUrl =')) {
             const newSubstr = substr.replace(safeParseMatch3[0], safeParseMatch3[0] + `\n            parsed.imageUrl = \`https://tse1.mm.bing.net/th?q=\${encodeURIComponent(${query})}&w=400&h=400&c=7&pid=Api\`;`);
             content = content.replace(substr, newSubstr);
        } else {
             // replace existing parsed.imageUrl
             const imgMatch = substr.match(/parsed\.imageUrl = [^;]+;/);
             if (imgMatch) {
                  const newSubstr = substr.replace(imgMatch[0], `parsed.imageUrl = \`https://tse1.mm.bing.net/th?q=\${encodeURIComponent(${query})}&w=400&h=400&c=7&pid=Api\`;`);
                  content = content.replace(substr, newSubstr);
             }
        }
    } else if (safeParseMatch5) {
        const newSubstr = substr.replace('return result;', `result.imageUrl = \`https://tse1.mm.bing.net/th?q=\${encodeURIComponent(${query})}&w=400&h=400&c=7&pid=Api\`;\n            return result;`);
        content = content.replace(substr, newSubstr);
    }
});

fs.writeFileSync(geminiPath, content);
console.log('geminiService.ts updated to inject Bing imageUrls to all relevant fetchers.');
