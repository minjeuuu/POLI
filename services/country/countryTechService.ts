import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchTechProfile = async (countryName: string) => {
    const prompt = `
GENERATE AN EXHAUSTIVE TECHNOLOGY & INNOVATION DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V2 — EXHAUSTIVE MODE.
MANDATE: Fill every field with real, specific, accurate data.

RETURN JSON ONLY:
{
  "internetPenetration": "string (% of population)",
  "mobilePenetration": "string",
  "cyberRank": "string",
  "spaceProgram": "string",
  "majorSectors": ["string (at least 10 sectors)"],
  "innovationIndex": "string (GII rank and score)",

  "connectivity": {
    "totalInternetUsers": "string",
    "fixedBroadbandPenetration": "string",
    "mobileBroadbandPenetration": "string",
    "averageFixedInternetSpeed": "string (Mbps)",
    "averageMobileInternetSpeed": "string",
    "internetFreedom": "string (Freedom House status)",
    "internetCensorship": "string",
    "fiveGCoverage": "string",
    "fiveGLaunchYear": "string",
    "fiveGOperators": ["string"],
    "underseasCables": ["string"],
    "satelliteConnectivity": "string",
    "ruralConnectivityRate": "string",
    "digitalDivide": "string"
  },

  "socialMedia": {
    "socialMediaPenetration": "string",
    "topPlatforms": [
      { "platform": "string", "users": "string", "penetration": "string" }
    ],
    "bannedPlatforms": ["string"],
    "socialMediaRegulation": "string",
    "influencerEconomy": "string",
    "digitalAdvertisingMarket": "string"
  },

  "techEcosystem": {
    "totalTechStartups": "string",
    "techUnicorns": [
      { "name": "string", "valuation": "string", "sector": "string", "founded": "string" }
    ],
    "majorTechCompanies": [
      { "name": "string", "sector": "string", "revenue": "string", "employees": "string", "founded": "string" }
    ],
    "techHubs": [
      { "city": "string", "nickname": "string", "focus": "string", "companies": "string" }
    ],
    "ventureCapitalInvestment": "string",
    "techIPOs": "string",
    "techEmployment": "string",
    "techSectorGDP": "string",
    "techExports": "string"
  },

  "rAndD": {
    "rAndDSpendingGDP": "string",
    "rAndDSpendingAbsolute": "string",
    "researchersPerMillion": "string",
    "annualPatentsFiled": "string",
    "pctPatentApplications": "string",
    "topResearchInstitutes": ["string"],
    "publicRAndDFunding": "string",
    "privateRAndDFunding": "string",
    "rAndDGrowthRate": "string",
    "nobelPrizesInScience": "string"
  },

  "sectors": {
    "fintech": { "marketSize": "string", "companies": ["string"], "growth": "string", "regulation": "string" },
    "healthtech": { "marketSize": "string", "companies": ["string"], "growth": "string" },
    "edtech": { "marketSize": "string", "companies": ["string"], "growth": "string" },
    "eCommerce": { "marketSize": "string", "topPlatforms": ["string"], "growth": "string", "penetration": "string" },
    "cloudComputing": { "marketSize": "string", "providers": ["string"], "adoption": "string" },
    "artificialIntelligence": { "investmentLevel": "string", "governmentStrategy": "string", "companies": ["string"], "researchInstitutes": ["string"] },
    "semiconductors": { "role": "string", "companies": ["string"], "production": "string" },
    "cybersecurity": { "marketSize": "string", "companies": ["string"], "incidents": "string" },
    "telecommunications": { "majorOperators": ["string"], "infrastructure": "string", "regulation": "string" },
    "gaming": { "marketSize": "string", "developers": ["string"], "players": "string" }
  },

  "space": {
    "spaceAgencyName": "string",
    "founded": "string",
    "budget": "string",
    "majorAchievements": ["string"],
    "currentMissions": ["string"],
    "satellites": "string",
    "launchCapability": "string",
    "internationalPartnerships": ["string"],
    "commercialSpaceCompanies": ["string"],
    "spaceAmbitions": "string"
  },

  "cybersecurity": {
    "nationalCyberStrategy": "string",
    "cyberDefenseAgency": "string",
    "globalCybersecurityIndex": "string",
    "gciRank": "string",
    "majorCyberIncidents": [
      { "year": "string", "incident": "string", "attribution": "string" }
    ],
    "cyberMilitary": "string",
    "dataBreach": "string",
    "criticalInfrastructureProtection": "string",
    "cybercrimeRate": "string"
  },

  "digitalGovernment": {
    "eGovernmentDevelopmentIndex": "string",
    "eGovernmentRank": "string",
    "onlineServicesAvailability": "string",
    "digitalIdentitySystem": "string",
    "openDataPolicy": "string",
    "smartCityPrograms": ["string"],
    "blockchainGovernmentInitiatives": ["string"],
    "digitalCurrencyStatus": "string",
    "citizenDigitalEngagement": "string"
  },

  "manufacturing": {
    "techManufacturingHubs": ["string"],
    "electronicsProduction": "string",
    "roboticsIndex": "string",
    "automationLevel": "string",
    "industryFourPointZeroAdoption": "string",
    "manufacturingTechExports": "string"
  }
}
${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 32768 }
    });

    return safeParse(response.text || '{}', {});
};
