
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCultureProfile = async (countryName: string) => {
    try {
        const prompt = `
        SYSTEM OVERRIDE: POLI ARCHIVE V1.
        SUBJECT: ${countryName} Culture.
        ${getLanguageInstruction()}

        Directives:
        1. List major aspects of culture.
        2. Be specific (e.g., "Sushi, Ramen" not just "Food").

        RETURN JSON ONLY:
        {
            "cuisine": ["Dish 1", "Dish 2"],
            "arts": ["Art form 1", "Art form 2"],
            "sports": ["Sport 1", "Sport 2"],
            "holidays": ["Holiday 1", "Holiday 2"],
            "literature": ["Work 1", "Work 2"],
            "cinema": ["Film 1", "Film 2"],
            "music": ["Genre 1", "Genre 2"],
            "fashion": ["Style 1", "Style 2"],
            "architecture": ["Style 1", "Style 2"],
            "folklore": ["Story 1", "Story 2"]
        }
        `;

        const response = await generateWithFallback({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        return safeParse(response.text || '{}', {});
    } catch (e) {
        return {};
    }
};
