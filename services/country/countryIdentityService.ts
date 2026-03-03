
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryIdentity = async (countryName: string) => {
    const prompt = `
    GENERATE COMPLETE NATIONAL IDENTITY MATRIX: ${countryName}.
    SYSTEM OVERRIDE: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Official Name**: English, Native (script), Romanization.
    - **Flag**: Full history, symbolism of every color/element, designer, adoption date, image URL (Wikimedia).
    - **Coat of Arms**: Blazon, supporters, motto, history, image URL.
    - **Anthem**: Native lyrics, Romanized, English translation (Full stanzas, clear breaks).
    - **Motto**: Native + Translation.
    - **Symbols**: Flower, Bird, Tree, Animal, Dish, Gem, Sport, Instrument.
    - **Codes**: ISO Alpha-2, Alpha-3, Numeric, TLD, Calling Code.
    
    RETURN JSON ONLY matching the 'identity' part of CountryDeepDive.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {});
};
