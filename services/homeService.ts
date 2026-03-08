
import { generateWithFallback, withCache, getLanguageInstruction, safeParse } from "./common";
import { DailyContext, HighlightedEntity, HighlightDetail } from "../types";

// Reactive AI status — true when the last daily fetch got real AI data, false on error
export let aiOnline = false;

// Helper to parse year strings like "3200 BCE", "1945", "c. 500" into numbers
const parseYear = (yearStr: string): number => {
    const clean = yearStr.replace(/c\.|circa|approx/i, '').trim();
    let val = parseInt(clean.replace(/[^0-9]/g, ''));
    if (isNaN(val)) return -9999;
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
            const response = await generateWithFallback({ contents });
            const parsed = safeParse(response.text || '{}', {}) as any;

            if (!parsed || !parsed.synthesis) {
                aiOnline = false;
                return {
                    date: date.toDateString(),
                    synthesis: "",
                    quote: { text: "", author: "", year: "", region: "" },
                    news: [],
                    historicalEvents: [],
                    highlightedPerson: null as any,
                    highlightedCountry: null as any,
                    highlightedIdeology: null as any,
                    highlightedDiscipline: null as any,
                    highlightedOrg: null as any,
                    dailyFact: null as any,
                    dailyTrivia: null as any,
                    otherHighlights: [],
                };
            }

            aiOnline = true;

            const events = (parsed.historicalEvents || []).slice().sort(
                (a: any, b: any) => parseYear(a.year) - parseYear(b.year)
            );

            return {
                date: date.toDateString(),
                quote: parsed.quote,
                news: parsed.news || [],
                highlightedPerson: parsed.highlightedPerson,
                highlightedCountry: parsed.highlightedCountry,
                highlightedIdeology: parsed.highlightedIdeology,
                highlightedDiscipline: parsed.highlightedDiscipline,
                highlightedOrg: parsed.highlightedOrg,
                dailyFact: parsed.dailyFact,
                dailyTrivia: parsed.dailyTrivia,
                historicalEvents: events,
                otherHighlights: parsed.otherHighlights || [],
                synthesis: parsed.synthesis,
            } as DailyContext;
        } catch (e) {
            console.error("Home Service: AI unavailable:", e);
            aiOnline = false;
            return {
                date: date.toDateString(),
                synthesis: "",
                quote: { text: "", author: "", year: "", region: "" },
                news: [],
                historicalEvents: [],
                highlightedPerson: null as any,
                highlightedCountry: null as any,
                highlightedIdeology: null as any,
                highlightedDiscipline: null as any,
                highlightedOrg: null as any,
                dailyFact: null as any,
                dailyTrivia: null as any,
                otherHighlights: [],
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

        const response = await generateWithFallback({ contents });
        const parsed = safeParse(response.text || '{}', {}) as any;
        return {
            title: parsed.title || highlight.title,
            subtitle: parsed.subtitle || highlight.subtitle,
            category: parsed.category || highlight.category,
            summary: parsed.summary || "",
            historicalBackground: parsed.historicalBackground || "",
            significance: parsed.significance || "",
            keyConcepts: Array.isArray(parsed.keyConcepts) ? parsed.keyConcepts : [],
            modernConnections: Array.isArray(parsed.modernConnections) ? parsed.modernConnections : [],
            sources: Array.isArray(parsed.sources) ? parsed.sources : []
        };
    });
};
