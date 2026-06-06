
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { AcademicProfile } from "../../types";

export const fetchAcademicProfile = async (countryName: string): Promise<AcademicProfile> => {
    const prompt = `
    GENERATE ACADEMIC DOSSIER: ${countryName}.
    FOCUS: Political Science & History.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **History of the Discipline**: How PolSci developed in ${countryName}. (5 Paragraphs Minimum).
    - **Intellectual History**: Key movements and thinkers. (5 Paragraphs Minimum).
    - **Universities**: Top universities for Political Science. 
    - **Think Tanks**: Major policy institutes.
    - **Journals**: Major academic publications.
    
    RETURN JSON ONLY matching AcademicProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {}) as AcademicProfile;
};
