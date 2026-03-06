
import { generateWithFallback, safeParse, getLanguageInstruction } from "./common";
import { SimulationState } from "../types";

/**
 * GENESIS: GEOPOLITICAL SIMULATION ENGINE
 * Handles state transitions for the Nation Simulator.
 * UPGRADE: Now utilizes 'Thinking' models for deep strategic calculation.
 */
export const simulateNationTurn = async (currentState: SimulationState, action?: string): Promise<SimulationState> => {
    try {
        const prompt = `
        ACT AS: GENESIS, A SUPERCOMPUTER SIMULATING GLOBAL GEOPOLITICS.
        GAME MODE: NATION SIMULATOR v10000 (WAR, TRADE, & DIPLOMACY).
        
        CURRENT STATE:
        Nation: ${currentState.nationName}
        Leader: ${currentState.leaderName}
        Ideology: ${currentState.ideology}
        Stats: 
          - Stability: ${currentState.stats.stability}
          - Wealth: ${currentState.stats.wealth}
          - Military: ${currentState.stats.military}
          - Liberty: ${currentState.stats.liberty}
        History Log: ${currentState.history.slice(-3).join(' -> ')}
        
        PLAYER ACTION: ${action || "INITIALIZE SIMULATION"}
        
        DIRECTIVES:
        1. **THINK FIRST**: Use your thinking budget to analyze second and third-order consequences of the player's action.
           - Example: If they suppress protests, Stability gains short term but Liberty falls, potentially triggering a rebellion event later.
        2. **ADVANCE TIME**: Move the timeline forward by one epoch (1 year).
        3. **GENERATE EVENT**: Create a complex, high-stakes event based on the new state.
           - Types: War (Invasion, Border Skirmish), Trade (Embargo, Monopoly), Domestic (Protest, Coup, Discovery), Diplomatic (Alliance, Sanction).
        4. **STRATEGIC CHOICES**: Provide 3 distinct paths.
           - Choices must be ideologically consistent options.
           - AI Prompt: The hidden instruction for the next turn if this choice is selected.
        
        5. **VISUALIZATION DATA**:
           - **WarMap**: A 5x5 Grid string (25 characters including newlines).
             - '0': Empty Territory.
             - '1': Enemy Forces.
             - '2': Player Territory.
             - '3': Ally/Neutral.
             - 'X': Conflict Zone.
           - **MarketShare**: Integer (0-100).

        OUTPUT JSON SCHEMA:
        {
            "turn": integer,
            "nationName": string,
            "leaderName": string,
            "ideology": string,
            "stats": { "stability": number, "wealth": number, "military": number, "liberty": number },
            "history": [string],
            "currentEvent": {
                "title": string,
                "description": string,
                "choices": [
                    { "text": string, "impact": string, "aiPrompt": string }
                ]
            },
            "warMap": string,
            "marketShare": number
        }
        
        ${getLanguageInstruction()}
        `;
        
        const res = await generateWithFallback({ contents: prompt });
        
        const result = safeParse(res.text || '{}', currentState) as any;
        
        return {
            ...currentState,
            ...result,
            turn: (currentState.turn || 0) + 1,
            history: [...currentState.history, result.currentEvent?.title ? `Year ${currentState.turn + 1}: ${result.currentEvent.title}` : `Year ${currentState.turn + 1}: Event`].slice(-10),
            warMap: result.warMap || "00000\n00000\n00200\n00000\n00000",
            marketShare: result.marketShare || currentState.marketShare || 10
        };
    } catch (e) {
        console.error("Simulation Error", e);
        return currentState;
    }
};
