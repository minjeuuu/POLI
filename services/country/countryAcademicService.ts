
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { AcademicProfile } from "../../types";

export const fetchAcademicProfile = async (countryName: string): Promise<AcademicProfile> => {
    const prompt = `
POLI ARCHIVE — COMPLETE ACADEMIC & INTELLECTUAL DOSSIER: ${countryName}
CLASSIFICATION: EXHAUSTIVE ACADEMIC PROFILE — POLITICAL SCIENCE FOCUS
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

You are POLI, generating the COMPLETE academic and intellectual profile of ${countryName}, with a special focus on Political Science, Public Administration, International Relations, and related disciplines.

MANDATORY REQUIREMENTS — NO EXCEPTIONS:

1. HISTORY OF POLITICAL SCIENCE IN ${countryName} (minimum 800 words):
   - When and how political science as a discipline was established
   - Key founding figures and their contributions
   - Major intellectual movements and schools of thought
   - Evolution of the discipline through different political eras
   - Current state of political science education and research
   - Relationship between academia and government/policy

2. INTELLECTUAL HISTORY (minimum 600 words):
   - Major political thinkers from ${countryName} and their contributions
   - Key debates and intellectual controversies
   - Indigenous political theories and concepts
   - Influence of foreign intellectual traditions
   - Notable publications and their impact

3. UNIVERSITIES — LIST ALL universities with Political Science or related programs:
   For EACH university provide:
   - Full official name
   - Acronym/abbreviation
   - City/location
   - Type (public/private/state)
   - Year founded
   - Official website URL (real, verified URL)
   - Logo description (colors, elements, symbols)
   - Political Science department details
   - Notable faculty members in political science
   - Notable alumni in politics/government
   - Research specializations
   - Rankings/recognition

   SPECIAL INSTRUCTIONS FOR ${countryName}:
   - If ${countryName} is "Philippines": Saint Louis University (SLU) in Baguio City MUST be listed FIRST. Include its CICM heritage, School of Accountancy, Business and Hospitality, and its political science programs.
   - List ALL universities, not just "top" ones. Include regional universities, state colleges, and private institutions that offer political science.
   - Minimum 20 universities if ${countryName} has that many.

4. THINK TANKS & POLICY INSTITUTES — LIST ALL major ones:
   For EACH:
   - Full name, acronym, city
   - Year founded, founder
   - Official website URL (real, verified)
   - Logo description
   - Focus areas and specializations
   - Key publications/reports
   - Political orientation (if any)
   - Notable researchers/fellows

   SPECIAL INSTRUCTIONS FOR ${countryName}:
   - If ${countryName} is "Philippines": Philippine Political Science Association (PPSA) MUST be listed FIRST with accurate details. Include also: Development Academy of the Philippines, Philippine Institute for Development Studies, etc.

5. ACADEMIC JOURNALS:
   - List all major academic journals in political science published in ${countryName}
   - Include: name, publisher, ISSN, frequency, year founded, focus areas

6. RESEARCH CENTERS:
   - University-affiliated research centers focused on politics/governance
   - Independent research organizations

7. ACADEMIC CONFERENCES:
   - Major annual conferences in political science
   - International conferences hosted in ${countryName}

8. NOTABLE ACADEMIC WORKS:
   - Seminal books and papers by scholars from ${countryName}
   - Most cited works in the country's political science tradition

RETURN VALID JSON ONLY:
{
    "disciplineHistory": "string (minimum 800 words on how political science developed in ${countryName})",
    "intellectualHistory": "string (minimum 600 words)",
    "universities": [
        {
            "name": "string (full official name)",
            "acronym": "string",
            "city": "string",
            "type": "string (Public/Private/State)",
            "founded": "string (year)",
            "website": "string (real URL)",
            "logoDescription": "string (describe logo colors, elements, symbols)",
            "polsciDepartment": "string (department name and details)",
            "notableFaculty": ["string"],
            "notableAlumni": ["string"],
            "specializations": ["string"],
            "rankings": "string"
        }
    ],
    "thinkTanks": [
        {
            "name": "string",
            "acronym": "string",
            "city": "string",
            "founded": "string",
            "founder": "string",
            "website": "string (real URL)",
            "logoDescription": "string",
            "focusAreas": ["string"],
            "keyPublications": ["string"],
            "orientation": "string",
            "notableResearchers": ["string"]
        }
    ],
    "journals": [
        {
            "name": "string",
            "publisher": "string",
            "issn": "string",
            "frequency": "string",
            "founded": "string",
            "focusAreas": ["string"]
        }
    ],
    "researchCenters": [
        { "name": "string", "affiliation": "string", "focus": "string", "website": "string" }
    ],
    "conferences": [
        { "name": "string", "frequency": "string", "organizer": "string", "description": "string" }
    ],
    "seminalWorks": [
        { "title": "string", "author": "string", "year": "string", "significance": "string" }
    ]
}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {}) as AcademicProfile;
};
