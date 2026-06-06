
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchSocietyProfile = async (countryName: string) => {
    const prompt = `
    GENERATE CULTURAL MATRIX: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Cuisine**: Description of culinary traditions + 3 National Dishes.
    - **Arts**: Summary of literature, music, and visual arts.
    - **Media Freedom**: Assessment of press freedom and major outlets.
    
    RETURN JSON ONLY:
    {
        "cuisine": "string",
        "dishes": ["string"],
        "arts": "string",
        "mediaFreedom": "string"
    }
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });
    
    return safeParse(response.text || '{}', {});
};
