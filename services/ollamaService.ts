/**
 * POLI Ollama Service
 * Routes AI generation through a local Ollama instance.
 * Ollama must be running at the configured URL (default: http://localhost:11434).
 * Set VITE_OLLAMA_URL and VITE_OLLAMA_MODEL env vars to customize.
 */

const OLLAMA_BASE_URL: string =
    (typeof process !== 'undefined' && (process.env as any).VITE_OLLAMA_URL) ||
    'http://localhost:11434';

const DEFAULT_OLLAMA_MODEL: string =
    (typeof process !== 'undefined' && (process.env as any).VITE_OLLAMA_MODEL) ||
    'llama3.2';

export const OLLAMA_SYSTEM_PROMPT = `You are POLI, an expert encyclopedic political science, geopolitics, history, culture, and global knowledge AI assistant.
When asked for JSON, return ONLY valid, complete JSON.
No markdown code fences, no comments, no preamble. Start directly with { or [.
Fill ALL fields with accurate, detailed, real-world data. Never leave fields empty or as "N/A" when real data is known.
Be exhaustive and comprehensive — provide as many data points as possible.`;

export const isOllamaAvailable = async (): Promise<boolean> => {
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
            signal: AbortSignal.timeout(3000),
        });
        return res.ok;
    } catch {
        return false;
    }
};

export const listOllamaModels = async (): Promise<string[]> => {
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.models || []).map((m: any) => m.name);
    } catch {
        return [];
    }
};

export const generateWithOllama = async (prompt: string, model?: string): Promise<string | null> => {
    const m = model || DEFAULT_OLLAMA_MODEL;
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: m,
                prompt: `${OLLAMA_SYSTEM_PROMPT}\n\n${prompt}`,
                stream: false,
                format: 'json',
                options: {
                    temperature: 0.7,
                    num_predict: 32768,
                    top_p: 0.9,
                    repeat_penalty: 1.1,
                },
            }),
            signal: AbortSignal.timeout(180000), // 3 min timeout for large responses
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Ollama error ${response.status}: ${err}`);
        }

        const data = await response.json();
        return data.response || null;
    } catch (e) {
        console.error('Ollama generation failed:', e);
        return null;
    }
};

export const generateWithOllamaChat = async (
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    model?: string
): Promise<string | null> => {
    const m = model || DEFAULT_OLLAMA_MODEL;
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: m,
                messages: [
                    { role: 'system', content: OLLAMA_SYSTEM_PROMPT },
                    ...messages,
                ],
                stream: false,
                options: {
                    temperature: 0.7,
                    num_predict: 32768,
                },
            }),
            signal: AbortSignal.timeout(180000),
        });

        if (!response.ok) throw new Error(`Ollama chat error ${response.status}`);
        const data = await response.json();
        return data.message?.content || null;
    } catch (e) {
        console.error('Ollama chat generation failed:', e);
        return null;
    }
};
