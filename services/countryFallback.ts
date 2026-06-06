


import { CountryDeepDive } from "../types";

export const getStandardAgencies = (country: string) => [
    { name: `Ministry of Foreign Affairs`, type: "Ministry", purpose: "International Relations", website: "#", head: "Minister" },
    { name: `Ministry of Finance`, type: "Ministry", purpose: "Budget & Economy", website: "#", head: "Minister" },
    { name: `Ministry of Defense`, type: "Ministry", purpose: "National Security", website: "#", head: "Minister" },
    { name: `Ministry of Interior`, type: "Ministry", purpose: "Internal Affairs", website: "#", head: "Minister" },
    { name: `Ministry of Health`, type: "Ministry", purpose: "Public Health", website: "#", head: "Minister" },
    { name: `Ministry of Education`, type: "Ministry", purpose: "Education Policy", website: "#", head: "Minister" },
    { name: `Ministry of Justice`, type: "Ministry", purpose: "Legal Affairs", website: "#", head: "Minister" },
    { name: `Central Bank`, type: "Bank", purpose: "Monetary Policy", website: "#", head: "Governor" }
];

export const getStandardParties = (country: string) => [
    { name: "Ruling Party", abbr: "RP", ideology: "Centrist", position: "Government", status: "Active", seats: "Majority", leader: "Party Leader" },
    { name: "Opposition Party", abbr: "OP", ideology: "Alternative", position: "Opposition", status: "Active", seats: "Minority", leader: "Opposition Leader" }
];

export const generateDefaultCountry = (nameInput: string): CountryDeepDive => {
    const name = nameInput || "Unknown Country";
    const safeName = name.length >= 3 ? name : name + "   "; // Ensure minimum length for substring

    return {
        identity: {
            officialName: `The Nation of ${name}`,
            nativeName: { name: name, script: "Latin", romanization: name, pronunciation: name, meaning: "Land of the People" },
            commonName: name,
            motto: { text: "Unity, Liberty, Justice", romanization: "Unity, Liberty, Justice", translation: "Unity, Liberty, Justice", language: "English" },
            currency: { name: "National Unit", code: "CUR", symbol: "$" },
            flag: { description: "National flag.", symbolism: "Represents sovereignty.", history: "Historical origin.", designer: "Unknown", adopted: "Independence" },
            coatOfArms: { description: "State emblem.", elements: ["Shield", "Supporters"], history: "Traditional design.", variants: [] },
            isoCodes: { alpha2: safeName.substring(0,2).toUpperCase(), alpha3: safeName.substring(0,3).toUpperCase(), numeric: "000" },
            internetTLD: `.${safeName.substring(0,2).toLowerCase()}`,
            callingCode: "+00",
            demonym: { singular: "Citizen", plural: "Citizens", adjective: "National" },
            nationalFlower: "Local Flora",
            nationalBird: "Local Fauna",
            nationalTree: "Local Flora",
            nationalAnimal: "Local Fauna",
            nationalDish: "Traditional Dish",
            nationalAnthem: { name: "National Anthem", composer: "Unknown", year: "1900", lyrics: "Lyrics...", native: "Lyrics...", translation: "Lyrics..." }
        },
        geography: {
            capitals: [{ name: "Capital City", type: "Administrative", population: "1M+", coordinates: "0,0" }],
            totalArea: "100,000 km²",
            landArea: "90,000 km²",
            waterArea: "10,000 km²",
            coastline: "1000 km",
            borders: [{ country: "Neighbor", length: "500 km" }],
            climateZones: ["Temperate", "Tropical"],
            terrain: ["Mountains", "Plains"],
            hierarchy: [],
            highestPoint: { name: "Mount Summit", elevation: "2000m" },
            lowestPoint: { name: "Sea Level", elevation: "0m" },
            majorRivers: ["River Alpha", "River Beta"],
            naturalResources: ["Minerals", "Agriculture"],
            naturalHazards: ["Floods", "Droughts"],
            environmentalIssues: ["Deforestation", "Pollution"],
            timeZones: ["UTC+0"],
            landUse: { arable: "10%", crops: "5%", pasture: "20%", forest: "30%" },
            adminDivisions: {
                level1: [{ name: "Region 1", type: "Region", official: "Region 1" }]
            }
        },
        demographics: {
            population: { total: "10 Million", density: "100/km²", growthRate: "1.2%" },
            ethnicGroups: [{ name: "Major Group", percentage: "60%" }, { name: "Minor Group", percentage: "40%" }],
            religions: [{ name: "Major Faith", percentage: "70%" }],
            languages: [{ name: "Official Language", status: "Official", percentage: "90%" }],
            medianAge: "30",
        },
        government: {
            form: "Unitary Republic",
            headOfState: { title: "President", name: "Current Incumbent", method: "Election", termLength: "5 Years", residence: "Presidential Palace", party: "Ruling Party", since: "2020" },
            headOfGov: { title: "Prime Minister", name: "Head of Gov", method: "Appointment", termLength: "5 Years", residence: "Official Residence", party: "Ruling Party", since: "2020" },
            deputyHead: { title: "Vice President", name: "Deputy", method: "Election" },
            legislature: { 
                name: "National Parliament", 
                type: "Unicameral", 
                chambers: [{ 
                    name: "National Assembly", 
                    type: "Unicameral", 
                    seats: "100", 
                    leadership: "Speaker",
                    members: []
                }] 
            },
            judiciary: { highestCourt: "Supreme Court", systemType: "Civil Law", structure: ["Appellate", "District"], independence: "Independent", members: ["Chief Justice"] },
            cabinet: [{ role: "Minister of State", name: "Official Name", ministry: "Cabinet Office" }],
            agencies: getStandardAgencies(name),
            goccs: [{ name: "State Oil Company", purpose: "Energy", website: "#" }],
            commissions: [{ name: "Election Commission", purpose: "Elections", website: "#" }],
            specialBodies: [],
            localGovernmentStructure: "Provinces and Municipalities"
        },
        politics: {
            parties: getStandardParties(name),
            ideologies: [{ name: "Nationalism", description: "State Sovereignty", influence: "Dominant" }],
            recentElections: [{ year: "2023", type: "General", winner: "Ruling Party", turnout: "70%", notes: "Peaceful transfer of power.", runnerUp: "Opposition" }],
            votingAge: "18",
            interestGroups: [{ name: "Trade Unions", type: "Labor", influence: "High" }],
            politicalFamilies: [{ name: "Founding Family", description: "Historical influence", members: ["Leader 1", "Leader 2"] }],
            localConcepts: [{ term: "Sovereignty", definition: "Supreme authority within a territory.", context: "National" }],
            lobbyingRegulations: "Regulated",
            mediaLandscape: "Diverse",
            civilSociety: "Active",
            electoralHistory: [{ year: "2023", type: "General", winner: "Ruling Party", turnout: "70%", notes: "Peaceful transfer of power.", runnerUp: "Opposition" }],
            families: [{ name: "Founding Family", influence: "High", description: "Historical influence", members: ["Leader 1", "Leader 2"] }],
        },
        legal: {
            constitution: { name: "Constitution of " + name, adopted: "20th Century", amendments: 0, summary: "Fundamental law defining the state structure.", preamble: "We the People..." },
            historicalConstitutions: [],
            codes: [{ name: "Civil Code", year: "2000", area: "Civil Rights" }, { name: "Penal Code", year: "2000", area: "Criminal Justice" }],
            systemType: "Mixed Law",
            lawEnforcement: { agencies: ["National Police"], personnel: "50,000", budget: "1 Billion USD" },
            highestCourt: "Supreme Court",
            rights: { freedomOfPress: "Protected", freedomOfSpeech: "Protected", dueProcess: "Guaranteed" }
        },
        history: {
            timeline: [{ year: "Founding", title: "Establishment of State", description: "The nation was formally recognized.", type: "Political", keyFigures: [] }],
            politicalHistory: [
                `The history of ${name} is marked by a transition from traditional governance to a modern state system. Key periods include early settlement, consolidation of power, and modern democratic reforms.`,
                `In the early era, ${name} was characterized by distinct regional polities that eventually coalesced under a unified administration.`,
                `The colonial or pre-modern period saw significant external influence, shaping the legal and administrative boundaries of the contemporary state.`,
                `Independence or modern statehood was achieved through a complex process of negotiation and struggle, establishing the current constitutional order.`,
                `Today, ${name} faces the challenges of modernization, economic development, and maintaining political stability in a changing global landscape.`
            ],
            politicalScienceHistory: [
                `The political development of ${name} offers a case study in state-building and institutional adaptation.`,
                `Early institutions were largely traditional, evolving into rational-legal structures over the last century.`,
                `The party system has fluctuated between dominance and fragmentation, reflecting underlying social cleavages.`,
                `Civil society has played a crucial role in democratization, though challenges in consolidation remain.`,
                `Current analysis focuses on the balance between executive authority and legislative oversight.`
            ],
            eras: [{ name: "Modern Era", start: "1900", end: "Present", description: "Contemporary period." }],
            wars: [{ name: "Independence War", years: "19th Century", result: "Sovereignty" }],
            revolutions: [{ name: "Democratic Revolution", year: "20th Century", outcome: "Republic established" }],
            institutionalEvolution: [],
            conflicts: [],
            headOfStateArchive: []
        },
        leadershipHistory: {
            headsOfState: [{ name: "Founding Father", term: "Independence", party: "Founding Party" }],
            headsOfGov: [{ name: "First Premier", term: "Independence", party: "Founding Party" }]
        },
        global: { 
            memberships: [{ org: "United Nations", status: "Member", dateJoined: "1945" }], 
            treaties: [{ name: "UN Charter", signed: "1945", ratified: "1945", subject: "Membership" }],
            alliances: [{ name: "Regional Bloc", type: "Defense", partners: ["Neighbor A", "Neighbor B"] }],
            embassies: [{ country: "USA", location: "Washington DC" }],
            foreignAid: { received: "100 Million USD", given: "10 Million USD", topDonors: ["Global Fund"] },
            diaspora: [{ country: "USA", population: "50,000" }]
        },
        symbols: { 
            nationalAnthem: { name: "National Anthem", composer: "Unknown", year: "1900", lyrics: "Lyrics..." }, 
            nationalColors: ["#FF0000", "#FFFFFF"], 
            nationalDay: "Independence Day",
            otherSymbols: [{ name: "National Emblem", description: "Official Seal" }],
            holidays: [{ date: "Jan 1", name: "New Year", type: "Public" }],
            orders: [{ name: "Order of Merit", class: "First Class" }],
            anthem: {
                native: "Native Lyrics Unavailable",
                romanization: "Romanized Lyrics Unavailable",
                translation: "Translated Lyrics Unavailable",
                name: "National Anthem",
                lyrics: "Lyrics..."
            },
            coatOfArms: { description: "State emblem.", elements: ["Shield", "Supporters"], history: "Traditional design.", variants: [] },
            nationalSymbols: [{ type: "Animal", name: "Local Fauna" }, { type: "Bird", name: "Local Bird" }]
        },
        politicalScience: { 
            regimeType: "Republic", 
            constitutionality: "Constitutional", 
            civilSociety: "Robust", 
            stateCapacity: "High", 
            legitimacySources: "Legal-Rational", 
            ruleOfLaw: "Established",
            humanRights: "Protected",
            economicFreedom: "Moderate",
            pressFreedom: "Free",
            corruptionPerception: "Moderate",
            indices: [{ name: "Democracy Index", score: 5.0, status: "Hybrid", trend: "Stable" }], 
            institutionalAnalysis: { 
                executive: "The executive branch holds significant authority, balanced by legislative oversight.", 
                legislative: "The legislature plays a key role in lawmaking and budget approval.", 
                judicial: "The judiciary maintains independence and power of judicial review.", 
                military: "The military remains under civilian control.", 
                bureaucracy: "A professional bureaucracy manages state functions." 
            }, 
            politicalCulture: { 
                participation: "Active voter participation in elections.", 
                socialization: "Political values transmitted through education and media.", 
                trust: "Moderate trust in public institutions.", 
                values: ["Liberty", "Order", "Justice"] 
            }
        },
        economy: {
            gdpNominal: "100 Billion USD",
            growthRate: "1.2%",
            inflationRate: "2%",
            unemploymentRate: "5%",
            currency: { name: "National Unit", code: "CUR", symbol: "$" },
            stockMarket: { name: "National Stock Exchange", index: "NSE", marketCap: "50 Billion" },
            majorExports: [{ commodity: "Goods", value: "50%" }],
            majorImports: [{ commodity: "Fuel", value: "30%" }],
            partners: [{ country: "Neighbor", type: "Export", percentage: "High" }],
            laborForce: { total: "5 Million", bySector: [{ sector: "Agriculture", percentage: "10%" }] },
            debt: { external: "Low", public: "Moderate", rating: "BBB" },
            taxation: { corporate: "20%", income: "15%", vat: "10%" },
            povertyRate: "10%"
        },
        infrastructure: {
            transport: {
                roadNetwork: { total: "10,000 km", paved: "5,000 km", majorHighways: ["Highway 1"] },
                railNetwork: { total: "1,000 km", gauge: "Standard", majorLines: ["Main Line"], highSpeed: false },
                airports: { total: "5", international: ["Intl Airport"], majorCarriers: ["National Air"] },
                ports: { total: "2", majorTerminals: ["Port A"], merchantMarine: "50 ships" }
            },
            energy: {
                totalProduction: "50 TWh",
                consumption: "45 TWh",
                energyMix: [{ source: "Fossil Fuels", percentage: "60%" }, { source: "Renewables", percentage: "40%" }],
                gridCoverage: "90%",
                majorPlants: ["Plant A"]
            },
            digital: {
                internetPenetration: "80%",
                broadbandSpeed: "50 Mbps",
                mobileSubscriptions: "9 Million",
                cyberSecurityRank: "50",
                ispMarket: ["Provider A"]
            },
            water: {
                accessCleanWater: "95%",
                sanitationAccess: "90%",
                majorReservoirs: ["Lake A"]
            }
        },
        academic: { 
            politicalScienceHistory: "Established in the late 19th century.",
            universities: [{ name: "National University", rank: "Top", location: "Capital", notableAlumni: ["President"] }], 
            thinkTanks: [{ name: "Policy Institute", focus: "Public Policy", influence: "High" }], 
            intellectualTradition: "Rich tradition.",
            journals: [{ name: "National Political Science Review", publisher: "University Press", impactFactor: "2.0" }],
            scholars: [{ name: "Dr. Scholar", field: "Political Theory", contribution: "Foundational text" }]
        },
        today: { 
            news: [],
            currentEvents: "Stable political climate.",
            historyToday: "No major anniversaries."
        },
        imageArchive: [],
        telecom: {
            carriers: ["National Telecom"],
            internetSpeed: "50 Mbps",
            mobilePenetration: "90%",
            satelliteProgram: "None",
            cyberSecurityAgency: "National Cyber Bureau",
            mediaOutlets: [{ name: "Public Broadcaster", type: "Public", owner: "State" }]
        },
        militaryComplex: {
            totalActive: "50,000",
            totalReserve: "20,000",
            paramilitary: "5,000",
            budget: "1 Billion USD",
            percentGDP: "1%",
            suppliers: ["Domestic", "International"],
            branches: [{ name: "Army", personnel: "30,000", commander: "Chief of Army" }, { name: "Air Force", personnel: "10,000", commander: "Chief of Air Staff" }],
            equipment: [{ type: "Vehicle", model: "Standard Truck", origin: "Domestic", quantity: "500" }],
            bases: [{ name: "Main Base", location: "Capital", type: "Army" }],
            nuclearStatus: "Non-Nuclear",
            alliances: ["Regional Security Pact"],
            conflicts: []
        },
        grandStrategy: {
            coreInterests: ["Sovereignty", "Economic Growth", "Regional Stability"],
            geopoliticalRole: "Regional Player",
            keyAllies: ["Neighboring States"],
            keyRivals: ["Regional Competitors"],
            strategicCulture: "Defensive",
            doctrine: "Deterrence",
            intelligenceAgencies: ["National Intelligence Service"]
        },
        judiciaryDetail: {
            courtHierarchy: ["Supreme Court", "Appellate Court", "District Court"],
            landmarkCases: [{ name: "Case 1", year: "2000", impact: "Precedent" }],
            judicialPhilosophy: "Textualism",
            legalEducation: "Law School System"
        },
        laborWelfare: {
            unionDensity: "20%",
            majorUnions: ["National Workers Union"],
            healthcareSystem: "Mixed",
            pensionSystem: "State Funded",
            educationSystem: "Public/Private",
            laborLaws: "Standard"
        },
        mediaContext: {
            pressFreedomRank: "50/180",
            majorOutlets: [{ name: "Daily News", type: "Newspaper", leaning: "Centrist" }],
            internetCensorship: "Minimal",
            journalismHistory: "Long tradition of free press"
        },
        energy: {
            gridCapacity: "10 GW",
            sources: [{ type: "Fossil Fuels", percentage: "60%" }, { type: "Renewables", percentage: "40%" }],
            oil: { production: "Low", reserves: "Low", exports: "None" },
            gas: { production: "Low", reserves: "Low", exports: "None" },
            renewables: { target: "50%", current: "40%" },
            nuclear: { activePlants: "0", capacity: "0 MW" },
            companies: ["National Power Co."]
        },
        analysis: {
            strategicAnalysis: "Analysis unavailable.",
            politicalCulture: "Culture unavailable.",
            stateCapacity: "Capacity unavailable.",
            civilSociety: "Society unavailable.",
            legitimacySource: "Source unavailable.",
            systemHealth: "Health unavailable."
        }
    };
};