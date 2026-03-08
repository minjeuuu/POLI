
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { IdeologyDetail, DisciplineDetail, ConceptDetail, RegionalDetail } from "../types";

export const fetchIdeologyDetail = async (name: string): Promise<IdeologyDetail | null> => {
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
            const parsed = safeParse(response.text || '{}', null) as IdeologyDetail | null;
            if (!parsed || !parsed.name) return null;
            return { ...parsed, name };
        } catch (e) {
            return null;
        }
    });
};

export const fetchDisciplineDetail = async (name: string): Promise<DisciplineDetail | null> => {
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
            const parsed = safeParse(response.text || '{}', null) as DisciplineDetail | null;
            if (!parsed || !parsed.name) return null;
            return { ...parsed, name };
        } catch (e) {
            return null;
        }
    });
};

export const fetchConceptDetail = async (term: string, context: string): Promise<ConceptDetail | null> => {
    const cacheKey = `concept_poli_v1_prompt_${term.replace(/\s+/g, '_')}_${context.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            DEFINE CONCEPT: "${term}" within context of "${context}".
            ${getLanguageInstruction()}
            RETURN JSON: { "term": "${term}", "definition": "...", "context": "...", "examples": [], "history": "..." }
            `;

            const response = await generateWithFallback({ contents: prompt });
            const parsed = safeParse(response.text || '{}', null) as ConceptDetail | null;
            return parsed;
        } catch (e) {
            return null;
        }
    });
};

export const fetchRegionalDetail = async (region: string, discipline: string): Promise<RegionalDetail | null> => {
    const cacheKey = `region_poli_v1_prompt_${region.replace(/\s+/g, '_')}_${discipline.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            REGIONAL ANALYSIS: ${region} (Lens: ${discipline}).
            ${getLanguageInstruction()}
            RETURN JSON: { "region": "${region}", "summary": "...", "keyCountries": [], "politicalThemes": [], "challenges": [] }
            `;

            const response = await generateWithFallback({ contents: prompt });
            const parsed = safeParse(response.text || '{}', null) as RegionalDetail | null;
            return parsed;
        } catch (e) {
            return null;
        }
    });
};
