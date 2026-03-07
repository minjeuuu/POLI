import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { DemographicsProfile } from "../../types";

export const fetchDemographics = async (countryName: string): Promise<DemographicsProfile> => {
    const prompt = `
    GENERATE DEMOGRAPHIC MATRIX: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.

    REQUIREMENTS:
    - **Population**: Exact number, density, growth, % of world.
    - **Ethnic Groups**: LIST ALL. Do not summarize. If there are 50, list 50 with percentages.
    - **Religions**: Complete breakdown.
    - **Languages**: Official and major dialects with usage %.

    RETURN JSON ONLY matching DemographicsProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {}) as DemographicsProfile;
};
