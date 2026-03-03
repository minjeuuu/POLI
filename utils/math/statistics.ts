
export const mean = (arr: number[]): number => arr.reduce((a, b) => a + b, 0) / arr.length;

export const median = (arr: number[]): number => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const standardDeviation = (arr: number[]): number => {
    const m = mean(arr);
    return Math.sqrt(arr.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / (arr.length - 1));
};
