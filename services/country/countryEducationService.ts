
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchEducationProfile = async (countryName: string) => {
    try {
        const prompt = `
        SYSTEM OVERRIDE: POLI ARCHIVE V1.
        SUBJECT: ${countryName} Education System.
        ${getLanguageInstruction()}

        Directives:
        1. Provide specific statistics and descriptions.
        2. Use Google Search for latest data.

        RETURN JSON ONLY:
        {
            "literacyRate": "e.g., 99%",
            "system": "e.g., 6-3-3-4 system",
            "universities": ["University 1", "University 2"],
            "expenditure": "e.g., 5% of GDP"
        }
        `;

        const response = await generateWithFallback({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { 
                responseMimeType: "application/json",
                tools: [{googleSearch: {}}]
            }
        });

        return safeParse(response.text || '{}', {});
    } catch (e) {
        return {};
    }
};
