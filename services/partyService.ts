
import { generateWithFallback, safeParse, withCache, getLanguageInstruction, deepMerge } from "./common";
import { PoliticalPartyDetail } from "../types";

const FALLBACK_PARTY: PoliticalPartyDetail = {
    name: "Political Party",
    founded: "Unknown",
    headquarters: "Unknown",
    ideology: "Unknown",
    politicalPosition: "Unknown",
    currentLeader: "Unknown",
    colors: [],
    history: "Information unavailable.",
    keyMembers: [],
    platform: "Platform details unavailable."
};

export const fetchPartyDetail = async (name: string, country: string): Promise<PoliticalPartyDetail> => {
    const cacheKey = `party_poli_v1_search_${name.replace(/\s+/g, '_')}_${country.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            SYSTEM OVERRIDE: POLI ARCHIVE V1 (LIVE WEB INTELLIGENCE).
            PARTY: ${name} (${country}).
            
            ${getLanguageInstruction()}

            **DIRECTIVES:**
            1. **USE GOOGLE SEARCH**: Ensure the "Current Leader" is accurate as of today. Check for recent elections or leadership spills.
            2. **PLATFORM**: Detailed breakdown of policy stances.
            3. **COLORS**: Exact Hex codes for party colors.
            
            RETURN JSON ONLY:
            {
                "name": "Party Name",
                "abbr": "Abbreviation",
                "founded": "Year",
                "headquarters": "City",
                "ideology": "Ideology",
                "politicalPosition": "Left/Right/Center",
                "currentLeader": "Name",
                "colors": ["HexCode"],
                "history": "Party history...",
                "keyMembers": ["Name 1", "Name 2"],
                "platform": "Detailed platform text..."
            }
            `;

            const response = await generateWithFallback({ contents: prompt });
            const aiData = safeParse(response.text || '{}', {}) as PoliticalPartyDetail;
            const merged = deepMerge(FALLBACK_PARTY, aiData);
            return { ...merged, name };
        } catch (e) { return { ...FALLBACK_PARTY, name }; }
    });
};
