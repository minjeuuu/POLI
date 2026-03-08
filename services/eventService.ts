
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { EventDetail } from "../types";

export const fetchEventDetail = async (name: string): Promise<EventDetail | null> => {
    const cacheKey = `event_poli_v2_full_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ENCYCLOPEDIC ARCHIVE — HISTORICAL EVENT DOSSIER: ${name}
CLASSIFICATION: COMPREHENSIVE EVENT ANALYSIS
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

MANDATORY DIRECTIVES — NO EXCEPTIONS:
1. CONTEXT: Minimum 800 words. Write an authoritative encyclopedia-style analysis covering: the long-term causes (political, economic, social, ideological factors leading up to the event over decades), immediate triggers, the international environment at the time, key actors and their motivations, the sequence of escalating events, and why this event became historically significant. Include the broader geopolitical landscape.
2. TIMELINE: Provide minimum 20 chronological entries. For military events: use day-by-day or hour-by-hour breakdown. For political events: cover key decisions, meetings, negotiations, and turning points. For economic events: cover market movements, policy decisions, and cascading effects. Each entry must be specific with exact dates.
3. KEY ACTORS: List minimum 12 key actors (individuals, governments, organizations, factions) with their role in the event, their decisions, and their motivations. Explain how each actor influenced the outcome.
4. FORCES INVOLVED: For military/security events: list all forces with exact numbers (troops, equipment, aircraft, naval vessels), commanders, and operational objectives for each side. For political events: list all political factions, their membership, resources, and objectives. For economic events: list all major market players, institutions, and their roles.
5. CASUALTIES AND COSTS: Provide the most accurate available breakdown — military casualties by side, civilian casualties, wounded, missing, captured, displaced populations, economic costs, infrastructure damage, long-term humanitarian impact.
6. OUTCOME: Minimum 200 words. Describe the immediate outcome, the terms of resolution (treaty, armistice, agreement), winners and losers, and the direct political consequences.
7. SIGNIFICANCE: Minimum 300 words. Analyze the long-term historical significance — how this event changed the political landscape, affected international relations, influenced future events, changed military doctrine or political practice, affected civilian populations, and how it is remembered historically. Compare to similar events.
8. AFTERMATH: Describe what happened in the months and years following the event — political transitions, trials, reconstruction, territorial changes, refugee situations, and how the event shaped subsequent history.
9. DOCUMENTS: List all primary source documents, treaties, resolutions, reports, and archival materials related to the event with their dates and significance.
10. ENVIRONMENTAL/WEATHER: For military events, describe terrain, weather conditions, and their tactical impact. For environmental disasters, describe ecological impact. For economic events, describe market conditions.
11. IMAGE: Provide a real Wikimedia Commons URL only if highly confident it exists. If uncertain, use empty string.

RETURN VALID JSON ONLY:
{
    "title": "Official or widely-used event name",
    "date": "Full date range (e.g. 1 September 1939 – 2 September 1945) or single date",
    "location": "Geographic location(s) — cities, regions, countries",
    "imageUrl": "Wikimedia Commons direct URL or empty string",
    "context": "MINIMUM 800 WORDS — Complete analytical context covering long-term causes, immediate triggers, international environment, key motivations, and historical significance. Use \\n\\n for paragraph breaks.",
    "keyActors": [
        "Full name/entity — Role — Affiliation — Key decision or action and its impact"
    ],
    "outcome": "MINIMUM 200 WORDS — Immediate outcome, terms of resolution, political consequences, winners and losers",
    "significance": "MINIMUM 300 WORDS — Long-term historical significance, political impact, legacy, historiographical debates, comparison to similar events",
    "casualties": "Detailed breakdown: [Side A: X killed, Y wounded, Z captured] [Side B: X killed, Y wounded, Z captured] [Civilian: X killed, Y displaced] [Economic cost: $X]",
    "forcesInvolved": [
        "Side name: Number of troops/personnel, commanders, equipment, operational objective"
    ],
    "weather": "Weather and terrain conditions and their tactical/strategic impact",
    "timeline": [
        { "time": "Date and time if applicable", "description": "Specific event with actors and significance" }
    ],
    "documents": [
        "Document name — Date — Significance and key provisions"
    ],
    "aftermath": "Description of events in months and years following — political transitions, territorial changes, trials, reconstruction, humanitarian situation",
    "historiography": "How historians have interpreted this event — main schools of thought, debates, evolving assessments"
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
