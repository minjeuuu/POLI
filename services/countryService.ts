
import { generateWithFallback, safeParse, withCache, getLanguageInstruction, deepMerge } from "./common";
import { CountryDeepDive, ElectionDetail } from "../types";
import { generateDefaultCountry } from "./countryFallback";
import { STATIC_COUNTRIES } from "../data/staticCountries";

// Sub-services
import { fetchCountryNews } from "./country/countryNewsService";
import { fetchCountryMaps } from "./country/countryMapService";
import { fetchCountryImages } from "./country/countryImageService";
import { fetchCountryTimeline } from "./country/countryTimelineService";
import { fetchInfrastructureProfile } from "./country/countryInfrastructureService";
import { fetchAcademicProfile } from "./country/countryAcademicService";
import { fetchLegalProfile } from "./country/countryLegalService";
import { fetchGlobalProfile } from "./country/countryGlobalService";
import { fetchCountryIdentity } from "./country/countryIdentityService";
import { fetchCountryGovernment } from "./country/countryGovernmentService";
import { fetchCountryHistory } from "./country/countryHistoryService";
import { fetchCountryAnalysis } from "./country/countryAnalysisService";
import { fetchDemographics } from "./country/countryDemographicsService";
import { fetchEconomy } from "./country/countryEconomyService";
import { fetchPolitics } from "./country/countryPoliticsService";
import { fetchSymbols } from "./country/countrySymbolsService";
import { fetchGeography } from "./country/countryGeographyService";
// New Fetchers
import { fetchEnvironmentProfile } from "./country/countryEnvironmentService";
import { fetchTechProfile } from "./country/countryTechService";
import { fetchSocietyProfile } from "./country/countrySocietyService";
import { fetchTourismProfile } from "./country/countryTourismService";
import { fetchCultureProfile } from "./country/countryCultureService";
import { fetchHealthProfile } from "./country/countryHealthService";
import { fetchEducationProfile } from "./country/countryEducationService";

const fetchRestCountriesData = async (countryName: string): Promise<{ coatOfArmsUrl?: string; flagUrl?: string; alpha2?: string }> => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=coatOfArms,flags,cca2`, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) return {};
        const data = await res.json();
        const c = Array.isArray(data) ? data[0] : data;
        return {
            coatOfArmsUrl: c?.coatOfArms?.png || c?.coatOfArms?.svg || '',
            flagUrl: c?.flags?.png || c?.flags?.svg || '',
            alpha2: c?.cca2?.toLowerCase() || ''
        };
    } catch {
        return {};
    }
};

export const fetchCountryDeepDive = async (countryName: string): Promise<CountryDeepDive> => {
    if (STATIC_COUNTRIES[countryName]) return STATIC_COUNTRIES[countryName];

    const cacheKey = `country_poli_v2_full_${countryName.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const defaultData = generateDefaultCountry(countryName);
            
            // POLI SWARM: MASSIVE PARALLEL FETCH (Updated with new sections)
            const [
                identityData,
                govData,
                historyData,
                legalData,
                academicData,
                infraData,
                globalData,
                newsData,
                mapsData,
                imagesData,
                analysisData,
                demographicsData,
                economyData,
                politicsData,
                symbolsData,
                geographyData,
                // New Data
                envData,
                techData,
                societyData,
                tourismData,
                cultureData,
                healthData,
                educationData,
                restData
            ] = await Promise.all([
                fetchCountryIdentity(countryName),
                fetchCountryGovernment(countryName),
                fetchCountryHistory(countryName),
                fetchLegalProfile(countryName),
                fetchAcademicProfile(countryName),
                fetchInfrastructureProfile(countryName),
                fetchGlobalProfile(countryName),
                fetchCountryNews(countryName),
                fetchCountryMaps(countryName),
                fetchCountryImages(countryName),
                fetchCountryAnalysis(countryName),
                fetchDemographics(countryName),
                fetchEconomy(countryName),
                fetchPolitics(countryName),
                fetchSymbols(countryName),
                fetchGeography(countryName),
                fetchEnvironmentProfile(countryName),
                fetchTechProfile(countryName),
                fetchSocietyProfile(countryName),
                fetchTourismProfile(countryName),
                fetchCultureProfile(countryName),
                fetchHealthProfile(countryName),
                fetchEducationProfile(countryName),
                fetchRestCountriesData(countryName)
            ]);

            // Base Merge
            let merged = deepMerge(defaultData, identityData);
            merged = deepMerge(merged, govData);
            merged = deepMerge(merged, historyData);
            
            // Attach specialized objects
            merged.legal = legalData;
            merged.academic = academicData;
            merged.infrastructure = infraData;
            merged.global = globalData;
            merged.today.news = newsData;
            merged.geography = deepMerge(merged.geography, geographyData);
            merged.geography.maps = mapsData;
            merged.imageArchive = imagesData;
            
            // Standard Sections
            merged.analysis = analysisData;
            merged.demographics = demographicsData;
            merged.economy = deepMerge(merged.economy, economyData);
            merged.politics = politicsData;
            merged.symbols = symbolsData;

            // New Extended Sections (Attached loosely to keep type safety flexible if types aren't fully updated yet)
            (merged as any).environment = envData;
            (merged as any).technology = techData;
            (merged as any).society = societyData;
            (merged as any).tourism = tourismData;
            (merged as any).culture = cultureData;
            (merged as any).health = healthData;
            (merged as any).education = educationData;

            // Enrich with REST Countries data (coat of arms, reliable flag fallback)
            if (restData.coatOfArmsUrl) {
                if (!merged.identity) (merged as any).identity = {};
                if (!(merged.identity as any).coatOfArms) (merged.identity as any).coatOfArms = {};
                if (!(merged.identity as any).coatOfArms.imageUrl) {
                    (merged.identity as any).coatOfArms.imageUrl = restData.coatOfArmsUrl;
                }
                if (merged.symbols?.coatOfArms && !(merged.symbols.coatOfArms as any).imageUrl) {
                    (merged.symbols.coatOfArms as any).imageUrl = restData.coatOfArmsUrl;
                }
            }
            if (restData.alpha2 && merged.identity) {
                if (!merged.identity.isoCodes) (merged.identity as any).isoCodes = {};
                if (!merged.identity.isoCodes.alpha2) {
                    (merged.identity.isoCodes as any).alpha2 = restData.alpha2.toUpperCase();
                }
                const a2 = (merged.identity.isoCodes.alpha2 || restData.alpha2).toLowerCase();
                if (merged.identity.flag) {
                    merged.identity.flag.imageUrl = `https://flagcdn.com/w320/${a2}.png`;
                }
            }

            return merged as CountryDeepDive;
        } catch (e) { 
            console.error("Country Fetch Critical Failure", e);
            return generateDefaultCountry(countryName); 
        }
    });
};

/**
 * DRILL-DOWN: Fetch subdivisions of a given parent administrative unit.
 * e.g. fetchSubDivisions("Philippines", "Region", "National Capital Region")
 */
export const fetchSubDivisions = async (countryName: string, parentType: string, parentName?: string): Promise<any[]> => {
    const cacheKey = `subdiv_poli_v2_${countryName}_${parentType}_${parentName || 'root'}`.replace(/\s+/g, '_');
    return withCache(cacheKey, async () => {
        const prompt = `
POLI ARCHIVE — ADMINISTRATIVE SUBDIVISION DRILL-DOWN: ${countryName}
PARENT LEVEL: ${parentType}
${parentName ? `PARENT UNIT: ${parentName}` : 'ROOT LEVEL — list all top-level divisions'}

You are POLI. Provide the COMPLETE list of ALL administrative subdivisions under the specified parent.

RULES:
- List EVERY SINGLE subdivision. If there are 80 provinces, list ALL 80. If there are 1500 municipalities, list ALL 1500.
- Do NOT summarize, abbreviate, or say "and X more". List them ALL.
- For each subdivision provide: name, type (province/city/municipality/district/barangay/county/state etc.), population (approximate), capital/center, area, current chief executive (governor/mayor/head), their party affiliation.
- If this is the lowest level (e.g., barangays), just list name, population, and barangay captain/chief.
- Include any special status designations (independent city, highly urbanized city, component city, etc.)

RETURN VALID JSON ONLY:
{
    "parentName": "${parentName || countryName}",
    "parentType": "${parentType}",
    "subdivisionType": "string (what type the children are)",
    "totalCount": 0,
    "hasNextLevel": true,
    "nextLevelType": "string (what the next drill-down level is called)",
    "subdivisions": [
        {
            "name": "string",
            "type": "string",
            "population": "string",
            "area": "string",
            "capital": "string",
            "head": { "name": "string", "title": "string", "party": "string" },
            "status": "string",
            "code": "string"
        }
    ]
}`;
        const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
        const parsed = safeParse(response.text || '[]', []) as any;
        return parsed.subdivisions || (Array.isArray(parsed) ? parsed : []);
    });
};

/**
 * DRILL-DOWN: Fetch a specific list of items (legislators, agencies, universities, etc.)
 */
export const fetchSpecificList = async (countryName: string, listType: string): Promise<any[]> => {
    const cacheKey = `speclist_poli_v2_${countryName}_${listType}`.replace(/\s+/g, '_');
    return withCache(cacheKey, async () => {
        const prompt = `
POLI ARCHIVE — COMPLETE ${listType.toUpperCase()} LIST: ${countryName}
CLASSIFICATION: EXHAUSTIVE ROSTER

You are POLI. Provide the COMPLETE, EXHAUSTIVE list of ALL ${listType} for ${countryName}.

CRITICAL: List EVERY SINGLE entry. Do NOT summarize or abbreviate. If there are 300 members, list ALL 300. If there are 50 universities, list ALL 50.

For each entry, provide as much detail as possible: full name, title/position, party/affiliation, district/location, date appointed/elected, website URL (real, verified), logo/seal description, contact info if public.

RETURN VALID JSON ONLY — array of objects:
[
    {
        "name": "string",
        "title": "string",
        "detail": "string",
        "party": "string",
        "district": "string",
        "since": "string",
        "website": "string",
        "logoUrl": "string",
        "description": "string"
    }
]`;
        const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
        const parsed = safeParse(response.text || '[]', []);
        return Array.isArray(parsed) ? parsed : [];
    });
};

export const fetchElectionDetail = async (country: string, year: string, type: string): Promise<ElectionDetail> => {
    const cacheKey = `election_poli_v2_${country}_${year}_${type}`.replace(/\s+/g, '_');
    return withCache(cacheKey, async () => {
        const prompt = `
POLI ARCHIVE — COMPLETE ELECTION DETAIL: ${country} ${year} ${type}

Provide the COMPLETE results of the ${year} ${type} election in ${country}.
List ALL candidates, their parties, vote counts, vote percentages, districts won.
Include turnout, electoral system used, controversies, international observers' assessment.

RETURN VALID JSON:
{
    "country": "${country}",
    "year": "${year}",
    "type": "${type}",
    "electoralSystem": "string",
    "turnout": "string",
    "totalVoters": "string",
    "registeredVoters": "string",
    "results": [{ "candidate": "string", "party": "string", "votes": "string", "percentage": "string", "status": "string" }],
    "districtResults": [{ "district": "string", "winner": "string", "party": "string" }],
    "analysis": "string (500+ words)",
    "controversies": ["string"],
    "observers": [{ "org": "string", "assessment": "string" }]
}`;
        const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
        return safeParse(response.text || '{}', {} as ElectionDetail);
    });
};
