
import { generateWithRetry, safeParse, getLanguageInstruction } from "../common";
import { SimulationState } from "../../types";
import { Type } from "@google/genai";
import { calculateEconomy } from "./simEconomy";
import { resolveConflict } from "./simWarfare";

export const simulateNationTurn = async (currentState: SimulationState, action?: string): Promise<SimulationState> => {
    try {
        // 1. Deterministic Calculation Phase
        const econUpdates = calculateEconomy(currentState);
        const warUpdates = resolveConflict(currentState);

        // 2. AI Narrative Phase
        const prompt = `
        ACT AS: GENESIS, A SUPERCOMPUTER SIMULATING GLOBAL GEOPOLITICS.
        GAME MODE: NATION SIMULATOR V100.
        
        CURRENT STATE:
        Nation: ${currentState.nationName}
        Stats: Stability ${currentState.stats.stability}, Wealth ${currentState.stats.wealth}
        Action Taken: ${action || "None"}
        
        DIRECTIVES:
        1. **THINK**: Analyze the consequences of the action.
        2. **GENERATE EVENT**: Create a high-stakes event based on the new state.
        3. **CHOICES**: 3 distinct strategic paths.
        
        OUTPUT JSON SCHEMA:
        {
            "currentEvent": {
                "title": string,
                "description": string,
                "choices": [
                    { "text": string, "impact": string, "aiPrompt": string }
                ]
            }
        }
        ${getLanguageInstruction()}
        `;
        
        const res = await generateWithRetry({
            model: 'gemini-3-pro-preview',
            contents: prompt,
            config: { 
                responseMimeType: "application/json",
                thinkingConfig: { thinkingBudget: 2048 }
            }
        });
        
        const aiResult = safeParse(res.text || '{}', {}) as any;
        
        // 3. State Merge
        return {
            ...currentState,
            stats: {
                ...currentState.stats,
                wealth: econUpdates.wealth || currentState.stats.wealth,
                military: warUpdates.newMilitary
            },
            warMap: warUpdates.mapUpdate,
            currentEvent: aiResult.currentEvent,
            turn: currentState.turn + 1,
            history: [...currentState.history, `Year ${currentState.turn + 1}: ${aiResult.currentEvent?.title || "Peace"}`].slice(-10)
        };

    } catch (e) {
        console.error("Sim Engine Failure", e);
        return currentState;
    }
};
