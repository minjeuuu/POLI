import fs from 'fs';
import { PERSONS_HIERARCHY } from './data/personsData.ts';
import { PersonNode } from './types.ts';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function run() {
    console.log("Starting deep de-duplication and robust categorization...");
    
    // 1. Flatten existing hierarchy to get all unique people
    const allUniquePersons = new Map<string, any>();
    
    function flatten(node: any, path: string[]) {
        if (!node) return;
        if (node.type === "Person") {
            if (!allUniquePersons.has(node.name)) {
                allUniquePersons.set(node.name, { ...node, originalPath: [...path] });
            } else {
                // Keep the better initialized one? Or just ignore dupes.
                // existing is kept.
            }
        }
        if (node.items && Array.isArray(node.items)) {
            for (const child of node.items) {
                flatten(child, [...path, node.name || '']);
            }
        }
    }
    
    // Initial flatten
    for (const rootNode of PERSONS_HIERARCHY) {
        flatten(rootNode, []);
    }
    
    console.log(`Initial flattened unique people: ${allUniquePersons.size}`);
    
    // 2. Fetch thousands more, nicely categorized
    const categoriesToFetch = [
        // Science & Tech
        { cat: "Category:Ancient_Greek_scientists", role: "Scientist", topGroup: "Science & Technology", folder: "Ancient Scientific Minds" },
        { cat: "Category:20th-century_physicists", role: "Physicist", topGroup: "Science & Technology", folder: "20th Century Physics Pioneer" },
        { cat: "Category:21st-century_physicists", role: "Physicist", topGroup: "Science & Technology", folder: "Modern Physics Pioneer" },
        { cat: "Category:19th-century_mathematicians", role: "Mathematician", topGroup: "Science & Technology", folder: "19th Century Mathematicians" },
        { cat: "Category:20th-century_mathematicians", role: "Mathematician", topGroup: "Science & Technology", folder: "20th Century Mathematicians" },
        { cat: "Category:20th-century_chemists", role: "Chemist", topGroup: "Science & Technology", folder: "Chemists and Biologists" },
        { cat: "Category:American_inventors", role: "Inventor", topGroup: "Science & Technology", folder: "Inventors & Visionaries" },
        { cat: "Category:Computer_pioneers", role: "Computer Scientist", topGroup: "Science & Technology", folder: "Computer Science & Tech" },
        
        // Philosophers
        { cat: "Category:Ancient_Greek_philosophers", role: "Philosopher", topGroup: "Philosophy & Theory", folder: "Ancient & Classical" },
        { cat: "Category:Roman_era_philosophers", role: "Philosopher", topGroup: "Philosophy & Theory", folder: "Ancient & Classical" },
        { cat: "Category:Enlightenment_philosophers", role: "Philosopher", topGroup: "Philosophy & Theory", folder: "Enlightenment Thinkers" },
        { cat: "Category:19th-century_philosophers", role: "Philosopher", topGroup: "Philosophy & Theory", folder: "19th Century Philosophy" },
        { cat: "Category:20th-century_philosophers", role: "Philosopher", topGroup: "Philosophy & Theory", folder: "Modern & Contemporary" },
        { cat: "Category:Political_theorists", role: "Political Theorist", topGroup: "Philosophy & Theory", folder: "Political Scientists" },
        
        // Authors & Arts
        { cat: "Category:Russian_novelists", role: "Author", topGroup: "Arts & Culture", folder: "Classic Novelists & Writers" },
        { cat: "Category:19th-century_English_novelists", role: "Author", topGroup: "Arts & Culture", folder: "Classic Novelists & Writers" },
        { cat: "Category:Nobel_laureates_in_Literature", role: "Author", topGroup: "Arts & Culture", folder: "Literary Laureates" },
        { cat: "Category:Classical_composers", role: "Composer", topGroup: "Arts & Culture", folder: "Master Composers" },
        { cat: "Category:Italian_Renaissance_painters", role: "Painter", topGroup: "Arts & Culture", folder: "Renaissance Art Collection" },
        { cat: "Category:Impressionist_painters", role: "Painter", topGroup: "Arts & Culture", folder: "Modern Art Pioneers" },
        
        // World Leaders
        { cat: "Category:Presidents_of_the_United_States", role: "President", topGroup: "World Leaders", folder: "United States (Presidents)" },
        { cat: "Category:Prime_Ministers_of_the_United_Kingdom", role: "Prime Minister", topGroup: "World Leaders", folder: "United Kingdom (Prime Ministers)" },
        { cat: "Category:Presidents_of_France", role: "President", topGroup: "World Leaders", folder: "France (Presidents)" },
        { cat: "Category:Chancellors_of_Germany", role: "Chancellor", topGroup: "World Leaders", folder: "Germany (Chancellors/Leaders)" },
        { cat: "Category:Prime_Ministers_of_Canada", role: "Prime Minister", topGroup: "World Leaders", folder: "Canada (Prime Ministers)" },
        { cat: "Category:Russian_emperors", role: "Emperor", topGroup: "World Leaders", folder: "Russia (Czars & Leaders)" },
        { cat: "Category:List_of_leaders_of_the_Soviet_Union", role: "Leader", topGroup: "World Leaders", folder: "Russia (Czars & Leaders)" },
        { cat: "Category:Roman_emperors", role: "Emperor", topGroup: "World Leaders", folder: "Ancient Mediterranean Leaders" },
        { cat: "Category:Pharaohs", role: "Pharaoh", topGroup: "World Leaders", folder: "African Sovereignty" },
        { cat: "Category:Emperors_of_the_Ming_dynasty", role: "Emperor", topGroup: "World Leaders", folder: "Asian Empires (Ming/Qing/Japan)" },
        { cat: "Category:Japanese_emperors", role: "Emperor", topGroup: "World Leaders", folder: "Asian Empires (Ming/Qing/Japan)" },
        { cat: "Category:Popes", role: "Pope", topGroup: "World Leaders", folder: "Religious & Spiritual Leaders" }
    ];
    
    for (let c of categoriesToFetch) {
        let url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${c.cat}&cmlimit=500&format=json`;
        try {
            console.log("Fetching", c.cat);
            let res = await fetch(url).then(r => r.json());
            if (res && res.query && res.query.categorymembers) {
                for (let mem of res.query.categorymembers) {
                    if (mem.ns === 0 && !mem.title.includes("List of") && !mem.title.includes("Category:") && !mem.title.includes("Index of")) {
                        let baseName = mem.title.replace(/\(.*\)/, '').trim();
                        
                        // We check if we already have them!
                        if (!allUniquePersons.has(baseName)) {
                            allUniquePersons.set(baseName, {
                                name: baseName,
                                role: c.role,
                                country: c.folder.split(" ")[0].replace(/[()]/g, '') || "Global", 
                                era: c.cat.includes("20th") ? "20th Century" : (c.cat.includes("19th") ? "19th Century" : "Historical"),
                                type: "Person",
                                // Temporary markers for building folders later
                                _topGroup: c.topGroup,
                                _folder: c.folder
                            });
                        }
                    }
                }
            }
        } catch(e) {
            console.log("Failed fetching", c.cat);
        }
        await delay(50);
    }
    
    console.log(`Total unique people after fetching more: ${allUniquePersons.size}`);
    
    // Now, we will rebuild the hierarchy from scratch to ensure perfection and NO duplicates.
    
    const newHierarchy = [
        { name: "World Leaders", type: "Folder", items: [] as any[] },
        { name: "Philosophy & Theory", type: "Folder", items: [] as any[] },
        { name: "Science & Technology", type: "Folder", items: [] as any[] },
        { name: "Arts & Culture", type: "Folder", items: [] as any[] },
        { name: "Economics & Social Progress", type: "Folder", items: [] as any[] },
        { name: "Fictional & Mythological", type: "Folder", items: [] as any[] },
        { name: "Other Notables", type: "Folder", items: [] as any[] },
    ];
    
    function getOrCreateFolder(topGroupName: string, subFolderName: string) {
        let topGroup = newHierarchy.find(g => g.name === topGroupName);
        if (!topGroup) {
            topGroup = { name: topGroupName, type: "Folder", items: [] };
            newHierarchy.push(topGroup);
        }
        
        let subFolder = topGroup.items.find((f:any) => f.name === subFolderName);
        if (!subFolder) {
            subFolder = { name: subFolderName, type: "Folder", items: [] };
            topGroup.items.push(subFolder);
        }
        return subFolder;
    }
    
    // Organize everyone
    for (const [name, personInfo] of allUniquePersons.entries()) {
        const pObj = {
            name: personInfo.name,
            role: personInfo.role || "Figure",
            country: personInfo.country || "Unknown",
            era: personInfo.era || "Modern",
            type: "Person"
        };
        
        // Derive correct placement
        let targetGroup = "Other Notables";
        let targetSubFolder = "Miscellaneous Archive";
        
        // Check temp markers from fetching
        if (personInfo._topGroup && personInfo._folder) {
            targetGroup = personInfo._topGroup;
            targetSubFolder = personInfo._folder;
        } else {
            // It came from the older hierarchy. Try to guess where it belongs or map from its old path
            let pathJoined = (personInfo.originalPath || []).join(" ").toLowerCase();
            
            if (pathJoined.includes("philosopher") || pathJoined.includes("political scientist") || pathJoined.includes("ancient & classical") || personInfo.role.toLowerCase().includes("philosopher")) {
                targetGroup = "Philosophy & Theory";
                targetSubFolder = pathJoined.includes("ancient") ? "Ancient & Classical" : "Modern & Contemporary";
            } else if (pathJoined.includes("art") || pathJoined.includes("fiction") || personInfo.role.toLowerCase().includes("author") || personInfo.role.toLowerCase().includes("artist")) {
                if (pathJoined.includes("fictional")) {
                    targetGroup = "Fictional & Mythological";
                    targetSubFolder = "Literary Figures";
                } else {
                    targetGroup = "Arts & Culture";
                    targetSubFolder = "Classic Writers & Artists";
                }
            } else if (pathJoined.includes("science") || personInfo.role.toLowerCase().includes("scientist") || personInfo.role.toLowerCase().includes("physicist")) {
                targetGroup = "Science & Technology";
                targetSubFolder = "Historical Sciences";
            } else if (pathJoined.includes("leader") || pathJoined.includes("president") || pathJoined.includes("pm") || pathJoined.includes("emperor")) {
                targetGroup = "World Leaders";
                targetSubFolder = "Global Statesmen";
            } else if (pathJoined.includes("econom")) {
                targetGroup = "Economics & Social Progress";
                targetSubFolder = "Economists";
            } else {
                targetGroup = "World Leaders";
                targetSubFolder = "Global Statesmen"; 
            }
            
            // Further refinement if it's a known country structure
            if (personInfo.country && !["Unknown", "Global"].includes(personInfo.country)) {
                if (targetGroup === "World Leaders") {
                    targetSubFolder = personInfo.country + " Leadership";
                }
            }
        }
        
        // Get folder and append
        const folder = getOrCreateFolder(targetGroup, targetSubFolder);
        folder.items.push(pObj);
    }
    
    // Output code
    let codeStr = "import { PersonNode, PersonCategory } from '../types';\n\n";
    codeStr += `// Generated dynamically with absolute deduplication.\n`;
    codeStr += `// Flattened to clean categories.\n\n`;
    codeStr += "export const PERSONS_HIERARCHY: PersonNode[] = " + JSON.stringify(newHierarchy, null, 4) + ";\n\n";
    codeStr += "export const PERSONS_DATA: PersonCategory[] = [];\n";
    
    fs.writeFileSync('data/personsData.ts', codeStr);
    console.log("Successfully rebuilt personsData.ts!");
}

run();
