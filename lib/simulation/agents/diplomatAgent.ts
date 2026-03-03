
import { BaseAgent } from "./baseAgent";

export class DiplomatAgent extends BaseAgent {
    diplomaticSkill: number;
    loyalty: number;

    constructor(id: string, skill: number) {
        super(id, 'Diplomat');
        this.diplomaticSkill = skill;
        this.loyalty = 100;
    }

    negotiate(difficulty: number): boolean {
        const roll = Math.random() * 100;
        return (roll + this.diplomaticSkill) > difficulty;
    }
}
