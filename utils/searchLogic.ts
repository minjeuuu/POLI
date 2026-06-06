
import { COUNTRIES_DATA } from '../data/countriesData';
import { PERSONS_HIERARCHY } from '../data/personsData';
import { THEORY_HIERARCHY } from '../data/theoryData';

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
             // Map theory data types to App navigation types
             const navType = item.type === 'Ideology' ? 'Ideology' : 'Concept';
             foundTheory = { name: item.name, type: navType };
        }
    });
    if (foundTheory) return { type: (foundTheory as any).type, payload: (foundTheory as any).name };

    // 4. Fallback
    return { type: 'Generic', payload: term };
};
