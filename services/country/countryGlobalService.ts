
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { GlobalProfile } from "../../types";

export const fetchGlobalProfile = async (countryName: string): Promise<GlobalProfile> => {
    const prompt = `
    GENERATE GLOBAL RELATIONS MATRIX: ${countryName}.
    
    REQUIREMENTS:
    - **Memberships**: UN, WTO, Regional Blocs (All of them).
    - **Treaties**: Key bilateral and multilateral agreements.
    - **Alliances**: Military and Economic pacts.
    - **Diaspora**: Major population centers abroad.
    
    RETURN JSON ONLY matching GlobalProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {}) as GlobalProfile;
};
