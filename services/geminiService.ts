import {
  PoliticalRecord,
  DailyContext,
  DisciplineDetail,
  RegionalDetail,
  OrganizationDetail,
  PoliticalPartyDetail,
  PersonDetail,
  EventDetail,
  IdeologyDetail,
  ConceptDetail,
  BookStructure,
  Flashcard,
  QuizQuestion,
  ExchangeRate,
  HighlightDetail,
  HighlightedEntity
} from "../types";
import { FALLBACK_DAILY_CONTEXT, FALLBACK_DISCIPLINE_DETAIL } from "../data/homeData";
import { getLanguageInstruction, safeParse, withCache, generateWithFallback } from "./common";
import { generateWithClaude, streamWithClaude } from "./claudeService";

// --- API Functions ---

export const fetchPoliticalRecord = async (query: string): Promise<PoliticalRecord | null> => {
    return withCache(`record_v3_${query}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Generate a structured political record for "${query}". If it is a Country, Person, Ideology, or Event, provide details.
Return JSON: { "entity": { "id", "name", "officialName", "type", "jurisdiction", "establishedDate", "status", "description" }, "historicalContext": string, "timeline": [{ "id", "date", "title", "type", "description", "outcome", "citations": [{ "id", "source", "year", "authorOrBody" }] }], "relatedDisciplines": [string], "primarySources": [{ "id", "source", "year", "authorOrBody" }] }
${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', null) as PoliticalRecord;
        } catch (e) {
            console.error(e);
            return null;
        }
    });
};

export const fetchDailyContext = async (date: Date): Promise<DailyContext> => {
    return withCache(`daily_v16_schema_${date.toDateString()}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Generate a daily political context briefing for ${date.toDateString()}.
Include a political quote, 6 major global news items (with real source names and accurate URLs to real news organizations), highlights for a notable person/country/ideology/org/discipline, a daily fact, trivia, and 10 historical events.
Return JSON: { "synthesis": string, "quote": { "text", "author", "year", "region" }, "news": [{ "headline", "summary", "source", "date", "url" }], "highlightedPerson": { "category":"Person", "title", "subtitle", "meta" }, "highlightedCountry": { "category":"Country", "title", "subtitle", "meta" }, "highlightedIdeology": { "category":"Ideology", "title", "subtitle", "meta" }, "highlightedDiscipline": { "category":"Discipline", "title", "subtitle", "meta" }, "highlightedOrg": { "category":"Organization", "title", "subtitle", "meta" }, "dailyFact": { "content", "source", "type":"Fact" }, "dailyTrivia": { "content", "source", "type":"Trivia" }, "historicalEvents": [{ "year", "event", "location", "description" }] }
For news URLs: only use real domains like bbc.com, reuters.com, apnews.com, theguardian.com, nytimes.com, ft.com. If uncertain about a specific article URL, use the homepage of the source (e.g. https://www.bbc.com/news).
${getLanguageInstruction()}`
            });
            const data = safeParse(response.text || '{}', FALLBACK_DAILY_CONTEXT);
            return { ...FALLBACK_DAILY_CONTEXT, ...data, date: date.toDateString() };
        } catch (e) {
            console.error(e);
            return FALLBACK_DAILY_CONTEXT;
        }
    });
};

export const fetchDisciplineDetail = async (name: string): Promise<DisciplineDetail> => {
    return withCache(`discipline_v4_schema_${name}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Detailed academic overview of the political science discipline: ${name}.
Return JSON: { "name", "overview": { "definition", "scope", "importance", "keyQuestions": [string] }, "historyNarrative": string, "history": [{ "year", "event", "impact" }], "subDisciplines": [string], "coreTheories": [{ "name", "year", "summary" }], "methods": [{ "name", "description", "example" }], "scholars": [{ "name", "country", "period", "contribution" }], "foundationalWorks": [{ "title", "author", "year" }], "regionalFocus": [{ "region", "description" }], "relatedDisciplines": [string] }
${getLanguageInstruction()}`
            });
            const parsed = safeParse(response.text || '{}', FALLBACK_DISCIPLINE_DETAIL);
            if (!parsed.name) parsed.name = name;
            return parsed as DisciplineDetail;
        } catch (e) { return FALLBACK_DISCIPLINE_DETAIL; }
    });
};

export const fetchBookStructure = async (title: string, author: string): Promise<BookStructure> => {
    return withCache(`book_${title}_v2`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Generate a detailed table of contents for "${title}" by ${author}. Return JSON: { "title": string, "author": string, "chapters": string[] }.`
            });
            return safeParse(response.text || '{}', { title, author, chapters: [] }) as BookStructure;
        } catch (e) { return { title, author, chapters: [] }; }
    });
};

export async function* streamChapterContent(title: string, author: string, chapter: string, summary: boolean) {
    const prompt = `Write the content for chapter "${chapter}" of "${title}" by ${author}. ${summary ? "Summarize the key points comprehensively." : "Provide a full, detailed summary of the content."} ${getLanguageInstruction()}`;
    yield* streamWithClaude(prompt);
}

export const askReaderQuestion = async (context: string, query: string, type: string): Promise<string> => {
    try {
        const response = await generateWithFallback({
            contents: `Context: ${context}\n\nTask: ${type}. ${query ? "Question: " + query : ""}\nAnswer:`
        });
        return response.text || "";
    } catch (e) { return "Error analyzing text."; }
};

export const fetchQuiz = async (topic: string): Promise<QuizQuestion[]> => {
    return withCache(`quiz_v5_50_${topic}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Generate 50 distinct multiple choice questions about ${topic}. Vary difficulty from introductory to expert. Cover history, key figures, theories, and modern applications.
Return a JSON array: [{ "question": string, "options": string[], "correctAnswer": number, "explanation": string }]. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '[]', []) as QuizQuestion[];
        } catch (e) { return []; }
    });
};

export const fetchFlashcards = async (topic: string): Promise<Flashcard[]> => {
    return withCache(`flashcards_v5_50_${topic}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Generate 50 comprehensive flashcards for ${topic}. Cover definitions, key dates, important figures, and core concepts.
Return a JSON array: [{ "front": string, "back": string, "category": string }]. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '[]', []) as Flashcard[];
        } catch (e) { return []; }
    });
};

export const fetchRegionalDetail = async (region: string, discipline: string): Promise<RegionalDetail> => {
    return withCache(`region_v3_${region}_${discipline}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Political analysis of region: ${region} from the perspective of ${discipline}.
Return JSON: { "region": string, "summary": string, "keyCountries": string[], "politicalThemes": string[], "challenges": string[] }. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', {}) as RegionalDetail;
        } catch (e) { return {} as RegionalDetail; }
    });
};

export const fetchOrganizationDetail = async (name: string): Promise<OrganizationDetail> => {
    return withCache(`org_v3_${name}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Detailed profile of international organization: ${name}.
Return JSON: { "name", "abbr", "type", "headquarters", "founded", "secretaryGeneral", "mission", "members": string[], "history", "keyOrgans": [{"name","function"}], "majorTreaties": string[], "budget", "ideologicalParadigm", "governanceModel", "satelliteOffices": string[] }. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', {}) as OrganizationDetail;
        } catch (e) { return {} as OrganizationDetail; }
    });
};

export const fetchPartyDetail = async (name: string, country: string): Promise<PoliticalPartyDetail> => {
    return withCache(`party_v2_${name}_${country}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Comprehensive profile of political party: ${name} in ${country}. Include founding, ideology, leadership, electoral history, key policies, and current status. Return detailed JSON. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', {}) as PoliticalPartyDetail;
        } catch (e) { return {} as PoliticalPartyDetail; }
    });
};

export const fetchPersonDetail = async (name: string): Promise<PersonDetail> => {
    return withCache(`person_v2_${name}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Comprehensive political profile of ${name}. Include biography, political career, ideology, key decisions, legacy, and impact. Return detailed JSON. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', {}) as PersonDetail;
        } catch (e) { return {} as PersonDetail; }
    });
};

export const fetchEventDetail = async (name: string): Promise<EventDetail> => {
    return withCache(`event_v2_${name}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Detailed political event dossier for: ${name}. Include causes, key actors, timeline, outcomes, and historical significance. Return detailed JSON. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', {}) as EventDetail;
        } catch (e) { return {} as EventDetail; }
    });
};

export const fetchIdeologyDetail = async (name: string): Promise<IdeologyDetail> => {
    return withCache(`ideology_v2_${name}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Detailed analysis of political ideology: ${name}. Include origins, core tenets, key thinkers, historical movements, variants, criticisms, and modern manifestations. Return detailed JSON. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', {}) as IdeologyDetail;
        } catch (e) { return {} as IdeologyDetail; }
    });
};

export const fetchConceptDetail = async (term: string, context: string): Promise<ConceptDetail> => {
    return withCache(`concept_v2_${term}_${context}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Define political concept: "${term}" in the context of "${context}".
Return JSON: { "term": string, "definition": string, "context": string, "examples": string[], "history": string }. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', { term, definition: "Definition unavailable.", context, examples: [], history: "" }) as ConceptDetail;
        } catch (e) { return { term, definition: "Definition unavailable.", context, examples: [], history: "" }; }
    });
};

export const fetchHighlightDetail = async (highlight: HighlightedEntity): Promise<HighlightDetail> => {
    return withCache(`highlight_v7_${highlight.title}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Provide detailed information for: ${highlight.title} (${highlight.category}).
Return JSON: { "title", "subtitle", "category", "summary", "historicalBackground", "significance", "keyConcepts": [{"concept","definition"}], "modernConnections": string[], "sources": [{"title","url"}] }. ${getLanguageInstruction()}`
            });
            const parsed = safeParse(response.text || '{}', {}) as any;
            return {
                title: parsed.title || highlight.title,
                subtitle: parsed.subtitle || highlight.subtitle,
                category: parsed.category || highlight.category,
                summary: parsed.summary || "Summary unavailable.",
                historicalBackground: parsed.historicalBackground || "Historical context unavailable.",
                significance: parsed.significance || "Significance unavailable.",
                keyConcepts: parsed.keyConcepts || [],
                modernConnections: parsed.modernConnections || [],
                sources: parsed.sources || []
            };
        } catch (e) {
            return {
                title: highlight.title, subtitle: highlight.subtitle, category: highlight.category,
                summary: "Details currently unavailable.", historicalBackground: "", significance: "",
                keyConcepts: [], modernConnections: [], sources: []
            };
        }
    });
};

export const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
    return withCache(`rates_v2_${new Date().getHours()}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Generate realistic major currency exchange rates relative to USD as of today.
Return JSON array: [{ "currencyCode": string, "currencyName": string, "rate": number, "symbol": string, "category": "Fiat"|"Crypto"|"Historical"|"Fictional" }].
Include 20 major fiat currencies and top 5 cryptocurrencies. Use realistic approximate rates.`
            });
            return safeParse(response.text || '[]', []) as ExchangeRate[];
        } catch (e) { return []; }
    });
};

export const fetchCurrencyAnalysis = async (currency: string): Promise<{history: string, economics: string}> => {
    return withCache(`currency_analysis_v2_${currency}`, async () => {
        try {
            const response = await generateWithFallback({
                contents: `Analyze currency: ${currency}. Provide detailed history and economic profile.
Return JSON: { "history": string, "economics": string }. ${getLanguageInstruction()}`
            });
            return safeParse(response.text || '{}', { history: "Unavailable", economics: "Unavailable" });
        } catch (e) { return { history: "Unavailable", economics: "Unavailable" }; }
    });
};

// --- Advanced AI Capabilities (Claude-powered) ---

/** Image generation is not supported by Claude. */
export const generateImage = async (_prompt: string, _model?: string, _options?: any): Promise<string | null> => {
    console.warn("Image generation is not available — Claude does not support image generation.");
    return null;
};

/** Image editing is not supported by Claude. */
export const editImage = async (_base64Image: string, _prompt: string): Promise<string | null> => {
    console.warn("Image editing is not available — Claude does not support image generation.");
    return null;
};

/** Video generation is not supported by Claude. */
export const generateVideo = async (_prompt: string, _aspectRatio?: string, _image?: string): Promise<string | null> => {
    console.warn("Video generation is not available — Claude does not support video generation.");
    return null;
};

/** Text-to-speech via the browser Web Speech API. */
export const generateSpeech = async (text: string, _voice?: string): Promise<string | null> => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    return `__tts__:${text}`;
};

/** Analyze an image using Claude vision via the server proxy. */
export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
    try {
        const imageData = base64Image.split(',')[1] || base64Image;
        const mimeMatch = base64Image.match(/data:([^;]+);/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, image: imageData, imageMimeType: mimeType }),
            signal: AbortSignal.timeout(60000),
        });
        if (!response.ok) return "Analysis failed.";
        const data = await response.json() as any;
        return data.text || "Analysis failed.";
    } catch (e) {
        console.error("Image analysis failed:", e);
        return "Analysis failed.";
    }
};

/** Video analysis is not supported by Claude. */
export const analyzeVideo = async (_base64Video: string, _prompt: string): Promise<string> => {
    return "Video analysis is not available with Claude.";
};

/** Web search via Claude's knowledge base. */
export const groundedSearch = async (query: string): Promise<{text: string, chunks: any[]}> => {
    try {
        const text = await generateWithClaude(`Answer the following question with detailed, accurate information:\n\n${query}`) || "Search unavailable.";
        return { text, chunks: [] };
    } catch (e) {
        return { text: "Search unavailable.", chunks: [] };
    }
};

/** Geographic/political query via Claude. */
export const groundedMaps = async (query: string, _location?: {lat: number, lng: number}): Promise<{text: string, chunks: any[]}> => {
    try {
        const text = await generateWithClaude(`Provide detailed geographic and political information for: ${query}`) || "Information unavailable.";
        return { text, chunks: [] };
    } catch (e) {
        return { text: "Information unavailable.", chunks: [] };
    }
};

/** Deep reasoning via Claude. */
export const thinkingMode = async (query: string): Promise<string> => {
    try {
        const system = "You are POLI, an expert in political science and geopolitics. Think step by step, reason carefully, and provide a thorough, nuanced analysis.";
        return await generateWithClaude(query, system) || "No response.";
    } catch (e) {
        return "Analysis unavailable.";
    }
};

/** Audio transcription is not natively supported by Claude. */
export const transcribeAudio = async (_base64Audio: string): Promise<string> => {
    return "Audio transcription is not supported. Please use browser speech recognition.";
};

/** Live voice sessions are not supported by Claude. */
export const connectLiveSession = async (_onAudioData: (data: string) => void): Promise<any> => {
    throw new Error("Live voice sessions are not supported with Claude.");
};
