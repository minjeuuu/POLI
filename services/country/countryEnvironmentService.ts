import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchEnvironmentProfile = async (countryName: string) => {
    const prompt = `
GENERATE A COMPREHENSIVE ENVIRONMENTAL & ECOLOGICAL DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V2 — EXHAUSTIVE MODE.
MANDATE: Fill every single field with real, accurate data. Be exhaustive and specific.

RETURN JSON ONLY:
{
  "co2Emissions": "string",
  "totalEmissions": "string",
  "forestCover": "string",
  "airQualityIndex": "string",
  "policy": "string",
  "threats": ["at least 12 specific threats"],

  "climate": {
    "classification": "string",
    "avgAnnualTemp": "string",
    "avgAnnualRainfall": "string",
    "avgHumidity": "string",
    "avgWindSpeed": "string",
    "hottestMonth": "string",
    "coldestMonth": "string",
    "wettestMonth": "string",
    "droughtRisk": "string",
    "floodRisk": "string",
    "seasons": [
      { "name": "string", "months": "string", "avgTemp": "string", "characteristics": "string" }
    ],
    "climateZones": ["string"],
    "climateChangeVulnerability": "string",
    "temperatureRiseSincePreIndustrial": "string",
    "projectedTempRise2100": "string",
    "seaLevelRiseRisk": "string"
  },

  "airQuality": {
    "nationalAQI": "string",
    "pm25Level": "string",
    "pm10Level": "string",
    "no2Level": "string",
    "ozoneLevel": "string",
    "so2Level": "string",
    "coLevel": "string",
    "airQualityRank": "string",
    "pollutedCities": [
      { "city": "string", "aqi": "string", "mainPollutant": "string" }
    ],
    "cleanestCities": [{ "city": "string", "aqi": "string" }],
    "industrialPollutionSources": ["string"],
    "airQualityRegulation": "string",
    "annualDeathsFromAirPollution": "string",
    "healthImpact": "string"
  },

  "water": {
    "waterStressLevel": "string",
    "drinkingWaterAccess": "string",
    "sanitationAccess": "string",
    "waterTreatmentCapacity": "string",
    "groundwaterStatus": "string",
    "waterWithdrawalPerCapita": "string",
    "waterQualityIndex": "string",
    "majorRivers": [
      { "name": "string", "length": "string", "basin": "string", "significance": "string", "pollutionStatus": "string" }
    ],
    "majorLakes": [{ "name": "string", "area": "string", "depth": "string", "significance": "string" }],
    "aquifers": ["string"],
    "glaciers": "string",
    "coastlineLength": "string",
    "exclusiveEconomicZone": "string",
    "marineAreas": [{ "name": "string", "area": "string", "status": "string" }],
    "oceanPollutionLevel": "string",
    "coralReefStatus": "string",
    "fishingPressure": "string"
  },

  "biodiversity": {
    "totalVascularPlantSpecies": "string",
    "totalMammalSpecies": "string",
    "totalBirdSpecies": "string",
    "totalReptileSpecies": "string",
    "totalAmphibianSpecies": "string",
    "totalFishSpecies": "string",
    "totalInsectSpecies": "string",
    "endemicSpeciesCount": "string",
    "criticallyEndangeredCount": "string",
    "endangeredCount": "string",
    "vulnerableCount": "string",
    "biodiversityHotspot": "boolean",
    "flagshipSpecies": ["string"],
    "endangeredSpecies": [
      { "name": "string", "status": "string", "threat": "string" }
    ],
    "notableFloraHighlights": ["string"],
    "notableFaunaHighlights": ["string"],
    "invasiveSpecies": ["string"],
    "extinctSpecies": ["string"],
    "rewildingPrograms": ["string"]
  },

  "protectedAreas": {
    "totalProtectedLandPercent": "string",
    "totalProtectedMarinePercent": "string",
    "nationalParks": [
      { "name": "string", "area": "string", "established": "string", "location": "string", "features": "string", "unescoStatus": "string" }
    ],
    "biosphereReserves": [{ "name": "string", "area": "string", "designation": "string" }],
    "ramsarWetlands": ["string"],
    "worldHeritageSitesNatural": ["string"],
    "wildlifeCorridors": ["string"],
    "communityConservationAreas": "string"
  },

  "forests": {
    "totalForestArea": "string",
    "forestCoverPercent": "string",
    "primaryForestPercent": "string",
    "deforestationRate": "string",
    "reforestationRate": "string",
    "netForestChange": "string",
    "forestTypes": ["string"],
    "majorTimberSpecies": ["string"],
    "carbonStockValue": "string",
    "illegalLogging": "string",
    "forestGovernanceRating": "string",
    "reforestationPrograms": [{ "name": "string", "target": "string", "progress": "string" }]
  },

  "carbonProfile": {
    "totalEmissions": "string",
    "perCapitaEmissions": "string",
    "emissionsTrend": "string",
    "peakEmissionYear": "string",
    "emissionsBySource": [{ "source": "string", "percentage": "string", "value": "string" }],
    "carbonIntensityGDP": "string",
    "netZeroTarget": "string",
    "carbonNeutralityStatus": "string",
    "carbonTax": "string",
    "emissionsTrading": "string",
    "offsetPrograms": ["string"],
    "carbonCaptureProjects": ["string"]
  },

  "energy": {
    "totalPrimaryEnergyConsumption": "string",
    "energyPerCapita": "string",
    "renewableSharePercent": "string",
    "solarCapacityGW": "string",
    "windCapacityGW": "string",
    "hydroCapacityGW": "string",
    "geothermalCapacityGW": "string",
    "nuclearCapacityGW": "string",
    "bioenergyCapacityGW": "string",
    "fossilFuelSharePercent": "string",
    "coalDependency": "string",
    "oilDependency": "string",
    "gasDependency": "string",
    "energyImportDependency": "string",
    "energySecurity": "string",
    "renewableEnergyTargets": "string",
    "greenHydrogenProjects": ["string"],
    "largestPowerPlants": [{ "name": "string", "type": "string", "capacity": "string", "location": "string" }]
  },

  "wasteManagement": {
    "municipalWastePerCapita": "string",
    "recyclingRate": "string",
    "compostingRate": "string",
    "landfillRate": "string",
    "incinerationRate": "string",
    "plasticWasteGenerated": "string",
    "plasticRecyclingRate": "string",
    "eWasteGenerated": "string",
    "eWasteRecycled": "string",
    "hazardousWasteManagement": "string",
    "oceanPlasticContribution": "string",
    "wasteToEnergyCapacity": "string",
    "circularEconomyPolicy": "string",
    "singleUsePlasticBan": "string"
  },

  "environmentalPolicy": {
    "parisAgreementStatus": "string",
    "parisAgreementNDC": "string",
    "kyotoProtocolStatus": "string",
    "biodiversityConvention": "string",
    "environmentMinistry": "string",
    "environmentMinister": "string",
    "environmentBudget": "string",
    "greenBondsIssued": "string",
    "environmentalLaws": [{ "name": "string", "year": "string", "purpose": "string" }],
    "internationalEnvironmentalTreaties": ["string"],
    "nationalEnvironmentalPlan": "string",
    "esgRanking": "string",
    "climateFinanceContribution": "string"
  },

  "naturalDisasters": {
    "overallRiskLevel": "string",
    "earthquakeRisk": "string",
    "volcanicRisk": "string",
    "tsunamiRisk": "string",
    "hurricaneRisk": "string",
    "floodRisk": "string",
    "droughtRisk": "string",
    "wildfireRisk": "string",
    "landslideRisk": "string",
    "commonDisasters": ["string"],
    "recentDisasters": [
      { "year": "string", "event": "string", "magnitude": "string", "casualties": "string", "economicLoss": "string" }
    ],
    "disasterManagementAgency": "string",
    "disasterPreparednessScore": "string",
    "earlyWarningSystem": "string",
    "buildingCodeCompliance": "string"
  },

  "ecologicalIndicators": {
    "epiScore": "string",
    "epiRank": "string",
    "epiYear": "string",
    "ecologicalFootprint": "string",
    "biocapacity": "string",
    "overshootDay": "string",
    "environmentalHealthScore": "string",
    "ecosystemVitalityScore": "string",
    "waterResourceScore": "string",
    "airQualityScore": "string",
    "biodiversityScore": "string",
    "climateChangeScore": "string",
    "solidWasteScore": "string",
    "sustainableDevelopmentGoalProgress": "string"
  },

  "agriculture": {
    "agriculturalLandPercent": "string",
    "arableLandPercent": "string",
    "irrigatedLandArea": "string",
    "topCrops": ["string"],
    "organicFarmingPercent": "string",
    "pesticideUse": "string",
    "fertilizerUse": "string",
    "soilDegradation": "string",
    "foodSecurityIndex": "string",
    "agriculturalWaterUse": "string",
    "agriSubsidies": "string",
    "livestockEmissions": "string"
  },

  "urbanEnvironment": {
    "greenSpacePerCapita": "string",
    "treeCanopyCoverUrban": "string",
    "urbanHeatIslandEffect": "string",
    "stormwaterManagement": "string",
    "greenBuildings": "string",
    "smartCityInitiatives": ["string"],
    "electricVehicleAdoption": "string",
    "publicTransportEmissions": "string",
    "cyclingInfrastructure": "string",
    "noisePollutionLevel": "string"
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
