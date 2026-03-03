
import { GameEntity, EntityType } from '../../types/gameTypes';
import { COUNTRIES_DATA } from '../../data/countriesData';
import { PERSONS_HIERARCHY } from '../../data/personsData';
import { THEORY_HIERARCHY } from '../../data/theoryData';
import { CURRENCY_DATA } from '../../data/currencyData';
import { EXPLORE_HIERARCHY } from '../../data/exploreData';

// Helper to flatten recursive person nodes
const flattenPersons = (nodes: any[]): any[] => {
    let persons: any[] = [];
    nodes.forEach(node => {
        if (node.type === 'Person') persons.push(node);
        if (node.items) persons = persons.concat(flattenPersons(node.items));
    });
    return persons;
};

// Heuristic to assign stats based on keywords
const calculateStats = (text: string, type: string) => {
    const t = text.toLowerCase();
    let auth = 50, econ = 50, trad = 50;

    // Authority
    if (t.includes('dictator') || t.includes('empire') || t.includes('absolute') || t.includes('fascism')) auth += 40;
    if (t.includes('monarchy') || t.includes('king') || t.includes('authority')) auth += 20;
    if (t.includes('democracy') || t.includes('republic') || t.includes('parliament')) auth -= 20;
    if (t.includes('anarchy') || t.includes('libertarian') || t.includes('freedom')) auth -= 40;

    // Economy
    if (t.includes('capitalism') || t.includes('market') || t.includes('trade') || t.includes('laissez')) econ += 40;
    if (t.includes('conservative') || t.includes('fiscal')) econ += 20;
    if (t.includes('socialist') || t.includes('welfare') || t.includes('labor')) econ -= 20;
    if (t.includes('communism') || t.includes('marxism') || t.includes('planned')) econ -= 40;

    // Tradition
    if (t.includes('religious') || t.includes('ancient') || t.includes('traditional') || t.includes('conservative')) trad += 30;
    if (t.includes('progressive') || t.includes('radical') || t.includes('modern') || t.includes('revolution')) trad -= 30;

    return { 
        authority: Math.max(0, Math.min(100, auth)), 
        economy: Math.max(0, Math.min(100, econ)), 
        tradition: Math.max(0, Math.min(100, trad)) 
    };
};

export const getAllGameEntities = (): GameEntity[] => {
    const entities: GameEntity[] = [];

    // 1. COUNTRIES
    COUNTRIES_DATA.forEach((c, i) => {
        entities.push({
            id: `country_${i}`,
            name: c.name,
            type: 'Country',
            subtype: c.status,
            description: `${c.region} - ${c.status}`,
            stats: calculateStats(c.status + " " + c.region, 'Country'),
            tags: [c.region, c.status],
            originalData: c
        });
    });

    // 2. PERSONS
    const allPersons = flattenPersons(PERSONS_HIERARCHY);
    allPersons.forEach((p, i) => {
        entities.push({
            id: `person_${i}`,
            name: p.name,
            type: 'Person',
            subtype: p.role,
            description: `${p.role} from ${p.country} (${p.era})`,
            stats: calculateStats(p.role + " " + p.era, 'Person'),
            tags: [p.country || 'Global', p.era || 'Modern'],
            originalData: p
        });
    });

    // 3. THEORIES & IDEOLOGIES
    THEORY_HIERARCHY.forEach(cat => {
        cat.items.forEach((item, i) => {
            entities.push({
                id: `theory_${item.name.replace(/\s/g, '')}`,
                name: item.name,
                type: item.type === 'Ideology' ? 'Ideology' : 'Theory',
                subtype: item.type,
                description: item.description || item.type,
                stats: calculateStats(item.name, 'Theory'),
                tags: [item.origin || 'Global'],
                originalData: item
            });
        });
    });

    // 4. CURRENCIES
    CURRENCY_DATA.forEach((c, i) => {
        if (i < 50) { // Limit for performance, mostly major ones
            entities.push({
                id: `currency_${c.currencyCode}_${c.category}`,
                name: c.currencyName,
                type: 'Currency',
                subtype: c.category,
                description: `${c.category} Currency (${c.currencyCode})`,
                stats: calculateStats(c.category, 'Currency'),
                tags: [c.category],
                originalData: c
            });
        }
    });

    // 5. SYSTEMS (From Explore Data)
    const systems = EXPLORE_HIERARCHY['Political Systems'] || [];
    systems.forEach(cat => {
        cat.items.forEach((sys, i) => {
            entities.push({
                id: `system_${sys.name.replace(/\s/g, '')}`,
                name: sys.name,
                type: 'System',
                subtype: 'Governance',
                description: sys.name,
                stats: calculateStats(sys.name, 'System'),
                tags: ['Governance'],
                originalData: sys
            });
        });
    });

    // 6. ORGANIZATIONS
    const orgs = EXPLORE_HIERARCHY['Int. Orgs'] || [];
    orgs.forEach(cat => {
        cat.items.forEach((org, i) => {
            entities.push({
                id: `org_${org.name.replace(/\s/g, '')}`,
                name: org.name,
                type: 'Org',
                subtype: 'International',
                description: org.name,
                stats: calculateStats(org.name, 'Org'),
                tags: ['International'],
                originalData: org
            });
        });
    });

    return entities;
};
