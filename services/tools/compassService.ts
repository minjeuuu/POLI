
// Simple heuristic scorer for plotting ideologies

export const calculateCoordinates = (answers: number[]): { x: number, y: number } => {
    // Mock logic: sums economic and social scores
    // answers is array of -1 (Disagree) to 1 (Agree)
    
    // Econ questions at even indices, Social at odd
    let econScore = 0;
    let socialScore = 0;
    
    answers.forEach((ans, i) => {
        if (i % 2 === 0) econScore += ans;
        else socialScore += ans;
    });

    // Normalize to -10 to 10 range based on hypothetical 10 questions total (5 each)
    return {
        x: Math.min(10, Math.max(-10, econScore * 2)),
        y: Math.min(10, Math.max(-10, socialScore * 2))
    };
};
