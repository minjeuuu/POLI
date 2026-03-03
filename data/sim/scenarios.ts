
export const SCENARIOS = [
    {
        id: "cold_war",
        name: "The Iron Curtain",
        description: "A bipolar world divided by ideology. Manage your bloc's stability while expanding influence.",
        difficulty: "Hard",
        startYear: 1947,
        initialStats: { stability: 60, wealth: 50, military: 80, liberty: 30 }
    },
    {
        id: "rome_fall",
        name: "Fall of Rome",
        description: "Barbarians at the gates. Internal corruption. Can you save the Empire?",
        difficulty: "Expert",
        startYear: 476,
        initialStats: { stability: 20, wealth: 40, military: 60, liberty: 40 }
    },
    {
        id: "2050",
        name: "Climate Crisis 2050",
        description: "Resource scarcity and mass migration. Survive the coming century.",
        difficulty: "Medium",
        startYear: 2050,
        initialStats: { stability: 50, wealth: 70, military: 40, liberty: 60 }
    }
];
