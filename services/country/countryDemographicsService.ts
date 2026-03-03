
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { DemographicsProfile } from "../../types";
import { Type } from "@google/genai";

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

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
            responseMimeType: "application/json", 
            maxOutputTokens: 8192,
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    population: {
                        type: Type.OBJECT,
                        properties: {
                            total: {type: Type.STRING},
                            density: {type: Type.STRING},
                            growthRate: {type: Type.STRING}
                        }
                    },
                    ethnicGroups: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: {type: Type.STRING},
                                percentage: {type: Type.STRING}
                            }
                        }
                    },
                    religions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: {type: Type.STRING},
                                percentage: {type: Type.STRING}
                            }
                        }
                    },
                    languages: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: {type: Type.STRING},
                                status: {type: Type.STRING},
                                percentage: {type: Type.STRING}
                            }
                        }
                    },
                    medianAge: {type: Type.STRING}
                }
            }
        }
    });
    
    return safeParse(response.text || '{}', {}) as DemographicsProfile;
};
