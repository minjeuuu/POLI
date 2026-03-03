
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryGovernment = async (countryName: string) => {
    const prompt = `
    GENERATE EXHAUSTIVE GOVERNMENT ROSTER: ${countryName}.
    PROTOCOL: POLI ARCHIVE V1 (THE FRACTAL STATE).
    
    REQUIREMENTS:
    - **Executive**: President, VP, Premier, Monarch (Full Names, Terms).
    - **Cabinet**: LIST EVERY SINGLE MINISTER/SECRETARY. Do not summarize.
    - **Legislature**:
      - Upper House: Name, Seats, Key Leaders.
      - Lower House: Name, Seats, Key Leaders.
    - **Judiciary**: Supreme Court Justices (Names), Court Structure.
    - **Agencies**: All major bureaus/commissions.
    - **GOCCs**: Government Owned Corporations (if applicable).
    - **Local Gov Structure**: Regions -> Provinces -> Cities -> Munis.
    
    RETURN JSON ONLY matching the 'government' part of CountryDeepDive.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {});
};
