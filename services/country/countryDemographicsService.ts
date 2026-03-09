import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { DemographicsProfile } from "../../types";

export const fetchDemographics = async (countryName: string): Promise<DemographicsProfile> => {
    const prompt = `
POLI ARCHIVE — ULTRA-COMPREHENSIVE DEMOGRAPHIC MATRIX: ${countryName}
CLASSIFICATION: EXHAUSTIVE POPULATION & ETHNOGRAPHIC ANALYSIS
PROTOCOL: POLI ARCHIVE V3 — MAXIMUM DETAIL EDITION

${getLanguageInstruction()}

You are POLI, the world's most detailed demographic intelligence system. Generate the COMPLETE, EXHAUSTIVE demographic profile of ${countryName}. You must provide EVERY ethnic group, EVERY religion, EVERY language, EVERY indigenous people — absolutely NO summarization, NO "others" categories, NO truncation. If a country has 200 ethnic groups, list ALL 200. If it has 50 languages, list ALL 50.

THIS IS A ZERO-OMISSION REPORT. Every data point must be included.

═══════════════════════════════════════════════════════════════
SECTION 1: TOTAL POPULATION — EXACT FIGURES & VITAL STATISTICS
═══════════════════════════════════════════════════════════════

Provide ALL of the following with the most recent available data:
- Total population: exact figure (e.g., 331,893,745) with the year of the estimate
- Annual population growth rate (percentage, e.g., 0.58%)
- Population density: persons per km² AND persons per mi²
- Percentage of world population
- Population rank among world nations
- Birth rate (per 1,000 population)
- Death rate (per 1,000 population)
- Infant mortality rate (per 1,000 live births)
- Neonatal mortality rate
- Under-5 mortality rate
- Maternal mortality ratio (per 100,000 live births)
- Total fertility rate (children per woman)
- Net migration rate (per 1,000 population)
- Life expectancy at birth: overall, male, female (exact years, e.g., 78.9 years)
- Healthy life expectancy (HALE)
- Gender ratio: at birth, under 15, 15-64, 65+, total population (males per 100 females)
- Median age: overall, male, female
- Dependency ratio: total, youth, elderly

═══════════════════════════════════════════════════════════════
SECTION 2: AGE DISTRIBUTION — DETAILED POPULATION PYRAMID
═══════════════════════════════════════════════════════════════

Provide population breakdown by age cohort with BOTH percentage and absolute numbers:
- 0-4 years (male/female/total count and percentage)
- 5-9 years (male/female/total count and percentage)
- 10-14 years (male/female/total count and percentage)
- 15-19 years (male/female/total count and percentage)
- 20-24 years (male/female/total count and percentage)
- 25-29 years (male/female/total count and percentage)
- 30-34 years (male/female/total count and percentage)
- 35-39 years (male/female/total count and percentage)
- 40-44 years (male/female/total count and percentage)
- 45-49 years (male/female/total count and percentage)
- 50-54 years (male/female/total count and percentage)
- 55-59 years (male/female/total count and percentage)
- 60-64 years (male/female/total count and percentage)
- 65-69 years (male/female/total count and percentage)
- 70-74 years (male/female/total count and percentage)
- 75-79 years (male/female/total count and percentage)
- 80-84 years (male/female/total count and percentage)
- 85-89 years (male/female/total count and percentage)
- 90+ years (male/female/total count and percentage)
- Pyramid type classification (expansive/constrictive/stationary)
- Demographic transition stage (1-5) with explanation

═══════════════════════════════════════════════════════════════
SECTION 3: URBAN VS RURAL POPULATION
═══════════════════════════════════════════════════════════════

- Urban population: percentage and absolute number
- Rural population: percentage and absolute number
- Rate of urbanization (annual % change)
- Largest cities/urban agglomerations with population (list top 20 minimum):
  city name, metropolitan population, city proper population, percentage of national population
- Megacities (1M+) count
- Slum population percentage (if applicable)
- Urban primacy ratio (largest city vs second largest)

═══════════════════════════════════════════════════════════════
SECTION 4: ALL ETHNIC GROUPS — COMPLETE LIST, NO OMISSIONS
═══════════════════════════════════════════════════════════════

CRITICAL: List EVERY SINGLE ethnic group in ${countryName}. Do NOT use "others" or "remaining groups." If the country has 300 ethnic groups, list all 300.

For EACH ethnic group provide:
- Name (in English and local name if different)
- Percentage of total population
- Estimated population count
- Primary regions/states/provinces where concentrated
- Primary language(s) spoken by this group
- Religion predominantly followed
- Whether they are indigenous/aboriginal
- Subgroups or clans within the ethnic group (if any)
- Brief historical note (origin, migration)
- Current socioeconomic status relative to national average
- Any special constitutional recognition or scheduled status

Also provide:
- Ethnic fractionalization index
- History of ethnic relations (conflicts, integration, segregation)
- Interethnic marriage rates if available
- Government policies on ethnic minorities

═══════════════════════════════════════════════════════════════
SECTION 5: ALL RELIGIONS — COMPLETE BREAKDOWN WITH DENOMINATIONS
═══════════════════════════════════════════════════════════════

CRITICAL: List EVERY religion and EVERY denomination/sect within each religion.

For EACH religion provide:
- Name of religion
- Percentage of total population
- Estimated number of adherents
- ALL denominations/sects/branches within this religion with individual percentages
  (e.g., for Christianity: Catholic %, Protestant %, Orthodox %, Pentecostal %, Baptist %, Methodist %, Anglican %, etc.)
- Major religious institutions, organizations, councils
- Key religious leaders or authorities
- Major places of worship (cathedrals, mosques, temples, etc.)
- Historical arrival/establishment in the country
- Growth or decline trends
- Role in politics and society
- Religious holidays officially recognized

Also provide:
- Religious freedom status and legal framework
- State religion or secular status
- Blasphemy laws, apostasy laws if any
- Interfaith relations
- Historical religious evolution (how the religious landscape changed over centuries)
- Syncretism or folk religion practices
- Atheism/agnosticism/non-religious percentage and trend
- Religious education in schools

═══════════════════════════════════════════════════════════════
SECTION 6: ALL LANGUAGES — COMPLETE LINGUISTIC INVENTORY
═══════════════════════════════════════════════════════════════

CRITICAL: List EVERY language spoken in ${countryName}, including those with very few speakers.

For EACH language provide:
- Language name (English name and endonym)
- Language family and branch (e.g., Indo-European > Germanic > West Germanic)
- Status: official / co-official / national / regional / minority / immigrant / endangered / extinct
- Number of speakers (L1 native speakers and L2 speakers separately)
- Percentage of population
- Regions where spoken
- Script(s) used for writing
- Literacy rate in this language
- Whether it has standardized written form
- UNESCO endangerment classification (safe/vulnerable/definitely endangered/severely endangered/critically endangered)
- Official recognition (constitutional, statutory, etc.)
- Media availability (TV, radio, newspapers in this language)

Also provide:
- Total number of living languages in the country
- Linguistic diversity index
- Official language(s) with full constitutional text reference
- National language(s) vs official language(s) distinction
- Language of instruction in education (primary, secondary, tertiary)
- Sign language(s) used with number of users
- Lingua franca / trade languages
- Colonial language legacy
- Language policy and planning efforts
- Languages used in government, courts, military
- Pidgin and creole languages
- Historical languages no longer spoken

═══════════════════════════════════════════════════════════════
SECTION 7: DIASPORA COMMUNITIES ABROAD
═══════════════════════════════════════════════════════════════

- Total diaspora population estimate
- Top 20 countries with diaspora populations (country, estimated number, percentage of diaspora)
- Major waves of emigration (dates, causes, destinations)
- Remittance inflows (total USD, percentage of GDP)
- Dual citizenship policies
- Diaspora voting rights
- Notable diaspora organizations
- Brain drain statistics (skilled emigration rate)

═══════════════════════════════════════════════════════════════
SECTION 8: IMMIGRATION & EMIGRATION STATISTICS
═══════════════════════════════════════════════════════════════

- Total immigrant population (foreign-born residents)
- Percentage of population that is foreign-born
- Top 15 source countries of immigrants with numbers
- Refugee population (hosted)
- Internally displaced persons (IDPs)
- Asylum seekers
- Stateless persons
- Undocumented/irregular migrants estimate
- Immigration policies and visa categories
- Emigration rate
- Net migration trends over past 20 years
- Work permit / foreign labor statistics

═══════════════════════════════════════════════════════════════
SECTION 9: INDIGENOUS PEOPLES — COMPLETE LIST
═══════════════════════════════════════════════════════════════

CRITICAL: List ALL indigenous/aboriginal/native peoples of ${countryName}.

For EACH indigenous group:
- Name (English and self-designation/autonym)
- Population
- Traditional territory/homeland
- Language(s) — especially if distinct from national language
- Current legal status and land rights
- Degree of assimilation vs cultural preservation
- Major challenges faced
- Protected areas or reservations if any
- UNESCO or international recognition
- Traditional livelihood

═══════════════════════════════════════════════════════════════
SECTION 10: CASTE/CLASS SYSTEMS
═══════════════════════════════════════════════════════════════

- Does a formal or informal caste system exist? Describe in full detail
- Class stratification: upper/middle/lower class percentages
- Social mobility indicators
- Economic inequality by ethnic group, caste, or class
- Legal protections against caste/class discrimination
- Affirmative action or reservation policies
- Historical evolution of the class/caste system

═══════════════════════════════════════════════════════════════
SECTION 11: ETHNIC MINORITIES WITH REGIONAL DATA
═══════════════════════════════════════════════════════════════

For each major ethnic minority (any group under 50% of population):
- Exact population count
- Percentage of national population
- Primary region(s) with percentage of that region's population
- Autonomous regions, special administrative zones, or reserved territories
- Political representation (seats in parliament, local governance)
- Economic indicators compared to national average
- Education levels compared to national average
- Cultural preservation efforts
- Separatist or autonomy movements if any
- Historical grievances or conflicts
- Government policies specifically targeting this minority

═══════════════════════════════════════════════════════════════
SECTION 12: HISTORICAL POPULATION — CENSUS DATA THROUGH DECADES
═══════════════════════════════════════════════════════════════

Provide population for EVERY available census or estimate:
- Pre-colonial/ancient estimates if available
- 1800, 1850, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, latest
- For each: year, population, source (census/estimate), growth rate from previous
- Major demographic events: famines, plagues, wars, migrations that caused population changes
- Demographic transition timeline
- Urbanization rate changes through decades

═══════════════════════════════════════════════════════════════
SECTION 13: POPULATION PROJECTIONS
═══════════════════════════════════════════════════════════════

- 2025 projection
- 2030 projection
- 2040 projection
- 2050 projection
- 2075 projection
- 2100 projection
- Peak population year (if applicable) and expected peak
- Projected median age in 2050
- Projected urban percentage in 2050
- Projected dependency ratio in 2050
- Key demographic challenges (aging, youth bulge, decline, etc.)

═══════════════════════════════════════════════════════════════
SECTION 14: SOCIAL INDICATORS
═══════════════════════════════════════════════════════════════

- Human Development Index (HDI): score, rank, category
- Gender Development Index (GDI)
- Gender Inequality Index (GII)
- Gini coefficient (income inequality)
- Multidimensional Poverty Index (MPI)
- Poverty rate (national poverty line and international $2.15/day)
- Literacy rate: overall, male, female, youth
- Education enrollment: primary, secondary, tertiary (gross and net)
- Mean years of schooling
- Expected years of schooling
- Unemployment rate: overall, youth, male, female
- Labor force participation rate by gender
- Access to clean water percentage
- Access to sanitation percentage
- Access to electricity percentage
- Internet penetration rate
- Mobile phone subscriptions per 100 people

═══════════════════════════════════════════════════════════════

RETURN VALID JSON ONLY. No commentary, no markdown, no explanation outside the JSON:
{
    "population": {
        "total": "exact figure with year",
        "growthRate": "annual percentage",
        "density": "per km² and per mi²",
        "worldPercentage": "string",
        "worldRank": "string",
        "birthRate": "per 1,000",
        "deathRate": "per 1,000",
        "infantMortality": "per 1,000 live births",
        "neonatalMortality": "string",
        "under5Mortality": "string",
        "maternalMortality": "per 100,000 live births",
        "fertilityRate": "children per woman",
        "netMigration": "per 1,000",
        "lifeExpectancy": { "overall": "string", "male": "string", "female": "string", "hale": "string" },
        "genderRatio": { "atBirth": "string", "under15": "string", "working": "string", "elderly": "string", "total": "string" },
        "medianAge": { "overall": "string", "male": "string", "female": "string" },
        "dependencyRatio": { "total": "string", "youth": "string", "elderly": "string" }
    },
    "ageDistribution": [
        { "cohort": "0-4", "male": "string", "female": "string", "total": "string", "percentage": "string" }
    ],
    "pyramidType": "string",
    "demographicTransitionStage": "string",
    "urbanRural": {
        "urbanPercent": "string",
        "urbanPopulation": "string",
        "ruralPercent": "string",
        "ruralPopulation": "string",
        "urbanizationRate": "string",
        "urbanPrimacyRatio": "string",
        "slumPopulationPercent": "string",
        "majorCities": [
            { "name": "string", "metroPopulation": "string", "cityPopulation": "string", "percentOfNational": "string" }
        ]
    },
    "ethnicGroups": [
        {
            "name": "string",
            "localName": "string",
            "percentage": "string",
            "population": "string",
            "regions": "string",
            "language": "string",
            "religion": "string",
            "indigenous": "boolean as string",
            "subgroups": ["string"],
            "historicalNote": "string",
            "socioeconomicStatus": "string",
            "constitutionalRecognition": "string"
        }
    ],
    "ethnicFractionalizationIndex": "string",
    "ethnicRelationsHistory": "string (detailed, 200+ words)",
    "interethnicMarriageRate": "string",
    "ethnicMinorityPolicies": "string",
    "religions": [
        {
            "name": "string",
            "percentage": "string",
            "adherents": "string",
            "denominations": [{ "name": "string", "percentage": "string", "adherents": "string" }],
            "institutions": ["string"],
            "leaders": ["string"],
            "majorWorshipSites": ["string"],
            "historicalArrival": "string",
            "growthTrend": "string",
            "roleInPolitics": "string",
            "officialHolidays": ["string"]
        }
    ],
    "religiousFreedom": "string",
    "stateReligion": "string",
    "blasphemyApostasyLaws": "string",
    "interfaithRelations": "string",
    "religiousHistory": "string (detailed, 300+ words)",
    "syncretismFolkReligion": "string",
    "nonReligiousPercent": "string",
    "religiousEducation": "string",
    "languages": [
        {
            "name": "string",
            "endonym": "string",
            "family": "string",
            "status": "official/national/regional/minority/immigrant/endangered",
            "nativeSpeakers": "string",
            "l2Speakers": "string",
            "totalSpeakers": "string",
            "percentage": "string",
            "regions": "string",
            "script": "string",
            "literacyRate": "string",
            "hasStandardWrittenForm": "string",
            "unescoStatus": "string",
            "officialRecognition": "string",
            "mediaAvailability": "string"
        }
    ],
    "totalLivingLanguages": "string",
    "linguisticDiversityIndex": "string",
    "officialLanguages": ["string"],
    "nationalLanguages": ["string"],
    "languageOfInstruction": { "primary": "string", "secondary": "string", "tertiary": "string" },
    "signLanguages": [{ "name": "string", "users": "string" }],
    "linguaFranca": ["string"],
    "colonialLanguageLegacy": "string",
    "languagePolicy": "string",
    "governmentLanguages": "string",
    "pidginCreoleLanguages": ["string"],
    "historicalExtinctLanguages": ["string"],
    "endangeredLanguages": [{ "name": "string", "speakers": "string", "status": "string" }],
    "diaspora": {
        "totalPopulation": "string",
        "topCountries": [{ "country": "string", "population": "string", "percentage": "string" }],
        "majorWaves": [{ "period": "string", "cause": "string", "destination": "string", "numbers": "string" }],
        "remittances": { "totalUSD": "string", "percentGDP": "string" },
        "dualCitizenshipPolicy": "string",
        "diasporaVotingRights": "string",
        "notableOrganizations": ["string"],
        "brainDrainRate": "string"
    },
    "immigration": {
        "totalImmigrants": "string",
        "percentForeignBorn": "string",
        "topSourceCountries": [{ "country": "string", "population": "string" }],
        "refugees": "string",
        "idps": "string",
        "asylumSeekers": "string",
        "statelessPersons": "string",
        "undocumentedEstimate": "string",
        "immigrationPolicy": "string",
        "emigrationRate": "string",
        "netMigrationTrend": "string",
        "foreignLaborStats": "string"
    },
    "indigenousPeoples": [
        {
            "name": "string",
            "autonym": "string",
            "population": "string",
            "traditionalTerritory": "string",
            "languages": ["string"],
            "legalStatus": "string",
            "landRights": "string",
            "assimilationLevel": "string",
            "challenges": "string",
            "protectedAreas": "string",
            "internationalRecognition": "string",
            "traditionalLivelihood": "string"
        }
    ],
    "casteClassSystem": {
        "exists": "string",
        "description": "string (detailed)",
        "classStratification": { "upper": "string", "middle": "string", "lower": "string" },
        "socialMobility": "string",
        "inequalityByGroup": "string",
        "legalProtections": "string",
        "affirmativeAction": "string",
        "historicalEvolution": "string"
    },
    "ethnicMinoritiesRegional": [
        {
            "group": "string",
            "population": "string",
            "percentNational": "string",
            "primaryRegions": "string",
            "percentOfRegion": "string",
            "autonomousZones": "string",
            "politicalRepresentation": "string",
            "economicIndicators": "string",
            "educationLevels": "string",
            "culturalPreservation": "string",
            "separatistMovements": "string",
            "historicalGrievances": "string",
            "governmentPolicies": "string"
        }
    ],
    "historicalPopulation": [
        { "year": "string", "population": "string", "source": "census/estimate", "growthFromPrevious": "string" }
    ],
    "majorDemographicEvents": [{ "event": "string", "year": "string", "populationImpact": "string" }],
    "demographicTransitionTimeline": "string",
    "urbanizationHistory": "string",
    "populationProjections": [
        { "year": "string", "population": "string" }
    ],
    "peakPopulation": { "year": "string", "expected": "string" },
    "projectedMedianAge2050": "string",
    "projectedUrbanPercent2050": "string",
    "projectedDependencyRatio2050": "string",
    "keyDemographicChallenges": ["string"],
    "socialIndicators": {
        "hdi": "string", "hdiRank": "string", "hdiCategory": "string",
        "gdi": "string", "gii": "string",
        "gini": "string",
        "mpi": "string",
        "povertyRate": { "national": "string", "international": "string" },
        "literacyRate": { "overall": "string", "male": "string", "female": "string", "youth": "string" },
        "education": {
            "primaryEnrollment": "string", "secondaryEnrollment": "string", "tertiaryEnrollment": "string",
            "meanYearsSchooling": "string", "expectedYearsSchooling": "string"
        },
        "unemployment": { "overall": "string", "youth": "string", "male": "string", "female": "string" },
        "laborForceParticipation": { "male": "string", "female": "string" },
        "accessCleanWater": "string",
        "accessSanitation": "string",
        "accessElectricity": "string",
        "internetPenetration": "string",
        "mobileSubscriptions": "string"
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {}) as DemographicsProfile;
};
