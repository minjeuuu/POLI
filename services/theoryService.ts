
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { IdeologyDetail, DisciplineDetail, ConceptDetail, RegionalDetail } from "../types";

export const fetchIdeologyDetail = async (name: string): Promise<IdeologyDetail | null> => {
    const cacheKey = `ideology_poli_v2_full_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ENCYCLOPEDIC ARCHIVE — POLITICAL IDEOLOGY DOSSIER: ${name}
CLASSIFICATION: COMPREHENSIVE IDEOLOGICAL ANALYSIS
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

MANDATORY DIRECTIVES — NO EXCEPTIONS:
1. DEFINITION: Minimum 300 words. Provide an academically rigorous definition that covers: the essential philosophical premises, the view of human nature, the relationship between individual and state, the theory of political economy, the view of social organization, and how this ideology distinguishes itself from adjacent ideologies.
2. ORIGINS: Minimum 300 words. Trace the intellectual and historical origins — which philosophical traditions it draws from, the historical circumstances that gave rise to it, founding thinkers and their contributions, the initial political and social movements that embodied it, and its geographical points of origin.
3. HISTORY NARRATIVE: Minimum 700 words. Write a comprehensive historical narrative covering the ideology's development from origins to the present — tracing how it evolved through different historical periods, how external events shaped it (wars, economic crises, technological change), how it fragmented into branches and sub-tendencies, and how it has changed in the modern era. Use paragraph breaks.
4. TIMELINE: Minimum 20 chronological events covering founding texts, key political victories/defeats, theoretical developments, international spread, and transformative moments.
5. BRANCHES: List minimum 10 major branches, schools, or sub-tendencies with detailed descriptions of how each differs from the core ideology and from each other.
6. CORE TENETS: Minimum 12 core principles/beliefs. For each: state the principle clearly and provide a detailed explanation (minimum 50 words) of what it means, how it manifests in policy, and how it distinguishes this ideology from others.
7. KEY THINKERS: Minimum 15 key intellectual figures. For each: full name, birth/death years, nationality, their specific contribution to the ideology's development, their key works, and their place in the ideological tradition.
8. GLOBAL IMPACT: Minimum 400 words. Analyze the ideology's real-world impact — which countries or governments have been governed by parties of this ideology, what policies they implemented, what outcomes resulted, how the ideology has shaped international relations, and what its contemporary relevance is.
9. CRITICISMS: Minimum 400 words. Comprehensive analysis of criticisms from multiple angles — critiques from the left, from the right, from liberals, from conservatives, academic critiques, practical policy failures, and internal self-criticisms. Be specific and substantive.
10. FOUNDATIONAL WORKS: List minimum 15 essential texts — books, manifestos, essays, speeches — that are foundational to understanding this ideology. Include author, year, and a description of each work's contribution.

RETURN VALID JSON ONLY:
{
    "name": "Official ideology name",
    "definition": "MINIMUM 300 WORDS — Rigorous academic definition covering philosophical premises, view of human nature, individual-state relationship, political economy, social organization",
    "origins": "MINIMUM 300 WORDS — Intellectual and historical origins, founding thinkers, philosophical antecedents, geographical and historical context of emergence",
    "historyNarrative": "MINIMUM 700 WORDS — Complete historical evolution from founding to present, major periods, fragmentation into branches, modern transformations. Use \\n\\n for paragraph breaks.",
    "timeline": [
        { "year": "YYYY", "event": "Specific event description", "impact": "Why this event mattered for the ideology's development" }
    ],
    "branches": [
        "Branch name: detailed description of how it differs from core ideology, its key positions, representative figures, and countries where it has been influential"
    ],
    "coreTenets": [
        { "concept": "Core tenet name", "description": "MINIMUM 50 WORDS — Detailed explanation of the principle, how it manifests in policy, and how it distinguishes this ideology from others" }
    ],
    "keyThinkers": [
        { "name": "Full name", "era": "Birth year – Death year or 'b. YYYY'", "contribution": "Detailed description of their specific intellectual contribution, key works, and place in the ideological tradition" }
    ],
    "globalImpact": "MINIMUM 400 WORDS — Comprehensive analysis of real-world impact, countries governed under this ideology, policies implemented, outcomes, international influence, contemporary relevance",
    "criticisms": "MINIMUM 400 WORDS — Comprehensive critique from multiple political perspectives — left, right, liberal, conservative, academic, and practical policy failures",
    "foundationalWorks": [
        { "title": "Work title", "author": "Author full name", "year": "Year of publication", "significance": "Description of the work's contribution to the ideology" }
    ]
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
    const cacheKey = `discipline_poli_v2_full_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ENCYCLOPEDIC ARCHIVE — ACADEMIC DISCIPLINE DOSSIER: ${name}
CLASSIFICATION: COMPREHENSIVE ACADEMIC OVERVIEW
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

MANDATORY DIRECTIVES — NO EXCEPTIONS:
1. OVERVIEW: Complete academic overview covering: definition (what the discipline studies and why), scope (what is and is not included), importance (why this discipline matters to political science and the real world), and key questions (minimum 10 fundamental questions that define the discipline's research agenda).
2. HISTORY NARRATIVE: Minimum 600 words. Trace the discipline's intellectual genealogy — when and where it emerged as a recognized field, the founding figures and their contributions, major theoretical revolutions and debates, how external historical events (wars, decolonization, economic crises, technological change) shaped the discipline's development, and contemporary trends.
3. TIMELINE: Minimum 20 chronological events — founding moments, landmark publications, theoretical paradigm shifts, institutional developments, major conferences, and the emergence of sub-fields.
4. SUB-DISCIPLINES: List minimum 15 recognized sub-fields or sub-disciplines. For each: full name, description of its specific focus, major theoretical approaches used, and leading scholarly institutions or journals.
5. CORE THEORIES: Minimum 15 theoretical frameworks. For each: theory name, the scholar(s) who developed it, the year it emerged, a comprehensive summary (minimum 100 words) of its core claims, assumptions, and policy implications, and any major critiques.
6. METHODS: Minimum 12 research methods used in this discipline. For each: method name, detailed description of how it works, when it is appropriate to use, strengths, limitations, and a concrete example of its application.
7. SCHOLARS: Minimum 20 major scholars. For each: full name, country, active period, their primary theoretical contribution, their key publications, and their lasting influence on the discipline.
8. FOUNDATIONAL WORKS: Minimum 20 essential texts. For each: full title, author, year, and comprehensive description of the work's contribution, arguments, and significance to the discipline.
9. REGIONAL FOCUS: For each of the world's major regions (North America, Europe, Latin America, Africa, Middle East, South Asia, East Asia, Southeast Asia, Oceania), describe how this discipline has developed specifically in that regional context — key regional scholars, institutions, research agendas, political peculiarities, and methodological adaptations.
10. RELATED DISCIPLINES: List all closely related academic disciplines with explanations of the intellectual relationships and borrowings.

RETURN VALID JSON ONLY:
{
    "name": "Discipline full name",
    "overview": {
        "definition": "Comprehensive academic definition — what the discipline studies, its scope, its relationship to broader social sciences",
        "scope": "What is included and excluded from this discipline's purview",
        "importance": "Why this discipline matters — real-world significance, policy relevance, theoretical contributions",
        "keyQuestions": [
            "Fundamental research question 1 — why it matters",
            "Fundamental research question 2 — why it matters"
        ]
    },
    "historyNarrative": "MINIMUM 600 WORDS — Complete intellectual history of the discipline from emergence to present. Use \\n\\n for paragraph breaks.",
    "history": [
        { "year": "YYYY", "event": "Specific historical event or development", "impact": "How this shaped the discipline" }
    ],
    "subDisciplines": [
        "Sub-discipline name: description of focus, methods, key institutions and journals"
    ],
    "coreTheories": [
        { "name": "Theory name", "year": "Year of emergence or dominant period", "summary": "MINIMUM 100 WORDS — Core claims, assumptions, key concepts, policy implications, and major critiques" }
    ],
    "methods": [
        { "name": "Method name", "description": "How the method works, when to use it, strengths and limitations", "example": "Concrete example of this method applied to a real research question" }
    ],
    "scholars": [
        { "name": "Full name", "country": "Country of primary affiliation", "period": "Active period or birth/death years", "contribution": "Primary theoretical contribution and key works" }
    ],
    "foundationalWorks": [
        { "title": "Full title", "author": "Author full name", "year": "Publication year", "significance": "Comprehensive description of the work's arguments and lasting significance" }
    ],
    "regionalFocus": [
        { "region": "Region name", "description": "How the discipline has developed in this region — key scholars, institutions, research themes, political context, methodological adaptations" }
    ],
    "relatedDisciplines": [
        "Related discipline name: explanation of intellectual relationship and cross-pollination"
    ]
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
    const cacheKey = `concept_poli_v2_${term.replace(/\s+/g, '_')}_${context.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ARCHIVE — CONCEPT DEFINITION: "${term}" in the context of "${context}".
${getLanguageInstruction()}

Provide a thorough academic definition. Cover: the term's etymology and origins, its precise meaning in the context of ${context}, how it is distinguished from related concepts, its theoretical significance, and real-world applications.

RETURN JSON:
{
    "term": "${term}",
    "definition": "Comprehensive academic definition — minimum 200 words covering etymology, precise meaning, theoretical significance, and distinctions from related concepts",
    "context": "How this concept applies specifically within the context of ${context}",
    "examples": [
        "Concrete real-world example 1 with explanation",
        "Concrete real-world example 2 with explanation",
        "Concrete real-world example 3 with explanation",
        "Concrete real-world example 4 with explanation",
        "Concrete real-world example 5 with explanation"
    ],
    "history": "Historical development of the concept — when it was first articulated, who developed it, how its meaning has evolved, and how it has been contested or refined over time"
}
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
    const cacheKey = `region_poli_v2_${region.replace(/\s+/g, '_')}_${discipline.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ARCHIVE — REGIONAL ANALYSIS: ${region} through the lens of ${discipline}.
${getLanguageInstruction()}

Provide a comprehensive academic analysis of how ${discipline} manifests in ${region}. Cover the region's political history, major actors, structural dynamics, key debates within the discipline as applied to this region, and contemporary challenges and opportunities.

RETURN JSON:
{
    "region": "${region}",
    "summary": "Comprehensive overview — minimum 300 words — of how ${discipline} applies to ${region}. Cover the region's defining political characteristics, historical trajectory, major theoretical debates relevant to this region, and the distinctive features that make this region significant for the study of ${discipline}.",
    "keyCountries": ["Country 1", "Country 2", "Country 3", "Country 4", "Country 5"],
    "politicalThemes": [
        "Theme 1: detailed description of a dominant political pattern or dynamic in the region",
        "Theme 2: detailed description",
        "Theme 3: detailed description",
        "Theme 4: detailed description",
        "Theme 5: detailed description",
        "Theme 6: detailed description"
    ],
    "challenges": [
        "Challenge 1: comprehensive description of a core political/governance challenge facing the region",
        "Challenge 2: comprehensive description",
        "Challenge 3: comprehensive description",
        "Challenge 4: comprehensive description",
        "Challenge 5: comprehensive description"
    ]
}
            `;

            const response = await generateWithFallback({ contents: prompt });
            const parsed = safeParse(response.text || '{}', null) as RegionalDetail | null;
            return parsed;
        } catch (e) {
            return null;
        }
    });
};
