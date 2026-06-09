
import { generateWithFallback, safeParse, withCache, getLanguageInstruction, deepMerge } from "./common";
import { EventDetail } from "../types";

const FALLBACK_EVENT: EventDetail = {
    title: "Historical Event",
    date: "Unknown",
    location: "Unknown",
    context: "Context unavailable.",
    keyActors: [],
    outcome: "Outcome unavailable.",
    significance: "Significance unavailable.",
    imageUrl: "",
    casualties: "Unknown",
    forcesInvolved: [],
    weather: "Unknown",
    timeline: [],
    documents: []
};

export const fetchEventDetail = async (name: string): Promise<EventDetail> => {
    const cacheKey = `event_poli_v4_search_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        let wikiContext = "";
        let wikiImage = "";
        try {
            // Wikipedia Fetch
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&utf8=&format=json&origin=*`);
            const searchData = await searchRes.json();
            if (searchData.query?.search?.length > 0) {
                const pageTitle = searchData.query.search[0].title;
                const extractRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`);
                const extractData = await extractRes.json();
                if (extractData.extract) wikiContext = extractData.extract;
                if (extractData.thumbnail?.source) wikiImage = extractData.thumbnail.source;
                // Get full extract
                const fullRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&titles=${encodeURIComponent(pageTitle)}&format=json&origin=*`);
                const fullData = await fullRes.json();
                const pages = fullData.query?.pages;
                if (pages) {
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId].extract) {
                        // strip html
                        let striped = pages[pageId].extract.replace(/<[^>]+>/g, '');
                        wikiContext = striped;
                    }
                }
            }
        } catch (e) {
            console.warn("Wiki fetch failed", e);
        }

        try {
            const prompt = `
            SYSTEM OVERRIDE: POLI ARCHIVE V1 (LIVE WEB INTELLIGENCE).
            EVENT: ${name}.
            
            ${wikiContext ? `WIKIPEDIA EXTRACT (Use this if search fails): ${wikiContext.substring(0, 1500)}` : ""}
            
            ${getLanguageInstruction()}

            **DIRECTIVES:**
            1. **USE GOOGLE SEARCH**: Validate dates, casualty numbers, and specific details using real-time search.
            2. **IMAGE**: Find a valid Wikimedia Commons or public domain URL for the event.
            3. **TIMELINE**: Minute-by-minute or day-by-day breakdown of the event.
            4. **FORCES**: Exact troop numbers, equipment lists, and commanders for all sides.
            5. **CASUALTIES**: Precise breakdown of losses.
            6. **AFTERMATH**: Immediate and long-term geopolitical consequences.

            RETURN JSON ONLY:
            {
                "title": "string",
                "date": "string",
                "location": "string",
                "imageUrl": "string (Wikimedia URL)",
                "context": "string (500+ words)",
                "keyActors": ["string"],
                "outcome": "string",
                "significance": "string",
                "casualties": "string",
                "forcesInvolved": ["string"],
                "weather": "string",
                "timeline": [{ "time": "string", "description": "string" }],
                "documents": ["string (Treaties/Orders)"]
            }
            `;

            const response = await generateWithFallback({
                model: 'gemini-2.5-pro',
                contents: prompt,
                config: { 
                    
                    maxOutputTokens: 8192,
                    tools: [{googleSearch: {}}]
                }
            });
            const aiData = safeParse(response.text || '{}', {}) as any;
            const merged = deepMerge(FALLBACK_EVENT, aiData);
            
            if (wikiImage && (!merged.imageUrl || !merged.imageUrl.startsWith("http"))) {
                merged.imageUrl = wikiImage;
            }

            return merged as EventDetail;
        } catch (e) { 
            return { 
                ...FALLBACK_EVENT, 
                title: name,
                context: wikiContext || FALLBACK_EVENT.context,
                imageUrl: wikiImage || FALLBACK_EVENT.imageUrl
            }; 
        }
    });
};
