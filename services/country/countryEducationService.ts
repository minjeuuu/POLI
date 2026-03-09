import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchEducationProfile = async (countryName: string) => {
    const prompt = `
GENERATE AN EXHAUSTIVE POLITICAL-SCIENCE-FOCUSED EDUCATION SYSTEM DOSSIER FOR: ${countryName}
PROTOCOL: POLI ARCHIVE V3 — MAXIMUM EXHAUSTIVE MODE.
MANDATE: Fill EVERY field with REAL, SPECIFIC, ACCURATE, VERIFIED data. Do NOT fabricate. Do NOT leave any array empty. Do NOT use placeholder text.
If data is genuinely unavailable, write "Data not available" — but TRY HARD to provide real information.

CRITICAL INSTRUCTIONS:
- Return VALID JSON ONLY. No markdown, no commentary, no code fences, no explanation — pure JSON.
- Every URL must be a REAL, VERIFIED, currently active website URL. Do NOT invent URLs.
- For the Philippines specifically: Saint Louis University (SLU) in Baguio City MUST appear prominently in the universities list — it has a well-regarded political science program. Also, the Philippine Political Science Association (PPSA) MUST be listed prominently among think tanks and professional associations with accurate links.
- List EVERY SINGLE university, think tank, and research institute you know of that focuses on political science, public administration, international relations, or governance studies in ${countryName}. Be EXHAUSTIVE — do not limit yourself to top 5 or top 10. List ALL of them.

RETURN THIS EXACT JSON STRUCTURE:
{
  "ministryOfEducation": {
    "officialName": "string (full official name of the ministry/department responsible for education)",
    "minister": "string (current minister/secretary of education — full name and title)",
    "website": "string (REAL verified official ministry website URL)",
    "yearEstablished": "string",
    "totalBudget": "string (latest education budget in local currency and USD equivalent)",
    "budgetAsPercentOfGDP": "string",
    "budgetAsPercentOfGovtSpending": "string",
    "missionStatement": "string (brief summary of stated mission)",
    "keyPolicies": ["string (list current flagship education policies and reforms)"],
    "subsidiaryAgencies": [
      {
        "name": "string",
        "role": "string",
        "website": "string (REAL URL)"
      }
    ]
  },

  "educationSystemStructure": {
    "systemOverview": "string (e.g. K-12, 6-3-3-4, etc. — describe the full structure)",
    "compulsoryEducationAges": "string (e.g. ages 6-16)",
    "compulsoryEducationYears": "string (e.g. 10 years)",
    "academicYearStart": "string (month)",
    "academicYearEnd": "string (month)",
    "officialLanguagesOfInstruction": ["string"],
    "gradingSystem": "string (describe the grading scale used)",
    "levels": {
      "preSchool": {
        "ageRange": "string",
        "duration": "string",
        "description": "string (coverage, public vs private, curriculum focus)",
        "grossEnrollmentRate": "string",
        "netEnrollmentRate": "string"
      },
      "primary": {
        "ageRange": "string",
        "duration": "string",
        "description": "string (curriculum overview, key subjects)",
        "grossEnrollmentRate": "string",
        "netEnrollmentRate": "string",
        "completionRate": "string",
        "dropoutRate": "string"
      },
      "lowerSecondary": {
        "ageRange": "string",
        "duration": "string",
        "description": "string",
        "grossEnrollmentRate": "string",
        "netEnrollmentRate": "string"
      },
      "upperSecondary": {
        "ageRange": "string",
        "duration": "string",
        "description": "string (tracks available — academic, vocational, technical)",
        "grossEnrollmentRate": "string",
        "netEnrollmentRate": "string"
      },
      "undergraduate": {
        "typicalDuration": "string",
        "degreeTypes": ["string (e.g. Bachelor of Arts, Bachelor of Science)"],
        "grossEnrollmentRate": "string",
        "description": "string"
      },
      "masters": {
        "typicalDuration": "string",
        "degreeTypes": ["string"],
        "description": "string"
      },
      "doctoral": {
        "typicalDuration": "string",
        "degreeTypes": ["string (e.g. PhD, EdD, DPA)"],
        "description": "string"
      },
      "vocationalAndTechnical": {
        "description": "string",
        "institutions": "string (number and type)",
        "enrollmentRate": "string",
        "keyPrograms": ["string"]
      }
    }
  },

  "literacyAndStatistics": {
    "overallLiteracyRate": "string",
    "maleLiteracyRate": "string",
    "femaleLiteracyRate": "string",
    "youthLiteracyRate": "string (ages 15-24)",
    "adultLiteracyRate": "string (ages 15+)",
    "functionalLiteracyRate": "string",
    "digitalLiteracyRate": "string",
    "educationSpendingPercentGDP": "string",
    "educationSpendingPerCapita": "string",
    "educationSpendingPercentGovtBudget": "string",
    "totalStudentsEnrolled": "string (all levels combined)",
    "totalTeachers": "string",
    "studentTeacherRatioPrimary": "string",
    "studentTeacherRatioSecondary": "string",
    "studentTeacherRatioTertiary": "string",
    "genderParityIndexPrimary": "string",
    "genderParityIndexSecondary": "string",
    "genderParityIndexTertiary": "string",
    "meanYearsOfSchooling": "string",
    "expectedYearsOfSchooling": "string",
    "humanCapitalIndex": "string",
    "pisaMathScore": "string (or N/A if not participating)",
    "pisaReadingScore": "string",
    "pisaScienceScore": "string",
    "globalEducationRanking": "string"
  },

  "politicalScienceUniversities": [
    {
      "fullName": "string (complete official university name)",
      "acronym": "string (e.g. UP, ADMU, SLU, UST)",
      "location": "string (city, state/province)",
      "foundedYear": "string",
      "type": "string (Public / Private / Private-Religious / State University)",
      "website": "string (REAL verified official university website URL)",
      "logoDescription": "string (brief factual description of the university logo/seal — colors, symbols, motto if visible)",
      "politicalScienceDepartment": {
        "departmentName": "string (official name of the department or school)",
        "degreesOffered": ["string (e.g. BA Political Science, MA Public Administration, PhD Political Science)"],
        "departmentWebsite": "string (REAL URL to the specific department page if available)",
        "yearEstablished": "string",
        "description": "string (brief overview of program strengths, specializations, methodology)"
      },
      "notablePoliticalScienceFaculty": [
        {
          "name": "string (full name)",
          "title": "string (e.g. Professor, Associate Professor, Department Chair)",
          "specialization": "string (research focus area)",
          "notableWork": "string (key publication or contribution)"
        }
      ],
      "rankings": {
        "nationalRank": "string",
        "qsWorldRank": "string (or N/A)",
        "timesHigherEducationRank": "string (or N/A)",
        "politicalScienceSubjectRank": "string (if available)"
      },
      "totalEnrollment": "string",
      "notableAlumniInPolitics": [
        {
          "name": "string",
          "position": "string (highest political office held or current role)",
          "graduationYear": "string (approximate if exact unknown)"
        }
      ],
      "studentPoliticalOrganizations": ["string (names of active student political groups, debate societies, model UN teams, student government bodies)"],
      "scholarshipPrograms": ["string (scholarships available specifically for political science or social science students)"]
    }
  ],

  "thinkTanksAndResearchInstitutes": [
    {
      "name": "string (full official name)",
      "acronym": "string",
      "director": "string (current head/director/president — full name and title)",
      "yearFounded": "string",
      "location": "string (city)",
      "focusAreas": ["string (e.g. governance, public policy, democracy, human rights, security studies, electoral reform)"],
      "website": "string (REAL verified official website URL)",
      "logoDescription": "string (brief factual description of the organization logo)",
      "affiliations": "string (university-affiliated, government, independent, international)",
      "keyPublications": ["string (names of flagship reports, journals, policy papers, book series)"],
      "keyPrograms": ["string (major ongoing research programs or initiatives)"],
      "notableResearchers": ["string (prominent scholars associated with the institute)"],
      "fundingSources": "string (government-funded, donor-funded, mixed, etc.)"
    }
  ],

  "professionalAssociations": [
    {
      "name": "string (e.g. Philippine Political Science Association, American Political Science Association)",
      "acronym": "string",
      "president": "string (current president or chair)",
      "yearFounded": "string",
      "website": "string (REAL verified URL)",
      "description": "string (mission and activities)",
      "annualConference": "string (name and typical timing of annual meeting)",
      "membershipSize": "string",
      "keyActivities": ["string"]
    }
  ],

  "academicJournals": [
    {
      "journalName": "string (full name of the journal)",
      "publisher": "string (university or organization that publishes it)",
      "issnNumber": "string (if known)",
      "frequency": "string (e.g. quarterly, biannual, annual)",
      "focusArea": "string (political science, public administration, international relations, etc.)",
      "website": "string (REAL URL if available)",
      "yearEstablished": "string",
      "indexedIn": ["string (e.g. Scopus, Web of Science, JSTOR, Google Scholar)"],
      "editorInChief": "string (if known)"
    }
  ],

  "scholarshipAndFundingPrograms": [
    {
      "name": "string",
      "provider": "string (government, university, international org, private foundation)",
      "targetGroup": "string (undergrad, graduate, doctoral, faculty, etc.)",
      "coverage": "string (full tuition, stipend, travel, etc.)",
      "website": "string (REAL URL if available)",
      "description": "string"
    }
  ],

  "studentPoliticalOrganizations": [
    {
      "name": "string",
      "type": "string (national student union, party-affiliated, issue-based, etc.)",
      "university": "string (if university-specific, or 'National' if nationwide)",
      "description": "string",
      "founded": "string",
      "website": "string (REAL URL if available)"
    }
  ],

  "notableAlumniInPolitics": [
    {
      "name": "string",
      "university": "string (where they studied political science or related field)",
      "degree": "string",
      "highestPoliticalPosition": "string",
      "yearsActive": "string",
      "notableAchievements": "string"
    }
  ],

  "educationChallenges": ["string (list key challenges facing the education system)"],
  "recentReforms": ["string (list recent education reforms and policy changes)"],
  "internationalPartnerships": ["string (list international education partnerships, exchange agreements, bilateral programs)"]
}

ABSOLUTE REQUIREMENTS:
1. The "politicalScienceUniversities" array must contain EVERY university in ${countryName} that offers political science, public administration, international relations, governance, or diplomacy programs. Be EXHAUSTIVE. Include major national universities, state/regional universities, private universities, and religiously-affiliated universities. Aim for completeness — if ${countryName} has 30 such universities, list all 30.
2. The "thinkTanksAndResearchInstitutes" array must list EVERY known think tank, policy institute, and research center focused on political science, governance, public policy, democracy, security, or international relations in ${countryName}.
3. ALL URLs must be REAL and VERIFIED. Do not fabricate any URL.
4. ALL person names (ministers, faculty, directors, alumni) must be REAL people with REAL credentials.
5. For Philippines: Saint Louis University (SLU) in Baguio City MUST be included in politicalScienceUniversities. The Philippine Political Science Association (PPSA) MUST be included in professionalAssociations.
6. Return VALID JSON ONLY. No text before or after the JSON object. No markdown formatting. No code blocks.
${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8000 }
    });

    return safeParse(response.text || '{}', {});
};
