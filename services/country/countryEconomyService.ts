
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { EconomyProfile } from "../../types";

export const fetchEconomy = async (countryName: string): Promise<EconomyProfile> => {
    const prompt = `
POLI ARCHIVE — COMPLETE ECONOMIC DOSSIER: ${countryName}
CLASSIFICATION: EXHAUSTIVE ECONOMIC PROFILE
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE economic profile of ${countryName}. Every trade partner, every export, every sector — comprehensive data.

MANDATORY REQUIREMENTS:

1. GDP & MACRO INDICATORS:
   - GDP Nominal (USD, latest year)
   - GDP PPP (USD, latest year)
   - GDP Per Capita (nominal and PPP)
   - GDP Growth Rate (current and 5-year average)
   - GDP by sector (agriculture, industry, services — percentages)
   - Inflation rate, interest rate
   - National debt (total and % of GDP)
   - Foreign reserves
   - Credit rating (Moody's, S&P, Fitch)
   - Currency exchange rate (to USD)
   - Budget (revenue and expenditure)

2. TRADE — EXHAUSTIVE:
   - Major exports: List ALL significant exports (minimum 25 items) with commodity name and value
   - Major imports: List ALL significant imports (minimum 25 items) with commodity name and value
   - Total export value, total import value
   - Trade balance
   - Current account balance

3. TRADE PARTNERS:
   - Top 15 export destinations with trade value and percentage
   - Top 15 import sources with trade value and percentage
   - Free trade agreements (list all)
   - Trade disputes/sanctions

4. ECONOMIC SECTORS:
   - For each major sector: description, GDP contribution, employment share, key companies/industries
   - Agriculture: major crops, livestock, fishing
   - Industry: manufacturing, mining, construction
   - Services: finance, tourism, IT, telecommunications
   - Emerging sectors and economic diversification efforts

5. LABOR MARKET:
   - Total labor force, participation rate
   - Unemployment rate (overall, youth)
   - Major employers
   - Minimum wage
   - Labor laws overview
   - Overseas workers/remittances (if significant)

6. ECONOMIC HISTORY:
   - Key economic reforms and policies
   - Major economic crises
   - Economic transformation narrative (300+ words)

7. INFRASTRUCTURE FOR BUSINESS:
   - Ease of doing business ranking
   - Special economic zones
   - Major ports, airports for trade
   - Digital economy status

RETURN VALID JSON ONLY:
{
    "gdpNominal": "string", "gdpPPP": "string", "gdpPerCapita": "string", "gdpPerCapitaPPP": "string",
    "growthRate": "string", "fiveYearAvgGrowth": "string",
    "gdpBySector": { "agriculture": "string", "industry": "string", "services": "string" },
    "inflation": "string", "interestRate": "string",
    "nationalDebt": "string", "debtToGDP": "string",
    "foreignReserves": "string",
    "creditRating": { "moodys": "string", "sp": "string", "fitch": "string" },
    "exchangeRate": "string",
    "budget": { "revenue": "string", "expenditure": "string" },
    "majorExports": [{ "commodity": "string", "value": "string" }],
    "majorImports": [{ "commodity": "string", "value": "string" }],
    "totalExports": "string", "totalImports": "string", "tradeBalance": "string",
    "tradePartners": {
        "exports": [{ "country": "string", "value": "string", "percentage": "string" }],
        "imports": [{ "country": "string", "value": "string", "percentage": "string" }]
    },
    "freeTradeAgreements": ["string"],
    "sectors": [
        { "name": "string", "gdpContribution": "string", "employment": "string", "description": "string", "keyIndustries": ["string"] }
    ],
    "laborMarket": {
        "totalForce": "string", "participationRate": "string", "unemployment": "string",
        "youthUnemployment": "string", "minimumWage": "string",
        "overseasWorkers": "string", "remittances": "string"
    },
    "economicHistory": "string (min 300 words)",
    "easeDoBusiness": "string",
    "specialEconomicZones": ["string"]
}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {}) as EconomyProfile;
};
