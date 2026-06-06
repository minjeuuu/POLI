
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchTechProfile = async (countryName: string) => {
    const prompt = `
    GENERATE TECHNOLOGY DOSSIER: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Internet**: % Penetration, Freedom status.
    - **Cyber**: Cyberwarfare rank description.
    - **Space**: Space agency status and major achievements.
    - **Sectors**: Top tech industries (e.g. Fintech, Semi-conductors, SaaS).
    
    RETURN JSON ONLY:
    {
        "internetPenetration": "string",
        "cyberRank": "string",
        "spaceProgram": "string",
        "majorSectors": ["string"]
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
