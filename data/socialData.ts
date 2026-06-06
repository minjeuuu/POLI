
import { SocialPost, SpotlightItem, Comment } from '../types';

const DISCIPLINES = ["Political Theory", "International Relations", "Comparative Politics", "Public Policy", "Political Economy"];
const REGIONS = ["Global", "Americas", "Europe", "Asia", "Africa", "Middle East"];

export const DAILY_SPOTLIGHTS: SpotlightItem[] = [
    { type: 'Country', name: 'Japan', desc: 'The East Asian giant balancing tradition with hyper-modernity.', meta: 'Constitutional Monarchy' },
    { type: 'Thinker', name: 'Hannah Arendt', desc: 'Philosopher of totalitarianism and the human condition.', meta: 'Political Theorist' },
    { type: 'Document', name: 'Magna Carta', desc: 'The foundational charter of liberties limiting royal power.', meta: '1215 • Legal' }
];

const REAL_VIDEO_IDS = [
    "dQw4w9WgXcQ", // Rick Roll (Classic)
    "xuCn8ux2gbs", // History of the entire world
    "E9f60r_3xHw", // IR Lecture
    "kBdfcR-8hEY", // Justice Lecture
    "fSQgCy_iIcc", // Marxism Explained
    "4-3rC_QO4sk", // Fukuyama Interview
    "8tYd9l1aZ4s", // Cold War Doc
    "hYreqqlZ5Ew", // Geopolitics of China
    "S4O5voOCqAQ", // Philosophy of Liberty
    "5u38k9xP5_E", // History of Rome
];

const TEMPLATES = [
    {
        type: 'Analysis',
        titles: ["The Crisis of Liberal Democracy", "Neo-Realism in the 21st Century", "The Future of the Nation-State"],
        content: "Recent geopolitical shifts suggest a return to great power competition, challenging the post-Cold War liberal order. Structural forces are realigning alliances.",
        full: `The contemporary geopolitical landscape is witnessing a profound transformation, characterized by the resurgence of great power competition and the erosion of the unipolar moment that defined the post-Cold War era. 

This analysis posits that we are transitioning into a multipolar system where state-centric realism offers the most potent explanatory framework. The rise of revisionist powers, particularly in the Indo-Pacific and Eastern Europe, challenges the normative foundations of international liberalism.

Key Dimensions:
1. Economic Decoupling: The weaponization of interdependence.
2. Military Modernization: The return of conventional deterrence.
3. Normative Divergence: The clash between authoritarian efficiency and democratic legitimacy.`,
    },
    {
        type: 'Video',
        titles: ["Political Theory Explained", "The History of the UN", "Cold War Deep Dive", "Cultural Impact of Politics", "The Music of Statecraft"],
        content: "A visual breakdown of complex strategic interactions between sovereign states.",
        full: "Watch this comprehensive lecture on the applications of game theory—Prisoner's Dilemma, Stag Hunt, and Chicken—in modern international diplomacy.",
        videoId: "dQw4w9WgXcQ" // Default fallback, overwritten in generator
    },
    {
        type: 'Reel',
        titles: ["3 Facts About Plato", "Machiavelli in 60 Seconds", "What is Soft Power?"],
        content: "Quick bite-sized political science concepts for the modern scholar.",
        full: "Vertical deep dive into essential concepts.",
        reelId: "shorts_id_mock" // Placeholder logic
    },
    {
        type: 'Poll',
        titles: ["Global Security", "Economic Policy", "Political Systems"],
        content: "Cast your vote on this pressing issue.",
        full: "",
        poll: {
            question: "Which theory best explains current global conflicts?",
            options: [
                { text: "Structural Realism", votes: 45 },
                { text: "Liberal Institutionalism", votes: 30 },
                { text: "Constructivism", votes: 25 }
            ],
            totalVotes: 100
        }
    },
    {
        type: 'Debate',
        titles: ["Liberty vs Security", "State vs Market", "Universalism vs Relativism"],
        content: "A dialectical exploration of opposing viewpoints.",
        full: "",
        debate: {
            sideA: { name: "Pro-Security", argument: "State stability is the prerequisite for all rights." },
            sideB: { name: "Pro-Liberty", argument: "Rights surrendered for security are rarely returned." }
        }
    }
];

const COMMENTS: Comment[] = [
    { id: 'c1', user: 'Scholar_01', text: 'This is a fascinating perspective on structural realism.', timestamp: '2h ago', likes: 12 },
    { id: 'c2', user: 'PolicyWonk', text: 'I would argue that constructivism offers a better explanation here.', timestamp: '1h ago', likes: 8 },
    { id: 'c3', user: 'HistoryBuff', text: 'Does this account for the 19th century precedents?', timestamp: '30m ago', likes: 5 }
];

export const generateFeed = (count: number): SocialPost[] => {
    return Array.from({ length: count }).map((_, i) => {
        const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        const disc = DISCIPLINES[Math.floor(Math.random() * DISCIPLINES.length)];
        const reg = REGIONS[Math.floor(Math.random() * REGIONS.length)];
        
        // Inject real video ID if it's a video/reel type
        let vidId = (template as any).videoId;
        if (template.type === 'Video' || template.type === 'Reel') {
            vidId = REAL_VIDEO_IDS[Math.floor(Math.random() * REAL_VIDEO_IDS.length)];
        }

        return {
            id: `post-${i}`,
            type: template.type as any,
            title: template.titles[Math.floor(Math.random() * template.titles.length)],
            author: { 
                name: `Scholar ${String.fromCharCode(65 + i)}`, 
                credential: "PhD, Political Science",
                avatar: "" 
            },
            timestamp: `${Math.floor(Math.random() * 12) + 1}h ago`,
            content: template.content,
            fullContent: template.full,
            discipline: disc,
            region: reg,
            citations: [
                { id: `cite-${i}-1`, source: "American Political Science Review", year: 2023, authorOrBody: "Smith et al." },
                { id: `cite-${i}-2`, source: "The Leviathan", year: 1651, authorOrBody: "Thomas Hobbes" }
            ],
            reactions: {
                valid: Math.floor(Math.random() * 500),
                disputed: Math.floor(Math.random() * 50),
                citationNeeded: Math.floor(Math.random() * 20),
                hearts: Math.floor(Math.random() * 1000)
            },
            comments: COMMENTS,
            tags: [
                { label: disc, type: 'Discipline' },
                { label: reg, type: 'Region' },
                { label: 'Sovereignty', type: 'Concept' }
            ],
            relatedEntities: [
                { name: "United Nations", type: "Org" },
                { name: "United States", type: "Country" }
            ],
            videoUrl: vidId,
            reelUrl: vidId, // Use same pool for demo
            poll: (template as any).poll,
            debate: (template as any).debate
        };
    });
};
