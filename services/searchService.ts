
import { generateWithFallback, cleanJson, withCache, getLanguageInstruction, safeParse } from "./common";
import { PoliticalRecord } from "../types";

export const fetchPoliticalRecord = async (query: string): Promise<PoliticalRecord | null> => {
    return withCache(`record_poli_v1_${query}`, async () => {
        try {
            const response = await generateWithFallback({ contents: `Generate a structured political record for "${query}".
                If it is a Country, Person, Ideology, or Event, provide details.
                PROTOCOL: POLI ARCHIVE V1.
                Return RAW JSON ONLY.
                Structure: { "entity": { "name", "type", "description" ... }, "historicalContext", "timeline": [], "relatedDisciplines": [] }
                ${getLanguageInstruction()}` });
            return safeParse(response.text || '{}', null) as PoliticalRecord;
        } catch (e) {
            console.error(e);
            return null;
        }
    });
};

export const fetchGenericTopic = async (query: string): Promise<any> => {
    return withCache(`generic_dossier_poli_v1_${query}`, async () => {
        try {
            const response = await generateWithFallback({ contents: `
                ACT AS: POLI, THE POLITICAL SCIENCE OMNIPEDIA.
                TOPIC: "${query}"
                TASK: Generate an EXHAUSTIVE, ACADEMIC-LEVEL dossier.
                PROTOCOL: POLI ARCHIVE V1.

                REQUIREMENTS:
                1. **DEPTH**: Do not summarize. Explain. (1000+ words total).
                2. **BREADTH**: Cover history, theory, practice, criticism, and data.

                OUTPUT: RAW JSON ONLY. No Markdown.
                {
                    "title": "string",
                    "overview": "string",
                    "tags": ["string"],
                    "politicalAnalysis": "string (long)",
                    "keyPoints": [ { "title": "string", "description": "string" } ],
                    "historicalContext": "string",
                    "relatedEntities": ["string"],
                    "statistics": [ { "label": "string", "value": "string" } ],
                    "keyFigures": ["string"],
                    "opposingViewpoints": "string",
                    "notableQuote": { "text": "string", "author": "string" }
                }
                ${getLanguageInstruction()}
                ` });
            return safeParse(response.text || '{}', {
                title: query,
                overview: "Analysis currently unavailable.",
                politicalAnalysis: "Unable to generate dossier.",
                keyPoints: [],
                relatedEntities: []
            });
        } catch (e) {
            return {
                title: query,
                overview: "Analysis currently unavailable.",
                politicalAnalysis: "Unable to generate dossier.",
                keyPoints: [],
                relatedEntities: []
            };
        }
    });
};
