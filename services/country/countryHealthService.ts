import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchHealthProfile = async (countryName: string) => {
    const prompt = `
GENERATE AN EXHAUSTIVE PUBLIC HEALTH & MEDICAL DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V2 — EXHAUSTIVE MODE.
MANDATE: Fill every field with real, specific, accurate data.

RETURN JSON ONLY:
{
  "lifeExpectancy": "string",
  "lifeExpectancyMale": "string",
  "lifeExpectancyFemale": "string",
  "healthyLifeExpectancy": "string",
  "healthcareSystem": "string",
  "expenditure": "string",
  "healthRank": "string",

  "keyStats": {
    "infantMortalityRate": "string (per 1,000 live births)",
    "under5MortalityRate": "string",
    "maternalMortalityRate": "string",
    "neonatalMortalityRate": "string",
    "birthRate": "string",
    "fertilityRate": "string",
    "doctorsPer1000": "string",
    "nursesPer1000": "string",
    "hospitalBedsPer1000": "string",
    "pharmacistsPer1000": "string",
    "dentistsPer1000": "string",
    "healthWorkerDensity": "string"
  },

  "healthcareInfrastructure": {
    "totalHospitals": "string",
    "publicHospitals": "string",
    "privateHospitals": "string",
    "primaryCareClinics": "string",
    "specialtyCenters": "string",
    "mentalHealthFacilities": "string",
    "rehabilitationCenters": "string",
    "emergencyResponseTime": "string",
    "healthInsuranceCoverage": "string",
    "universalHealthCoverage": "string",
    "topHospitals": [
      { "name": "string", "city": "string", "specialization": "string", "ranking": "string" }
    ],
    "telemedicineAdoption": "string",
    "healthITInfrastructure": "string"
  },

  "expenditureDetails": {
    "totalHealthSpendingGDP": "string",
    "totalHealthSpendingPerCapita": "string",
    "publicSpendingPercent": "string",
    "privateSpendingPercent": "string",
    "outOfPocketPercent": "string",
    "pharmaceuticalSpending": "string",
    "preventiveCareBudget": "string",
    "mentalHealthBudget": "string"
  },

  "diseaseProfile": {
    "topCausesOfDeath": [
      { "cause": "string", "rank": "string", "percentage": "string" }
    ],
    "majorInfectiousDiseases": [
      { "disease": "string", "prevalence": "string", "trend": "string" }
    ],
    "nonCommunicableDiseases": [
      { "disease": "string", "prevalence": "string", "mortalityRate": "string" }
    ],
    "cancerTypes": [
      { "type": "string", "incidence": "string", "survivalRate": "string" }
    ],
    "cardiovascularDiseaseRate": "string",
    "strokeRate": "string",
    "diabetesPrevalence": "string",
    "hypertensionRate": "string",
    "obesityRate": "string",
    "hivAidsPrevalence": "string",
    "tbIncidenceRate": "string",
    "mentalDisorderPrevalence": "string",
    "dementiaPrevalence": "string"
  },

  "vaccinations": {
    "nationalImmunizationProgram": "string",
    "vaccinationCoverage": [
      { "vaccine": "string", "coverage": "string", "targetGroup": "string" }
    ],
    "covidVaccinationRate": "string",
    "fluVaccinationRate": "string",
    "mandatoryVaccines": ["string"],
    "vaccineHesitancyLevel": "string"
  },

  "mentalHealth": {
    "mentalHealthActExists": "string (Yes/No)",
    "psychiatristsPer100k": "string",
    "psychologistsPer100k": "string",
    "depressionPrevalence": "string",
    "anxietyPrevalence": "string",
    "suicideRate": "string",
    "substanceUsePrevalence": "string",
    "mentalHealthStigma": "string",
    "mentalHealthPolicy": "string",
    "mentalHealthFunding": "string",
    "crisisServicesAvailability": "string"
  },

  "maternalAndChildHealth": {
    "antenatalCoverage": "string",
    "skilledBirthAttendant": "string",
    "caesareanRate": "string",
    "breastfeedingRate": "string",
    "stuntingRate": "string",
    "wastingRate": "string",
    "underweightChildrenRate": "string",
    "paediatricHospitalBeds": "string",
    "neonatalICUCapacity": "string"
  },

  "nutrition": {
    "undernourishmentRate": "string",
    "overweightRate": "string",
    "foodInsecurity": "string",
    "micronutrientDeficiencies": ["string"],
    "calorieIntakeAvg": "string",
    "alcoholConsumptionPerCapita": "string",
    "smokingPrevalence": "string",
    "smokingMale": "string",
    "smokingFemale": "string",
    "drugUsePrevalence": "string"
  },

  "publicHealthChallenges": {
    "emergingThreats": ["string"],
    "antimicrobialResistance": "string",
    "pandemicPreparednessIndex": "string",
    "ghsIndex": "string",
    "environmentalHealthThreats": ["string"],
    "healthInequalities": "string",
    "ruralUrbanHealthGap": "string",
    "genderHealthGap": "string"
  },

  "pharmaceuticals": {
    "domesticPharmaceuticalIndustry": "string",
    "topPharmaceuticalCompanies": ["string"],
    "drugExpenditurePerCapita": "string",
    "genericDrugUsage": "string",
    "drugImportDependency": "string",
    "vaccineManufacturingCapacity": "string",
    "regulatoryBody": "string",
    "clinicalTrials": "string"
  },

  "medicalResearch": {
    "medicalSchoolsCount": "string",
    "medicalResearchInstitutes": ["string"],
    "healthResearchBudget": "string",
    "nobelPrizesInMedicine": "string",
    "medicalPublicationsAnnual": "string",
    "healthTechStartups": "string",
    "medicalTourism": "string",
    "medicalTourismRevenue": "string",
    "topMedicalTourismProcedures": ["string"]
  },

  "majorDiseases": ["string (at least 10)"]
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
