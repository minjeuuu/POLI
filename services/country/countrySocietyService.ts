import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchSocietyProfile = async (countryName: string) => {
    const prompt = `
GENERATE AN EXHAUSTIVE SOCIETY & SOCIAL STRUCTURE DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V2 — EXHAUSTIVE MODE.
MANDATE: Fill every field with real, specific, accurate data.

RETURN JSON ONLY:
{
  "cuisine": "string (paragraph)",
  "dishes": ["string (at least 8 dishes)"],
  "arts": "string (paragraph)",
  "mediaFreedom": "string",

  "socialIndicators": {
    "humanDevelopmentIndex": "string",
    "hdiRank": "string",
    "giniCoefficient": "string",
    "povertyRate": "string",
    "extremePovertyRate": "string",
    "socialMobilityIndex": "string",
    "socialMobilityRank": "string",
    "happinessIndex": "string",
    "happinessRank": "string",
    "qualityOfLifeIndex": "string",
    "prosperityIndex": "string",
    "socialProgressIndex": "string",
    "socialProgressRank": "string",
    "trustInInstitutions": "string",
    "trustInGovernment": "string",
    "interpersonalTrust": "string",
    "volunteeringRate": "string",
    "civilSocietyStrength": "string"
  },

  "demographics": {
    "medianAge": "string",
    "urbanizationRate": "string",
    "urbanPopulation": "string",
    "ruralPopulation": "string",
    "populationGrowthRate": "string",
    "netMigrationRate": "string",
    "immigrantPopulationPercent": "string",
    "emigrantDiaspora": "string",
    "dependencyRatio": "string",
    "ageDistribution": {
      "under15": "string",
      "15to64": "string",
      "over65": "string"
    },
    "topCities": [
      { "city": "string", "population": "string", "role": "string" }
    ]
  },

  "genderAndEquality": {
    "genderInequalityIndex": "string",
    "giiRank": "string",
    "globalGenderGapRank": "string",
    "womensParliamentSeats": "string",
    "womenInWorkforce": "string",
    "genderPayGap": "string",
    "womensEducationParity": "string",
    "maternityLeaveWeeks": "string",
    "paternityLeaveWeeks": "string",
    "genderBasedViolenceRate": "string",
    "femicideRate": "string",
    "womenInLeadership": "string",
    "feministMovement": "string"
  },

  "lgbtqRights": {
    "sameSeMarriage": "string (legal/illegal/civil union)",
    "adoptionRights": "string",
    "lgbtqProtectionLaws": "string",
    "lgbtqAntiDiscriminationLaw": "string",
    "genderIdentityRecognition": "string",
    "lgbtqMilitaryService": "string",
    "lgbtqAcceptanceLevel": "string",
    "lgbtqActivism": "string"
  },

  "laborAndEmployment": {
    "unemploymentRate": "string",
    "youthUnemploymentRate": "string",
    "femaleUnemploymentRate": "string",
    "laborForceParticipationRate": "string",
    "minimumWage": "string",
    "avgMonthlyWage": "string",
    "weeklyWorkingHours": "string",
    "paidVacationDays": "string",
    "tradeUnionMembership": "string",
    "strikesFrequency": "string",
    "gigEconomySize": "string",
    "informalEmploymentRate": "string",
    "occupationalHealthSafety": "string",
    "laborRightsIndex": "string"
  },

  "socialProtection": {
    "socialProtectionCoverage": "string",
    "pensionSystem": "string",
    "pensionAge": "string",
    "unemploymentBenefits": "string",
    "childAllowance": "string",
    "housingSubsidies": "string",
    "disabilityBenefits": "string",
    "foodAssistancePrograms": ["string"],
    "socialSpendingGDP": "string",
    "socialProtectionAdequacy": "string"
  },

  "crime": {
    "homicideRate": "string (per 100,000)",
    "crimeIndex": "string",
    "safetyIndex": "string",
    "safetyRank": "string",
    "prisonPopulationRate": "string",
    "prisonOvercrowding": "string",
    "recidivismRate": "string",
    "organizedCrime": "string",
    "corruption": "string",
    "corruptionPerceptionIndex": "string",
    "cpiRank": "string",
    "drugRelatedCrime": "string",
    "cyberCrime": "string",
    "domesticViolenceRate": "string",
    "policePer100k": "string",
    "drugPolicy": "string"
  },

  "housing": {
    "homeOwnershipRate": "string",
    "housingAffordabilityIndex": "string",
    "averageHousePriceToIncomeRatio": "string",
    "homelessnessRate": "string",
    "socialHousing": "string",
    "housingQualityIndex": "string",
    "overcrowdingRate": "string",
    "mortgageMarket": "string"
  },

  "media": {
    "pressFreedomIndex": "string",
    "pressFreedomRank": "string",
    "majorNewspapers": ["string"],
    "majorTVChannels": ["string"],
    "majorNewsWebsites": ["string"],
    "broadcastingRegulator": "string",
    "mediaOwnershipConcentration": "string",
    "publicBroadcaster": "string",
    "internationalMediaPresence": "string",
    "censorshipLevel": "string",
    "fakeNewsLevel": "string",
    "mediaLiteracyRate": "string"
  },

  "religion": {
    "secularism": "string (extent of state secularism)",
    "majorReligions": [
      { "religion": "string", "percentage": "string", "denominations": ["string"] }
    ],
    "religiousFreedom": "string",
    "religiousConflict": "string",
    "influenceOnPolitics": "string",
    "churchStateRelation": "string",
    "atheismRate": "string"
  },

  "socialCohesion": {
    "ethnicTensions": "string",
    "integrationPolicy": "string",
    "multiculturalismIndex": "string",
    "xenophobiaLevel": "string",
    "nationalIdentityStrength": "string",
    "communityParticipation": "string",
    "socialCapital": "string"
  },

  "consumerCulture": {
    "consumerSpendingPerCapita": "string",
    "retailMarketSize": "string",
    "onlineShoppingPenetration": "string",
    "luxuryGoodsMarket": "string",
    "brandConsciousness": "string",
    "sustainableConsumption": "string"
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
