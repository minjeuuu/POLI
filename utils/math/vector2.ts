
export interface Vector2 {
    x: number;
    y: number;
}

export const addV2 = (a: Vector2, b: Vector2): Vector2 => ({ x: a.x + b.x, y: a.y + b.y });
export const subV2 = (a: Vector2, b: Vector2): Vector2 => ({ x: a.x - b.x, y: a.y - b.y });
export const multV2 = (v: Vector2, s: number): Vector2 => ({ x: v.x * s, y: v.y * s });
export const magV2 = (v: Vector2): number => Math.sqrt(v.x * v.x + v.y * v.y);
export const distV2 = (a: Vector2, b: Vector2): number => magV2(subV2(a, b));
export const normV2 = (v: Vector2): Vector2 => {
    const m = magV2(v);
    return m === 0 ? { x: 0, y: 0 } : multV2(v, 1 / m);
};
