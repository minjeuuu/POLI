import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchTourismProfile = async (countryName: string) => {
    const prompt = `
GENERATE AN EXHAUSTIVE TOURISM & TRAVEL DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V2 — EXHAUSTIVE MODE.
MANDATE: Fill every field with real, specific, accurate data.

RETURN JSON ONLY:
{
  "visaPolicy": "string",
  "annualVisitors": "string",
  "tourismRevenue": "string",
  "tourismGDPPercent": "string",
  "tourismEmployment": "string",
  "globalTourismRank": "string",
  "topSourceCountries": ["string (top 10 origin countries)"],

  "attractions": [
    {
      "name": "string",
      "type": "string (Nature/Historic/Urban/Cultural/Religious/Adventure)",
      "location": "string",
      "description": "string",
      "unescoStatus": "string",
      "annualVisitors": "string",
      "bestTimeToVisit": "string",
      "entryFee": "string"
    }
  ],

  "unescoSites": [
    { "name": "string", "type": "string (Cultural/Natural/Mixed)", "inscribed": "string", "location": "string", "description": "string" }
  ],

  "naturalWonders": [
    { "name": "string", "type": "string", "location": "string", "description": "string", "bestFor": "string" }
  ],

  "historicSites": [
    { "name": "string", "era": "string", "location": "string", "description": "string", "significance": "string" }
  ],

  "topCitiesForTourism": [
    { "city": "string", "highlights": ["string"], "bestFor": "string", "avgHotelCost": "string" }
  ],

  "accommodations": {
    "totalHotels": "string",
    "luxuryHotels": "string",
    "budgetAccommodations": "string",
    "topLuxuryHotels": [
      { "name": "string", "location": "string", "stars": "string", "specialFeature": "string" }
    ],
    "topBudgetOptions": ["string"],
    "uniqueAccommodations": ["string (treehouses, overwater bungalows, etc.)"],
    "avgNightCost": "string"
  },

  "cuisine": {
    "mustTryDishes": [
      { "dish": "string", "description": "string", "region": "string", "whereToTry": "string" }
    ],
    "foodStreets": [
      { "name": "string", "city": "string", "specialty": "string" }
    ],
    "topRestaurants": [
      { "name": "string", "city": "string", "cuisine": "string", "priceRange": "string", "specialty": "string" }
    ],
    "localBeverages": ["string"],
    "dietaryOptions": "string (halal, vegan, vegetarian availability)"
  },

  "shopping": {
    "topShoppingDistricts": [
      { "name": "string", "city": "string", "specialty": "string" }
    ],
    "traditionalMarkets": [
      { "name": "string", "city": "string", "famous": "string" }
    ],
    "souvenirs": ["string"],
    "taxFreeShoppingAvailable": "string",
    "shopOpenHours": "string",
    "luxuryShoppingIndex": "string"
  },

  "transportation": {
    "majorAirports": [
      { "name": "string", "code": "string", "city": "string", "type": "string" }
    ],
    "mainAirlines": ["string"],
    "railNetwork": "string",
    "highSpeedRail": "string",
    "roadQuality": "string",
    "rideshareApps": ["string"],
    "publicTransportQuality": "string",
    "taxiSystem": "string",
    "rentaCarAvailability": "string",
    "drivingSide": "string",
    "internationalDrivingLicense": "string"
  },

  "visaRequirements": {
    "visaOnArrivalCountries": ["string (at least 10 countries)"],
    "visaFreeCountries": ["string"],
    "eVisaAvailable": "string",
    "visaApplicationProcess": "string",
    "typesOfVisa": ["string"],
    "visaFee": "string",
    "maxStayWithVisa": "string",
    "passportRenewalOnArrival": "string",
    "multipleEntryOptions": "string"
  },

  "entryRequirements": {
    "passportValidity": "string (months required beyond stay)",
    "vaccinationRequirements": ["string"],
    "customsRestrictions": ["string"],
    "currencyDeclaration": "string",
    "covidRequirements": "string",
    "insuranceRequirement": "string",
    "onwardTicketRequired": "string"
  },

  "safety": {
    "overallSafetyRating": "string",
    "safetForSoloFemale": "string",
    "safetyForLGBTQ": "string",
    "tourismSafetyAdvisory": "string",
    "commonScams": ["string"],
    "emergencyNumbers": { "police": "string", "ambulance": "string", "fire": "string", "tourist": "string" },
    "naturalDisasterRiskForTourists": "string",
    "healthRisksForTourists": ["string"]
  },

  "practicalInfo": {
    "currency": "string",
    "exchangeRateUSD": "string",
    "bestTimeToVisit": "string",
    "shoulderSeason": "string",
    "peakSeason": "string",
    "offSeason": "string",
    "avgTravelBudgetPerDay": "string (budget/mid/luxury)",
    "tipingCulture": "string",
    "bargainingCulture": "string",
    "languageBarrier": "string",
    "usefulPhrases": [{ "phrase": "string", "meaning": "string" }],
    "powerPlug": "string",
    "timeZone": "string",
    "dressCode": "string",
    "photographyRules": "string",
    "alcoholLaws": "string"
  },

  "adventureTourism": {
    "activities": ["string"],
    "topAdventureSites": [
      { "site": "string", "activity": "string", "difficulty": "string", "season": "string" }
    ],
    "trekking": "string",
    "diving": "string",
    "skiing": "string",
    "safaris": "string"
  },

  "culturalTourism": {
    "festivals": [
      { "name": "string", "month": "string", "location": "string", "description": "string", "attendance": "string" }
    ],
    "artGalleries": ["string"],
    "museums": ["string"],
    "performingArts": ["string"],
    "religiousSites": ["string"],
    "craftVillages": ["string"]
  },

  "sustainability": {
    "ecoTourismRating": "string",
    "sustainableTourismInitiatives": ["string"],
    "greenHotels": "string",
    "carbonOffsetPrograms": "string",
    "overtourismConcerns": "string",
    "responsibleTourismCode": "string"
  }
}
${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 32768 }
    });

    return safeParse(response.text || '{}', {});
};
