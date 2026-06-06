
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { LegalProfile } from "../../types";

export const fetchLegalProfile = async (countryName: string): Promise<LegalProfile> => {
    const prompt = `
    GENERATE LEGAL SYSTEM ANALYSIS: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1 (DEEP THOUGHT).
    
    REQUIREMENTS:
    - **Current Constitution**: Name, Year, Preamble, Key Articles.
    - **Historical Constitutions**: LIST ALL PREVIOUS CONSTITUTIONS.
      - Format: { "name": "1987 Constitution", "year": "1987", "description": "Restored democracy..." }
    - **Key Codes**: Civil, Penal, Commercial, Family (with years).
    - **Judiciary**: Structure, Independence level.
    - **Rights**: Status of Press, Speech, Due Process.
    
    RETURN JSON ONLY matching LegalProfile interface.
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
    
    return safeParse(response.text || '{}', {}) as LegalProfile;
};

export const fetchSpecificLaw = async (countryName: string, query: string): Promise<string> => {
    const prompt = `
    TASK: ANALYZE SPECIFIC LAW/CODE: "${query}" in the jurisdiction of ${countryName}.
    USE GOOGLE SEARCH to find the exact text or authoritative summaries.
    
    PROVIDE A DETAILED MEMO COVERING:
    1. Official Title & Year of Enactment (if applicable).
    2. Primary Purpose & Scope.
    3. Key Provisions/Articles (Summary of text).
    4. Current Status (Active/Repealed/Amended).
    5. Notable Controversies or Applications (if any).

    FORMAT: Plain text, structured with headings. Academic/Legal tone.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
            maxOutputTokens: 2048,
            tools: [{googleSearch: {}}] 
        }
    });
    
    return response.text || "Legal database query returned no results.";
};
