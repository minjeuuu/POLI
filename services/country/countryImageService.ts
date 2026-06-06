
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { CountryImageArchive } from "../../types";

export const fetchCountryImages = async (countryName: string): Promise<CountryImageArchive[]> => {
    const prompt = `
    GENERATE IMAGE ARCHIVE METADATA: ${countryName}.
    COUNT: 6 Images.
    CATEGORIES: Historical events, Government buildings, Cultural symbols.
    
    RETURN JSON ARRAY:
    [{ "title": "Signing of Constitution", "url": "...", "category": "History", "year": "1990", "description": "...", "credit": "Archive" }]
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });
    
    return safeParse(response.text || '[]', []) as CountryImageArchive[];
};
