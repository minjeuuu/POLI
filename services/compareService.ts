
import { generateWithFallback, safeParse, withCache, getLanguageInstruction } from "./common";
import { ComparisonResult } from "../types";

export const fetchComparison = async (item1: {name: string, type: string}, item2: {name: string, type: string}): Promise<ComparisonResult> => {
    // Cache key includes model version implication to invalidate old non-thinking results
    const cacheKey = `compare_poli_v1_thinking_${item1.name}_${item2.name}`;
    
    return withCache(cacheKey, async () => {
        try {
            const prompt = `
            ACT AS: A WORLD-CLASS COMPARATIVE POLITICAL SCIENTIST.
            TASK: Perform a FORENSIC, DEEP-DIVE comparison between:
            Entity A: ${item1.name} (${item1.type})
            Entity B: ${item2.name} (${item2.type})

            ${getLanguageInstruction()}

            **THINKING PROCESS**:
            - Before generating the JSON, you must THINK about the structural, historical, and economic nuances.
            - Compare their legal frameworks, power dynamics, and cultural foundations.
            - Identify non-obvious parallels (e.g., comparing Roman Senate to US Senate).

            REQUIREMENTS:
            1. **MASTER SYNTHESIS**: Academic essay comparing the two entities.
            2. **THE OMNI-MATRIX**: Comparison matrix covering Political Structure, Economy, Military, Geopolitics, Society.
            3. **SCENARIO SIMULATION**: Simulate 5 distinct futures/interactions if these entities co-existed or competed.
            4. **ADVANTAGE CALCULATION**: Determine if A or B is stronger, or if they are Equal/Distinct.

            OUTPUT SCHEMA (Strict JSON):
            {
                "item1": { "name": "${item1.name}", "type": "${item1.type}" },
                "item2": { "name": "${item2.name}", "type": "${item2.type}" },
                "synthesis": "Long-form text...",
                "sharedTraits": [{ "title": "Trait", "description": "Desc" }],
                "divergences": [{ "title": "Divergence", "description": "Desc" }],
                "matrix": [
                    { 
                        "category": "Category",
                        "item1Value": "Value A",
                        "item2Value": "Value B",
                        "analysis": "Analysis",
                        "advantage": "Item1" 
                    }
                ],
                "historicalParallels": [{ "era": "Era", "item1Context": "Ctx A", "item2Context": "Ctx B" }],
                "futureOutlook": "Detailed predictive analysis.",
                "scenarios": [{ "scenario": "Scenario", "outcome": "Outcome", "likelihood": "High" }]
            }
            `;

            const response = await generateWithFallback({ contents: prompt });
            
            return safeParse(response.text || '{}', {}) as ComparisonResult;
        } catch (e) { throw e; }
    });
};
