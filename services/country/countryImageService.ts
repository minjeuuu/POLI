
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { CountryImageArchive } from "../../types";

const picsumUrl = (seed: string) =>
    `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`;

const KEYWORDS = ['history', 'parliament', 'culture', 'landscape', 'festival', 'monument', 'city', 'tradition', 'nature'];
const CATEGORIES = ['Historical', 'Government', 'Cultural', 'Historical', 'Government', 'Cultural', 'Historical', 'Government', 'Cultural'];

const makeFallbacks = (countryName: string): CountryImageArchive[] =>
    CATEGORIES.map((cat, i) => ({
        title: `${countryName} — ${cat}`,
        url: picsumUrl(`${countryName}-${KEYWORDS[i]}`),
        category: cat,
        year: new Date().getFullYear().toString(),
        description: `${cat} image of ${countryName}`,
        credit: 'Picsum Photos',
    }));

export const fetchCountryImages = async (countryName: string): Promise<CountryImageArchive[]> => {
    const prompt = `
    Generate an image archive for ${countryName} with exactly 9 entries (3 per category).

    CATEGORIES: Historical, Government, Cultural

    For the "url" field, provide a real Wikimedia Commons direct-link URL you are confident exists, like:
    https://upload.wikimedia.org/wikipedia/commons/[path]/[File.jpg]
    Do NOT invent file paths. If you are not sure a specific file exists, use this reliable placeholder instead:
    https://picsum.photos/seed/${encodeURIComponent(countryName)}-[keyword]/800/600

    RETURN ONLY VALID JSON ARRAY (no markdown fences):
    [
      {
        "title": "Descriptive title",
        "url": "https://...",
        "category": "Historical|Government|Cultural",
        "year": "YYYY",
        "description": "One sentence description",
        "credit": "Wikimedia Commons"
      }
    ]
    ${getLanguageInstruction()}
    `;

    try {
        const response = await generateWithFallback({ contents: prompt });
        const parsed = safeParse(response.text || '[]', []) as CountryImageArchive[];
        if (!Array.isArray(parsed) || parsed.length === 0) return makeFallbacks(countryName);

        return parsed.map((img, i) => ({
            ...img,
            // Non-http URLs get replaced with a deterministic picsum seed
            url: img.url && img.url.startsWith('http')
                ? img.url
                : picsumUrl(`${countryName}-${KEYWORDS[i % KEYWORDS.length]}`),
        }));
    } catch {
        return makeFallbacks(countryName);
    }
};
