
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { EconomyProfile } from "../../types";

export const fetchEconomy = async (countryName: string): Promise<EconomyProfile> => {
    const prompt = `
POLI ARCHIVE — ULTIMATE COMPREHENSIVE ECONOMIC DOSSIER: ${countryName}
CLASSIFICATION: MAXIMUM-DEPTH EXHAUSTIVE ECONOMIC INTELLIGENCE
PROTOCOL: POLI ARCHIVE V3 — COMPLETE ECONOMIC ENCYCLOPEDIA EDITION

${getLanguageInstruction()}

You are POLI, the world's most comprehensive political and economic intelligence system. Generate the ABSOLUTE MOST COMPLETE economic profile of ${countryName} that is physically possible. This must read like a full World Bank country economic report combined with a CIA World Factbook entry, IMF Article IV consultation, and a Goldman Sachs country briefing. Leave NOTHING out. Every number, every partner, every corporation, every sector.

====================================================================
SECTION 1: GDP & CORE MACROECONOMIC INDICATORS (EXHAUSTIVE)
====================================================================
Provide ALL of the following with exact figures and years:
- GDP Nominal (current USD, latest available year — state the year)
- GDP PPP (current international dollars, latest available year)
- GDP Per Capita Nominal (USD)
- GDP Per Capita PPP (international dollars)
- Real GDP Growth Rate (latest year, plus previous 3 years for trend)
- 5-year average GDP growth rate
- 10-year average GDP growth rate
- GDP by expenditure approach (consumption, investment, government spending, net exports as % of GDP)
- Gross National Income (GNI) and GNI per capita
- Gross National Savings (% of GDP)
- Current Account Balance (USD and % of GDP)
- Capital Account Balance
- Financial Account Balance

====================================================================
SECTION 2: ALL MAJOR INDUSTRIES WITH GDP CONTRIBUTION
====================================================================
List EVERY significant industry in ${countryName}:
- For each industry: name, estimated GDP contribution (%), number of workers, annual revenue/output, key companies, growth trend
- Include at minimum: agriculture, manufacturing, mining/extraction, construction, financial services, real estate, retail/wholesale trade, transportation, telecommunications, IT/tech, tourism/hospitality, healthcare, education, energy/utilities, defense/military industry, fishing/aquaculture, forestry, textiles/garments, food processing, automotive, pharmaceuticals, chemicals, electronics, and any country-specific industries
- Identify which industries are growing, declining, or stable

====================================================================
SECTION 3: COMPLETE TRADE PROFILE
====================================================================

EXPORTS — List ALL major exports (minimum 25-30 items):
- For each: commodity/product name, annual export value (USD), percentage of total exports, primary destination countries
- Include raw materials, manufactured goods, agricultural products, services exports
- Total merchandise export value
- Total services export value

IMPORTS — List ALL major imports (minimum 25-30 items):
- For each: commodity/product name, annual import value (USD), percentage of total imports, primary source countries
- Include energy imports, capital goods, consumer goods, raw materials, food imports
- Total merchandise import value
- Total services import value

TRADE BALANCE:
- Merchandise trade balance
- Services trade balance
- Overall trade balance
- Current account balance

====================================================================
SECTION 4: TOP 20 TRADING PARTNERS WITH TRADE VOLUME
====================================================================
List the TOP 20 trading partners (or all significant ones):
- For each partner: country name, total bilateral trade volume (USD), export value to that country, import value from that country, percentage of total trade, key commodities traded, trade balance with that country
- Separate lists for top 20 export destinations and top 20 import sources

====================================================================
SECTION 5: CURRENCY, EXCHANGE RATES, INFLATION
====================================================================
- Official currency: full name, ISO code, symbol, subunit
- Exchange rate to USD (current), EUR, GBP, JPY, CNY
- Exchange rate regime (fixed, floating, managed float, pegged)
- Historical exchange rate trend (5-year summary)
- Inflation rate (CPI, latest year)
- Core inflation rate
- Producer Price Index (PPI)
- Historical inflation trend (5-year)
- Central bank policy interest rate
- Money supply (M1, M2, M3 if available)
- Foreign exchange reserves (total USD)

====================================================================
SECTION 6: UNEMPLOYMENT, LABOR FORCE, PARTICIPATION
====================================================================
- Total labor force (number)
- Labor force participation rate (overall, male, female)
- Unemployment rate (overall)
- Youth unemployment rate (15-24)
- Underemployment rate (if available)
- Employment by sector breakdown (agriculture, industry, services — percentages and numbers)
- Informal economy estimate (% of GDP)
- Minimum wage (monthly, in local currency and USD)
- Average wage/salary
- Median household income
- Major employers (top companies by employee count)
- Overseas workers / diaspora workforce (number and remittance contribution)
- Key labor laws and regulations summary

====================================================================
SECTION 7: GOVERNMENT BUDGET, REVENUE, EXPENDITURE, PUBLIC DEBT
====================================================================
- Total government revenue (USD and % of GDP)
- Total government expenditure (USD and % of GDP)
- Budget balance/deficit (USD and % of GDP)
- Government debt (total USD, % of GDP)
- External debt (total USD, % of GDP, % of exports)
- Domestic debt
- Debt service ratio
- Tax revenue (% of GDP)
- Major tax types and rates (income tax, corporate tax, VAT/GST, excise)
- Government spending breakdown by sector (defense, education, health, infrastructure, social welfare, etc.)
- Fiscal policy stance (expansionary/contractionary)
- Sovereign wealth fund (if any — name and size)

====================================================================
SECTION 8: FOREIGN DIRECT INVESTMENT & REMITTANCES
====================================================================
- FDI inflows (latest year, USD)
- FDI outflows (latest year, USD)
- FDI stock (inward and outward)
- Top source countries for FDI
- Top sectors receiving FDI
- Major foreign companies operating in ${countryName}
- Bilateral investment treaties
- Remittance inflows (USD, % of GDP)
- Remittance outflows
- Top remittance source countries
- Top remittance corridors

====================================================================
SECTION 9: STOCK EXCHANGE & FINANCIAL MARKETS
====================================================================
- Primary stock exchange: full name, location, year established
- Main stock index: name, current level, 52-week range
- Total market capitalization (USD)
- Number of listed companies
- Average daily trading volume
- Secondary exchanges (if any)
- Bond market overview
- Commodity exchanges (if any)
- Securities regulator name
- Notable IPOs or market events

====================================================================
SECTION 10: MAJOR CORPORATIONS & CONGLOMERATES (TOP 20+)
====================================================================
List the TOP 20 (or more) largest companies/conglomerates:
- For each: company name, industry/sector, estimated annual revenue (USD), number of employees, whether publicly traded, brief description of operations
- Include state-owned enterprises, private conglomerates, multinational subsidiaries
- Identify any Fortune Global 500 or Forbes Global 2000 companies
- Major business families or oligarchs (if relevant)

====================================================================
SECTION 11: BANKING SYSTEM
====================================================================
- Central bank: full name, year established, governor/chairman, key functions
- Monetary policy framework
- Total banking sector assets
- Number of commercial banks
- Top 10 commercial banks by assets (name, total assets, type — state/private/foreign)
- Major foreign banks operating in country
- Banking penetration / financial inclusion rate
- Mobile banking / fintech landscape
- Microfinance sector overview
- Insurance sector overview
- Non-performing loans ratio

====================================================================
SECTION 12: POVERTY & INCOME INEQUALITY
====================================================================
- Poverty rate (national poverty line)
- Poverty rate (international — $1.90/day, $3.20/day, $5.50/day)
- Gini coefficient (income inequality index)
- Income share by quintile (top 20%, bottom 20%)
- Human Development Index (HDI) value and rank
- Multidimensional Poverty Index
- Urban vs rural poverty rates
- Regional inequality within the country
- Social safety net programs (list major ones)
- Poverty trend over last 10-20 years

====================================================================
SECTION 13: ECONOMIC SECTORS BREAKDOWN
====================================================================
Detailed breakdown:
AGRICULTURE:
- % of GDP, % of employment
- Major crops (list all significant ones with production volumes)
- Livestock (types and numbers)
- Fishing industry (catch volume, value)
- Forestry
- Agricultural exports value
- Land under cultivation
- Irrigation coverage
- Key agricultural policies

INDUSTRY:
- % of GDP, % of employment
- Manufacturing sub-sectors and output
- Mining and extraction (minerals, metals, oil, gas — production volumes and values)
- Construction sector value
- Industrial zones and clusters
- Manufacturing competitiveness

SERVICES:
- % of GDP, % of employment
- Financial services contribution
- Tourism (arrivals, revenue, % of GDP)
- IT and BPO sector
- Telecommunications
- Real estate
- Retail and wholesale trade
- Transportation and logistics
- Professional services

====================================================================
SECTION 14: SPECIAL ECONOMIC ZONES
====================================================================
- List ALL special economic zones, free trade zones, export processing zones, industrial parks
- For each: name, location, year established, focus/specialization, number of companies, total investment attracted, employment generated
- SEZ policies and incentives
- Success stories and challenges

====================================================================
SECTION 15: INTERNATIONAL ECONOMIC AGREEMENTS & TRADE DEALS
====================================================================
- List ALL free trade agreements (bilateral and multilateral)
- Regional economic bloc memberships (EU, ASEAN, MERCOSUR, AU, etc.)
- WTO membership status and disputes
- Bilateral investment treaties (major ones)
- Double taxation agreements
- Economic partnership agreements
- Sanctions (imposed by or against the country)
- IMF programs (current or recent)
- World Bank projects (major ongoing ones)
- Regional development bank memberships

====================================================================
SECTION 16: ECONOMIC HISTORY (MAJOR REFORMS, CRISES)
====================================================================
Write a COMPREHENSIVE economic history narrative (minimum 500 words) covering:
- Pre-independence/colonial economic structure
- Post-independence economic policies
- Major economic reforms (with years and leaders)
- Nationalization or privatization waves
- Economic liberalization periods
- Major economic crises (with causes, impact, and recovery)
- Structural adjustment programs
- Currency crises or devaluations
- Banking crises
- Impact of global events (oil shocks, 2008 financial crisis, COVID-19)
- Current economic trajectory and future outlook
- Key economic thinkers or policymakers who shaped the economy

====================================================================
SECTION 17: CREDIT RATINGS
====================================================================
- S&P rating (long-term foreign currency, outlook)
- Moody's rating (long-term foreign currency, outlook)
- Fitch rating (long-term foreign currency, outlook)
- Rating history (last 3 changes for each agency)
- Key factors cited in rating assessments
- Comparison with regional peers

====================================================================
SECTION 18: KEY ECONOMIC INDICATORS TABLE
====================================================================
Provide a comprehensive table of key indicators:
- GDP nominal, GDP PPP, GDP per capita, GDP growth
- Population, labor force, unemployment
- Inflation, interest rate, exchange rate
- Exports, imports, trade balance, current account
- FDI, remittances, foreign reserves
- Government debt, budget balance
- Poverty rate, Gini coefficient, HDI
- Ease of Doing Business rank
- Global Competitiveness rank
- Economic Freedom Index rank
- Corruption Perceptions Index rank
All with latest available figures and the year of data.

====================================================================

RETURN VALID JSON ONLY — NO markdown, no commentary, no code blocks:
{
    "gdpNominal": "string with value and year e.g. '$1.2 trillion (2024)'",
    "gdpPPP": "string with value and year",
    "gdpPerCapita": "string nominal USD",
    "gdpPerCapitaPPP": "string PPP",
    "growthRate": "string current year rate",
    "fiveYearAvgGrowth": "string",
    "tenYearAvgGrowth": "string",
    "gdpByExpenditure": { "consumption": "string %", "investment": "string %", "govSpending": "string %", "netExports": "string %" },
    "gni": "string", "gniPerCapita": "string",
    "grossNationalSavings": "string % of GDP",
    "currentAccountBalance": "string USD and % of GDP",
    "gdpBySector": { "agriculture": "string %", "industry": "string %", "services": "string %" },
    "inflation": "string CPI rate",
    "coreInflation": "string",
    "ppiInflation": "string",
    "interestRate": "string central bank rate",
    "moneySupply": { "m1": "string", "m2": "string" },
    "nationalDebt": "string total USD",
    "debtToGDP": "string %",
    "externalDebt": "string total USD",
    "domesticDebt": "string",
    "debtServiceRatio": "string",
    "foreignReserves": "string USD",
    "creditRating": {
        "sp": "string rating + outlook",
        "moodys": "string rating + outlook",
        "fitch": "string rating + outlook",
        "ratingHistory": "string summary of recent changes"
    },
    "currency": {
        "name": "string full name",
        "code": "string ISO code",
        "symbol": "string symbol",
        "subunit": "string",
        "exchangeRateUSD": "string",
        "exchangeRateEUR": "string",
        "exchangeRegime": "string fixed/floating/managed/pegged"
    },
    "exchangeRate": "string primary rate to USD",
    "budget": {
        "revenue": "string USD and % of GDP",
        "expenditure": "string USD and % of GDP",
        "balance": "string deficit/surplus USD and % of GDP"
    },
    "taxation": {
        "taxRevenue": "string % of GDP",
        "incomeTax": "string rates",
        "corporateTax": "string rate",
        "vatGst": "string rate",
        "otherTaxes": "string summary"
    },
    "govSpendingBreakdown": {
        "defense": "string %", "education": "string %", "health": "string %",
        "infrastructure": "string %", "socialWelfare": "string %", "other": "string %"
    },
    "sovereignWealthFund": "string name and size, or 'None'",
    "majorExports": [{ "commodity": "string", "value": "string USD", "percentOfTotal": "string %", "destinations": "string top countries" }],
    "majorImports": [{ "commodity": "string", "value": "string USD", "percentOfTotal": "string %", "sources": "string top countries" }],
    "totalExports": "string merchandise + services",
    "totalImports": "string merchandise + services",
    "tradeBalance": "string",
    "tradePartners": {
        "exports": [{ "country": "string", "value": "string USD", "percentage": "string %", "keyCommodities": "string" }],
        "imports": [{ "country": "string", "value": "string USD", "percentage": "string %", "keyCommodities": "string" }]
    },
    "freeTradeAgreements": ["string — list ALL FTAs and economic agreements"],
    "regionalBlocs": ["string — list ALL regional economic memberships"],
    "wtoStatus": "string",
    "sanctions": "string any sanctions imposed by/against",
    "imfPrograms": "string current or recent",
    "industries": [
        {
            "name": "string industry name",
            "gdpContribution": "string %",
            "employment": "string number or %",
            "annualOutput": "string USD",
            "keyCompanies": ["string"],
            "growthTrend": "string growing/declining/stable",
            "description": "string detailed overview"
        }
    ],
    "sectors": {
        "agriculture": {
            "gdpShare": "string %", "employmentShare": "string %",
            "majorCrops": [{ "crop": "string", "production": "string tons/year" }],
            "livestock": "string overview",
            "fishing": "string catch volume and value",
            "forestry": "string overview",
            "cultivatedLand": "string area",
            "irrigationCoverage": "string %",
            "agriculturalExports": "string USD"
        },
        "industry": {
            "gdpShare": "string %", "employmentShare": "string %",
            "manufacturing": "string overview and key sub-sectors",
            "mining": [{ "resource": "string", "production": "string volume", "value": "string USD" }],
            "construction": "string sector value",
            "industrialZones": ["string"]
        },
        "services": {
            "gdpShare": "string %", "employmentShare": "string %",
            "financialServices": "string contribution",
            "tourism": { "arrivals": "string", "revenue": "string USD", "gdpShare": "string %" },
            "itBpo": "string overview",
            "telecom": "string overview",
            "realEstate": "string overview",
            "retail": "string overview",
            "transportation": "string overview"
        }
    },
    "laborMarket": {
        "totalForce": "string number",
        "participationRate": "string overall %",
        "participationMale": "string %",
        "participationFemale": "string %",
        "unemployment": "string overall %",
        "youthUnemployment": "string %",
        "underemployment": "string %",
        "employmentBySector": { "agriculture": "string %", "industry": "string %", "services": "string %" },
        "informalEconomy": "string % of GDP",
        "minimumWage": "string local currency and USD monthly",
        "averageWage": "string",
        "medianHouseholdIncome": "string",
        "overseasWorkers": "string number",
        "remittances": "string USD and % of GDP",
        "topRemittanceSources": ["string"],
        "majorEmployers": ["string top companies by employee count"],
        "laborLaws": "string key regulations summary"
    },
    "fdi": {
        "inflows": "string USD latest year",
        "outflows": "string USD",
        "inwardStock": "string USD",
        "outwardStock": "string USD",
        "topSourceCountries": ["string"],
        "topSectors": ["string"],
        "majorForeignCompanies": ["string"],
        "bilateralInvestmentTreaties": "string count and major ones"
    },
    "stockMarket": {
        "name": "string full exchange name",
        "location": "string",
        "yearEstablished": "string",
        "mainIndex": "string index name",
        "indexLevel": "string current level",
        "marketCap": "string total USD",
        "listedCompanies": "string number",
        "dailyVolume": "string average",
        "secondaryExchanges": "string if any",
        "regulator": "string securities regulator name",
        "bondMarket": "string overview",
        "notableEvents": "string recent IPOs or events"
    },
    "majorCorporations": [
        {
            "name": "string company name",
            "sector": "string industry",
            "revenue": "string annual USD",
            "employees": "string number",
            "publiclyTraded": "string yes/no + exchange",
            "description": "string brief overview"
        }
    ],
    "bankingSystem": {
        "centralBank": { "name": "string", "established": "string year", "governor": "string", "functions": "string" },
        "monetaryPolicy": "string framework description",
        "totalBankingAssets": "string USD",
        "numberOfBanks": "string",
        "topBanks": [{ "name": "string", "assets": "string USD", "type": "string state/private/foreign" }],
        "foreignBanks": ["string major foreign banks"],
        "financialInclusion": "string banking penetration %",
        "mobileBanking": "string fintech landscape",
        "microfinance": "string overview",
        "insurance": "string sector overview",
        "nplRatio": "string non-performing loans %"
    },
    "povertyInequality": {
        "povertyRate": "string national poverty line %",
        "povertyIntl190": "string % below $1.90/day",
        "povertyIntl320": "string % below $3.20/day",
        "povertyIntl550": "string % below $5.50/day",
        "giniCoefficient": "string value",
        "incomeShareTop20": "string %",
        "incomeShareBottom20": "string %",
        "hdiValue": "string value",
        "hdiRank": "string global rank",
        "mpi": "string Multidimensional Poverty Index",
        "urbanPoverty": "string %",
        "ruralPoverty": "string %",
        "regionalInequality": "string description",
        "socialSafetyNets": ["string major programs"],
        "povertyTrend": "string 10-20 year trend description"
    },
    "specialEconomicZones": [
        {
            "name": "string",
            "location": "string",
            "established": "string year",
            "focus": "string specialization",
            "companies": "string number",
            "investment": "string total attracted",
            "employment": "string jobs created"
        }
    ],
    "sezPolicies": "string incentives and policies overview",
    "economicAgreements": {
        "ftas": ["string all FTAs with details"],
        "bilateralInvestmentTreaties": ["string major BITs"],
        "doubleTaxationAgreements": "string count and major ones",
        "economicPartnerships": ["string EPAs and other agreements"],
        "wtoDisputes": "string any disputes",
        "imfWorldBank": "string programs and projects",
        "regionalDevBanks": ["string memberships"]
    },
    "economicHistory": "string MINIMUM 500 words — comprehensive narrative covering colonial era economics, post-independence policies, major reforms with dates and leaders, liberalization, crises, structural adjustments, currency events, impact of global crises, COVID-19 impact, current trajectory, future outlook, and key economic policymakers",
    "economicIndicatorsTable": {
        "gdpNominal": "string", "gdpPPP": "string", "gdpPerCapita": "string",
        "gdpGrowth": "string", "population": "string", "laborForce": "string",
        "unemployment": "string", "inflation": "string", "interestRate": "string",
        "exchangeRate": "string", "exports": "string", "imports": "string",
        "tradeBalance": "string", "currentAccount": "string", "fdi": "string",
        "remittances": "string", "foreignReserves": "string", "govDebt": "string",
        "budgetBalance": "string", "povertyRate": "string", "gini": "string",
        "hdi": "string", "easeOfBusiness": "string", "competitivenessRank": "string",
        "economicFreedomRank": "string", "corruptionIndex": "string",
        "dataYear": "string year of most data points"
    },
    "partners": [{ "country": "string", "type": "string export/import/both", "percentage": "string %", "tradeVolume": "string USD", "keyCommodities": "string" }],
    "inflationRate": "string",
    "unemploymentRate": "string",
    "povertyRate": "string",
    "laborForce": { "total": "string", "participationRate": "string", "bySection": { "agriculture": "string %", "industry": "string %", "services": "string %" } },
    "debt": { "total": "string USD", "percentGDP": "string %", "external": "string USD", "perCapita": "string USD" }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {}) as EconomyProfile;
};
