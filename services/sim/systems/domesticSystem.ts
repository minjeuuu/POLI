
import { clamp } from "../../../utils/mathUtils";

export const calculateStability = (current: number, liberty: number, wealth: number): number => {
    // Basic logic: Wealth buys stability, but low Liberty hurts it eventually
    let change = 0;
    
    if (wealth > 60) change += 1;
    if (wealth < 30) change -= 2;
    
    if (liberty > 70) change += 1;
    if (liberty < 20) change -= 1; // Unrest
    
    // Random fluctuation
    if (Math.random() > 0.8) change += (Math.random() > 0.5 ? 2 : -2);

    return clamp(current + change, 0, 100);
};

export const checkForRebellion = (stability: number, military: number): boolean => {
    // Low stability + weak military = High chance
    if (stability < 20 && military < 40) return Math.random() > 0.7;
    if (stability < 10) return Math.random() > 0.5;
    return false;
};
