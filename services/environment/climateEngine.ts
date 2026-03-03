
export const calculateEmissions = (industrialLevel: number, greenTech: number): number => {
    // Base emission 10 per industrial unit, reduced by tech
    const raw = industrialLevel * 10;
    const reduction = greenTech * 2;
    return Math.max(0, raw - reduction);
};

export const getClimateStatus = (co2: number): string => {
    if (co2 < 300) return "Stable";
    if (co2 < 450) return "Warming";
    if (co2 < 600) return "Crisis";
    return "Catastrophic";
};
