
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { CountryNews } from "../../types";

export const fetchCountryNews = async (countryName: string): Promise<CountryNews[]> => {
    const prompt = `
    TASK: USE GOOGLE SEARCH to find the LATEST political, economic, and diplomatic news for: ${countryName}.
    COUNT: 8 Distinct Stories.
    
    REQUIREMENTS:
    - **REAL-TIME**: Use the search results to populate the data. Do not hallucinate.
    - **DIVERSITY**: Include Domestic Politics, Foreign Relations, and Economy.
    - **SOURCES**: Cite the actual news outlet found in the search (e.g., "Reuters", "Al Jazeera", "Local Daily").
    - **DATES**: Use relative dates based on the search result (e.g., "2 hours ago", "Yesterday").
    
    RETURN JSON ARRAY ONLY:
    [{ "headline": "string", "source": "string", "date": "string", "snippet": "string", "url": "string (source URL)", "tags": ["Tag1", "Tag2"] }]
    ${getLanguageInstruction()}
    `;
    
    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview', // Pro model required for high-quality grounding
        contents: prompt,
        config: { 
            responseMimeType: "application/json",
            tools: [{googleSearch: {}}] // Activate Google Search Grounding
        }
    });
    
    return safeParse(response.text || '[]', []) as CountryNews[];
};
