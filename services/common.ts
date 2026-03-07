
import { generateWithClaude } from "./claudeService";

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
 * High-Availability Wrapper — Claude is the sole AI provider.
 * All requests route through /api/ai/generate in the browser (key stays server-side)
 * or call Anthropic directly on the server.
 */
export const generateWithFallback = async (params: any, _fallbackModel?: string): Promise<{ text: string }> => {
    const prompt = typeof params.contents === 'string' ? params.contents : JSON.stringify(params.contents);

    const claudeResponse = await generateWithClaude(prompt);
    if (claudeResponse) return { text: claudeResponse };

    console.error("POLI: Claude unavailable. Check CLAUDE_API_KEY environment variable.");
    return { text: '{}' };
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
