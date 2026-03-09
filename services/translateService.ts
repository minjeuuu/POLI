
import { generateWithFallback, safeParse, withCache } from "./common";
import { TranslationResult } from "../types";

/**
 * BABEL PROTOCOL: UNIVERSAL TRANSLATION ENGINE
 * Powered by Claude — specialized for political documents, treaties, and high-context speech.
 */
export const translateText = async (text: string, targetLanguage: string): Promise<TranslationResult> => {
    const cacheKey = `translate_poli_v2_claude_${text.substring(0, 32)}_${targetLanguage}`;

    return withCache(cacheKey, async () => {
        const response = await generateWithFallback({ contents: `
You are POLI's Universal Translation Engine — the world's most precise political and diplomatic translator.

TASK: Translate the following text into ${targetLanguage} with forensic precision.

SOURCE TEXT:
"${text}"

REQUIREMENTS:
1. PRECISION: Maintain the exact political, legal, or cultural tone. Use the most formal and accurate register appropriate for the domain.
2. NUANCE ANALYSIS: Provide a forensic breakdown of:
   - Untranslatable concepts and how you handled them
   - Cultural subtext that may be lost or altered in translation
   - Political implications of specific word choices
   - Idiomatic expressions and their closest equivalents
   - Register and formality level adjustments
3. CONTEXT: Assume the text is of high importance (Treaty, Constitution, Speech, Diplomatic Communication).
4. SOURCE LANGUAGE DETECTION: Identify the source language with confidence level.

RETURN VALID JSON ONLY — NO MARKDOWN, NO PREAMBLE:
{
    "original": "exact original text",
    "translated": "complete translated text in ${targetLanguage}",
    "sourceLanguage": "detected source language name",
    "targetLanguage": "${targetLanguage}",
    "nuanceAnalysis": "Detailed paragraph (minimum 200 words) explaining cultural context, untranslatable concepts, political implications of word choices, register adjustments, and any potential ambiguities in the translation. Include specific examples from the text."
}
        ` });

        if (!response.text) {
            return {
                original: text,
                translated: "Translation unavailable — Claude AI may be temporarily unavailable. Please check your API key in Settings.",
                sourceLanguage: "Unknown",
                targetLanguage: targetLanguage,
                nuanceAnalysis: "The translation engine could not reach the AI service. Please verify your Claude API key is configured in Settings (Profile tab)."
            };
        }

        return safeParse(response.text, {
            original: text,
            translated: "Translation unavailable.",
            sourceLanguage: "Unknown",
            targetLanguage: targetLanguage,
            nuanceAnalysis: "Analysis unavailable."
        }) as TranslationResult;
    });
};
