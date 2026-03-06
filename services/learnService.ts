
import { generateWithFallback, cleanJson, withCache, getLanguageInstruction } from "./common";
import { QuizQuestion, Flashcard } from "../types";

export const fetchQuiz = async (topic: string): Promise<QuizQuestion[]> => {
    return withCache(`quiz_v5_pro_thinking_${topic}_50`, async () => {
        try {
            const response = await generateWithFallback({ contents: `Generate 50 distinct, high-quality, academic-level multiple choice questions about ${topic}.
                Cover varied aspects: history, theory, key figures, and modern applications.
                Provide a detailed explanation for the correct answer.
                JSON Array of objects with question, options (string[]), correctAnswer (index number), explanation. ${getLanguageInstruction()}` });
            return JSON.parse(cleanJson(response.text || '[]')) as QuizQuestion[];
        } catch (e) { return []; }
    });
};

export const fetchFlashcards = async (topic: string): Promise<Flashcard[]> => {
    return withCache(`flashcards_v5_pro_${topic}_50`, async () => {
        try {
            const response = await generateWithFallback({ contents: `Generate 50 deep-dive flashcards for ${topic}.
                Ensure front concepts are challenging and back definitions are precise.
                JSON Array of objects with front, back, category. ${getLanguageInstruction()}` });
            return JSON.parse(cleanJson(response.text || '[]')) as Flashcard[];
        } catch (e) { return []; }
    });
};
