
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { AlmanacData, PoliticalCalendarEvent } from "../types";

const FALLBACK_ALMANAC: AlmanacData = {
    date: "Unknown",
    historicalEvents: [],
    births: [],
    deaths: [],
    treaties: [],
    elections: [],
    revolutions: [],
    laws: [],
    constitutions: [],
    context: "Almanac data unavailable."
};

/**
 * CHRONOS PROTOCOL: THE LIVING RECORD
 * Generates exhaustive daily political almanacs.
 */
export const fetchDailyAlmanac = async (date: Date): Promise<AlmanacData> => {
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const cacheKey = `almanac_poli_v1_${dateStr.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            ACT AS: THE KEEPER OF THE GLOBAL POLITICAL ALMANAC.
            TASK: Generate an EXHAUSTIVE daily record for: ${dateStr}.
            PROTOCOL: POLI ARCHIVE V1.
            
            DIRECTIVES:
            1. **NO OMISSIONS**: Cover Ancient, Medieval, and Modern history globally.
            2. **CATEGORIZATION**: Strictly separate events into the requested categories.
            3. **DEPTH**: For each entry, provide a comprehensive and detailed description.
            4. **ENTITIES**: List key figures or nations involved.
            5. **QUANTITY**: Aim for 10-20 items PER CATEGORY if historical data exists.
            
            REQUIRED CATEGORIES:
            - **Historical Events**: General political events (Wars, Battles, Speeches).
            - **Births/Deaths**: Political figures only.
            - **Treaties**: Agreements, Peace Pacts, Trade Deals.
            - **Elections**: General elections, Referendums.
            - **Revolutions**: Protests, Coups, Uprisings.
            - **Laws**: Enactment of major acts, bills, or decrees.
            - **Constitutions**: Adoption, ratification, or amendment of constitutions.

            OUTPUT JSON SCHEMA:
            {
                "context": "A 500-word synthesis of why this date is significant in political history.",
                "historicalEvents": [{ "year": "string", "title": "string", "type": "War", "description": "string", "entities": ["string"] }],
                "births": [{ "year": "string", "title": "Name", "type": "Birth", "description": "Role/Significance", "entities": ["Country"] }],
                "deaths": [{ "year": "string", "title": "Name", "type": "Death", "description": "Legacy", "entities": ["Country"] }],
                "treaties": [{ "year": "string", "title": "Treaty Name", "type": "Treaty", "description": "Significance", "entities": ["Signatories"] }],
                "elections": [{ "year": "string", "title": "Election", "type": "Election", "description": "Winner/Outcome", "entities": ["Country"] }],
                "revolutions": [{ "year": "string", "title": "Event", "type": "Revolution", "description": "Impact", "entities": ["Country"] }],
                "laws": [{ "year": "string", "title": "Act/Law", "type": "Law", "description": "Purpose", "entities": ["Country"] }],
                "constitutions": [{ "year": "string", "title": "Constitution", "type": "Constitution", "description": "Adoption/Amendment", "entities": ["Country"] }]
            }
            ${getLanguageInstruction()}
            `;

            const response = await generateWithFallback({ contents: prompt });

            const parsed = safeParse(response.text || '{}', FALLBACK_ALMANAC) as AlmanacData;
            return { ...parsed, date: dateStr };
        } catch (e) {
            console.error("Almanac Error", e);
            return { ...FALLBACK_ALMANAC, date: dateStr };
        }
    });
};

export const fetchUpcomingCalendar = async (): Promise<PoliticalCalendarEvent[]> => {
    return withCache('global_calendar_upcoming_poli_v1', async () => {
        try {
            const response = await generateWithFallback({ contents: `
                Generate a list of 25 major upcoming global political events for the next 12 months (relative to now).
                Include:
                - Presidential/Parliamentary Elections
                - Major Summits (G7, G20, UNGA, NATO)
                - Treaty Expirations
                - Legislative Sessions of global importance

                JSON Array: [{ "date": "YYYY-MM-DD", "type": "Election"|"Summit"|"Legislative"|"Treaty", "title": "string", "country": "string", "description": "string" }]
                ` });
            return safeParse(response.text || '[]', []) as PoliticalCalendarEvent[];
        } catch (e) { return []; }
    });
};
