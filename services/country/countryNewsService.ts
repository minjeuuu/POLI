
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { CountryNews } from "../../types";

export const fetchCountryNews = async (countryName: string): Promise<CountryNews[]> => {
    const prompt = `
    Generate 8 recent and realistic political, economic, and diplomatic news stories about ${countryName}.
    Base them on your knowledge of actual events and ongoing situations in this country.

    DIVERSITY: Cover Domestic Politics, Foreign Relations, and Economy.
    SOURCES: Use real news outlet names (Reuters, AP, BBC, Al Jazeera, local outlets, etc.).
    DATES: Use plausible recent relative dates (e.g., "2 days ago", "Last week", "3 hours ago").
    URLs: Provide plausible (not invented) URLs using the format:
          https://www.reuters.com/world/[region]/[slug] or similar real outlet domain patterns.

    RETURN ONLY VALID JSON ARRAY (no markdown):
    [{ "headline": "string", "source": "string", "date": "string", "snippet": "string", "url": "string", "tags": ["Tag1", "Tag2"] }]
    ${getLanguageInstruction()}
    `;

    try {
        const response = await generateWithFallback({ contents: prompt });
        const parsed = safeParse(response.text || '[]', []) as CountryNews[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};
