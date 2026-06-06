
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchHealthProfile = async (countryName: string) => {
    try {
        const prompt = `
        SYSTEM OVERRIDE: POLI ARCHIVE V1.
        SUBJECT: ${countryName} Health System.
        ${getLanguageInstruction()}

        Directives:
        1. Provide specific statistics and descriptions.
        2. Use Google Search for latest data.

        RETURN JSON ONLY:
        {
            "lifeExpectancy": "e.g., 82 years",
            "healthcareSystem": "e.g., Universal, Single-payer",
            "majorDiseases": ["Disease 1", "Disease 2"],
            "expenditure": "e.g., 10% of GDP"
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
