
export type Matrix2x2 = [[number, number], [number, number]];

export const det2x2 = (m: Matrix2x2): number => m[0][0] * m[1][1] - m[0][1] * m[1][0];

export const inv2x2 = (m: Matrix2x2): Matrix2x2 | null => {
    const d = det2x2(m);
    if (d === 0) return null;
    const invD = 1 / d;
    return [
        [m[1][1] * invD, -m[0][1] * invD],
        [-m[1][0] * invD, m[0][0] * invD]
    ];
};
