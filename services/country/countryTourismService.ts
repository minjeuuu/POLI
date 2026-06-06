
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchTourismProfile = async (countryName: string) => {
    const prompt = `
    GENERATE TOURISM DOSSIER: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Attractions**: Top 4 tourist sites with type (Nature/Historic/Urban).
    - **Visa Policy**: General summary for international visitors.
    
    RETURN JSON ONLY:
    {
        "attractions": [{ "name": "string", "type": "string" }],
        "visaPolicy": "string"
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
