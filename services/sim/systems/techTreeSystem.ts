
import { SimulationState } from "../../../types";
import { TECH_TREE } from "../../../data/sim/technologies";

export const canResearch = (techId: string, state: any): boolean => {
    const tech = TECH_TREE.find(t => t.id === techId);
    if (!tech) return false;
    if (state.stats.wealth < tech.cost) return false;
    if (tech.prereq && !state.technologies?.includes(tech.prereq)) return false;
    return true;
};

export const researchTech = (techId: string, state: any): any => {
    const tech = TECH_TREE.find(t => t.id === techId);
    if (!tech || !canResearch(techId, state)) return state;

    return {
        ...state,
        stats: {
            ...state.stats,
            wealth: state.stats.wealth - tech.cost
        },
        technologies: [...(state.technologies || []), techId],
        history: [...state.history, `Researched ${tech.name}`]
    };
};
