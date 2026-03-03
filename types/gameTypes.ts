
import { LucideIcon } from 'lucide-react';

export type EntityType = 'Country' | 'Person' | 'Ideology' | 'Theory' | 'System' | 'Currency' | 'Org';
export type GameEngineType = 'POLIVERSE' | 'QUIZ' | 'CRISIS' | 'MATCH' | 'SIM';

export interface GameEntity {
    id: string;
    name: string;
    type: EntityType;
    subtype?: string;
    description: string;
    // Normalized stats for gameplay logic (0-100)
    stats: {
        authority: number; // Lib -> Auth
        economy: number;   // Left -> Right
        tradition: number; // Prog -> Trad
    };
    tags: string[];
    icon?: string; // Icon name
    originalData?: any; // Reference to source object
}

export interface GameScenario {
    id: string;
    title: string;
    description: string;
    difficulty: 'Novice' | 'Architect' | 'Grandmaster';
    targetIntegrity: number; // 0-100
    targetAlignment: number; // 0-100
    requiredTypes: EntityType[]; // Slots that must be filled
    lockedEntities: GameEntity[]; // Pre-placed entities the user must build around
    context: string;
}

export interface GameState {
    scenario: GameScenario;
    placedEntities: Record<string, GameEntity>; // key is slot ID (e.g. 'core_country', 'leader')
    inventory: GameEntity[];
    metrics: {
        structuralIntegrity: number;
        ideologicalAlignment: number;
        economicViability: number;
        socialCohesion: number;
    };
    status: 'ACTIVE' | 'VICTORY' | 'COLLAPSE';
    feedback: string[];
}

export interface GameDefinition {
    id: string;
    title: string;
    description: string;
    category: 'Strategy' | 'Trivia' | 'Puzzle' | 'Simulation' | 'Roleplay';
    engine: GameEngineType;
    difficulty: number; // 1-5
    popularity: number; // For sorting
    tags: string[];
    config?: any; // Engine specific config (e.g. quiz topic)
}
