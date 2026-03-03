
import { generateWithRetry, safeParse, withCache } from "./common";
import { TranslationResult } from "../types";
import { Type } from "@google/genai";

/**
 * BABEL PROTOCOL: UNIVERSAL TRANSLATION ENGINE
 * Specialized for political documents, treaties, and high-context speech.
 */
export const translateText = async (text: string, targetLanguage: string): Promise<TranslationResult> => {
    // Cache key based on input hash to save tokens
    const cacheKey = `translate_poli_v1_thinking_${text.substring(0, 32)}_${targetLanguage}`;
    
    return withCache(cacheKey, async () => {
        try {
            const response = await generateWithRetry({
                model: 'gemini-3-pro-preview',
                contents: `
                ACT AS: UNIVERSAL TRANSLATOR & POLITICAL LINGUIST.
                TASK: Translate the following text into ${targetLanguage}.
                
                SOURCE TEXT: "${text}"

                REQUIREMENTS:
                1. **PRECISION**: Maintain the exact political, legal, or cultural tone.
                2. **NUANCE ANALYSIS**: Provide a forensic breakdown of untranslatable concepts, cultural subtext, and potential political implications of specific word choices.
                3. **CONTEXT**: Assume the text is of high importance (Treaty, Constitution, Speech).

                OUTPUT JSON SCHEMA:
                {
                    "original": string,
                    "translated": string,
                    "sourceLanguage": string,
                    "targetLanguage": string,
                    "nuanceAnalysis": string (Detailed paragraph explaining context)
                }
                `,
                config: { 
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            original: {type: Type.STRING},
                            translated: {type: Type.STRING},
                            sourceLanguage: {type: Type.STRING},
                            targetLanguage: {type: Type.STRING},
                            nuanceAnalysis: {type: Type.STRING}
                        }
                    },
                    thinkingConfig: { thinkingBudget: 2048 } 
                }
            });
            return safeParse(response.text || '{}', {
                original: text,
                translated: "Translation unavailable.",
                sourceLanguage: "Unknown",
                targetLanguage: targetLanguage,
                nuanceAnalysis: "Analysis unavailable."
            }) as TranslationResult;
        } catch (e) {
            return {
                original: text,
                translated: "Translation error.",
                sourceLanguage: "Unknown",
                targetLanguage: targetLanguage,
                nuanceAnalysis: "Error."
            };
        }
    });
};
