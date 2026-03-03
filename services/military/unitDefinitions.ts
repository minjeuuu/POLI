
export interface MilitaryUnit {
    id: string;
    name: string;
    type: 'Infantry' | 'Armor' | 'Air' | 'Naval';
    attack: number;
    defense: number;
    cost: number;
    maintenance: number;
}

export const UNIT_TYPES: MilitaryUnit[] = [
    { id: 'u_inf', name: 'Standard Infantry', type: 'Infantry', attack: 2, defense: 3, cost: 10, maintenance: 1 },
    { id: 'u_tank', name: 'Main Battle Tank', type: 'Armor', attack: 8, defense: 6, cost: 50, maintenance: 5 },
    { id: 'u_jet', name: 'Strike Fighter', type: 'Air', attack: 12, defense: 2, cost: 100, maintenance: 10 },
    { id: 'u_ship', name: 'Destroyer', type: 'Naval', attack: 15, defense: 10, cost: 200, maintenance: 20 },
];
