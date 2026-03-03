
export interface Technology {
    id: string;
    name: string;
    description: string;
    cost: number;
    prereq?: string;
    effect: string; // Description of stat boost
}

export const TECH_TREE: Technology[] = [
    { id: 'agri1', name: 'Crop Rotation', description: 'Basic agricultural efficiency.', cost: 50, effect: '+5 Wealth/Turn' },
    { id: 'mil1', name: 'Standing Army', description: 'Professional soldiers.', cost: 100, effect: '+10 Military' },
    { id: 'civ1', name: 'Civil Service', description: 'Organized bureaucracy.', cost: 150, effect: '+5 Stability' },
    { id: 'ind1', name: 'Steam Power', description: 'Mechanized production.', cost: 300, prereq: 'agri1', effect: '+20 Wealth/Turn' },
    { id: 'mil2', name: 'Ballistics', description: 'Advanced weaponry.', cost: 400, prereq: 'mil1', effect: '+25 Military' },
    { id: 'dip1', name: 'Embassies', description: 'Formal diplomatic channels.', cost: 250, prereq: 'civ1', effect: 'Unlock Alliances' },
    { id: 'info1', name: 'Mass Media', description: 'Radio and print dissemination.', cost: 500, prereq: 'civ1', effect: '+10 Liberty, -5 Stability' },
    { id: 'nuc1', name: 'Atomic Theory', description: 'Splitting the atom.', cost: 2000, prereq: 'ind1', effect: 'Unlock Nuclear Option' },
];
