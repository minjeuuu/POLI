
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryIdentity = async (countryName: string) => {
    let restCode = {};
    try {
        const restRes = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
        if (restRes.ok) {
            const restData = await restRes.json();
            const c = restData[0];
            if (c) {
                restCode = {
                    isoCode2: c.cca2 || '',
                    isoCode3: c.cca3 || '',
                    callingCode: c.idd?.root ? (c.idd.root + (c.idd.suffixes?.[0] || '')) : '',
                    tld: c.tld?.[0] || '',
                    demonym: c.demonyms?.eng?.m || '',
                    flagIcon: c.flag || '',
                };
            }
        }
    } catch (e) { console.warn("RestCountries failed", e); }

    let wbsIndicators = "";
    try {
        const wbRes = await fetch(`https://api.worldbank.org/v2/country/${encodeURIComponent(countryName)}/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1`);
        if (wbRes.ok) {
            const data = await wbRes.json();
            if (data[1] && data[1][0]) wbsIndicators += `GDP (Current USD): ${data[1][0].value}`;
        }
        const wbRes2 = await fetch(`https://api.worldbank.org/v2/country/${encodeURIComponent(countryName)}/indicator/FP.CPI.TOTL.ZG?format=json&mrnev=1`);
        if (wbRes2.ok) {
            const data = await wbRes2.json();
            if (data[1] && data[1][0]) wbsIndicators += ` | Inflation (%): ${data[1][0].value}`;
        }
    } catch (e) { console.warn("WB api failed", e); }

    const prompt = `
    GENERATE COMPLETE NATIONAL IDENTITY MATRIX: ${countryName}.
    REST COUNTRIES DATA FALLBACK: ${JSON.stringify(restCode)}. Integrate this data precisely.
    WORLD BANK DATA OVERRIDE: ${wbsIndicators}. Include this exact economic data.
    SYSTEM OVERRIDE: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Official Name**: English, Native (script), Romanization.
    - **Flag**: Full history, symbolism of every color/element, designer, adoption date, image URL (Wikimedia).
    - **Coat of Arms**: Blazon, supporters, motto, history, image URL.
    - **Anthem**: Native lyrics, Romanized, English translation (Full stanzas, clear breaks).
    - **Motto**: Native + Translation.
    - **Symbols**: Flower, Bird, Tree, Animal, Dish, Gem, Sport, Instrument.
    - **Codes**: ISO Alpha-2, Alpha-3, Numeric, TLD, Calling Code.
    
    RETURN JSON ONLY matching the 'identity' part of CountryDeepDive.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {});
};
