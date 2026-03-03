
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { CountryImageArchive } from "../../types";

export const fetchCountryImages = async (countryName: string): Promise<CountryImageArchive[]> => {
    const prompt = `
    GENERATE IMAGE ARCHIVE FOR: ${countryName}.

    TASK: Provide metadata for 9 real, verifiable images of ${countryName}.
    USE GOOGLE SEARCH to find actual image URLs from Wikimedia Commons, Wikipedia, or official government sites.

    CATEGORIES (3 images each):
    1. Historical: Founding moments, wars, revolutions, independence ceremonies
    2. Government: Capital buildings, parliament, presidential palace, supreme court
    3. Cultural: National landmarks, traditional dress, festivals, cuisine

    CRITICAL URL RULES:
    - Prefer Wikimedia Commons URLs: https://upload.wikimedia.org/wikipedia/commons/...
    - Or Wikipedia image URLs from the country's Wikipedia page
    - Use the actual file path from search results, not guessed paths
    - If uncertain of exact URL, use: https://source.unsplash.com/featured/800x600?${countryName},{keyword}

    RETURN ONLY VALID JSON ARRAY:
    [
      {
        "title": "Descriptive title",
        "url": "https://...",
        "category": "Historical|Government|Cultural",
        "year": "YYYY",
        "description": "Brief description",
        "credit": "Source name"
      }
    ]
    ${getLanguageInstruction()}
    `;

    try {
        const response = await generateWithFallback({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                tools: [{ googleSearch: {} }]
            }
        });

        const parsed = safeParse(response.text || '[]', []) as CountryImageArchive[];

        // Validate and clean URLs - replace any broken ones with Unsplash fallbacks
        const keywords = ['government', 'landscape', 'culture', 'history', 'capital'];
        return parsed.map((img, i) => {
            const kw = keywords[i % keywords.length];
            const fallbackUrl = `https://source.unsplash.com/featured/800x600?${encodeURIComponent(countryName)},${kw}&sig=${i}`;

            return {
                ...img,
                url: img.url && img.url.startsWith('http') ? img.url : fallbackUrl
            };
        });
    } catch (e) {
        // Return Unsplash fallbacks if everything fails
        const categories = ['Historical', 'Government', 'Cultural', 'Geography', 'Cultural', 'Historical', 'Government', 'Cultural', 'Geography'];
        const keywords2 = ['history', 'parliament', 'culture', 'landscape', 'festival', 'monument', 'city', 'tradition', 'nature'];
        return categories.map((cat, i) => ({
            title: `${countryName} - ${cat}`,
            url: `https://source.unsplash.com/featured/800x600?${encodeURIComponent(countryName)},${keywords2[i]}&sig=${i}`,
            category: cat,
            year: new Date().getFullYear().toString(),
            description: `${cat} image of ${countryName}`,
            credit: 'Unsplash'
        }));
    }
};
