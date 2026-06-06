
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchEnvironmentProfile = async (countryName: string) => {
    const prompt = `
    GENERATE ENVIRONMENTAL REPORT: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **CO2 Emissions**: Estimate in Metric Tons/Capita.
    - **Forest Cover**: Percentage estimate.
    - **Air Quality**: Average AQI description.
    - **Threats**: 5 Major environmental challenges (e.g. Desertification, Rising Seas).
    - **Policy**: Summary of climate goals and international commitments (Paris Agreement status).
    
    RETURN JSON ONLY:
    {
        "co2Emissions": "string",
        "forestCover": "string",
        "airQualityIndex": "string",
        "threats": ["string"],
        "policy": "string"
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
