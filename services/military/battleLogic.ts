
import { MilitaryUnit } from "./unitDefinitions";
import { randomRange } from "../../utils/mathUtils";

export const resolveSkirmish = (attacker: MilitaryUnit, defender: MilitaryUnit): string => {
    const attackRoll = randomRange(1, 20) + attacker.attack;
    const defenseRoll = randomRange(1, 20) + defender.defense;

    if (attackRoll > defenseRoll) {
        return `Attacking ${attacker.name} overwhelms ${defender.name} (Score: ${attackRoll} vs ${defenseRoll}).`;
    } else {
        return `${defender.name} repels the assault from ${attacker.name} (Score: ${defenseRoll} vs ${attackRoll}).`;
    }
};
