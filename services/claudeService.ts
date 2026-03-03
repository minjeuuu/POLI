
import { safeParse } from "./common";

const CLAUDE_API_KEY = (import.meta as any).env.VITE_CLAUDE_API_KEY;

export const generateWithClaude = async (prompt: string, system?: string) => {
    if (!CLAUDE_API_KEY) {
        console.warn("Claude API Key missing. Skipping fallback.");
        return null;
    }

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": CLAUDE_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
                "dangerously-allow-browser": "true" 
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 4096,
                system: system || "You are a helpful political science research assistant.",
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Claude API Error: ${err}`);
        }

        const data = await response.json();
        return data.content[0].text;
    } catch (e) {
        console.error("Claude Generation Failed:", e);
        return null; // Fail gracefully
    }
}
