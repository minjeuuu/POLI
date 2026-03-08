
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { PoliticalPartyDetail } from "../types";

export const fetchPartyDetail = async (name: string, country: string): Promise<PoliticalPartyDetail | null> => {
    const cacheKey = `party_poli_v2_full_${name.replace(/\s+/g, '_')}_${country.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ENCYCLOPEDIC ARCHIVE — POLITICAL PARTY DOSSIER: ${name} (${country})
CLASSIFICATION: COMPREHENSIVE PARTY PROFILE
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

MANDATORY DIRECTIVES — NO EXCEPTIONS:
1. HISTORY: Minimum 800 words. Cover: founding circumstances and year, founding figures and their motivations, early struggles and growth, decade-by-decade evolution of ideology and organization, major splits or mergers, significant historical moments (election victories, defeats, crisis periods, ideological pivots), relationship to the country's broader political history. Write as an authoritative encyclopedia entry.
2. PLATFORM: Minimum 600 words. Cover every major policy area in detail: economic policy (taxation, spending, trade, regulation, welfare), foreign policy, defense and military, healthcare, education, environment and climate, immigration, social and cultural issues, constitutional and governance matters, technology, housing, criminal justice, civil liberties. Describe specific positions, not vague generalities.
3. FOUNDING: Provide exact founding date, founding location, all founding members, the political circumstances that necessitated the party's creation, and any predecessor organizations.
4. ELECTORAL HISTORY: Provide complete electoral history — every election the party has contested, vote share percentage, seats won, whether in government or opposition, coalition partners. Include local, regional, and national elections where significant.
5. KEY MEMBERS: List minimum 15 historically significant members (past and present) with their roles and contributions. Include founding members, historical leaders, and current senior figures.
6. CURRENT LEADER: Provide full name, year they became leader, their background, leadership style, and ideological position within the party.
7. PARTY STRUCTURE: Describe the internal organization — national executive, regional chapters, youth wing name, women's organization, think tanks affiliated, media outlets linked, trade union connections.
8. INTERNATIONAL AFFILIATIONS: Name the party international or transnational grouping this party belongs to (e.g. Socialist International, European People's Party, Liberal International), describe relationships with sister parties abroad.
9. FUNDING: Describe funding sources — membership dues, state funding (if applicable), business donations, union contributions, and any funding controversies.
10. FACTIONS: Describe the main internal factions, wings, or tendencies within the party — their ideological differences, key figures, and how they are managed.
11. CONTROVERSIES: List all major scandals, corruption allegations, electoral misconduct accusations, ideological controversies, and public criticism. Full context for each.
12. COLORS: Provide exact hex color codes for all official party colors with their symbolic meaning.
13. SYMBOLS: Describe party logo, emblem, and any iconic symbols or slogans.

RETURN VALID JSON ONLY — NO MARKDOWN, NO PREAMBLE, NO COMMENTARY:
{
    "name": "Official full party name",
    "abbr": "Official abbreviation/acronym",
    "founded": "Exact date (Day Month Year) or Year",
    "foundedBy": ["Founder 1 full name", "Founder 2 full name"],
    "headquarters": "City, Country",
    "ideology": "Complete ideological description — primary ideology, secondary tendencies, position on political spectrum",
    "politicalPosition": "Far-left / Left / Centre-left / Centre / Centre-right / Right / Far-right",
    "currentLeader": "Full name of current leader",
    "leaderSince": "Year",
    "colors": ["#HexCode1 (color name and meaning)", "#HexCode2 (color name)"],
    "history": "MINIMUM 800 WORDS — Complete party history from founding to present. Use paragraph breaks for readability.",
    "platform": "MINIMUM 600 WORDS — Comprehensive policy platform covering every major issue area. Use clear section headings within the text.",
    "keyMembers": [
        "Full Name — Role/Position — Period of significance",
        "Full Name — Role/Position — Period of significance"
    ],
    "electoralHistory": [
        { "year": "YYYY", "election": "Election type", "votes": "X%", "seats": "N/Total", "result": "Won/Lost/Coalition" }
    ],
    "internalFactions": [
        { "name": "Faction name", "ideology": "Faction ideology", "keyFigures": ["Name1", "Name2"] }
    ],
    "internationalAffiliations": ["Party International name", "European Parliamentary Group name"],
    "affiliatedOrganizations": ["Youth wing name", "Women's organization", "Trade union ally", "Think tank name"],
    "fundingSources": ["Membership fees", "State subsidy (amount if known)", "Private donors description"],
    "controversies": [
        "Controversy description with date, context, and outcome"
    ],
    "logoDescription": "Description of party logo/emblem",
    "slogan": "Official party slogan(s)",
    "membershipSize": "Approximate membership figure with year"
}
            `;

            const response = await generateWithFallback({ contents: prompt });
            const aiData = safeParse(response.text || '{}', null) as PoliticalPartyDetail | null;
            if (!aiData || !aiData.name) return null;
            return aiData;
        } catch (e) {
            return null;
        }
    });
};
