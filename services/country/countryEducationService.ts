import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchEducationProfile = async (countryName: string) => {
    const prompt = `
GENERATE AN EXHAUSTIVE EDUCATION SYSTEM DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V2 — EXHAUSTIVE MODE.
MANDATE: Fill every field with real, specific, accurate data.

RETURN JSON ONLY:
{
  "literacyRate": "string",
  "literacyRateMale": "string",
  "literacyRateFemale": "string",
  "youthLiteracyRate": "string",
  "system": "string (e.g. 6-3-3-4 structure)",
  "expenditure": "string (% of GDP + per capita)",
  "educationRank": "string (PISA or global rank)",
  "compulsoryEducationAge": "string",
  "schoolYearStart": "string",
  "officialLanguageOfInstruction": "string",

  "structure": {
    "preprimaryYears": "string",
    "primaryYears": "string",
    "lowerSecondaryYears": "string",
    "upperSecondaryYears": "string",
    "tertiaryYears": "string",
    "vocationTrainingAvailability": "string",
    "specialEducationSystem": "string",
    "inclusiveEducationPolicy": "string"
  },

  "enrollment": {
    "preprimaryGrossEnrollment": "string",
    "primaryGrossEnrollment": "string",
    "secondaryGrossEnrollment": "string",
    "tertiaryGrossEnrollment": "string",
    "primaryCompletionRate": "string",
    "dropoutRate": "string",
    "primaryGenderParityIndex": "string",
    "secondaryGenderParityIndex": "string",
    "tertiaryGenderParityIndex": "string",
    "netEnrollmentPrimary": "string",
    "netEnrollmentSecondary": "string"
  },

  "qualityIndicators": {
    "pisaMathScore": "string",
    "pisaReadingScore": "string",
    "pisaScienceScore": "string",
    "pisaRank": "string",
    "pearsonEduIndex": "string",
    "teacherStudentRatioPrimary": "string",
    "teacherStudentRatioSecondary": "string",
    "qualifiedTeachersPercent": "string",
    "avgClassSize": "string",
    "studentAbsenteeismRate": "string",
    "schoolInfrastructureScore": "string",
    "digitalLiteracyRate": "string"
  },

  "universities": ["string (at least 20 top universities)"],

  "topUniversities": [
    {
      "name": "string",
      "city": "string",
      "rank": "string (QS/Times global rank)",
      "founded": "string",
      "type": "string (Public/Private)",
      "specialization": "string",
      "enrollment": "string",
      "notableAlumni": ["string"]
    }
  ],

  "topSchools": [
    { "name": "string", "city": "string", "type": "string", "founded": "string", "notableFor": "string" }
  ],

  "teachingProfession": {
    "totalTeachers": "string",
    "avgTeacherSalary": "string",
    "teacherSalaryVsGDPPerCapita": "string",
    "teacherTrainingInstitutions": "string",
    "teacherRetentionRate": "string",
    "teacherSatisfaction": "string",
    "teacherCertificationRequirements": "string"
  },

  "expenditureDetails": {
    "totalEducationBudget": "string",
    "primaryPerStudentSpend": "string",
    "secondaryPerStudentSpend": "string",
    "tertiaryPerStudentSpend": "string",
    "publicVsPrivateEducation": "string",
    "scholarshipFunding": "string",
    "studentLoanSystem": "string",
    "tuitionFees": "string"
  },

  "vocationalAndTech": {
    "vocationalEnrollmentRate": "string",
    "vocationalInstitutions": "string",
    "tvetPolicy": "string",
    "apprenticeshipPrograms": ["string"],
    "industryPartnerships": ["string"],
    "vocationalGraduateEmployment": "string"
  },

  "researchAndInnovation": {
    "researchUniversities": ["string"],
    "rAndDSpendingGDP": "string",
    "researchersPerMillion": "string",
    "annualPatentsFiled": "string",
    "academicPublicationsAnnual": "string",
    "nobelLaureatesInEducation": "string",
    "highImpactJournals": ["string"],
    "internationalCollaborations": ["string"]
  },

  "notableAlumniAndAcademics": [
    { "name": "string", "field": "string", "achievement": "string" }
  ],

  "scholarshipsAndExchange": {
    "governmentScholarships": ["string"],
    "internationalScholarships": ["string"],
    "exchangePrograms": ["string"],
    "foreignStudentsEnrolled": "string",
    "domesticStudentsAbroad": "string"
  },

  "digitalAndInnovation": {
    "edTechAdoption": "string",
    "onlineLearningPlatforms": ["string"],
    "computersPerStudent": "string",
    "internetInSchools": "string",
    "codingInCurriculum": "string",
    "stemInitiatives": ["string"],
    "aiInEducation": "string"
  },

  "inclusionAndEquity": {
    "educationForDisabled": "string",
    "indigenousEducation": "string",
    "genderEqualityInEducation": "string",
    "ruralEducationAccess": "string",
    "povertysImpactOnEducation": "string",
    "ethnicMinorityEducation": "string",
    "refugeeEducation": "string",
    "earlyChildhoodDevelopment": "string"
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
