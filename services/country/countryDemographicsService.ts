import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { DemographicsProfile } from "../../types";

export const fetchDemographics = async (countryName: string): Promise<DemographicsProfile> => {
    const prompt = `
POLI ARCHIVE — COMPLETE DEMOGRAPHIC MATRIX: ${countryName}
CLASSIFICATION: EXHAUSTIVE POPULATION ANALYSIS
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE demographic profile of ${countryName}. Every ethnic group, every religion, every language — no summarization.

MANDATORY REQUIREMENTS:

1. POPULATION:
   - Total population (latest estimate with year)
   - Population density (per km²)
   - Growth rate (annual %)
   - Percentage of world population
   - Urban vs rural split with percentages
   - Median age, life expectancy (male/female/overall)
   - Birth rate, death rate, infant mortality rate
   - Fertility rate
   - Net migration rate
   - Population pyramid description (youth bulge, aging, etc.)
   - Historical population data (1900, 1950, 2000, latest)
   - Population projection (2030, 2050)

2. ETHNIC GROUPS — LIST ALL:
   - Do NOT summarize as "others" — list EVERY ethnic group with percentage
   - If there are 50 ethnic groups, list all 50
   - For each: name, percentage, population estimate, regions concentrated, language spoken
   - Include indigenous/aboriginal groups
   - Diaspora communities

3. RELIGIONS — COMPLETE BREAKDOWN:
   - List ALL religions and denominations with percentages
   - For major religions: number of adherents, major denominations, key institutions
   - Historical religious evolution
   - Religious freedom status
   - Role of religion in politics and society
   - Major religious sites/pilgrimage centers

4. LANGUAGES — ALL LANGUAGES:
   - Official language(s) with constitutional status
   - National language(s)
   - ALL regional/minority languages with: name, family, speakers count, percentage, status (official/recognized/endangered)
   - Sign language(s)
   - Lingua franca
   - Language education policy
   - Endangered languages
   - Script(s) used

5. SOCIAL INDICATORS:
   - HDI (Human Development Index) score and ranking
   - Gini coefficient (inequality)
   - Literacy rate (male/female/overall)
   - Education enrollment rates
   - Poverty rate
   - Unemployment rate

RETURN VALID JSON ONLY:
{
    "population": {
        "total": "string", "density": "string", "growthRate": "string",
        "worldPercentage": "string", "urban": "string", "rural": "string",
        "medianAge": "string", "lifeExpectancy": { "overall": "string", "male": "string", "female": "string" },
        "birthRate": "string", "deathRate": "string", "infantMortality": "string",
        "fertilityRate": "string", "netMigration": "string",
        "pyramidType": "string",
        "historical": [{ "year": "string", "population": "string" }],
        "projection": [{ "year": "string", "population": "string" }]
    },
    "ethnicGroups": [
        { "name": "string", "percentage": "string", "population": "string", "regions": "string", "language": "string" }
    ],
    "religions": [
        { "name": "string", "percentage": "string", "adherents": "string", "denominations": ["string"], "institutions": ["string"] }
    ],
    "religiousHistory": "string (min 200 words)",
    "religiousFreedom": "string",
    "languages": [
        { "name": "string", "family": "string", "speakers": "string", "percentage": "string", "status": "string", "script": "string" }
    ],
    "officialLanguages": ["string"],
    "signLanguages": ["string"],
    "endangeredLanguages": ["string"],
    "socialIndicators": {
        "hdi": "string", "hdiRank": "string", "gini": "string",
        "literacyRate": { "overall": "string", "male": "string", "female": "string" },
        "povertyRate": "string", "unemployment": "string"
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {}) as DemographicsProfile;
};
