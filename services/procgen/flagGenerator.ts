
const COLORS = ["Red", "Blue", "Green", "White", "Black", "Gold", "Silver"];
const SYMBOLS = ["Star", "Eagle", "Lion", "Sun", "Moon", "Cross", "Crescent", "Hammer", "Tree"];
const PATTERNS = ["Tricolor", "Bicolor", "Cross", "Saltire", "Canton", "Solid"];

export const generateFlagDescription = (): string => {
    const color1 = COLORS[Math.floor(Math.random() * COLORS.length)];
    const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    
    return `A ${pattern} of ${color1} and ${color2}, charged with a ${symbol} in the center.`;
};
