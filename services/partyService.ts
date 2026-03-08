
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { PoliticalPartyDetail } from "../types";

export const fetchPartyDetail = async (name: string, country: string): Promise<PoliticalPartyDetail | null> => {
    const cacheKey = `party_poli_v1_search_${name.replace(/\s+/g, '_')}_${country.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            POLI ARCHIVE — PARTY: ${name} (${country}).

            ${getLanguageInstruction()}

            **DIRECTIVES:**
            1. **ACCURACY**: Provide the most accurate current leader and party information based on your knowledge.
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
            const aiData = safeParse(response.text || '{}', null) as PoliticalPartyDetail | null;
            if (!aiData || !aiData.name) return null;
            return aiData;
        } catch (e) {
            return null;
        }
    });
};
