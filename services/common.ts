
import { GoogleGenAI } from "@google/genai";
import { generateWithOllama } from "./ollamaService";

// Centralized API Client Initialization
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
if (!apiKey) console.warn("POLI Warning: GEMINI_API_KEY not detected — Ollama/Claude will be used as primary AI.");

export const ai = new GoogleGenAI({ apiKey: apiKey || 'placeholder' });

export const GLOBAL_CACHE: Record<string, any> = {};

export const withCache = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  if (GLOBAL_CACHE[key]) return GLOBAL_CACHE[key];
  try {
    const result = await fetcher();
    GLOBAL_CACHE[key] = result;
    return result;
  } catch (error) {
    console.error(`Error fetching ${key}:`, error);
    throw error;
  }
};

/**
 * Robust wrapper for AI content generation with automatic retries.
 * Handles 503s, 429s, and network blips with exponential backoff + jitter.
 */
export const generateWithRetry = async (params: any, retries = 3) => {
    for (let i = 0; i <= retries; i++) {
        try {
            return await ai.models.generateContent(params);
        } catch (e: any) {
            const isLast = i === retries;
            const msg = e.message || JSON.stringify(e);
            console.warn(`Gemini generation failed (Attempt ${i + 1}/${retries + 1}):`, msg);

            if (isLast) throw e;

            // Exponential backoff: 1s, 2s, 4s... plus random jitter
            const delay = 1000 * Math.pow(2, i) + (Math.random() * 1000);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Gemini generation failed after retries");
};

import { generateWithClaude } from "./claudeService";

/**
 * High-Availability Wrapper: Tries Primary → Fallback chain.
 * Priority (no Gemini key): Ollama → Claude → empty JSON.
 * Priority (Gemini key): Gemini Pro → Gemini Flash → Ollama → Claude → empty JSON.
 */
export const generateWithFallback = async (params: any, fallbackModel: string = 'gemini-2.5-flash'): Promise<{ text: string }> => {
    const hasGeminiKey = !!(process.env.API_KEY || process.env.GEMINI_API_KEY);
    const prompt = typeof params.contents === 'string' ? params.contents : JSON.stringify(params.contents);

    if (!hasGeminiKey) {
        // No Gemini key — try Ollama first, then Claude
        console.log("POLI: No Gemini key. Routing to Ollama...");
        const ollamaResponse = await generateWithOllama(prompt);
        if (ollamaResponse) return { text: ollamaResponse };

        console.warn("POLI: Ollama unavailable. Falling back to Claude...");
        const claudeResponse = await generateWithClaude(prompt);
        if (claudeResponse) return { text: claudeResponse };
        return { text: '{}' };
    }

    try {
        // Attempt Primary Gemini Request
        return await generateWithRetry(params);
    } catch (e) {
        console.warn(`Primary model (${params.model}) failed. Auto-switching to fallback: ${fallbackModel}.`, e);

        try {
            // Retry with Gemini Flash
            return await generateWithRetry({
                ...params,
                model: fallbackModel,
                config: { ...params.config, responseMimeType: "application/json" }
            });
        } catch (e2) {
            console.warn(`Gemini Flash fallback failed. Attempting Ollama fallback.`, e2);

            // Try Ollama
            const ollamaResponse = await generateWithOllama(prompt);
            if (ollamaResponse) return { text: ollamaResponse };

            // Final fallback to Claude
            const claudeResponse = await generateWithClaude(prompt);
            if (claudeResponse) return { text: claudeResponse };

            throw e2;
        }
    }
};

export class JSONRepair {
    static clean(jsonStr: string): string {
        if (!jsonStr) return "{}";
        let fixed = jsonStr;

        // 1. Remove Markdown Code Blocks
        fixed = fixed.replace(/```json/gi, "").replace(/```/g, "");

        // 2. Remove "Thinking" blocks if they leaked into the text
        fixed = fixed.replace(/<thinking>[\s\S]*?<\/thinking>/gi, "");

        // 3. Find the outermost object or array
        const firstBrace = fixed.indexOf('{');
        const firstBracket = fixed.indexOf('[');

        let startIndex = -1;
        let isArray = false;

        if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
            startIndex = firstBrace;
        } else if (firstBracket !== -1) {
            startIndex = firstBracket;
            isArray = true;
        }

        if (startIndex === -1) return "{}";

        fixed = fixed.substring(startIndex);

        // 4. Cleanup trailing text
        const lastChar = isArray ? ']' : '}';
        const lastIndex = fixed.lastIndexOf(lastChar);
        if (lastIndex !== -1) {
            fixed = fixed.substring(0, lastIndex + 1);
        }

        // 5. Remove comments
        fixed = fixed.replace(/^\s*\/\/.*$/gm, "");

        // 6. Fix trailing commas
        fixed = fixed.replace(/,\s*([\]}])/g, "$1");

        return fixed.trim();
    }

    static parse<T>(jsonStr: string, fallback: T): T {
        // Phase 1: Try Direct Parse
        try {
            return JSON.parse(jsonStr);
        } catch (e) { /* continue */ }

        // Phase 2: Clean and Parse
        let cleaned = JSONRepair.clean(jsonStr);
        try {
            return JSON.parse(cleaned);
        } catch (e) { /* continue */ }

        // Phase 3: Aggressive Repair
        try {
            const openBraces = (cleaned.match(/{/g) || []).length;
            const closeBraces = (cleaned.match(/}/g) || []).length;
            const openBrackets = (cleaned.match(/\[/g) || []).length;
            const closeBrackets = (cleaned.match(/]/g) || []).length;

            let repair = cleaned;

            if ((repair.match(/"/g) || []).length % 2 !== 0) {
                repair += '"';
            }

            for (let i = 0; i < (openBrackets - closeBrackets); i++) repair += "]";
            for (let i = 0; i < (openBraces - closeBraces); i++) repair += "}";

            return JSON.parse(repair);
        } catch (e2) {
            console.warn("JSON Critical Repair Failed. Returning Fallback.", e2);
            return fallback;
        }
    }
}

export const cleanJson = JSONRepair.clean;
export const safeParse = JSONRepair.parse;

export const deepMerge = (target: any, source: any): any => {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  const output = { ...target };

  Object.keys(source).forEach(key => {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (Array.isArray(sourceValue)) {
        if (sourceValue.length > 0) {
            output[key] = sourceValue;
        }
    } else if (typeof sourceValue === 'object' && sourceValue !== null) {
      if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue });
      } else {
          output[key] = deepMerge(targetValue, sourceValue);
      }
    } else {
      if (sourceValue !== undefined && sourceValue !== null && sourceValue !== "") {
          output[key] = sourceValue;
      }
    }
  });

  return output;
};

let appLanguage = "English";

export const setAppLanguage = (lang: string) => {
  appLanguage = lang;
};

export const getLanguageInstruction = () => {
    return appLanguage === "English" ? "" : `Translate all output to ${appLanguage}.`;
};
