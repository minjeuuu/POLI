
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchSocietyProfile = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE SOCIETY & SOCIAL STRUCTURE DOSSIER: ${countryName}
CLASSIFICATION: EXHAUSTIVE SOCIOLOGICAL PROFILE
PROTOCOL: POLI ARCHIVE V2 — MAXIMUM DEPTH

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE social structure profile of ${countryName}.

============================================================
SECTION 1: SOCIAL STRUCTURE
============================================================
- Class system: description of social classes, mobility, inequality
- Caste/clan/tribal systems (if applicable)
- Urban vs rural divide: statistics, cultural differences, political implications
- Social stratification: income distribution, Gini coefficient
- Middle class size and trends
- Poverty rate, extreme poverty, poverty line definition
- Social safety nets: welfare programs, pensions, unemployment benefits

============================================================
SECTION 2: FAMILY & GENDER
============================================================
- Family structure: nuclear vs extended, average household size
- Marriage: legal age, customs, intermarriage patterns, divorce rate
- Gender equality: GII rank, women in parliament %, women in workforce %, gender pay gap
- Women's rights: legal protections, cultural barriers, feminist movements
- LGBTQ+ rights: legal status, same-sex marriage, discrimination protections, social acceptance
- Domestic violence statistics, laws, support systems
- Child welfare: child labor rate, child marriage, orphanage system

============================================================
SECTION 3: LABOR & EMPLOYMENT
============================================================
- Labor force size, participation rate (male/female)
- Employment by sector (agriculture, industry, services)
- Major industries and employers
- Minimum wage, average wage, wage disparity
- Trade unions: major unions, membership rate, legal protections
- Overseas workers/diaspora: countries, numbers, remittance volume
- Informal economy size
- Child labor prevalence

============================================================
SECTION 4: MIGRATION
============================================================
- Immigration: major source countries, foreign population, refugee population
- Emigration: major destination countries, diaspora size, brain drain
- Internal migration patterns (rural to urban)
- Remittances as % of GDP
- Immigration policy, citizenship pathways
- Refugee and asylum policies

============================================================
SECTION 5: CIVIL SOCIETY
============================================================
- Major NGOs and civil society organizations (list 20+ with name, focus, website)
- Freedom of assembly rating
- Major social movements (past and present)
- Volunteerism and civic participation
- Religious organizations' social role
- Media landscape: major newspapers, TV channels, online media (list ALL with ownership)
- Press freedom ranking and assessment
- Social media usage: platforms, penetration, political impact
- Internet freedom assessment

============================================================
SECTION 6: SOCIAL ISSUES
============================================================
- Drug policy and drug problem assessment
- Crime rate: homicide rate, major crime types, organized crime
- Corruption perception and impact on daily life
- Housing crisis/homelessness
- Food security
- Environmental justice issues
- Racial/ethnic tensions
- Religious tensions

RETURN VALID JSON ONLY:
{
    "socialStructure": {
        "classSystem": "string (300+ words)",
        "giniCoefficient": "string",
        "povertyRate": "string",
        "middleClass": "string",
        "urbanRural": { "urbanPercentage": "string", "ruralPercentage": "string", "divide": "string" },
        "safetyNets": [{ "name": "string", "type": "string", "coverage": "string", "description": "string" }]
    },
    "familyGender": {
        "familyStructure": "string",
        "averageHouseholdSize": "string",
        "marriageAge": "string",
        "divorceRate": "string",
        "genderEqualityRank": "string",
        "womenInParliament": "string",
        "womenInWorkforce": "string",
        "lgbtqRights": { "status": "string", "sameGexMarriage": "string", "discrimination": "string", "socialAcceptance": "string" },
        "domesticViolence": { "rate": "string", "laws": "string" }
    },
    "labor": {
        "laborForce": "string",
        "participationRate": { "male": "string", "female": "string" },
        "employmentBySector": { "agriculture": "string", "industry": "string", "services": "string" },
        "minimumWage": "string",
        "averageWage": "string",
        "unemploymentRate": "string",
        "tradeUnions": [{ "name": "string", "members": "string", "sector": "string" }],
        "overseasWorkers": { "total": "string", "topDestinations": ["string"], "remittances": "string" },
        "informalEconomy": "string"
    },
    "migration": {
        "immigrantPopulation": "string",
        "topSourceCountries": ["string"],
        "refugeePopulation": "string",
        "emigrantPopulation": "string",
        "topDestinations": ["string"],
        "remittancesGDP": "string",
        "policy": "string"
    },
    "civilSociety": {
        "majorNGOs": [{ "name": "string", "focus": "string", "website": "string" }],
        "freedomOfAssembly": "string",
        "socialMovements": [{ "name": "string", "period": "string", "description": "string" }],
        "mediaLandscape": {
            "newspapers": [{ "name": "string", "type": "string", "ownership": "string", "circulation": "string" }],
            "tvChannels": [{ "name": "string", "type": "string", "ownership": "string" }],
            "onlineMedia": [{ "name": "string", "type": "string", "reach": "string" }]
        },
        "pressFreedomRank": "string",
        "socialMedia": { "penetration": "string", "topPlatforms": ["string"], "politicalImpact": "string" },
        "internetFreedom": "string"
    },
    "socialIssues": {
        "drugPolicy": "string",
        "crimeRate": { "homicideRate": "string", "majorCrimes": ["string"], "organizedCrime": "string" },
        "corruption": "string",
        "housingCrisis": "string",
        "foodSecurity": "string",
        "ethnicTensions": "string",
        "religiousTensions": "string"
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
