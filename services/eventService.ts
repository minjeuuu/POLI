
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
    const cacheKey = `event_poli_v1_search_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            SYSTEM OVERRIDE: POLI ARCHIVE V1 (LIVE WEB INTELLIGENCE).
            EVENT: ${name}.
            
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

            const response = await generateWithFallback({ contents: prompt });
            const aiData = safeParse(response.text || '{}', {}) as any;
            const merged = deepMerge(FALLBACK_EVENT, aiData);

            return merged as EventDetail;
        } catch (e) { return { ...FALLBACK_EVENT, title: name }; }
    });
};
