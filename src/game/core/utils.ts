import { Vector2, Vector3 } from "three";
import { WindowDimensions$ } from "./window-dimensions";

export const converter_screenToNDC = (v2: { x: number, y: number }): Vector2 => {
    const { width, height } = WindowDimensions$.value;
    return new Vector2((v2.x / width) * 2 - 1, - (v2.y / height) * 2 + 1);
};

export const converter_NDCToScreen = (v2: { x: number, y: number }): Vector2 => {
    const { width, height } = WindowDimensions$.value;
    return new Vector2((v2.x + 1) * width / 2, (1 - v2.y) * height / 2);
}

export const getDimensionMinMaxCoordinates = (d: number): { min: number, max: number } => {
    return { min: -(d - 1) / 2, max: (d - 1) / 2 };
}

export const roundVector = (v: Vector3): Vector3 => {
    v.x = Math.round(v.x * 10) / 10;
    v.y = Math.round(v.y * 10) / 10;
    v.z = Math.round(v.z * 10) / 10;
    return v;
}