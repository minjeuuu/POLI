
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { EconomyProfile } from "../../types";

export const fetchEconomy = async (countryName: string): Promise<EconomyProfile> => {
    const prompt = `
    GENERATE ECONOMIC DOSSIER: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **GDP**: Nominal and Per Capita.
    - **Trade**: Major AND Minor Imports/Exports (List 20+ items each).
    - **Partners**: Top 10 trading partners.
    - **Sectors**: Breakdown of economy by sector.
    
    RETURN JSON ONLY matching EconomyProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {}) as EconomyProfile;
};
