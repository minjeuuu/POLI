
import { safeParse } from "./common";

// Server-side direct key (used only in Node/server context).
// Browser calls go through /api/ai/generate proxy — key never in bundle.
const DIRECT_API_KEY =
    (typeof process !== 'undefined' && (process.env as any).CLAUDE_API_KEY) ||
    (typeof process !== 'undefined' && (process.env as any).VITE_CLAUDE_API_KEY) ||
    '';

const CLAUDE_BASE_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-6";
const CLAUDE_MAX_TOKENS = 8000;
const CLAUDE_SYSTEM = "You are POLI, an expert encyclopedic political science, geopolitics, history, culture, and global knowledge AI. Provide exhaustive, accurate, real-world data. When asked for JSON, return ONLY valid JSON — no markdown fences, no preamble, no commentary. Start directly with { or [. Fill every field with specific, detailed information.";

const isBrowser = typeof window !== 'undefined';

// User-configured key (entered in Settings and saved to localStorage) takes highest priority.
// Falls back to key bundled via vite.config.ts define, then empty string.
const getUserKey = (): string => {
    if (!isBrowser) return '';
    try { return localStorage.getItem('poli_claude_key') || ''; } catch { return ''; }
};
const getActiveKey = (): string => getUserKey() || DIRECT_API_KEY || '';

export const generateWithClaude = async (prompt: string, system?: string, maxTokens?: number, _retries = 1): Promise<string | null> => {
    if (isBrowser) {
        const browserKey = getActiveKey();
        // Strategy 1: Direct Anthropic API call from browser (if key is available)
        if (browserKey) {
            for (let attempt = 0; attempt <= _retries; attempt++) {
                try {
                    const response = await fetch(CLAUDE_BASE_URL, {
                        method: 'POST',
                        headers: {
                            'x-api-key': browserKey,
                            'anthropic-version': '2023-06-01',
                            'content-type': 'application/json',
                            'anthropic-dangerous-direct-browser-access': 'true',
                        },
                        body: JSON.stringify({
                            model: CLAUDE_MODEL,
                            max_tokens: maxTokens || CLAUDE_MAX_TOKENS,
                            system: system || CLAUDE_SYSTEM,
                            messages: [{ role: 'user', content: prompt }],
                        }),
                        signal: AbortSignal.timeout(60000),
                    });
                    if (!response.ok) {
                        const err = await response.json().catch(() => ({})) as any;
                        const status = response.status;
                        if (status === 401 || status === 403) {
                            console.error('Claude direct auth error — key may be revoked:', status, err?.error?.message);
                            break; // fall through to proxy
                        }
                        if (attempt < _retries) { await new Promise(r => setTimeout(r, 1000 * (attempt + 1))); continue; }
                        break;
                    }
                    const data = await response.json() as any;
                    return data.content?.[0]?.text || null;
                } catch (e: any) {
                    if (attempt < _retries) { await new Promise(r => setTimeout(r, 1000 * (attempt + 1))); continue; }
                    console.warn('Claude direct call failed, falling back to proxy:', e?.message);
                }
            }
        }

        // Strategy 2: Server proxy fallback (key stays on server, or user key forwarded)
        for (let attempt = 0; attempt <= _retries; attempt++) {
            try {
                const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                if (browserKey) headers['X-User-API-Key'] = browserKey;
                const response = await fetch('/api/ai/generate', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ prompt, system, maxTokens }),
                    signal: AbortSignal.timeout(60000),
                });
                if (!response.ok) {
                    const err = await response.json().catch(() => ({})) as any;
                    const status = response.status;
                    if (status === 401 || status === 403 || status === 503) {
                        console.error('Claude proxy error (no retry):', status, err?.error);
                        return null;
                    }
                    if (attempt < _retries) {
                        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
                        continue;
                    }
                    return null;
                }
                const data = await response.json() as any;
                return data.text || null;
            } catch (e: any) {
                if (attempt < _retries) {
                    await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
                    continue;
                }
                console.error('Claude proxy fetch failed after retries:', e?.message || e);
                return null;
            }
        }
        return null;
    }

    // Server-side: call Anthropic directly
    if (!DIRECT_API_KEY) {
        console.warn("Claude API Key missing on server.");
        return null;
    }

    try {
        const response = await fetch(CLAUDE_BASE_URL, {
            method: "POST",
            headers: {
                "x-api-key": DIRECT_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: maxTokens || CLAUDE_MAX_TOKENS,
                system: system || CLAUDE_SYSTEM,
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Claude API Error ${response.status}: ${err}`);
        }

        const data = await response.json() as any;
        return data.content?.[0]?.text || null;
    } catch (e) {
        console.error("Claude Generation Failed:", e);
        return null;
    }
};

export const generateJsonWithClaude = async <T>(prompt: string, fallback: T, system?: string): Promise<T> => {
    const jsonSystem = (system || CLAUDE_SYSTEM) + "\n\nCRITICAL: Return ONLY valid JSON. No markdown code fences, no commentary, no preamble. Start directly with { or [.";
    const text = await generateWithClaude(prompt, jsonSystem, CLAUDE_MAX_TOKENS);
    if (!text) return fallback;
    return safeParse(text, fallback);
};

export async function* streamWithClaude(prompt: string, system?: string): AsyncGenerator<string> {
    if (isBrowser) {
        // Try direct browser API call first if key is available
        const streamKey = getActiveKey();
        if (streamKey) {
            try {
                const response = await fetch(CLAUDE_BASE_URL, {
                    method: 'POST',
                    headers: {
                        'x-api-key': streamKey,
                        'anthropic-version': '2023-06-01',
                        'content-type': 'application/json',
                        'anthropic-dangerous-direct-browser-access': 'true',
                    },
                    body: JSON.stringify({
                        model: CLAUDE_MODEL,
                        max_tokens: CLAUDE_MAX_TOKENS,
                        stream: true,
                        system: system || CLAUDE_SYSTEM,
                        messages: [{ role: 'user', content: prompt }],
                    }),
                    signal: AbortSignal.timeout(120000),
                });
                if (response.ok && response.body) {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';
                    let yielded = false;
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, { stream: true });
                        const lines = buffer.split('\n');
                        buffer = lines.pop() ?? '';
                        for (const line of lines) {
                            if (!line.startsWith('data: ')) continue;
                            const raw = line.slice(6).trim();
                            if (raw === '[DONE]') return;
                            try {
                                const parsed = JSON.parse(raw);
                                const text = parsed.delta?.text;
                                if (text) { yielded = true; yield text; }
                            } catch { /* skip */ }
                        }
                    }
                    if (yielded) return;
                }
            } catch (e) {
                console.warn('Direct stream failed, falling back to proxy:', e);
            }
        }

        // Fall back to server SSE proxy
        for (let attempt = 0; attempt <= 1; attempt++) {
            let didYield = false;
            try {
                const streamHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
                if (streamKey) streamHeaders['X-User-API-Key'] = streamKey;
                const response = await fetch('/api/ai/stream', {
                    method: 'POST',
                    headers: streamHeaders,
                    body: JSON.stringify({ prompt, system }),
                    signal: AbortSignal.timeout(120000),
                });

                if (!response.ok || !response.body) {
                    if (attempt === 0) { await new Promise(r => setTimeout(r, 1000)); continue; }
                    yield "Stream unavailable.";
                    return;
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() ?? '';
                    for (const line of lines) {
                        if (!line.startsWith('data: ')) continue;
                        const raw = line.slice(6).trim();
                        if (raw === '[DONE]') return;
                        if (raw === '[ERROR]') {
                            if (!didYield && attempt === 0) {
                                await new Promise(r => setTimeout(r, 1000));
                                break; // retry outer loop
                            }
                            return;
                        }
                        try {
                            const parsed = JSON.parse(raw);
                            if (parsed.text) { didYield = true; yield parsed.text; }
                        } catch { /* skip malformed */ }
                    }
                    if (buffer === '[ERROR]' && !didYield && attempt === 0) break;
                }
                if (didYield) return; // success
            } catch (e) {
                if (attempt === 0) { await new Promise(r => setTimeout(r, 1000)); continue; }
                console.error("Claude stream proxy failed:", e);
                yield "Stream error occurred.";
                return;
            }
        }
        return;
    }

    // Server-side: call Anthropic directly with streaming
    if (!DIRECT_API_KEY) {
        yield "Claude API Key missing.";
        return;
    }

    try {
        const response = await fetch(CLAUDE_BASE_URL, {
            method: "POST",
            headers: {
                "x-api-key": DIRECT_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: CLAUDE_MAX_TOKENS,
                stream: true,
                system: system || CLAUDE_SYSTEM,
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!response.ok || !response.body) {
            yield "Stream error.";
            return;
        }

        const reader = (response.body as any).getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((l: string) => l.startsWith('data: '));
            for (const line of lines) {
                const data = line.slice(6);
                if (data === '[DONE]') return;
                try {
                    const parsed = JSON.parse(data);
                    const text = parsed.delta?.text;
                    if (text) yield text;
                } catch { /* skip */ }
            }
        }
    } catch (e) {
        console.error("Claude stream failed:", e);
        yield "Stream error occurred.";
    }
}
