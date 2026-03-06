
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { IdeologyDetail, DisciplineDetail, ConceptDetail, RegionalDetail } from "../types";
import { FALLBACK_DISCIPLINE_DETAIL } from "../data/homeData";

const FALLBACK_IDEOLOGY: IdeologyDetail = {
    name: "Political Ideology",
    definition: "Definition unavailable.",
    origins: "Origins unavailable.",
    historyNarrative: "History unavailable.",
    timeline: [],
    branches: [],
    coreTenets: [],
    keyThinkers: [],
    globalImpact: "Impact unavailable.",
    criticisms: "Criticism unavailable.",
    foundationalWorks: []
};

export const fetchIdeologyDetail = async (name: string): Promise<IdeologyDetail> => {
    const cacheKey = `ideology_poli_v1_prompt_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            SYSTEM OVERRIDE: POLI ARCHIVE V1.
            TOPIC: ${name} (Ideology).
            
            ${getLanguageInstruction()}

            RETURN JSON ONLY:
            {
                "name": "Ideology Name",
                "definition": "Academic definition",
                "origins": "Historical origins",
                "historyNarrative": "Evolution narrative...",
                "timeline": [{ "year": "YYYY", "event": "Event", "impact": "Impact" }],
                "branches": ["Branch 1", "Branch 2"],
                "coreTenets": [{ "concept": "Tenet", "description": "Description" }],
                "keyThinkers": [{ "name": "Name", "era": "Era", "contribution": "Contribution" }],
                "globalImpact": "Impact analysis...",
                "criticisms": "Major criticisms...",
                "foundationalWorks": [{ "title": "Title", "author": "Author", "year": "Year" }]
            }
            `;

            const response = await generateWithFallback({ contents: prompt });
            const parsed = safeParse(response.text || '{}', FALLBACK_IDEOLOGY) as IdeologyDetail;
            return { ...FALLBACK_IDEOLOGY, ...parsed, name };
        } catch (e) { return { ...FALLBACK_IDEOLOGY, name }; }
    });
};

export const fetchDisciplineDetail = async (name: string): Promise<DisciplineDetail> => {
     const cacheKey = `discipline_poli_v1_prompt_${name.replace(/\s+/g, '_')}`;

     return withCache(cacheKey, async () => {
        try {
            const prompt = `
            SYSTEM OVERRIDE: POLI ARCHIVE V1.
            DISCIPLINE: ${name}.
            
            ${getLanguageInstruction()}

            RETURN JSON ONLY matching DisciplineDetail interface:
            {
                "name": "${name}",
                "overview": { "definition": "...", "scope": "...", "importance": "...", "keyQuestions": [] },
                "historyNarrative": "...",
                "history": [],
                "subDisciplines": [],
                "coreTheories": [],
                "methods": [],
                "scholars": [],
                "foundationalWorks": [],
                "regionalFocus": []
            }
            `;

            const response = await generateWithFallback({ contents: prompt });
            const parsed = safeParse(response.text || '{}', FALLBACK_DISCIPLINE_DETAIL) as DisciplineDetail;
            return { ...FALLBACK_DISCIPLINE_DETAIL, ...parsed, name };
        } catch (e) { return { ...FALLBACK_DISCIPLINE_DETAIL, name }; }
    });
};

export const fetchConceptDetail = async (term: string, context: string): Promise<ConceptDetail> => {
    const cacheKey = `concept_poli_v1_prompt_${term.replace(/\s+/g, '_')}_${context.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            DEFINE CONCEPT: "${term}" within context of "${context}".
            ${getLanguageInstruction()}
            RETURN JSON: { "term": "${term}", "definition": "...", "context": "...", "examples": [], "history": "..." }
            `;

            const response = await generateWithFallback({ contents: prompt });
            return safeParse(response.text || '{}', { term, definition: "Unavailable", context, examples: [], history: "" }) as ConceptDetail;
        } catch (e) { return { term, definition: "Definition unavailable.", context, examples: [], history: "" }; }
    });
};

export const fetchRegionalDetail = async (region: string, discipline: string): Promise<RegionalDetail> => {
    const cacheKey = `region_poli_v1_prompt_${region.replace(/\s+/g, '_')}_${discipline.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            REGIONAL ANALYSIS: ${region} (Lens: ${discipline}).
            ${getLanguageInstruction()}
            RETURN JSON: { "region": "${region}", "summary": "...", "keyCountries": [], "politicalThemes": [], "challenges": [] }
            `;

            const response = await generateWithFallback({ contents: prompt });
            return safeParse(response.text || '{}', {}) as RegionalDetail;
        } catch (e) { return {} as RegionalDetail; }
    });
};
