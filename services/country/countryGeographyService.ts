
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { GeographyProfile } from "../../types";

export const fetchGeography = async (countryName: string): Promise<GeographyProfile> => {
    const prompt = `
    GENERATE GEOGRAPHIC SURVEY: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Admin Divisions**: Drill down to the lowest level (Region -> Province -> Muni -> Barangay/Ward). List officials if possible.
    - **Climate & Terrain**: Detailed breakdown.
    - **Resources**: Exhaustive list of natural resources.
    
    RETURN JSON ONLY matching GeographyProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {}) as GeographyProfile;
};
