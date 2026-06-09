
import { generateWithRetry, safeParse, withCache, getLanguageInstruction, deepMerge } from "./common";
import { PoliticalPartyDetail } from "../types";

const FALLBACK_PARTY: PoliticalPartyDetail & {logoUrl?: string} = {
    name: "Political Party",
    founded: "Unknown",
    headquarters: "Unknown",
    ideology: "Unknown",
    politicalPosition: "Unknown",
    currentLeader: "Unknown",
    colors: [],
    history: "Information unavailable.",
    keyMembers: [],
    platform: "Platform details unavailable.",
    logoUrl: ""
};

export const fetchPartyDetail = async (name: string, country: string): Promise<PoliticalPartyDetail> => {
    const cacheKey = `party_poli_v1_search_${name.replace(/\s+/g, '_')}_${country.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        let wikiImage = "";
        try {
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + ' ' + country)}&utf8=&format=json&origin=*`);
            const searchData = await searchRes.json();
            if (searchData.query?.search?.length > 0) {
                const pageTitle = searchData.query.search[0].title;
                const extractRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`);
                const extractData = await extractRes.json();
                if (extractData.thumbnail?.source) wikiImage = extractData.thumbnail.source;
            }
        } catch (e) { console.warn("Wiki fetch failed"); }

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

            const response = await generateWithRetry({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: { 
                    
                    maxOutputTokens: 8192,
                    tools: [{googleSearch: {}}]
                }
            });
            const aiData = safeParse(response.text || '{}', {}) as PoliticalPartyDetail;
            const merged = deepMerge(FALLBACK_PARTY, aiData);
            if (wikiImage && (!merged.logoUrl || !merged.logoUrl.startsWith("http"))) {
                (merged as any).logoUrl = wikiImage;
            }
            return { ...merged, name };
        } catch (e) { return { ...FALLBACK_PARTY, name, logoUrl: wikiImage || (FALLBACK_PARTY as any).logoUrl }; }
    });
};
