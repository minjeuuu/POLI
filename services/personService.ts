
import { generateWithFallback, safeParse, withCache, getLanguageInstruction, deepMerge } from "./common";
import { PersonDetail } from "../types";

const FALLBACK_PERSON: PersonDetail = {
    name: "Political Figure",
    role: "Unknown",
    country: "Unknown",
    era: "Unknown",
    bio: "Biography unavailable.",
    ideology: "Unknown",
    politicalWorks: [],
    officesHeld: [],
    timeline: [],
    relatedLinks: [],
    imageUrl: "",
    allies: [],
    rivals: [],
    education: [],
    quotes: []
};

export const fetchPersonDetail = async (name: string): Promise<PersonDetail> => {
    const cacheKey = `person_poli_v1_search_${name.replace(/\s+/g, '_')}`;

    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            POLI ARCHIVE — SUBJECT: ${name}.
            
            ${getLanguageInstruction()}

            **DIRECTIVES:**
            1. **KNOWLEDGE**: Use your comprehensive knowledge of this person to provide detailed, accurate information.
            2. **IMAGE**: Provide a real Wikimedia Commons portrait URL if you are confident it exists (e.g. https://upload.wikimedia.org/wikipedia/commons/[path]/[File.jpg]). If uncertain, leave imageUrl as empty string "".
            3. **FULL ROSTER**: List **ALL** major offices held with exact years.
            4. **PSYCHOBIOGRAPHY**: Detailed analysis of their personality, leadership style, and ideological evolution.
            5. **NETWORK**: Exhaustive list of allies, rivals, mentors, and students.
            6. **LEGACY**: Tangible impacts (laws, wars, institutions).
            7. **EARLY LIFE**: Detailed account of childhood, family background, and education.
            8. **PERSONAL LIFE**: Family, spouses, children, hobbies, and personal interests.
            9. **CONTROVERSIES**: Major scandals, criticisms, and legal issues.
            10. **AWARDS**: List of major awards, honors, and recognitions.
            11. **PSYCHOLOGICAL PROFILE**: Personality traits, leadership style, public perception.
            12. **MEDIA PRESENCE**: Key interviews, speeches, social media style.

            RETURN JSON ONLY:
            {
                "name": "string",
                "role": "string",
                "country": "string",
                "era": "string",
                "imageUrl": "string (Wikimedia URL)",
                "bio": "string (1000+ words, split by \\n\\n)",
                "earlyLife": "string (Detailed paragraph)",
                "personalLife": "string (Detailed paragraph)",
                "controversies": ["string"],
                "awards": ["string"],
                "ideology": "string",
                "politicalWorks": ["string"],
                "officesHeld": [ { "role": "string", "years": "string" } ],
                "timeline": [ { "year": "string", "event": "string" } ],
                "allies": ["string"],
                "rivals": ["string"],
                "education": ["string"],
                "quotes": ["string"],
                "relatedLinks": [ { "title": "string", "url": "string" } ],
                "psychologicalProfile": {
                    "traits": ["string"],
                    "leadershipStyle": "string",
                    "publicPerception": "string"
                },
                "mediaPresence": {
                    "interviews": ["string"],
                    "speeches": ["string"],
                    "socialMediaStyle": "string"
                }
            }
            `;

            const response = await generateWithFallback({ contents: prompt });
            const aiData = safeParse(response.text || '{}', {}) as any;
            const merged = deepMerge(FALLBACK_PERSON, aiData);

            return merged as PersonDetail;
        } catch (e) { return { ...FALLBACK_PERSON, name }; }
    });
};
