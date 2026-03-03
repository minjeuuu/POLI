
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export const addV3 = (a: Vector3, b: Vector3): Vector3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
export const crossV3 = (a: Vector3, b: Vector3): Vector3 => ({
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
});
export const dotV3 = (a: Vector3, b: Vector3): number => a.x * b.x + a.y * b.y + a.z * b.z;
