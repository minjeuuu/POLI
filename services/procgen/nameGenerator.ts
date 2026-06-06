
import { randomRange } from "../../utils/mathUtils";

const PREFIXES = ["New", "North", "South", "Great", "United", "Democratic", "People's", "Royal"];
const ROOTS = ["Land", "Vania", "Ria", "Stan", "Dor", "Ggard", "Thal", "Um", "Ia", "Opolis"];
const SYLLABLES = ["Bar", "Car", "Den", "For", "Gan", "Hul", "Jen", "Kin", "Lor", "Mar", "Nor", "Pen", "Rin", "Sun", "Tor", "Ven", "Win", "Xan", "Zor"];

export const generateNationName = (): string => {
    const usePrefix = Math.random() > 0.7;
    const syllCount = randomRange(2, 3);
    let name = "";
    for(let i=0; i<syllCount; i++) {
        name += SYLLABLES[randomRange(0, SYLLABLES.length - 1)];
    }
    name += ROOTS[randomRange(0, ROOTS.length - 1)];
    
    if (usePrefix) {
        return `${PREFIXES[randomRange(0, PREFIXES.length - 1)]} ${name}`;
    }
    return name;
};
