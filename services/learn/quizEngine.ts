
import { generateWithRetry, cleanJson } from "../common";
import { QuizQuestion } from "../../types";

export const generateAdaptiveQuiz = async (topic: string, difficulty: 'Easy' | 'Medium' | 'Hard'): Promise<QuizQuestion[]> => {
    const prompt = `
    GENERATE QUIZ: ${topic}
    DIFFICULTY: ${difficulty}
    
    REQUIREMENTS:
    - 5 Questions.
    - Academic tone.
    - Provide explanations for the correct answer.
    
    JSON: [{ "question", "options": [], "correctAnswer": int, "explanation" }]
    `;
    
    try {
        const res = await generateWithRetry({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        return JSON.parse(cleanJson(res.text || '[]'));
    } catch (e) {
        return [];
    }
};
