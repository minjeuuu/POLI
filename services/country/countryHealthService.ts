
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchHealthProfile = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE PUBLIC HEALTH & MEDICAL DOSSIER: ${countryName}
CLASSIFICATION: EXHAUSTIVE HEALTH SYSTEM PROFILE
PROTOCOL: POLI ARCHIVE V2 — MAXIMUM DEPTH

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE health system profile of ${countryName}.

============================================================
SECTION 1: HEALTH SYSTEM OVERVIEW
============================================================
- Health system type (universal, single-payer, insurance-based, out-of-pocket)
- Ministry of Health: name, minister, website, budget
- Health spending as % of GDP, per capita health spending
- Universal health coverage index (UHC)
- WHO ranking
- Health insurance coverage rate

============================================================
SECTION 2: HEALTH INDICATORS
============================================================
- Life expectancy (male, female, overall)
- Infant mortality rate, maternal mortality rate
- Under-5 mortality rate
- Birth rate, death rate, fertility rate
- Leading causes of death (list top 15 with rates)
- Communicable vs non-communicable disease burden
- HIV/AIDS prevalence, malaria prevalence, TB rate
- Obesity rate, malnutrition rate, stunting rate
- Vaccination coverage rates (by vaccine)
- Mental health statistics: depression rate, suicide rate, facilities

============================================================
SECTION 3: HEALTH INFRASTRUCTURE
============================================================
- Total hospitals (public + private), hospital beds per 1000
- Physicians per 1000 population, nurses per 1000
- Major hospitals (list top 20+ with name, location, beds, specialties, website)
- Medical schools (list ALL with name, location, accreditation, website)
- Pharmaceutical industry: major companies, regulatory body (FDA equivalent)
- Blood bank system, organ transplant network
- Emergency medical services (ambulance system, hotlines)

============================================================
SECTION 4: PUBLIC HEALTH PROGRAMS
============================================================
- National vaccination program
- Family planning programs
- Disease control programs (list ALL major ones)
- Nutrition programs
- Water and sanitation initiatives
- Pandemic preparedness and response
- Traditional/alternative medicine recognition and regulation

============================================================
SECTION 5: HEALTH POLICY & REGULATION
============================================================
- Key health laws and legislation
- Drug regulatory authority
- Health technology assessment
- Medical tourism statistics
- International health partnerships (WHO, GAVI, etc.)
- Current health challenges and reform initiatives

RETURN VALID JSON ONLY:
{
    "system": { "type": "string", "ministry": "string", "minister": "string", "website": "string", "budget": "string", "spendingGDP": "string", "perCapita": "string", "uhcIndex": "string", "whoRanking": "string", "insuranceCoverage": "string" },
    "indicators": {
        "lifeExpectancy": { "overall": "string", "male": "string", "female": "string" },
        "infantMortality": "string", "maternalMortality": "string", "under5Mortality": "string",
        "birthRate": "string", "deathRate": "string", "fertilityRate": "string",
        "leadingDeathCauses": [{ "cause": "string", "rate": "string", "rank": 0 }],
        "hivPrevalence": "string", "tbRate": "string", "malariaPrevalence": "string",
        "obesityRate": "string", "malnutritionRate": "string",
        "vaccinationRates": [{ "vaccine": "string", "coverage": "string" }],
        "mentalHealth": { "depressionRate": "string", "suicideRate": "string", "facilities": "string" }
    },
    "infrastructure": {
        "totalHospitals": "string", "bedsPerThousand": "string",
        "physiciansPerThousand": "string", "nursesPerThousand": "string",
        "majorHospitals": [{ "name": "string", "location": "string", "beds": "string", "specialties": ["string"], "website": "string" }],
        "medicalSchools": [{ "name": "string", "location": "string", "accreditation": "string", "website": "string" }],
        "pharmaCompanies": [{ "name": "string", "products": "string" }],
        "regulatoryBody": { "name": "string", "website": "string" },
        "emergencyServices": { "number": "string", "ambulanceSystem": "string" }
    },
    "programs": [{ "name": "string", "focus": "string", "coverage": "string", "description": "string" }],
    "policy": {
        "keyLaws": [{ "name": "string", "year": "string", "description": "string" }],
        "challenges": ["string"],
        "reforms": ["string"],
        "internationalPartners": ["string"],
        "medicalTourism": "string"
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
