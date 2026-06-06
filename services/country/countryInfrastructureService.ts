
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { InfrastructureProfile } from "../../types";

export const fetchInfrastructureProfile = async (countryName: string): Promise<InfrastructureProfile> => {
    const prompt = `
    GENERATE INFRASTRUCTURE MATRIX: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Transport**: Roads, Rails, Air, Sea (Exhaustive lists of major hubs).
    - **Energy**: Precise TWh production, % mix (Hydro, Nuclear, Solar, Fossil).
    - **Digital**: Internet speeds, ISP landscape, Cyber readiness.
    
    RETURN JSON ONLY matching InfrastructureProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {}) as InfrastructureProfile;
};
