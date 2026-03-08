
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { EventDetail } from "../types";

export const fetchEventDetail = async (name: string): Promise<EventDetail | null> => {
    const cacheKey = `event_poli_v1_search_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            POLI ARCHIVE — EVENT: ${name}.

            ${getLanguageInstruction()}

            **DIRECTIVES:**
            1. **KNOWLEDGE**: Use your comprehensive historical knowledge to provide detailed, accurate information about this event.
            2. **IMAGE**: Provide a real Wikimedia Commons URL if you are confident it exists (e.g. https://upload.wikimedia.org/wikipedia/commons/[path]/[File.jpg]). If uncertain, leave imageUrl as empty string "".
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
            const aiData = safeParse(response.text || '{}', null) as any;
            if (!aiData || !aiData.title) return null;
            return aiData as EventDetail;
        } catch (e) {
            return null;
        }
    });
};
