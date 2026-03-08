
import { generateWithFallback, withCache, getLanguageInstruction, safeParse } from "./common";
import { DailyContext, HighlightedEntity, HighlightDetail, DailyHistoryEvent } from "../types";
import { FALLBACK_DAILY_CONTEXT } from "../data/homeData";
import { generateMassiveHistory, getMassiveArchive } from "../data/archives/massiveHistory";

// Reactive AI status — true when the last daily fetch got real AI data, false on fallback
export let aiOnline = false;

// Helper to parse year strings like "3200 BCE", "1945", "c. 500" into numbers
const parseYear = (yearStr: string): number => {
    const clean = yearStr.replace(/c\.|circa|approx/i, '').trim();
    let val = parseInt(clean.replace(/[^0-9]/g, ''));
    if (isNaN(val)) return -9999; // Fallback for bad data
    if (clean.toUpperCase().includes('BCE') || clean.toUpperCase().includes('BC')) {
        return -val;
    }
    return val;
};

export const fetchDailyContext = async (date: Date): Promise<DailyContext> => {
    return withCache(`daily_poli_v1_${date.toDateString()}`, async () => {
        const contents = `
                ROLE: POLI Chief Historian.
                TASK: Daily Briefing for ${date.toDateString()}.
                PROTOCOL: POLI ARCHIVE V1.
                
                INSTRUCTIONS:
                - **History**: Provide exactly 15 distinct, verified historical events for this date.
                - **News**: Provide 8 major global headlines. For each item, provide the outlet name in 'source' and omit the 'url' field — do not fabricate URLs.
                - **Trivia**: Provide 5 distinct obscure facts.
                
                JSON SCHEMA:
                {
                    "synthesis": "string (300 words)",
                    "quote": { "text": "string", "author": "string", "year": "string", "region": "string" },
                    "news": [ { "headline": "string", "summary": "string", "source": "string", "date": "string", "url": "string (MUST BE A VALID URL)" } ],
                    "highlightedPerson": { "category": "Person", "title": "string", "subtitle": "string", "meta": "string" },
                    "highlightedCountry": { "category": "Country", "title": "string", "subtitle": "string", "meta": "string" },
                    "highlightedIdeology": { "category": "Ideology", "title": "string", "subtitle": "string", "meta": "string" },
                    "highlightedDiscipline": { "category": "Discipline", "title": "string", "subtitle": "string", "meta": "string" },
                    "highlightedOrg": { "category": "Organization", "title": "string", "subtitle": "string", "meta": "string" },
                    "dailyFact": { "content": "string", "source": "string", "type": "Fact" },
                    "dailyTrivia": { "content": "string", "source": "string", "type": "Trivia" },
                    "historicalEvents": [ { "year": "string", "event": "string", "location": "string", "description": "string" } ]
                }
                ${getLanguageInstruction()}
                `;

        try {
            let response = await generateWithFallback({ contents: contents });
            const parsed = safeParse(response.text || '{}', {}) as any;
            // If we got an empty object (AI failed), response.text was '{}' → use full fallback
            if (!parsed || !parsed.synthesis) {
                aiOnline = false;
                const proceduralEvents = generateMassiveHistory(date);
                const archiveEvents = getMassiveArchive();
                const allFallbackEvents = [...archiveEvents, ...proceduralEvents];
                const seenF = new Set<string>();
                const uniqueFallback: DailyHistoryEvent[] = [];
                for (const evt of allFallbackEvents) {
                    const key = evt.event || evt.title;
                    if (!seenF.has(key)) { seenF.add(key); uniqueFallback.push(evt); }
                }
                uniqueFallback.sort((a, b) => parseYear(a.year) - parseYear(b.year));
                return { ...FALLBACK_DAILY_CONTEXT, historicalEvents: uniqueFallback };
            }
            aiOnline = true;
            
            const proceduralEvents = generateMassiveHistory(date);
            const archiveEvents = getMassiveArchive();
            
            // Combine all events
            const allEvents = [...(parsed.historicalEvents || []), ...archiveEvents, ...proceduralEvents];
            
            // Deduplicate based on title/event
            const seen = new Set();
            const uniqueEvents: DailyHistoryEvent[] = [];
            for (const evt of allEvents) {
                const key = evt.event || evt.title;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueEvents.push(evt);
                }
            }

            // Strict Chronological Sort
            uniqueEvents.sort((a, b) => parseYear(a.year) - parseYear(b.year));

            const merged: DailyContext = {
                date: date.toDateString(),
                quote: parsed.quote || FALLBACK_DAILY_CONTEXT.quote,
                news: parsed.news || FALLBACK_DAILY_CONTEXT.news,
                highlightedPerson: parsed.highlightedPerson || FALLBACK_DAILY_CONTEXT.highlightedPerson,
                highlightedCountry: parsed.highlightedCountry || FALLBACK_DAILY_CONTEXT.highlightedCountry,
                highlightedIdeology: parsed.highlightedIdeology || FALLBACK_DAILY_CONTEXT.highlightedIdeology,
                highlightedDiscipline: parsed.highlightedDiscipline || FALLBACK_DAILY_CONTEXT.highlightedDiscipline,
                highlightedOrg: parsed.highlightedOrg || FALLBACK_DAILY_CONTEXT.highlightedOrg,
                dailyFact: parsed.dailyFact || FALLBACK_DAILY_CONTEXT.dailyFact,
                dailyTrivia: parsed.dailyTrivia || FALLBACK_DAILY_CONTEXT.dailyTrivia,
                historicalEvents: uniqueEvents, // Now sorted
                otherHighlights: parsed.otherHighlights || [],
                synthesis: parsed.synthesis || FALLBACK_DAILY_CONTEXT.synthesis
            };

            return merged;
        } catch (e) {
            console.error("Home Service Critical Failure:", e);
            aiOnline = false;
            const proceduralEvents = generateMassiveHistory(date);
            return {
                ...FALLBACK_DAILY_CONTEXT,
                historicalEvents: proceduralEvents.sort((a, b) => parseYear(a.year) - parseYear(b.year)),
            };
        }
    });
};

export const fetchHighlightDetail = async (highlight: HighlightedEntity): Promise<HighlightDetail> => {
    return withCache(`highlight_poli_v1_${highlight.title}`, async () => {
        const contents = `
            Provide details for: ${highlight.title} (${highlight.category}).
            RAW JSON ONLY.
            PROTOCOL: POLI ARCHIVE V1.
            ${getLanguageInstruction()}
            Structure: { "title", "subtitle", "category", "summary", "historicalBackground", "significance", "keyConcepts": [{"concept", "definition"}], "modernConnections": [string], "sources": [{"title", "url"}] }
            `;

        try {
            let response = await generateWithFallback({ contents: contents });
            const parsed = safeParse(response.text || '{}', {}) as any;
            return {
                title: parsed.title || highlight.title,
                subtitle: parsed.subtitle || highlight.subtitle,
                category: parsed.category || highlight.category,
                summary: parsed.summary || "Summary unavailable.",
                historicalBackground: parsed.historicalBackground || "Context unavailable.",
                significance: parsed.significance || "Significance unavailable.",
                keyConcepts: Array.isArray(parsed.keyConcepts) ? parsed.keyConcepts : [],
                modernConnections: Array.isArray(parsed.modernConnections) ? parsed.modernConnections : [],
                sources: Array.isArray(parsed.sources) ? parsed.sources : []
            };
        } catch (e) { 
            return {
                title: highlight.title,
                subtitle: highlight.subtitle,
                category: highlight.category,
                summary: "Details currently unavailable.",
                historicalBackground: "",
                significance: "",
                keyConcepts: [],
                modernConnections: [],
                sources: []
            }; 
        }
    });
};
