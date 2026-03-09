
import { COUNTRIES_DATA } from '../data/countriesData';
import { PERSONS_HIERARCHY } from '../data/personsData';
import { THEORY_HIERARCHY } from '../data/theoryData';

/** Simple fuzzy match — checks if all characters of pattern appear in order in text */
const fuzzyMatch = (text: string, pattern: string): boolean => {
    const t = text.toLowerCase();
    const p = pattern.toLowerCase();
    let pi = 0;
    for (let ti = 0; ti < t.length && pi < p.length; ti++) {
        if (t[ti] === p[pi]) pi++;
    }
    return pi === p.length;
};

/** Score a match — lower is better. Exact match = 0, starts with = 1, contains = 2, fuzzy = 3 */
const matchScore = (text: string, term: string): number => {
    const t = text.toLowerCase();
    const p = term.toLowerCase();
    if (t === p) return 0;
    if (t.startsWith(p)) return 1;
    if (t.includes(p)) return 2;
    if (fuzzyMatch(t, p)) return 3;
    return 999;
};

export const resolveSearchQuery = (query: string): { type: string, payload: any } => {
    const term = query.trim();
    if (!term) return { type: 'Generic', payload: query };

    const lowerTerm = term.toLowerCase();

    // 1. Country Check — exact match first, then fuzzy
    const exactCountry = COUNTRIES_DATA.find(c => c.name.toLowerCase() === lowerTerm);
    if (exactCountry) return { type: 'Country', payload: exactCountry.name };

    // Fuzzy country match — find best match
    let bestCountry: { name: string, score: number } | null = null;
    COUNTRIES_DATA.forEach(c => {
        const score = matchScore(c.name, term);
        if (score < 999 && (!bestCountry || score < bestCountry.score)) {
            bestCountry = { name: c.name, score };
        }
    });
    if (bestCountry && (bestCountry as any).score <= 2) return { type: 'Country', payload: (bestCountry as any).name };

    // 2. Person Check (Recursive) — exact then fuzzy
    let foundPerson: string | null = null;
    let bestPerson: { name: string, score: number } | null = null;
    const traversePeople = (node: any) => {
        if (foundPerson) return;
        if (node.type === 'Person') {
            if (node.name.toLowerCase() === lowerTerm) {
                foundPerson = node.name;
                return;
            }
            const score = matchScore(node.name, term);
            if (score < 999 && (!bestPerson || score < bestPerson.score)) {
                bestPerson = { name: node.name, score };
            }
        }
        if (node.items) node.items.forEach(traversePeople);
    };
    PERSONS_HIERARCHY.forEach(traversePeople);
    if (foundPerson) return { type: 'Person', payload: foundPerson };
    if (bestPerson && (bestPerson as any).score <= 2) return { type: 'Person', payload: (bestPerson as any).name };

    // 3. Theory/Ideology Check — exact then fuzzy
    let foundTheory: { name: string, type: string } | null = null;
    let bestTheory: { name: string, type: string, score: number } | null = null;
    THEORY_HIERARCHY.forEach(cat => {
        if (foundTheory) return;
        cat.items.forEach(item => {
            if (foundTheory) return;
            if (item.name.toLowerCase() === lowerTerm) {
                const navType = item.type === 'Ideology' ? 'Ideology' : 'Concept';
                foundTheory = { name: item.name, type: navType };
                return;
            }
            const score = matchScore(item.name, term);
            if (score < 999 && (!bestTheory || score < bestTheory.score)) {
                const navType = item.type === 'Ideology' ? 'Ideology' : 'Concept';
                bestTheory = { name: item.name, type: navType, score };
            }
        });
    });
    if (foundTheory) return { type: (foundTheory as any).type, payload: (foundTheory as any).name };
    if (bestTheory && (bestTheory as any).score <= 2) return { type: (bestTheory as any).type, payload: (bestTheory as any).name };

    // 4. Fuzzy country match with lower threshold
    if (bestCountry) return { type: 'Country', payload: (bestCountry as any).name };

    // 5. Fallback — send to Generic knowledge screen (still detailed)
    return { type: 'Generic', payload: term };
};
