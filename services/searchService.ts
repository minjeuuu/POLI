
import { generateWithFallback, cleanJson, withCache, getLanguageInstruction, safeParse } from "./common";
import { PoliticalRecord } from "../types";

export const fetchPoliticalRecord = async (query: string): Promise<PoliticalRecord | null> => {
    return withCache(`record_poli_v2_${query}`, async () => {
        try {
            const response = await generateWithFallback({ contents: `
POLI ENCYCLOPEDIC ARCHIVE — POLITICAL RECORD DOSSIER: ${query}
CLASSIFICATION: STRUCTURED POLITICAL RECORD
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

MANDATORY DIRECTIVES:
1. ENTITY IDENTIFICATION: Determine whether "${query}" is a Country, Person, Ideology, Political Event, Organization, Political Party, Academic Discipline, or Concept. Classify precisely.
2. OFFICIAL NAME: Use the full, official legal or historical name.
3. DESCRIPTION: Minimum 300 words. Comprehensive description covering the nature, significance, and historical role of the entity.
4. HISTORICAL CONTEXT: Minimum 500 words. Cover the historical circumstances that created, shaped, or gave rise to this entity. Include key periods, transformative moments, and long-term historical forces.
5. TIMELINE: Minimum 20 chronological events covering the entity's full arc — founding/birth, major developments, crises, turning points, and current status. Each event must include a date (year or specific date) and a full descriptive sentence.
6. RELATED DISCIPLINES: List all academic disciplines relevant to understanding this entity (e.g., Political Science, International Relations, History, Economics, Sociology, Law, etc.).
7. PRIMARY SOURCES: List minimum 10 primary source documents, treaties, speeches, constitutions, or scholarly works that are essential for understanding this entity. Include author/body, source name, and year.

RETURN VALID JSON ONLY — NO MARKDOWN, NO PREAMBLE, NO COMMENTARY:
{
    "entity": {
        "id": "unique-slug",
        "name": "Official or common name",
        "officialName": "Full official/legal name",
        "type": "Country | Person | Ideology | Event | Organization | Party | Discipline | Concept",
        "jurisdiction": "Geographic scope or jurisdiction (country, region, global)",
        "establishedDate": "Founding, birth, or establishment date (YYYY or full date)",
        "status": "Active | Defunct | Historical | Contemporary",
        "description": "MINIMUM 300 WORDS — comprehensive description of what this entity is, why it matters, and its place in political history"
    },
    "historicalContext": "MINIMUM 500 WORDS — the historical circumstances, background forces, and context that shaped or gave rise to this entity. Include relevant historical periods, geopolitical factors, intellectual currents, and long-term trends.",
    "timeline": [
        {
            "id": "timeline-1",
            "date": "YYYY or specific date",
            "title": "Concise event title",
            "type": "Founding | Election | War | Treaty | Reform | Crisis | Death | Expansion | Collapse | Revolution | Discovery | Publication | Other",
            "description": "Detailed description of what happened and why it matters (minimum 2 sentences)",
            "outcome": "What resulted from this event — immediate and long-term consequences",
            "citations": [
                { "id": "cite-1", "source": "Source name", "year": "YYYY", "authorOrBody": "Author or issuing body" }
            ]
        }
    ],
    "relatedDisciplines": ["Political Science", "International Relations", "History", "Economics", "Sociology", "Law", "Philosophy", "Anthropology"],
    "primarySources": [
        { "id": "source-1", "source": "Document or work title", "year": "YYYY", "authorOrBody": "Author or issuing institution/body" }
    ]
}
            ` });
            return safeParse(response.text || '{}', null) as PoliticalRecord;
        } catch (e) {
            console.error(e);
            return null;
        }
    });
};

export const fetchGenericTopic = async (query: string): Promise<any> => {
    return withCache(`generic_dossier_poli_v2_${query}`, async () => {
        try {
            const response = await generateWithFallback({ contents: `
POLI ENCYCLOPEDIC ARCHIVE — GENERAL DOSSIER: ${query}
CLASSIFICATION: COMPREHENSIVE POLITICAL ENCYCLOPEDIA ENTRY
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

ROLE: You are POLI, the world's most comprehensive political science omnipedia. Your task is to generate an exhaustive, academic-level encyclopedia entry for the topic: "${query}"

MANDATORY DIRECTIVES — NO EXCEPTIONS:
1. TITLE: The precise, formal name for this topic.
2. OVERVIEW: Minimum 500 words. A thorough, encyclopedia-style overview covering what this topic is, why it is significant, its scope, and its place in political history and theory. Write for an educated, non-specialist audience. Do NOT summarize — explain in full detail.
3. POLITICAL ANALYSIS: Minimum 800 words. A comprehensive political science analysis covering: theoretical frameworks used to study this topic, key debates and contested interpretations, ideological dimensions, power dynamics, governance implications, and comparative perspectives across different political systems and regions.
4. KEY POINTS: Minimum 10 key analytical points, each with a descriptive title and a detailed explanation of at least 100 words.
5. HISTORICAL CONTEXT: Minimum 600 words. The historical origins and development of this topic — when it emerged, what historical forces shaped it, how understanding or practice of it evolved over time, key historical turning points, and how historical context shapes contemporary discussions.
6. STATISTICS: Minimum 10 relevant statistics, data points, or measurable indicators related to this topic with specific values, sources, and years where possible.
7. KEY FIGURES: Minimum 15 important individuals, institutions, or groups associated with this topic, with their role and significance clearly explained.
8. OPPOSING VIEWPOINTS: Minimum 400 words. Present the major competing perspectives on this topic — who holds each view, what evidence supports it, what criticisms exist, and how these debates have evolved. Cover at least 3 distinct schools of thought or ideological positions.
9. RELATED ENTITIES: Minimum 15 related concepts, events, persons, organizations, or movements that are directly relevant to understanding this topic.
10. NOTABLE QUOTE: One highly significant, verifiable quote from a major figure associated with this topic — include the person's name, year, and occasion.
11. TAGS: Minimum 10 subject tags/keywords for categorization.

RETURN VALID JSON ONLY — NO MARKDOWN, NO PREAMBLE, NO COMMENTARY:
{
    "title": "Precise formal name",
    "overview": "MINIMUM 500 WORDS — comprehensive overview covering definition, scope, significance, and place in political history and theory",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"],
    "politicalAnalysis": "MINIMUM 800 WORDS — comprehensive political science analysis covering theoretical frameworks, key debates, ideological dimensions, power dynamics, governance implications, and comparative perspectives",
    "keyPoints": [
        { "title": "Key point title", "description": "MINIMUM 100 WORDS — detailed explanation of this key analytical point including evidence, examples, and implications" },
        { "title": "Key point 2", "description": "..." },
        { "title": "Key point 3", "description": "..." },
        { "title": "Key point 4", "description": "..." },
        { "title": "Key point 5", "description": "..." },
        { "title": "Key point 6", "description": "..." },
        { "title": "Key point 7", "description": "..." },
        { "title": "Key point 8", "description": "..." },
        { "title": "Key point 9", "description": "..." },
        { "title": "Key point 10", "description": "..." }
    ],
    "historicalContext": "MINIMUM 600 WORDS — historical origins and development, key turning points, evolution over time, and how history shapes contemporary understanding",
    "relatedEntities": ["Entity 1 (explanation of relevance)", "Entity 2 (explanation)", "Entity 3", "Entity 4", "Entity 5", "Entity 6", "Entity 7", "Entity 8", "Entity 9", "Entity 10", "Entity 11", "Entity 12", "Entity 13", "Entity 14", "Entity 15"],
    "statistics": [
        { "label": "Statistic label", "value": "Specific value with unit and year" },
        { "label": "Statistic 2", "value": "..." },
        { "label": "Statistic 3", "value": "..." },
        { "label": "Statistic 4", "value": "..." },
        { "label": "Statistic 5", "value": "..." },
        { "label": "Statistic 6", "value": "..." },
        { "label": "Statistic 7", "value": "..." },
        { "label": "Statistic 8", "value": "..." },
        { "label": "Statistic 9", "value": "..." },
        { "label": "Statistic 10", "value": "..." }
    ],
    "keyFigures": ["Name — Role/Significance in this topic", "Figure 2 — ...", "Figure 3", "Figure 4", "Figure 5", "Figure 6", "Figure 7", "Figure 8", "Figure 9", "Figure 10", "Figure 11", "Figure 12", "Figure 13", "Figure 14", "Figure 15"],
    "opposingViewpoints": "MINIMUM 400 WORDS — present at least 3 distinct schools of thought or ideological positions on this topic, including evidence, criticisms, and how debates have evolved",
    "notableQuote": { "text": "Exact quote text", "author": "Person's name", "year": "YYYY", "occasion": "Context of when/where this was said or written" }
}
            ` });
            return safeParse(response.text || '{}', null);
        } catch (e) {
            return null;
        }
    });
};
