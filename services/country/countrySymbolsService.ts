
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { SymbolsProfile } from "../../types";

export const fetchSymbols = async (countryName: string): Promise<SymbolsProfile> => {
    const prompt = `
    GENERATE NATIONAL SYMBOLS ARCHIVE: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Anthem**: Native text, Romanization, English Translation. Split by stanzas.
    - **Coat of Arms**: Detailed description and symbolism.
    - **Symbols**: List all national symbols (Bird, Flower, Tree, Gem, Sport, etc.).
    
    RETURN JSON ONLY matching SymbolsProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {}) as SymbolsProfile;
};
