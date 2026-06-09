
import { COUNTRIES_DATA } from '../data/countriesData';
import { PERSONS_HIERARCHY } from '../data/personsData';
import { THEORY_HIERARCHY } from '../data/theoryData';
import { EXPLORE_HIERARCHY } from '../data/exploreData';

export const resolveSearchQuery = (query: string): { type: string, payload: any } => {
    const term = query.trim();
    if (!term) return { type: 'Generic', payload: query }; 

    const lowerTerm = term.toLowerCase();

    // 1. Country Check
    const country = COUNTRIES_DATA.find(c => c.name.toLowerCase() === lowerTerm);
    if (country) return { type: 'Country', payload: country.name };

    // 2. Person Check (Recursive)
    let foundPerson: string | null = null;
    const traversePeople = (node: any) => {
        if (foundPerson) return;
        if (node.type === 'Person' && node.name.toLowerCase() === lowerTerm) {
            foundPerson = node.name;
        }
        if (node.items) node.items.forEach(traversePeople);
    };
    PERSONS_HIERARCHY.forEach(traversePeople);
    if (foundPerson) return { type: 'Person', payload: foundPerson };

    // 3. Theory/Ideology Check
    let foundTheory: { name: string, type: string } | null = null;
    THEORY_HIERARCHY.forEach(cat => {
        if (foundTheory) return;
        const item = cat.items.find(i => i.name.toLowerCase() === lowerTerm);
        if (item) {
             const navType = item.type === 'Ideology' ? 'Ideology' : 'Concept';
             foundTheory = { name: item.name, type: navType };
        }
    });
    if (foundTheory) return { type: (foundTheory as any).type, payload: (foundTheory as any).name };

    // 4. Explore Hierarchy Check
    let foundExplore: { name: string, type: string } | null = null;
    Object.values(EXPLORE_HIERARCHY).flat().forEach(cat => {
        if (foundExplore) return;
        const item = cat.items.find((i: any) => i.name.toLowerCase() === lowerTerm);
        if (item) {
             foundExplore = { name: item.name, type: item.type };
        }
    });
    if (foundExplore) return { type: (foundExplore as any).type, payload: (foundExplore as any).name };

    // 5. Fallback
    return { type: 'Generic', payload: term };
};
