import fs from 'fs';
import { PERSONS_HIERARCHY } from './data/personsData.ts';

const delay = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    console.log("Starting second massive person generation...");
    
    // We already have some, let's just get the ones that failed before or are massive
    const categoriesToFetch = [
        { cat: "Category:19th-century_English_novelists", role: "Author", group: "Arts" },
        { cat: "Category:20th-century_American_novelists", role: "Author", group: "Arts" },
        { cat: "Category:French_painters", role: "Painter", group: "Arts" },
        { cat: "Category:Italian_Renaissance_painters", role: "Painter", group: "Arts" },
        { cat: "Category:Romantic_composers", role: "Composer", group: "Arts" },
        
        { cat: "Category:Presidents_of_the_United_States", role: "President", group: "Politicians", country: "USA" },
        { cat: "Category:Prime_Ministers_of_the_United_Kingdom", role: "PM", group: "Politicians", country: "UK" },
        { cat: "Category:Presidents_of_France", role: "President", group: "Politicians", country: "France" },
        
        { cat: "Category:Roman_emperors", role: "Emperor", group: "Leaders", country: "Rome" },
        { cat: "Category:Pharaohs_of_the_Eighteenth_Dynasty_of_Egypt", role: "Pharaoh", group: "Leaders", country: "Egypt" },
        
        // Let's add some more massive ones
        { cat: "Category:21st-century_American_politicians", role: "Politician", group: "Politicians", country: "USA" },
        { cat: "Category:Russian_emperors", role: "Emperor", group: "Leaders", country: "Russia" },
        { cat: "Category:Chinese_emperors", role: "Emperor", group: "Leaders", country: "China" },
        { cat: "Category:Popes", role: "Pope", group: "Leaders", country: "Vatican" }
    ];
    
    let allData = [];
    
    for (let c of categoriesToFetch) {
        let url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${c.cat}&cmlimit=500&format=json`;
        try {
            console.log("Fetching", c.cat);
            let res = await fetch(url).then(r => r.json());
            if (res && res.query && res.query.categorymembers) {
                for (let mem of res.query.categorymembers) {
                    if (mem.ns === 0 && !mem.title.includes("List of") && !mem.title.includes("Category:")) {
                        let name = mem.title.replace(/\(.*\)/, '').trim();
                        allData.push({
                            name: name,
                            role: c.role,
                            group: c.group,
                            country: c.country || "Unknown",
                            era: c.cat.includes("20th") ? "20th Century" : (c.cat.includes("21st") ? "21st Century" : "Historical")
                        });
                    }
                }
            }
        } catch(e) {
            console.log("Failed fetching", c.cat);
        }
        await delay(100); // Prevent rate limiting
    }
    
    console.log("Fetched totally:", allData.length);
    if (allData.length === 0) return;
    
    let hierarchy = PERSONS_HIERARCHY;
    
    // Inject Politicians
    let leadersFolder = hierarchy.find(x => x.name === "World Leaders (By Region)");
    if (!leadersFolder) { leadersFolder = { name: "World Leaders (By Region)", type: "Folder", items: [] }; hierarchy.push(leadersFolder); }
    
    let fetchedPol = allData.filter(x => x.group === "Politicians" || x.group === "Leaders");
    if (fetchedPol.length > 0) {
        // Find "Vast Historical Database" inside
        let vastPols = leadersFolder.items.find(x => x.name === "Vast Historical Database");
        if (!vastPols) {
            vastPols = { name: "Vast Historical Database", type: "Folder", items: [] };
            leadersFolder.items.push(vastPols);
        }
        for (let p of fetchedPol) {
            vastPols.items.push({ name: p.name, role: p.role, country: p.country, era: p.era, type: "Person" });
        }
    }
    
    // Inject Arts
    let extraFolder = hierarchy.find(x => x.name === "Arts, Sciences & Innovators Database");
    if (!extraFolder) { extraFolder = { name: "Arts, Sciences & Innovators Database", type: "Folder", items: [] }; hierarchy.push(extraFolder); }
    
    let fetchedArts = allData.filter(x => x.group === "Arts");
    if (fetchedArts.length > 0) {
        let artsFolder = extraFolder.items.find(x => x.name === "Arts & Culture");
        if (!artsFolder) { artsFolder = { name: "Arts & Culture", type: "Folder", items: [] }; extraFolder.items.push(artsFolder); }
        for (let p of fetchedArts) {
            artsFolder.items.push({ name: p.name, role: p.role, country: p.country, era: p.era, type: "Person" });
        }
    }
    
    console.log("Rewriting the file...");
    let codeStr = "import { PersonNode, PersonCategory } from '../types';\n\n";
    codeStr += "const createPerson = (name: string, role: string, country: string, era: string): PersonNode => ({ name, role, country, era, type: \"Person\" });\n";
    codeStr += "const createFolder = (name: string, items: PersonNode[]): PersonNode => ({ name, type: \"Folder\", items });\n";
    codeStr += "const createCountry = (name: string, currentLeaders: {n:string, r:string}[], history: {n:string, r:string, e:string}[] = []): PersonNode => ({ name, type: \"Folder\", country: name, items: [ { name: \"Current Leadership\", type: \"Folder\", items: currentLeaders.map(l => createPerson(l.n, l.r, name, \"Modern\")) }, { name: \"Historical Figures\", type: \"Folder\", items: history.map(h => createPerson(h.n, h.r, name, h.e)) } ] });\n\n";
    
    codeStr += "export const PERSONS_HIERARCHY: PersonNode[] = " + JSON.stringify(hierarchy, null, 4) + ";\n\n";
    codeStr += "export const PERSONS_DATA: PersonCategory[] = [];\n";
    
    fs.writeFileSync('data/personsData.ts', codeStr);
    console.log("Done!");
}

run();
