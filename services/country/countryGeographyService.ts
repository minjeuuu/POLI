
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { GeographyProfile } from "../../types";

export const fetchGeography = async (countryName: string): Promise<GeographyProfile> => {
    let restGeo = {};
    let openMeteo = {};
    try {
        const restRes = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
        if (restRes.ok) {
            const restData = await restRes.json();
            const c = restData[0];
            if (c) {
                restGeo = {
                    capital: c.capital?.[0] || '',
                    region: c.region || '',
                    subregion: c.subregion || '',
                    area: c.area || 0,
                    borders: c.borders || [],
                    latlng: c.latlng || []
                };

                if (c.latlng?.length === 2) {
                    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.latlng[0]}&longitude=${c.latlng[1]}&current_weather=true`);
                    const weatherData = await weatherRes.json();
                    if (weatherData.current_weather) {
                        openMeteo = weatherData.current_weather;
                    }
                }
            }
        }
    } catch (e) { console.warn("RestGeo failed"); }

    const prompt = `
    GENERATE GEOGRAPHIC SURVEY: ${countryName}.
    REST COUNTRIES GEO FALLBACK: ${JSON.stringify(restGeo)}. Use this verified data in your result.
    OPEN-METEO WEATHER SNAPSHOT: ${JSON.stringify(openMeteo)}. Include this contemporary weather data.
    PROTOCOL: POLI ARCHIVE V1.
    
    REQUIREMENTS:
    - **Admin Divisions**: Drill down to the lowest level (Region -> Province -> Muni -> Barangay/Ward). List officials if possible.
    - **Climate & Terrain**: Detailed breakdown.
    - **Resources**: Exhaustive list of natural resources.
    
    RETURN JSON ONLY matching GeographyProfile interface.
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '{}', {}) as GeographyProfile;
};
