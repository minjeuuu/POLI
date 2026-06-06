
export type UnitCategory = 'Land' | 'Air' | 'Sea' | 'Cyber' | 'Space';

export interface SimUnit {
    id: string;
    name: string;
    category: UnitCategory;
    firepower: number;
    mobility: number;
    armor: number;
    cost: number;
    upkeep: number;
}

export const INFANTRY: SimUnit = { id: 'u_inf_01', name: 'Rifle Squad', category: 'Land', firepower: 10, mobility: 5, armor: 2, cost: 100, upkeep: 10 };
export const TANK: SimUnit = { id: 'u_arm_01', name: 'MBT', category: 'Land', firepower: 50, mobility: 20, armor: 40, cost: 1000, upkeep: 100 };
