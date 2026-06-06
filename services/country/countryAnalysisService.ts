
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { AnalysisProfile } from "../../types";

export const fetchCountryAnalysis = async (countryName: string): Promise<AnalysisProfile> => {
    const prompt = `
    GENERATE STRATEGIC POLITICAL ANALYSIS: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1 (DEEP THOUGHT).
    
    REQUIREMENTS:
    - **THINKING PROCESS**: Analyze the country's geopolitical position, internal stability, and long-term trajectory before writing.
    - **Strategic Analysis**: Very long, detailed essay on the country's grand strategy and position (min 500 words).
    - **Political Culture**: Deep dive into the psyche of the electorate.
    - **State Capacity**: Assessment of the bureaucracy's ability to implement policy.
    - **Civil Society**: Strength of NGOs, unions, and movements.
    - **Legitimacy**: Source of the government's right to rule (Traditional, Rational-Legal, Charismatic).
    
    RETURN JSON ONLY matching AnalysisProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
            responseMimeType: "application/json", 
            maxOutputTokens: 8192,
            thinkingConfig: { thinkingBudget: 4096 } 
        }
    });
    
    return safeParse(response.text || '{}', {}) as AnalysisProfile;
};
