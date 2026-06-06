
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

export const fetchCountryDeepDive = async (countryName: string): Promise<CountryDeepDive> => {
    if (STATIC_COUNTRIES[countryName]) return STATIC_COUNTRIES[countryName];
    
    const cacheKey = `country_poli_v1_full_${countryName.replace(/\s+/g, '_')}`;
    
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
                educationData
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
                fetchEducationProfile(countryName)
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

            return merged as CountryDeepDive;
        } catch (e) { 
            console.error("Country Fetch Critical Failure", e);
            return generateDefaultCountry(countryName); 
        }
    });
};

export const fetchSubDivisions = async (name: string, type: string) => { return []; }; 
export const fetchSpecificList = async (countryName: string, listType: string) => { return []; };
export const fetchElectionDetail = async (country: string, year: string, type: string) => { return {} as ElectionDetail; };
