
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";

export const fetchPolitics = async (countryName: string) => {
    const prompt = `
POLI ARCHIVE — COMPLETE POLITICAL LANDSCAPE: ${countryName}
CLASSIFICATION: EXHAUSTIVE POLITICAL SYSTEM ANALYSIS
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

You are POLI. Generate the COMPLETE political landscape of ${countryName}. Every party, every election, every political family, every unique political concept.

MANDATORY REQUIREMENTS:

1. POLITICAL PARTIES — LIST ALL active and significant historical parties:
   For EACH party:
   - Full official name, abbreviation, founded year
   - Ideology/political position (left/center/right spectrum)
   - Current leader, secretary-general, party president
   - Current seats in legislature (upper and lower house)
   - Coalition affiliations
   - Party color(s) and symbol
   - Headquarters city
   - Official website URL
   - Youth wing name
   - Brief history (founding, key moments, splits/mergers)
   - Notable members (past and present)
   List ALL parties — registered, active, and significant historical parties. If there are 50 parties, list all 50.

2. ELECTORAL HISTORY — List ALL major elections:
   - Presidential/parliamentary elections (at least last 10 cycles)
   - For each: year, type, winner, runner-up, voter turnout, key issues, result details
   - Landmark/controversial elections with detailed analysis
   - Referendum history
   - Electoral system description (FPTP, proportional, mixed, etc.)

3. POLITICAL FAMILIES & DYNASTIES:
   - List ALL major political dynasties/families
   - For each: family name, region of influence, key members and their positions
   - How many generations in politics
   - Total positions held by family members
   - Estimated political influence

4. POLITICAL CONCEPTS UNIQUE TO ${countryName}:
   For EACH concept:
   - Term (in local language if applicable)
   - English translation/equivalent
   - Detailed definition (minimum 150 words)
   - Historical origin
   - Contemporary manifestation
   - Examples in practice
   - Academic analysis/criticism

   Include concepts like: patronage systems, clientelism, political machines, corruption patterns, electoral fraud tactics, protest traditions, civil disobedience history, political humor/satire traditions, political terminology unique to the country.

5. POLITICAL CULTURE:
   - Voter behavior patterns
   - Role of media in politics
   - Role of religion in politics
   - Role of military in politics
   - Protest movements and civil society
   - Political polarization analysis
   - Trust in institutions data

6. INTERNATIONAL POLITICAL RELATIONS:
   - Major alliances and treaty organizations
   - Key bilateral relationships
   - Territorial disputes
   - Diplomatic incidents

RETURN VALID JSON ONLY:
{
    "parties": [
        {
            "name": "string", "abbreviation": "string", "founded": "string",
            "ideology": "string", "position": "string",
            "leader": "string", "secretaryGeneral": "string",
            "seatsUpper": "string", "seatsLower": "string",
            "coalition": "string", "color": "string", "symbol": "string",
            "headquarters": "string", "website": "string", "youthWing": "string",
            "history": "string (min 100 words)", "notableMembers": ["string"]
        }
    ],
    "electoralHistory": [
        { "year": "string", "type": "string", "winner": "string", "runnerUp": "string", "turnout": "string", "keyIssues": "string", "details": "string" }
    ],
    "electoralSystem": "string (detailed description of electoral system)",
    "politicalFamilies": [
        { "name": "string", "region": "string", "members": [{ "name": "string", "position": "string", "years": "string" }], "generations": "string", "influence": "string" }
    ],
    "politicalConcepts": [
        { "term": "string", "nativeTerm": "string", "translation": "string", "definition": "string (min 150 words)", "origin": "string", "contemporary": "string", "examples": ["string"], "criticism": "string" }
    ],
    "politicalCulture": {
        "voterBehavior": "string (min 200 words)",
        "mediaRole": "string", "religionRole": "string", "militaryRole": "string",
        "protestMovements": ["string"], "polarization": "string", "institutionalTrust": "string"
    },
    "internationalRelations": {
        "alliances": ["string"], "keyRelationships": ["string"],
        "disputes": ["string"], "diplomaticIncidents": ["string"]
    }
}
    `;

    const response = await generateWithFallback({ contents: prompt });
    return safeParse(response.text || '{}', {});
};
