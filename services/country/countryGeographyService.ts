
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { GeographyProfile } from "../../types";

export const fetchGeography = async (countryName: string): Promise<GeographyProfile> => {
    const prompt = `
POLI ARCHIVE — COMPLETE GEOGRAPHIC & ADMINISTRATIVE SURVEY: ${countryName}
CLASSIFICATION: EXHAUSTIVE TERRITORIAL MAPPING
PROTOCOL: POLI ARCHIVE V2 — DRILL-DOWN SYSTEM

${getLanguageInstruction()}

You are POLI, generating the COMPLETE geographic and administrative profile of ${countryName}. This must support a DRILL-DOWN SYSTEM — users can click a region to see provinces, click a province to see municipalities, etc.

MANDATORY REQUIREMENTS:

1. ADMINISTRATIVE DIVISIONS — COMPLETE DRILL-DOWN HIERARCHY:
   Level 1 (Top-level divisions): List ALL first-level administrative divisions (states, provinces, regions, oblasts, prefectures, etc.). For EACH provide:
   - Name, type (state/province/region/etc.), capital, population, area, governor/leader name and party
   - Official seal/logo description, official website URL

   Level 2 (Sub-divisions): For EACH Level 1 division, list ALL level 2 subdivisions (provinces within regions, counties within states, etc.). For EACH:
   - Name, type, capital, population, governor/leader
   - Component cities (independent/chartered cities)

   Level 3 (Municipalities/Cities): For EACH Level 2, list municipalities and component cities with:
   - Name, type (municipality/city/town), population, mayor name

   Level 4 (Lowest level): For the first few Level 3 units, list sample lowest-level divisions (barangays, wards, parishes, communes) with:
   - Name, captain/chair name

   IMPORTANT: For ${countryName}, if it has regions, list ALL regions. For each region, list ALL provinces and independent/component cities. For the first 3 provinces, list ALL municipalities. For the first municipality, list ALL barangays/wards.

2. GEOGRAPHY:
   - Total area (km² and sq mi), land area, water area, coastline length
   - Highest point, lowest point, longest river, largest lake
   - Major mountain ranges, plains, valleys, peninsulas, islands
   - Border countries with border lengths

3. CLIMATE & TERRAIN:
   - Climate zones with detailed descriptions
   - Terrain types: Mountains, plains, deserts, forests, wetlands
   - Natural hazards: earthquakes, typhoons, flooding, etc.

4. NATURAL RESOURCES:
   - Complete list of all natural resources with estimated reserves
   - Mining, forestry, fishing, agriculture resources

5. CAPITALS:
   - National capital: name, coordinates, population, founded date, history
   - Former capitals if any
   - Economic capital (if different)

RETURN VALID JSON ONLY:
{
    "geography": {
        "totalArea": "string", "landArea": "string", "waterArea": "string", "coastline": "string",
        "highestPoint": { "name": "string", "elevation": "string" },
        "lowestPoint": { "name": "string", "elevation": "string" },
        "longestRiver": { "name": "string", "length": "string" },
        "largestLake": { "name": "string", "area": "string" },
        "majorFeatures": ["string"],
        "borderCountries": [{ "country": "string", "borderLength": "string" }],
        "capitals": [{ "name": "string", "coordinates": "string", "population": "string", "founded": "string", "type": "string" }],
        "climateZones": ["string"],
        "terrain": ["string"],
        "naturalHazards": ["string"],
        "naturalResources": ["string"],
        "adminDivisions": {
            "systemDescription": "string (explain the full administrative hierarchy of the country)",
            "totalLevel1": 0,
            "totalLevel2": 0,
            "totalLevel3": 0,
            "level1": [
                {
                    "name": "string",
                    "type": "string (region/state/province/oblast/etc.)",
                    "capital": "string",
                    "population": "string",
                    "area": "string",
                    "leader": { "name": "string", "title": "string", "party": "string" },
                    "sealDescription": "string",
                    "website": "string",
                    "level2": [
                        {
                            "name": "string",
                            "type": "string (province/county/district/etc.)",
                            "capital": "string",
                            "population": "string",
                            "leader": { "name": "string", "title": "string", "party": "string" },
                            "componentCities": ["string"],
                            "level3": [
                                {
                                    "name": "string",
                                    "type": "string (municipality/city/town)",
                                    "population": "string",
                                    "leader": { "name": "string", "title": "string" },
                                    "level4": [
                                        { "name": "string", "type": "string", "leader": { "name": "string", "title": "string" } }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {}) as GeographyProfile;
};
