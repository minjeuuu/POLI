
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchTechProfile = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE TECHNOLOGY & INNOVATION DOSSIER: ${countryName}
CLASSIFICATION: EXHAUSTIVE DIGITAL & TECH PROFILE
PROTOCOL: POLI ARCHIVE V2 — MAXIMUM DEPTH

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE technology profile of ${countryName}.

============================================================
SECTION 1: DIGITAL INFRASTRUCTURE
============================================================
- Internet penetration rate, broadband coverage
- Average internet speed (download/upload), global ranking
- Mobile penetration rate, smartphone adoption
- 5G rollout status and coverage
- Major telecom operators with market share
- Submarine cable connections
- Data center industry (number, capacity, major operators)
- Cloud computing adoption rate
- E-government services: portal URL, services available, digital ID system

============================================================
SECTION 2: TECH INDUSTRY
============================================================
- Tech sector size (revenue, % of GDP)
- Number of tech companies, startups
- Major tech companies headquartered in country (list 20+ with: name, sector, valuation, CEO, website, employees, founded)
- Major tech hubs/clusters (name, location, companies, description)
- Tech unicorns (if any)
- Foreign tech companies with significant presence
- Top tech employers
- IT outsourcing/BPO industry (if significant)
- Major tech parks and incubators

============================================================
SECTION 3: INNOVATION ECOSYSTEM
============================================================
- Global Innovation Index ranking and score
- R&D spending as % of GDP
- Number of researchers per million population
- Major research institutions and labs (list ALL with: name, affiliation, focus areas, website)
- Patent applications per year
- Top universities for STEM
- Venture capital ecosystem: total funding, major VCs, notable deals
- Government innovation policies and incentives
- Tech transfer offices and programs

============================================================
SECTION 4: EMERGING TECHNOLOGIES
============================================================
- AI/ML: major initiatives, companies, government strategy
- Blockchain/crypto: regulation, adoption, major projects
- Biotechnology: industry size, major companies, regulations
- Space technology: space agency (name, budget, achievements), satellite programs, launch capabilities
- Robotics/automation: adoption rate, major applications
- Quantum computing: research status
- Cybersecurity: national strategy, major incidents, agencies

============================================================
SECTION 5: E-COMMERCE & FINTECH
============================================================
- E-commerce market size, growth rate, major platforms
- Digital payments: adoption rate, major providers
- Fintech landscape: major companies, mobile banking
- Cryptocurrency regulation and adoption
- Digital banking licenses

============================================================
SECTION 6: TECH POLICY & REGULATION
============================================================
- Data protection law (name, year, key provisions)
- Cybercrime law
- Content moderation policies
- AI regulation/ethics framework
- Digital taxation
- Net neutrality status
- Surveillance and privacy concerns
- Digital literacy programs

RETURN VALID JSON ONLY:
{
    "digitalInfra": {
        "internetPenetration": "string", "broadbandCoverage": "string",
        "averageSpeed": { "download": "string", "upload": "string", "globalRank": "string" },
        "mobilePenetration": "string", "smartphoneAdoption": "string",
        "fiveGStatus": "string", "fiveGCoverage": "string",
        "telecomOperators": [{ "name": "string", "marketShare": "string", "subscribers": "string" }],
        "submarineCables": ["string"],
        "dataCenters": { "count": "string", "majorOperators": ["string"] },
        "eGovernment": { "portal": "string", "services": ["string"], "digitalId": "string" }
    },
    "techIndustry": {
        "sectorSize": "string", "gdpPercentage": "string",
        "totalCompanies": "string", "totalStartups": "string",
        "majorCompanies": [{ "name": "string", "sector": "string", "valuation": "string", "ceo": "string", "website": "string", "employees": "string", "founded": "string" }],
        "techHubs": [{ "name": "string", "location": "string", "companies": "string", "description": "string" }],
        "unicorns": [{ "name": "string", "valuation": "string", "sector": "string" }],
        "bpoIndustry": { "revenue": "string", "employees": "string", "majorCompanies": ["string"] }
    },
    "innovation": {
        "giiRanking": "string", "giiScore": "string",
        "rdSpending": "string", "researchersPerMillion": "string",
        "researchInstitutions": [{ "name": "string", "focus": "string", "website": "string" }],
        "patents": "string",
        "vcEcosystem": { "totalFunding": "string", "majorVCs": ["string"] },
        "govPolicies": ["string"]
    },
    "emergingTech": {
        "ai": { "strategy": "string", "majorInitiatives": ["string"], "companies": ["string"] },
        "blockchain": { "regulation": "string", "adoption": "string" },
        "biotech": { "industrySize": "string", "companies": ["string"] },
        "space": { "agency": "string", "budget": "string", "achievements": ["string"], "satellites": "string" },
        "cybersecurity": { "strategy": "string", "agency": "string", "majorIncidents": ["string"] }
    },
    "ecommerce": {
        "marketSize": "string", "growthRate": "string",
        "majorPlatforms": [{ "name": "string", "marketShare": "string" }],
        "digitalPayments": { "adoption": "string", "providers": ["string"] },
        "fintech": [{ "name": "string", "service": "string", "users": "string" }]
    },
    "policy": {
        "dataProtection": { "name": "string", "year": "string", "keyProvisions": ["string"] },
        "cybercrimeLaw": "string",
        "aiRegulation": "string",
        "netNeutrality": "string",
        "surveillance": "string",
        "digitalLiteracy": "string"
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
