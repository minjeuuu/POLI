
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { PersonDetail } from "../types";

export const fetchPersonDetail = async (name: string): Promise<PersonDetail | null> => {
    const cacheKey = `person_poli_v2_full_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
POLI ENCYCLOPEDIC ARCHIVE — SUBJECT DOSSIER: ${name}
CLASSIFICATION: COMPREHENSIVE POLITICAL BIOGRAPHY
PROTOCOL: POLI ARCHIVE V2 — COMPLETE EDITION

${getLanguageInstruction()}

MANDATORY DIRECTIVES — NO EXCEPTIONS:
1. EXHAUSTIVE BIOGRAPHY: The "bio" field MUST be a minimum of 1500 words. Write it as a professional encyclopedia article covering the subject's complete life from birth to present or death. Include every significant chapter of their life, political journey, ideological development, and historical impact. Use paragraph breaks (\\n\\n) between sections.
2. EARLY LIFE: Minimum 400 words. Cover birth circumstances, family background (parents' occupations, socioeconomic status, political affiliations of family), childhood environment, formative experiences, significant events that shaped political worldview, schools attended, early friendships, and the cultural/historical context of their upbringing.
3. PERSONAL LIFE: Minimum 300 words. Cover all marriages/partnerships (dates, names, outcomes), all children (names, birth years, occupations), siblings, parents, extended family, known friendships, hobbies, health struggles, religious observance, private residences, personal habits.
4. PSYCHOLOGICAL PROFILE: Provide a thorough psychological analysis (minimum 8 traits) including: dominant personality traits, attachment style in politics, response to criticism, ego vs. idealism balance, communication under pressure, relationships with subordinates and superiors, decision-making style under uncertainty, known psychological vulnerabilities, public persona vs. private character divergence.
5. MEDIA PRESENCE: List minimum 10 significant interviews with dates and networks/publications, minimum 10 defining speeches (with year and occasion), describe their social media persona, public relations strategy, media-friendliness or antagonism.
6. OFFICES HELD: List EVERY political position ever held — include city council, municipal, regional, national, and international roles. Include exact start and end dates for each. Include the political context of each appointment or election.
7. COMPLETE CAREER ARC: List ALL professional positions held before, during, and after political life — academic posts, legal career, military service, business roles, non-profit work. Include years.
8. CONTROVERSIES: List ALL major controversies, scandals, legal challenges, ethical violations, and criticisms with full context for each. Do not omit anything historically documented.
9. AWARDS: List ALL official awards, honorary degrees, Nobel nominations, international recognitions, military decorations, and civic honors with issuing body and year.
10. NETWORK: List minimum 15 allies (with explanation of relationship) and minimum 10 rivals (with explanation of conflict). Include mentors, proteges, ideological compatriots, and enemies.
11. IDEOLOGY: Describe the complete ideological evolution — where they started, what shifted them, the mature ideology, specific policy implications of their beliefs. Compare to major political traditions.
12. POLITICAL WORKS: List all books, major articles, academic papers, ghost-written texts, memoirs, and influential speeches published as texts.
13. QUOTES: Provide minimum 15 authentic, verified quotes with context (year, occasion, audience).
14. TIMELINE: Provide minimum 25 chronological events covering the full arc of life and career.
15. EDUCATION: List every educational institution attended with years, degrees obtained, and notable professors or peers.
16. WIKIMEDIA IMAGE: For imageUrl, provide a real Wikimedia Commons direct file URL only if you are highly confident it exists (e.g. https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Filename.jpg/220px-Filename.jpg). If uncertain, use empty string "".
17. RELATED LINKS: Provide minimum 5 real, verifiable URLs (official pages, Wikipedia, national archives) — do NOT fabricate URLs.

RETURN VALID JSON ONLY — NO MARKDOWN, NO PREAMBLE, NO COMMENTARY:
{
    "name": "Full legal name",
    "role": "Primary political role/title",
    "country": "Country of political activity",
    "era": "Historical period (e.g. 1950s–2010s)",
    "imageUrl": "Wikimedia direct URL or empty string",
    "bio": "MINIMUM 1500 WORDS — Complete encyclopedic biography split by \\n\\n paragraphs. Cover: political rise, major achievements, defining crises, legacy, historical context.",
    "earlyLife": "MINIMUM 400 WORDS — Birth, family, childhood, education, formative experiences, context of the era.",
    "personalLife": "MINIMUM 300 WORDS — Marriages, children, family, friends, hobbies, health, religion, private persona.",
    "ideology": "Complete ideology description — origins, evolution, core beliefs, policy implications, comparison to broader movements",
    "politicalWorks": ["Book or article title 1", "Book or article title 2", "..."],
    "officesHeld": [
        { "role": "Exact title", "years": "YYYY–YYYY or YYYY–present" }
    ],
    "timeline": [
        { "year": "YYYY", "event": "Specific event description" }
    ],
    "allies": ["Name (relationship explanation)", "..."],
    "rivals": ["Name (reason for conflict)", "..."],
    "education": ["Institution — Degree — Year(s)", "..."],
    "quotes": [
        "Quote text (Year, Occasion)"
    ],
    "relatedLinks": [
        { "title": "Link title", "url": "https://real-verified-url.org/..." }
    ],
    "controversies": [
        "Full description of controversy with context, date, and outcome"
    ],
    "awards": [
        "Award name — Issuing body — Year"
    ],
    "psychologicalProfile": {
        "traits": [
            "Trait 1: detailed description",
            "Trait 2: detailed description",
            "Trait 3: detailed description",
            "Trait 4: detailed description",
            "Trait 5: detailed description",
            "Trait 6: detailed description",
            "Trait 7: detailed description",
            "Trait 8: detailed description"
        ],
        "leadershipStyle": "Comprehensive analysis of leadership style — decision-making approach, delegation, crisis management, relationship with power, historical comparisons",
        "publicPerception": "Comprehensive analysis of how the public views this person — polling data patterns, media portrayals, historical reputation shifts, legacy assessment"
    },
    "mediaPresence": {
        "interviews": [
            "Interview description — Network/Publication — Year",
            "..."
        ],
        "speeches": [
            "Speech name/description — Year — Occasion",
            "..."
        ],
        "socialMediaStyle": "Comprehensive description of social media strategy, tone, platform preferences, and engagement approach"
    }
}
            `;

            const response = await generateWithFallback({ contents: prompt });
            const aiData = safeParse(response.text || '{}', null) as any;
            if (!aiData || !aiData.name) return null;
            return aiData as PersonDetail;
        } catch (e) {
            return null;
        }
    });
};
