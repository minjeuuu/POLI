
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { CountryMapData } from "../../types";

export const fetchCountryMaps = async (countryName: string): Promise<CountryMapData[]> => {
    const prompt = `
    TASK: FIND REAL MAPS FOR: ${countryName}.
    USE GOOGLE SEARCH to find valid image URLs (preferably Wikimedia, ReliefWeb, or UN Maps).
    TYPES: Political, Physical, Economic, Historical.
    
    RETURN JSON ARRAY:
    [{ "title": "Political Map of ${countryName}", "type": "Political", "imageUrl": "string (URL found in search)", "description": "string", "source": "string", "year": "2024" }]
    
    CRITICAL: The 'imageUrl' must be a likely valid link found via search context, not a hallucination.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
            responseMimeType: "application/json",
            tools: [{googleSearch: {}}]
        }
    });
    
    return safeParse(response.text || '[]', []) as CountryMapData[];
};
