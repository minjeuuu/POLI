
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchTourismProfile = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE TOURISM & TRAVEL DOSSIER: ${countryName}
CLASSIFICATION: EXHAUSTIVE TOURISM PROFILE
PROTOCOL: POLI ARCHIVE V2 — MAXIMUM DEPTH

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE tourism profile of ${countryName}.

============================================================
SECTION 1: TOURISM OVERVIEW
============================================================
- Annual tourist arrivals (number, trend), tourism revenue
- Tourism as % of GDP, employment in tourism sector
- Tourism ministry/board: name, head, website
- Tourism ranking (UNWTO)
- Major source markets (top 15 countries sending tourists)

============================================================
SECTION 2: ATTRACTIONS
============================================================
A. UNESCO WORLD HERITAGE SITES (list ALL):
   - Name, type (cultural/natural/mixed), year inscribed, location, description

B. TOP TOURIST DESTINATIONS (list 30+):
   - Name, location, type (beach/mountain/city/historical/religious), annual visitors, description, entrance fee

C. NATURAL ATTRACTIONS:
   - National parks, beaches, mountains, lakes, caves, waterfalls, coral reefs, wildlife reserves

D. CULTURAL ATTRACTIONS:
   - Museums, temples, churches, palaces, historical sites, cultural villages

E. MODERN ATTRACTIONS:
   - Theme parks, shopping districts, entertainment venues, nightlife areas

============================================================
SECTION 3: PRACTICAL INFORMATION
============================================================
A. VISA:
   - Visa-free countries (list ALL), visa-on-arrival countries
   - Visa application process, requirements, fees
   - E-visa availability

B. TRANSPORTATION:
   - How to get there (major international flights)
   - Internal transport: domestic flights, trains, buses, ferries, ride-hailing
   - Driving: license requirements, road conditions

C. ACCOMMODATION:
   - Types available (luxury to budget), average prices
   - Major hotel chains present, homestay/airbnb availability
   - Tourist areas/zones

D. SAFETY:
   - Travel advisory level (US State Dept, UK FCO)
   - Areas to avoid
   - Common scams, health risks, natural disaster risks
   - Emergency numbers

E. CURRENCY & COSTS:
   - Currency, exchange rate, ATM availability
   - Average daily budget (budget/mid-range/luxury)
   - Tipping customs

F. SEASONS:
   - Best time to visit, peak season, off-season
   - Weather by month
   - Major events/festivals calendar

============================================================
SECTION 4: SPECIALIZED TOURISM
============================================================
- Ecotourism destinations and programs
- Medical tourism: procedures, hospitals, costs
- Adventure tourism: diving, trekking, surfing spots
- Cultural/heritage tourism routes
- Religious/pilgrimage tourism
- Food tourism hotspots
- Political tourism: government buildings, historical political sites open to public

RETURN VALID JSON ONLY:
{
    "overview": { "annualArrivals": "string", "revenue": "string", "gdpPercentage": "string", "employment": "string", "tourismBoard": { "name": "string", "head": "string", "website": "string" }, "ranking": "string", "topSourceMarkets": [{ "country": "string", "visitors": "string" }] },
    "attractions": {
        "worldHeritage": [{ "name": "string", "type": "string", "year": "string", "location": "string", "description": "string" }],
        "topDestinations": [{ "name": "string", "location": "string", "type": "string", "visitors": "string", "description": "string", "fee": "string" }],
        "naturalAttractions": [{ "name": "string", "type": "string", "location": "string", "description": "string" }],
        "culturalAttractions": [{ "name": "string", "type": "string", "location": "string", "description": "string" }],
        "modernAttractions": [{ "name": "string", "type": "string", "location": "string" }]
    },
    "practical": {
        "visa": { "visaFreeCountries": ["string"], "visaOnArrival": ["string"], "eVisa": "string", "process": "string", "fee": "string" },
        "transport": { "majorAirports": ["string"], "domesticFlights": "string", "trains": "string", "buses": "string", "rideHailing": ["string"] },
        "accommodation": { "types": ["string"], "avgPrices": { "budget": "string", "midRange": "string", "luxury": "string" }, "majorChains": ["string"] },
        "safety": { "advisoryLevel": "string", "areasToAvoid": ["string"], "emergencyNumbers": { "police": "string", "ambulance": "string", "fire": "string", "tourist": "string" } },
        "costs": { "currency": "string", "dailyBudget": { "budget": "string", "midRange": "string", "luxury": "string" }, "tipping": "string" },
        "bestTimeToVisit": "string",
        "peakSeason": "string",
        "festivals": [{ "name": "string", "month": "string", "description": "string" }]
    },
    "specialized": {
        "ecotourism": [{ "name": "string", "location": "string", "description": "string" }],
        "medicalTourism": { "overview": "string", "popularProcedures": ["string"], "hospitals": ["string"] },
        "adventure": [{ "activity": "string", "location": "string", "description": "string" }],
        "politicalTourism": [{ "name": "string", "location": "string", "description": "string", "openToPublic": true }]
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
