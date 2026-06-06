
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchPolitics = async (countryName: string) => {
    const prompt = `
    GENERATE POLITICAL LANDSCAPE: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Parties**: List ALL active political parties with ideology and leader.
    - **Electoral History**: List key elections and results.
    - **Political Families**: Dynasties and influential clans.
    - **Concepts**: Local political terms (e.g. "Trapo" in Philippines, "Jugaad" in India).
    
    RETURN JSON ONLY matching the 'politics' structure.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {});
};
