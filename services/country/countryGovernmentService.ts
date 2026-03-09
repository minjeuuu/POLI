
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryGovernment = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE GOVERNMENT APPARATUS: ${countryName}
CLASSIFICATION: EXHAUSTIVE GOVERNMENT ROSTER
PROTOCOL: POLI ARCHIVE V2 — MAXIMUM DEPTH

${getLanguageInstruction()}

You are POLI, the world's most comprehensive political encyclopedia. Generate the COMPLETE government structure of ${countryName}. This must be EXHAUSTIVE — every single official, every agency, every court.

MANDATORY REQUIREMENTS:

1. EXECUTIVE BRANCH: Head of State (full name, title, party, term dates, predecessor, 200-word biography), Head of Government (same detail), Vice President/Deputy PM. COMPLETE CABINET: List EVERY minister/secretary — full name, exact title, party, date appointed, department. If there are 30 cabinet members, list ALL 30. Also: Chief of Staff, Press Secretary, National Security Advisor, key advisors.

2. LEGISLATIVE BRANCH: For EACH chamber — official name, total seats, current party composition with seat counts.
   - Leadership: Speaker/President, Majority/Minority Leaders, Whips
   - LIST ALL MEMBERS: For each member provide full name, party, district/constituency, term start. If 100 senators, list ALL 100. If 300 representatives, list ALL 300. Do NOT abbreviate or summarize.
   - Major committee chairs

3. JUDICIARY: Supreme/Constitutional Court — Chief Justice and ALL justices with names, who appointed them, year. Full court hierarchy. Specialized courts (electoral, anti-corruption, Sharia, military, tax).

4. CONSTITUTIONAL BODIES: Election Commission, Human Rights Commission, Anti-Corruption Body, Audit Commission, Civil Service Commission, Central Bank (Governor, Deputy Governors), Ombudsman — list chair and commissioners for each.

5. AGENCIES: List ALL major government agencies with: official name, acronym, head/director, parent department, official website URL (real verified URL), year established, mandate, logo description.

6. GOCCs: All major state-owned enterprises — name, CEO, sector.

7. LOCAL GOVERNMENT: Full hierarchy description (e.g., Regions→Provinces→Cities/Municipalities→Barangays), positions at each level, how executives are chosen.

8. POLITICAL CONCEPTS: Country-specific political terms and phenomena (e.g., Philippines: padrino system, trapo, political dynasty, barangay politics, hakot, balimbing; India: jugaad, goonda raj, vote bank; Japan: amakudari; etc.). For each: native term, definition (100+ words), examples, significance.

RETURN VALID JSON ONLY — NO MARKDOWN:
{
    "government": {
        "form": "string",
        "constitution": "string",
        "headOfState": { "title": "string", "name": "string", "party": "string", "since": "string", "termEnd": "string", "predecessor": "string", "biography": "string (min 200 words)", "imageDescription": "string" },
        "headOfGov": { "title": "string", "name": "string", "party": "string", "since": "string", "termEnd": "string", "predecessor": "string", "biography": "string (min 200 words)" },
        "viceLeader": { "title": "string", "name": "string", "party": "string", "since": "string" },
        "executiveOffice": [{ "title": "string", "name": "string", "role": "string" }],
        "cabinet": [{ "title": "string", "name": "string", "party": "string", "department": "string", "appointed": "string", "previousPosition": "string" }],
        "legislature": {
            "type": "string",
            "upperHouse": {
                "name": "string", "totalSeats": 0,
                "leadership": { "president": "string", "majorityLeader": "string", "minorityLeader": "string" },
                "composition": [{ "party": "string", "seats": 0, "percentage": "string" }],
                "members": [{ "name": "string", "party": "string", "district": "string", "since": "string" }],
                "committees": [{ "name": "string", "chair": "string" }]
            },
            "lowerHouse": {
                "name": "string", "totalSeats": 0,
                "leadership": { "speaker": "string", "majorityLeader": "string", "minorityLeader": "string" },
                "composition": [{ "party": "string", "seats": 0, "percentage": "string" }],
                "members": [{ "name": "string", "party": "string", "district": "string", "since": "string" }],
                "committees": [{ "name": "string", "chair": "string" }]
            }
        },
        "judiciary": {
            "supremeCourt": {
                "name": "string",
                "chiefJustice": { "name": "string", "appointedBy": "string", "yearAppointed": "string" },
                "justices": [{ "name": "string", "appointedBy": "string", "yearAppointed": "string" }]
            },
            "courtHierarchy": ["string"],
            "specializedCourts": [{ "name": "string", "jurisdiction": "string", "chiefJudge": "string" }]
        },
        "constitutionalBodies": [{ "name": "string", "type": "string", "chair": "string", "members": ["string"], "mandate": "string" }],
        "agencies": [{ "name": "string", "acronym": "string", "head": "string", "parentDepartment": "string", "website": "string", "yearEstablished": "string", "mandate": "string", "logoDescription": "string" }],
        "goccs": [{ "name": "string", "head": "string", "sector": "string" }],
        "localGovStructure": { "hierarchy": ["string"], "positions": [{ "level": "string", "title": "string", "howChosen": "string" }], "description": "string" },
        "politicalConcepts": [{ "term": "string", "nativeTerm": "string", "definition": "string (min 100 words)", "examples": ["string"], "significance": "string" }]
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {});
};
