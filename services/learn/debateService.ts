
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export interface DebateTurn {
    speaker: 'User' | 'Opponent';
    text: string;
    timestamp: string;
}

export interface DebateEvaluation {
    score: number;
    feedback: string;
    winner?: 'User' | 'Opponent' | 'Draw';
}

export const generateDebateOpening = async (topic: string): Promise<string> => {
    const prompt = `
    ACT AS: An academic opponent in a formal debate.
    TOPIC: ${topic}
    STANCE: You disagree with the user or take a nuanced counter-position.
    TASK: Provide a short, provocative opening statement (max 2 sentences) to start the debate.
    TONE: Intellectual, slightly combative but respectful.
    ${getLanguageInstruction()}
    `;

    try {
        const res = await generateWithFallback({ contents: prompt });
        return res.text || "I am ready to debate this topic.";
    } catch (e) {
        return "Let us discuss this topic. What is your position?";
    }
};

export const generateRebuttal = async (topic: string, history: DebateTurn[]): Promise<string> => {
    const context = history.map(h => `${h.speaker}: ${h.text}`).join('\n');
    const prompt = `
    ACT AS: An academic opponent.
    TOPIC: ${topic}
    CONTEXT:
    ${context}
    
    TASK: Provide a sharp, logical rebuttal to the User's last point. 
    Keep it under 50 words. Focus on logical fallacies or evidence gaps.
    ${getLanguageInstruction()}
    `;

    try {
        const res = await generateWithFallback({ contents: prompt });
        return res.text || "That is an interesting point, but consider the alternative.";
    } catch (e) {
        return "I see your point, but I disagree.";
    }
};

export const evaluateDebate = async (topic: string, history: DebateTurn[]): Promise<DebateEvaluation> => {
    const context = history.map(h => `${h.speaker}: ${h.text}`).join('\n');
    const prompt = `
    ACT AS: A Debate Judge.
    TOPIC: ${topic}
    TRANSCRIPT:
    ${context}
    
    TASK: Evaluate the User's performance.
    1. Score (0-100) based on logic, rhetoric, and evidence.
    2. Feedback (1 sentence).
    3. Winner (User or Opponent).
    
    JSON: { "score": number, "feedback": "string", "winner": "User" | "Opponent" | "Draw" }
    ${getLanguageInstruction()}
    `;

    try {
        const res = await generateWithFallback({ contents: prompt });
        return safeParse(res.text || '{}', { score: 50, feedback: "Debate concluded.", winner: "Draw" });
    } catch (e) {
        return { score: 50, feedback: "Evaluation unavailable.", winner: "Draw" };
    }
};
