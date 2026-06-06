
import { GameDefinition } from "../../types/gameTypes";

const ADJECTIVES = ["Grand", "Supreme", "Global", "Iron", "Silent", "Velvet", "Cyber", "Nuclear", "Democratic", "Royal", "Hidden", "Shadow", "Infinite", "Cold", "Eternal", "Broken", "United", "Sovereign", "Diplomatic", "Tactical"];
const NOUNS = ["Republic", "Empire", "Crisis", "Protocol", "Treaty", "War", "Peace", "Agenda", "Election", "Campaign", "Dynasty", "Federation", "Alliance", "Order", "Chaos", "Revolution", "Constitution", "Economy", "Market", "State"];
const TOPICS = [
    "Cold War", "Roman Empire", "WWII", "Modern US", "European Union", "Ancient China", "Feudal Japan", 
    "Space Race", "Climate Change", "Cyber Warfare", "Industrial Revolution", "French Revolution",
    "Post-Apocalypse", "Mars Colonization", "Medieval Trade", "Napoleonic Wars", "Decolonization",
    "Arab Spring", "Brexit", "Global Finance"
];

const generateGames = (count: number): GameDefinition[] => {
    const games: GameDefinition[] = [];

    // 1. Manually Curated "Featured" Games
    games.push({
        id: 'poliverse_core',
        title: 'POLIverse: Power Structures',
        description: 'The ultimate structural governance builder. Assemble cabinets and ideologies.',
        category: 'Strategy',
        engine: 'POLIVERSE',
        difficulty: 4,
        popularity: 99,
        tags: ['Builder', 'Sandbox']
    });

    games.push({
        id: 'crisis_2024',
        title: '2024: Global Flashpoint',
        description: 'Manage a superpower on the brink of nuclear escalation.',
        category: 'Simulation',
        engine: 'CRISIS',
        difficulty: 3,
        popularity: 95,
        tags: ['War', 'Choices']
    });

    games.push({
        id: 'quiz_master',
        title: 'Grand Archivist Trivia',
        description: 'Test your knowledge against the entire historical database.',
        category: 'Trivia',
        engine: 'QUIZ',
        difficulty: 5,
        popularity: 90,
        tags: ['History', 'Hard']
    });

    // 2. Procedural Generation
    for (let i = 0; i < count; i++) {
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
        const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
        
        const engineRoll = Math.random();
        let engine: any = 'QUIZ';
        let category: any = 'Trivia';
        let title = "";

        if (engineRoll < 0.4) {
            engine = 'QUIZ';
            category = 'Trivia';
            title = `${topic} Trivia Challenge`;
        } else if (engineRoll < 0.7) {
            engine = 'MATCH';
            category = 'Puzzle';
            title = `${adj} ${noun}: Terminology`;
        } else if (engineRoll < 0.9) {
            engine = 'CRISIS';
            category = 'Roleplay';
            title = `The ${topic} ${noun}`;
        } else {
            engine = 'SIM';
            category = 'Simulation';
            title = `${adj} ${topic} Tycoon`;
        }

        games.push({
            id: `proc_game_${i}`,
            title: title,
            description: `A ${category.toLowerCase()} game focused on ${topic.toLowerCase()}. Master the mechanics of ${noun.toLowerCase()}.`,
            category: category,
            engine: engine,
            difficulty: Math.floor(Math.random() * 5) + 1,
            popularity: Math.floor(Math.random() * 80) + 10,
            tags: [topic, category],
            config: { topic: topic }
        });
    }

    return games;
};

export const GAME_LIBRARY = generateGames(520);
