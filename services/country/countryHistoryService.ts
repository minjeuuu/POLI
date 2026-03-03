
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryHistory = async (countryName: string) => {
    const prompt = `
    GENERATE MASTER HISTORICAL RECORD: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    1. **Political History**: 5+ Very Long Paragraphs covering formation to present.
    2. **Institutional Evolution**: 5+ Very Long Paragraphs on how government structures changed.
    3. **Timeline**: 20+ Key Events (Year, Title, Description).
    4. **Conflicts**: List all major wars/insurgencies.
    5. **Head of State Archive**: List of past leaders.
    
    RETURN JSON ONLY matching the 'history' part of CountryDeepDive.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {});
};
