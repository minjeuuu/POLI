
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const randomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const formatLargeNumber = (num: number): string => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
};

export const calculateGrowth = (current: number, rate: number, volatility: number = 0) => {
    const variance = (Math.random() * volatility * 2) - volatility;
    return Math.floor(current * (rate + variance));
};
