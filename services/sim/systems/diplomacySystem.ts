
import { randomRange } from "../../../utils/mathUtils";

export type RelationType = 'War' | 'Hostile' | 'Neutral' | 'Friendly' | 'Alliance';

export interface DiplomaticRelation {
    nation: string;
    status: RelationType;
    opinion: number; // 0-100
}

export const generateRivals = (playerIdeology: string): DiplomaticRelation[] => {
    const nations = ["Republic of Aethelgard", "United Socialist States", "Kingdom of Vyrn", "Technocracy of Xylos"];
    return nations.map(n => ({
        nation: n,
        status: 'Neutral',
        opinion: 50
    }));
};

export const updateRelations = (relations: DiplomaticRelation[], playerAction: string): DiplomaticRelation[] => {
    return relations.map(r => {
        let change = 0;
        if (playerAction.includes("War") || playerAction.includes("Attack")) change = -20;
        if (playerAction.includes("Trade") || playerAction.includes("Aid")) change = +10;
        if (playerAction.includes("Embargo")) change = -10;
        
        const newOpinion = Math.min(100, Math.max(0, r.opinion + change + randomRange(-2, 2)));
        
        let status: RelationType = r.status;
        if (newOpinion < 10) status = 'War';
        else if (newOpinion < 30) status = 'Hostile';
        else if (newOpinion > 80) status = 'Alliance';
        else if (newOpinion > 60) status = 'Friendly';
        else status = 'Neutral';

        return { ...r, opinion: newOpinion, status };
    });
};
