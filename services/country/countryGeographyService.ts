
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchGeography = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE GEOGRAPHIC PROFILE: ${countryName}
CLASSIFICATION: EXHAUSTIVE TERRITORIAL & ADMINISTRATIVE DOSSIER
PROTOCOL: POLI ARCHIVE V2 — INFINITE GRANULARITY

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE geographic profile of ${countryName}. Every border, every division, every natural feature.

============================================================
SECTION 1: PHYSICAL GEOGRAPHY
============================================================

A. TERRITORY:
   - Total area (km2 and sq mi), land area, water area
   - Coastline length, highest point (name + elevation), lowest point
   - Geographic coordinates (center)
   - Time zones (all of them with UTC offsets)
   - Bordering countries (list ALL with border length for each)

B. TERRAIN & TOPOGRAPHY:
   - Major mountain ranges, peaks (list ALL significant ones with elevations)
   - Major rivers (list ALL with length, source, mouth)
   - Lakes, seas, bodies of water
   - Plains, plateaus, valleys, deserts, islands
   - Volcanoes (active and dormant)

C. CLIMATE:
   - Climate classification (Koppen types present)
   - Climate zones across the country
   - Average temperatures, annual rainfall
   - Natural disaster risks

D. NATURAL RESOURCES:
   - List ALL mineral resources, fossil fuels, renewable resources
   - Agricultural products, fisheries, forestry

E. PROTECTED AREAS:
   - National parks (list ALL with area, year established)
   - UNESCO World Heritage natural sites

============================================================
SECTION 2: ADMINISTRATIVE DIVISIONS — COMPLETE DRILL-DOWN
============================================================

MOST CRITICAL SECTION. Provide the COMPLETE administrative hierarchy.

A. ADMINISTRATIVE STRUCTURE:
   - Total number of levels, name of each level, total count at each level
   - Example: Philippines: 17 Regions > 81 Provinces + 38 Independent Cities > 146 Cities + 1,488 Municipalities > 42,036 Barangays

B. LEVEL 1 — TOP-LEVEL DIVISIONS:
   List EVERY SINGLE top-level division. For each:
   - Official name, type, capital, population, area, head (name + title + party), subdivision count, ISO code, special status
   LIST ALL OF THEM. No abbreviation. No "and X more".

C. MAJOR CITIES (top 30+):
   - Name, population, province/state, mayor/head, area, designation

D. SPECIAL ZONES:
   - Autonomous regions, free trade zones, special economic zones, overseas territories

============================================================
SECTION 3: BORDERS & MARITIME
============================================================
- International borders with lengths, border disputes
- EEZ, territorial sea, continental shelf

RETURN VALID JSON ONLY:
{
    "totalArea": "string", "landArea": "string", "waterArea": "string",
    "coastline": "string",
    "highestPoint": { "name": "string", "elevation": "string" },
    "lowestPoint": { "name": "string", "elevation": "string" },
    "coordinates": "string",
    "timeZones": ["string"],
    "borders": [{ "country": "string", "length": "string" }],
    "terrain": ["string"],
    "mountainRanges": [{ "name": "string", "highestPeak": "string", "elevation": "string" }],
    "rivers": [{ "name": "string", "length": "string", "source": "string", "mouth": "string" }],
    "lakes": [{ "name": "string", "area": "string", "type": "string" }],
    "islands": [{ "name": "string", "area": "string", "population": "string" }],
    "volcanoes": [{ "name": "string", "elevation": "string", "status": "string", "lastEruption": "string" }],
    "climateZones": ["string"],
    "climateClassification": "string",
    "averageTemperature": { "summer": "string", "winter": "string" },
    "annualRainfall": "string",
    "naturalDisasters": ["string"],
    "naturalResources": ["string"],
    "nationalParks": [{ "name": "string", "area": "string", "yearEstablished": "string" }],
    "capitals": [{ "name": "string", "type": "string", "population": "string", "coordinates": "string", "founded": "string" }],
    "adminDivisions": {
        "structure": "string (e.g., 'Regions > Provinces > Cities/Municipalities > Barangays')",
        "totalLevels": 0,
        "levelNames": ["string"],
        "levelCounts": [{ "level": "string", "count": 0 }],
        "level1": [{
            "name": "string",
            "type": "string",
            "capital": "string",
            "population": "string",
            "area": "string",
            "head": { "name": "string", "title": "string", "party": "string" },
            "subdivisionCount": 0,
            "isoCode": "string",
            "specialStatus": "string"
        }]
    },
    "majorCities": [{
        "name": "string", "population": "string", "province": "string",
        "mayor": "string", "area": "string", "designation": "string"
    }],
    "specialZones": [{ "name": "string", "type": "string", "description": "string" }],
    "borderDisputes": [{ "territory": "string", "claimants": ["string"], "status": "string" }],
    "maritimeZone": { "eez": "string", "territorialSea": "string" }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    const parsed = safeParse(response.text || '{}', {}) as any;
    // Handle both wrapped and unwrapped responses
    return parsed.geography || parsed;
};
