
import { generateWithFallback, safeParse, getLanguageInstruction } from "../common";
import { DetailedTimelineEvent } from "../../types";

export const fetchCountryTimeline = async (countryName: string): Promise<DetailedTimelineEvent[]> => {
    const prompt = `
    GENERATE MASTER TIMELINE: ${countryName}.
    SCOPE: Foundation to Present Day.
    DENSITY: High (20+ events).
    
    RETURN JSON ARRAY:
    [{ "year": "1945", "title": "Independence", "description": "Full details...", "type": "Political", "keyFigures": ["Leader Name"] }]
    ${getLanguageInstruction()}
    `;

    const response = await generateWithFallback({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: "application/json", maxOutputTokens: 8192 }
    });
    
    return safeParse(response.text || '[]', []) as DetailedTimelineEvent[];
};
