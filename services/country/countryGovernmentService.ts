
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchCountryGovernment = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE GOVERNMENT APPARATUS: ${countryName}
CLASSIFICATION: EXHAUSTIVE GOVERNMENT ROSTER — MAXIMUM DEPTH
PROTOCOL: POLI ARCHIVE V2 — INFINITE GRANULARITY

${getLanguageInstruction()}

You are POLI, the world's most comprehensive political encyclopedia engine. Generate the ABSOLUTE COMPLETE government structure of ${countryName}. This must be TOTALLY EXHAUSTIVE — every single official, every agency, every court, every commission. NO ABBREVIATION. NO SUMMARIZATION. NO "etc." OR "and others".

============================================================
SECTION 1: EXECUTIVE BRANCH
============================================================

A. HEAD OF STATE:
   - Full legal name (including middle names)
   - Official title (President / King / Emperor / Chancellor / etc.)
   - Political party affiliation
   - Exact dates: term start, expected term end
   - Predecessor's full name
   - Age, birthdate, birthplace
   - Biography (MINIMUM 300 words): education, career, political rise, major policies, controversies, family, ideology
   - Image description for portrait rendering

B. HEAD OF GOVERNMENT (if different from Head of State):
   - Same level of detail as Head of State

C. VICE PRESIDENT / DEPUTY PM / CROWN PRINCE:
   - Full name, title, party, term dates, biography (150+ words)

D. EXECUTIVE OFFICE / PRESIDENTIAL STAFF:
   - Chief of Staff, Executive Secretary, Press Secretary, National Security Advisor
   - Special Advisors, Special Envoys
   - For each: full name, title, date appointed

E. COMPLETE CABINET — LIST EVERY SINGLE MEMBER:
   - For EVERY minister/secretary: full name, exact department title, party, date appointed, previous position, education, brief bio
   - If the cabinet has 30 members, list ALL 30
   - If the cabinet has 50 members, list ALL 50
   - Include undersecretaries and deputy ministers for each department
   - Include the portfolio/mandate of each department (what they oversee)

============================================================
SECTION 2: LEGISLATIVE BRANCH
============================================================

A. STRUCTURE:
   - Type (Unicameral / Bicameral / Tricameral)
   - For EACH chamber: official name, total seats, term length, how members are elected

B. UPPER HOUSE (Senate / House of Lords / Bundesrat / etc.):
   - Leadership: President/Speaker, Majority Leader, Minority Leader, Whips, Secretary
   - Party composition: EVERY party with exact seat count and percentage
   - COMPLETE MEMBER ROSTER: List EVERY SINGLE member
     * For each: full name, party, state/district/constituency, term start date
     * If 24 senators, list ALL 24
     * If 100 senators, list ALL 100
     * DO NOT SKIP ANY. DO NOT SAY "and 50 more"
   - Standing committees with chair name for each

C. LOWER HOUSE (House of Representatives / National Assembly / Bundestag / etc.):
   - Same detail as Upper House
   - COMPLETE MEMBER ROSTER: List EVERY SINGLE member
     * If 300 members, list ALL 300
     * If 500 members, list ALL 500
     * For each: full name, party, district, term start
   - District/party-list breakdown
   - Standing committees with chair

============================================================
SECTION 3: JUDICIARY
============================================================

A. SUPREME / CONSTITUTIONAL COURT:
   - Official name, number of justices
   - Chief Justice: full name, who appointed, year, brief bio
   - ALL Associate Justices: name, who appointed, year appointed
   - List ALL of them — if 15 justices, list ALL 15

B. COURT HIERARCHY (from highest to lowest):
   - Every level of the court system
   - Number of courts at each level
   - Specialized courts: Electoral Tribunal, Tax Court, Anti-Corruption Court, Military Courts, Sharia Courts, Family Courts, Labor Courts
   - For each specialized court: name, chief judge, jurisdiction

============================================================
SECTION 4: CONSTITUTIONAL & INDEPENDENT BODIES
============================================================

List EVERY constitutional/independent body:
- Commission on Elections / Electoral Commission
- Commission on Audit / Comptroller General
- Civil Service Commission / Public Service Commission
- Commission on Human Rights
- Anti-Corruption Commission / Ombudsman
- Central Bank (Governor, Deputy Governors, Monetary Board members)
- National Economic Council
- Securities/Stock Exchange Commission
- Any other constitutionally-mandated bodies

For EACH: official name, acronym, chairperson, all commissioners/members, mandate, website URL, year established.

============================================================
SECTION 5: GOVERNMENT AGENCIES & DEPARTMENTS
============================================================

List ALL major government agencies (aim for 30+ agencies):
For EACH agency: official name, acronym, current head/director, parent department, official website URL (REAL verified URL — do not fabricate), year established, mandate/mission, number of employees (approximate), logo description.

Include regulatory agencies, research agencies, law enforcement agencies, intelligence agencies, development agencies, etc.

============================================================
SECTION 6: GOCCs / STATE-OWNED ENTERPRISES
============================================================

List ALL major state-owned enterprises and government corporations:
For each: name, CEO/GM, sector, revenue (approximate), website.

============================================================
SECTION 7: LOCAL GOVERNMENT STRUCTURE
============================================================

Full hierarchy description:
- How many levels of local government exist
- What each level is called (Region/Province/State/County/District/Municipality/City/Barangay/Ward/etc.)
- Positions at each level (Governor, Mayor, Council Members, etc.)
- How executives are chosen (elected/appointed)
- Number of units at each level (e.g., "17 regions, 81 provinces, 146 cities, 1,488 municipalities, 42,036 barangays")
- Brief description of local government powers and autonomy
- Special administrative regions or autonomous zones

============================================================
SECTION 8: POLITICAL CONCEPTS & PHENOMENA
============================================================

List ALL country-specific political terms, phenomena, and cultural-political concepts:
- For Philippines: padrino system, trapo (traditional politician), political dynasty, barangay politics, hakot (vote hauling), balimbing (political turncoat), epal (credit-grabbing), jueteng, guns-goons-gold, KBL system, people power, bayanihan, utang na loob in politics, warlordism, political families
- For India: jugaad, goonda raj, vote bank politics, horse trading, floor crossing, aaya ram gaya ram, criminalisation of politics, coalition dharma, bandh/hartal, panchayati raj
- For Japan: amakudari, habatsu, nemawashi, ringi system, iron triangle, zoku giin
- For USA: gerrymandering, filibuster, pork barrel, log rolling, revolving door, dark money, PACs/Super PACs, lobbying, deep state
- For UK: whipping system, pairing, tabling, Hansard, lobby system
- WHATEVER the country, list ALL its unique political concepts

For EACH concept:
- Native term (original language)
- English translation/equivalent
- Definition (MINIMUM 150 words) explaining origin, mechanism, and how it works in practice
- Real historical examples
- Current significance and whether it's increasing or decreasing
- Related concepts

============================================================
SECTION 9: DIPLOMATIC CORPS
============================================================
- Foreign ministry structure
- Key ambassadors (to UN, USA, China, neighboring countries)
- Consular network overview
- International organization memberships

RETURN VALID JSON ONLY — NO MARKDOWN:
{
    "government": {
        "form": "string (e.g., 'Federal Presidential Constitutional Republic')",
        "constitution": "string (name, year adopted, amendments count)",
        "headOfState": {
            "title": "string", "name": "string", "party": "string", "since": "string", "termEnd": "string",
            "predecessor": "string", "age": "string", "birthdate": "string", "birthplace": "string",
            "biography": "string (min 300 words)", "imageDescription": "string"
        },
        "headOfGov": {
            "title": "string", "name": "string", "party": "string", "since": "string", "termEnd": "string",
            "predecessor": "string", "biography": "string (min 300 words)"
        },
        "viceLeader": { "title": "string", "name": "string", "party": "string", "since": "string", "biography": "string" },
        "executiveOffice": [{ "title": "string", "name": "string", "role": "string", "since": "string" }],
        "cabinet": [{ "title": "string", "name": "string", "party": "string", "department": "string", "appointed": "string", "previousPosition": "string", "mandate": "string" }],
        "legislature": {
            "type": "string (Unicameral/Bicameral)",
            "upperHouse": {
                "name": "string", "totalSeats": 0, "termLength": "string", "electionMethod": "string",
                "leadership": { "president": "string", "majorityLeader": "string", "minorityLeader": "string", "whips": ["string"], "secretary": "string" },
                "composition": [{ "party": "string", "seats": 0, "percentage": "string", "color": "string" }],
                "members": [{ "name": "string", "party": "string", "district": "string", "since": "string" }],
                "committees": [{ "name": "string", "chair": "string", "jurisdiction": "string" }]
            },
            "lowerHouse": {
                "name": "string", "totalSeats": 0, "termLength": "string", "electionMethod": "string",
                "leadership": { "speaker": "string", "majorityLeader": "string", "minorityLeader": "string", "whips": ["string"], "secretary": "string" },
                "composition": [{ "party": "string", "seats": 0, "percentage": "string", "color": "string" }],
                "members": [{ "name": "string", "party": "string", "district": "string", "since": "string" }],
                "committees": [{ "name": "string", "chair": "string", "jurisdiction": "string" }]
            }
        },
        "judiciary": {
            "supremeCourt": {
                "name": "string", "totalJustices": 0,
                "chiefJustice": { "name": "string", "appointedBy": "string", "yearAppointed": "string", "biography": "string" },
                "justices": [{ "name": "string", "appointedBy": "string", "yearAppointed": "string" }]
            },
            "courtHierarchy": [{ "level": "string", "name": "string", "count": 0, "description": "string" }],
            "specializedCourts": [{ "name": "string", "jurisdiction": "string", "chiefJudge": "string", "established": "string" }]
        },
        "constitutionalBodies": [{
            "name": "string", "acronym": "string", "type": "string", "chair": "string",
            "members": [{ "name": "string", "position": "string" }],
            "mandate": "string", "website": "string", "yearEstablished": "string"
        }],
        "agencies": [{
            "name": "string", "acronym": "string", "head": "string", "headTitle": "string",
            "parentDepartment": "string", "website": "string", "yearEstablished": "string",
            "mandate": "string", "employees": "string", "logoDescription": "string", "budget": "string"
        }],
        "goccs": [{ "name": "string", "head": "string", "sector": "string", "revenue": "string", "website": "string" }],
        "localGovStructure": {
            "hierarchy": ["string"],
            "levels": [{ "level": 0, "name": "string", "count": 0, "executiveTitle": "string", "howChosen": "string", "legislativeBody": "string" }],
            "totalUnits": "string",
            "description": "string (300+ words)",
            "autonomousRegions": [{ "name": "string", "type": "string", "specialStatus": "string" }]
        },
        "politicalConcepts": [{
            "term": "string", "nativeTerm": "string",
            "definition": "string (min 150 words)",
            "examples": ["string"],
            "significance": "string",
            "trend": "string (increasing/decreasing/stable)",
            "relatedConcepts": ["string"]
        }],
        "diplomaticCorps": {
            "foreignMinistry": "string",
            "foreignMinister": "string",
            "keyAmbassadors": [{ "country": "string", "ambassador": "string" }],
            "internationalMemberships": ["string"]
        }
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt, maxTokens: 8000 });
    return safeParse(response.text || '{}', {});
};
