
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchInfrastructureProfile = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE NATIONAL INFRASTRUCTURE PROFILE: ${countryName}
CLASSIFICATION: EXHAUSTIVE INFRASTRUCTURE & LOGISTICS DOSSIER
PROTOCOL: POLI ARCHIVE V2 — MAXIMUM DEPTH

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE infrastructure profile of ${countryName}. Every road, every port, every power plant.

============================================================
SECTION 1: TRANSPORT INFRASTRUCTURE
============================================================

A. ROADS & HIGHWAYS:
   - Total road network (km), paved vs unpaved percentage
   - Major highways and expressways (list ALL with route numbers, length, endpoints)
   - Road quality index, maintenance budget
   - Notable bridges (list major ones with length, type, year built)
   - Notable tunnels

B. RAIL:
   - Total rail network (km), gauge types
   - Passenger rail: routes, operators, ridership
   - High-speed rail (if any): routes, speeds, stations
   - Metro/subway systems (list ALL cities with metros): lines, stations, ridership
   - Light rail / tram systems
   - Freight rail: volume, major routes

C. AVIATION:
   - ALL international airports: name, IATA code, city, annual passengers, runways, airlines serving
   - Major domestic airports
   - National airline(s): name, fleet size, destinations, alliance membership, website
   - Air traffic volume, civil aviation authority

D. MARITIME:
   - ALL major ports: name, location, type (cargo/container/passenger), annual throughput
   - Merchant marine: fleet size, flag state
   - Major shipping routes, ferry services
   - Naval bases (if public)

E. PUBLIC TRANSIT:
   - Bus rapid transit systems
   - Jeepney/tuk-tuk/minibus networks (country-specific)
   - Ride-hailing services available

============================================================
SECTION 2: ENERGY INFRASTRUCTURE
============================================================

A. ELECTRICITY:
   - Total installed capacity (MW/GW)
   - Generation mix: coal %, natural gas %, hydroelectric %, nuclear %, solar %, wind %, geothermal %, other %
   - Major power plants (list top 10+ with name, type, capacity, location)
   - Electrification rate, grid coverage
   - Power utility companies (list ALL major ones)
   - Per capita consumption

B. OIL & GAS:
   - Proven reserves, production volume, refineries
   - Major pipelines, import/export terminals

C. RENEWABLE ENERGY:
   - Solar farms, wind farms, hydroelectric dams (list major ones)
   - Renewable energy targets and progress
   - Geothermal plants (if applicable)

============================================================
SECTION 3: TELECOMMUNICATIONS
============================================================

A. MOBILE:
   - Total subscribers, penetration rate
   - Major operators (list ALL with market share, network type 4G/5G, subscribers)
   - 5G rollout status, coverage

B. INTERNET:
   - Fixed broadband subscribers, penetration
   - Average speed (download/upload)
   - Major ISPs (list ALL)
   - Submarine cables connecting the country
   - Data centers

C. BROADCASTING:
   - Major TV networks (list ALL with ownership, type)
   - Major radio networks
   - Press freedom status

============================================================
SECTION 4: WATER & SANITATION
============================================================
- Access to clean water (urban vs rural)
- Sanitation coverage
- Major water utilities, dams, reservoirs
- Irrigation infrastructure

============================================================
SECTION 5: HOUSING & CONSTRUCTION
============================================================
- Urbanization rate, major construction projects
- Smart city initiatives
- Housing affordability index

RETURN VALID JSON ONLY:
{
    "transport": {
        "roads": { "totalKm": "string", "pavedPercentage": "string", "highways": [{ "name": "string", "length": "string", "route": "string" }], "bridges": [{ "name": "string", "length": "string", "type": "string" }] },
        "rail": { "totalKm": "string", "highSpeed": { "exists": true, "routes": [{ "name": "string", "speed": "string" }] }, "metro": [{ "city": "string", "lines": 0, "stations": 0, "ridership": "string" }], "operators": ["string"] },
        "aviation": { "internationalAirports": [{ "name": "string", "iata": "string", "city": "string", "passengers": "string" }], "nationalAirline": { "name": "string", "fleet": "string", "destinations": 0, "alliance": "string", "website": "string" }, "civilAuthority": "string" },
        "maritime": { "ports": [{ "name": "string", "city": "string", "type": "string", "throughput": "string" }], "merchantMarine": "string" },
        "publicTransit": ["string"]
    },
    "energy": {
        "installedCapacity": "string",
        "generationMix": [{ "source": "string", "percentage": "string", "capacity": "string" }],
        "majorPlants": [{ "name": "string", "type": "string", "capacity": "string", "location": "string" }],
        "electrificationRate": "string",
        "utilities": [{ "name": "string", "type": "string", "coverage": "string" }],
        "oilGas": { "reserves": "string", "production": "string", "refineries": [{ "name": "string", "capacity": "string" }] },
        "renewables": { "targets": "string", "progress": "string", "majorProjects": [{ "name": "string", "type": "string", "capacity": "string" }] }
    },
    "telecom": {
        "mobileSubscribers": "string", "penetrationRate": "string",
        "operators": [{ "name": "string", "marketShare": "string", "technology": "string", "subscribers": "string" }],
        "internet": { "broadbandSubscribers": "string", "averageSpeed": "string", "isps": ["string"], "submarineCables": ["string"] },
        "broadcasting": { "tvNetworks": [{ "name": "string", "type": "string", "ownership": "string" }], "radioNetworks": ["string"] },
        "fiveGStatus": "string"
    },
    "water": { "cleanWaterAccess": "string", "sanitationCoverage": "string", "majorDams": [{ "name": "string", "capacity": "string" }] },
    "construction": { "urbanizationRate": "string", "majorProjects": [{ "name": "string", "status": "string", "cost": "string" }] }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
