
import { GameScenario, GameState, GameEntity } from "../../types/gameTypes";
import { getAllGameEntities } from "./poliverseData";

const ENTITIES = getAllGameEntities();

export const generateScenario = (): GameScenario => {
    // Procedural Scenario Generation
    const templates = [
        { title: "The Post-Colonial Stabilization", context: "A newly independent nation seeks a stable government.", req: ['Country', 'Person', 'Ideology', 'System', 'Currency'] },
        { title: "The Ideological Reform", context: "An authoritarian regime is transitioning. Select a leader and system that bridges the gap.", req: ['Country', 'Person', 'Ideology', 'Theory'] },
        { title: "Economic Reconstruction", context: "Hyperinflation has destroyed the economy. Build a new financial and political order.", req: ['Country', 'Currency', 'System', 'Org'] },
        { title: "The Grand Coalition", context: "Forge a government uniting disparate political theories.", req: ['Person', 'Person', 'Ideology', 'System'] },
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    const targetCountry = ENTITIES.filter(e => e.type === 'Country')[Math.floor(Math.random() * 50)]; // Pick a random country from first 50

    return {
        id: `scen_${Date.now()}`,
        title: template.title,
        description: template.context,
        difficulty: 'Architect',
        targetIntegrity: 75,
        targetAlignment: 60,
        requiredTypes: template.req as any[],
        lockedEntities: targetCountry ? [targetCountry] : [],
        context: `Target Region: ${targetCountry?.name}`
    };
};

export const calculateMetrics = (slots: Record<string, GameEntity>): GameState['metrics'] & { feedback: string[] } => {
    let integrity = 100;
    let alignment = 100;
    let econ = 100;
    let social = 100;
    const feedback: string[] = [];
    const entities = Object.values(slots);

    if (entities.length < 2) return { structuralIntegrity: 0, ideologicalAlignment: 0, economicViability: 0, socialCohesion: 0, feedback: ["Insufficient data points."] };

    // Pairwise comparison
    for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
            const a = entities[i];
            const b = entities[j];

            // 1. Authority Clash
            const authDiff = Math.abs(a.stats.authority - b.stats.authority);
            if (authDiff > 60) {
                integrity -= 15;
                feedback.push(`Conflict: ${a.name} (Auth: ${a.stats.authority}) clashes with ${b.name} (Auth: ${b.stats.authority}).`);
            }

            // 2. Economic Clash
            const econDiff = Math.abs(a.stats.economy - b.stats.economy);
            if (econDiff > 60) {
                econ -= 20;
                feedback.push(`Economic Disparity: ${a.name} vs ${b.name}.`);
            }

            // 3. Tradition Clash
            const tradDiff = Math.abs(a.stats.tradition - b.stats.tradition);
            if (tradDiff > 70) {
                social -= 15;
                alignment -= 10;
                feedback.push(`Cultural Friction: ${a.name} is culturally incompatible with ${b.name}.`);
            }

            // 4. Type Specific Rules
            if (a.type === 'Person' && b.type === 'Country') {
                // If person era doesn't match country status roughly
                if (a.tags.includes('Ancient') && b.subtype === 'Republic') {
                    integrity -= 30;
                    feedback.push("Anachronism detected: Ancient leader in modern republic.");
                }
            }
        }
    }

    return {
        structuralIntegrity: Math.max(0, integrity),
        ideologicalAlignment: Math.max(0, alignment),
        economicViability: Math.max(0, econ),
        socialCohesion: Math.max(0, social),
        feedback
    };
};
