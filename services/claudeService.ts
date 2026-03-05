
import { safeParse } from "./common";

const CLAUDE_API_KEY =
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_CLAUDE_API_KEY) ||
    (typeof process !== 'undefined' && (process.env as any).VITE_CLAUDE_API_KEY) ||
    '';

const CLAUDE_BASE_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-6";
const CLAUDE_MAX_TOKENS = 16000;

export const generateWithClaude = async (prompt: string, system?: string, maxTokens?: number): Promise<string | null> => {
    if (!CLAUDE_API_KEY) {
        console.warn("Claude API Key missing.");
        return null;
    }

    try {
        const response = await fetch(CLAUDE_BASE_URL, {
            method: "POST",
            headers: {
                "x-api-key": CLAUDE_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
                "anthropic-dangerous-direct-browser-access": "true"
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: maxTokens || CLAUDE_MAX_TOKENS,
                system: system || "You are POLI, an expert encyclopedic political science, geopolitics, history, culture, and global knowledge AI. Provide exhaustive, accurate, real-world data. When asked for JSON, return ONLY valid JSON — no markdown fences, no preamble, no commentary. Start directly with { or [. Fill every field with specific, detailed information.",
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Claude API Error ${response.status}: ${err}`);
        }

        const data = await response.json();
        return data.content?.[0]?.text || null;
    } catch (e) {
        console.error("Claude Generation Failed:", e);
        return null;
    }
};

export const generateJsonWithClaude = async <T>(prompt: string, fallback: T, system?: string): Promise<T> => {
    const jsonSystem = (system || "") + "\n\nCRITICAL: Return ONLY valid JSON. No markdown code fences, no commentary, no preamble. Start directly with { or [.";
    const text = await generateWithClaude(prompt, jsonSystem, CLAUDE_MAX_TOKENS);
    if (!text) return fallback;
    return safeParse(text, fallback);
};

export async function* streamWithClaude(prompt: string, system?: string): AsyncGenerator<string> {
    if (!CLAUDE_API_KEY) {
        yield "Claude API Key missing.";
        return;
    }

    try {
        const response = await fetch(CLAUDE_BASE_URL, {
            method: "POST",
            headers: {
                "x-api-key": CLAUDE_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
                "anthropic-dangerous-direct-browser-access": "true"
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: CLAUDE_MAX_TOKENS,
                stream: true,
                system: system || "You are POLI, a comprehensive political science research assistant.",
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!response.ok || !response.body) {
            yield "Stream error.";
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

            for (const line of lines) {
                const data = line.slice(6);
                if (data === '[DONE]') return;
                try {
                    const parsed = JSON.parse(data);
                    const text = parsed.delta?.text;
                    if (text) yield text;
                } catch {
                    // Skip malformed chunks
                }
            }
        }
    } catch (e) {
        console.error("Claude stream failed:", e);
        yield "Stream error occurred.";
    }
}
