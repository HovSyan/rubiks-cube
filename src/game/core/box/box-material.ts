import { Color, MeshBasicMaterial, Vector3 } from "three";
import { GameSettings } from "../settings";
import { ColorBlue, ColorGreen, ColorOrange, ColorRed, ColorWhite, ColorYellow } from "../colors";

const enum BoxSides {
    EAST,
    WEST,
    UP,
    DOWN,
    SOUTH,
    NORTH,
}

export const createMaterial = (position: Vector3) => {
    const N = GameSettings.dimension;
    const sides = Array.from({ length: 6 }, () => new MeshBasicMaterial());
    if (position.x === -Math.floor(N / 2)) {
        sides[BoxSides.WEST].color = ColorGreen;
    }
    if (position.x === Math.floor(N / 2)) {
        sides[BoxSides.EAST].color = ColorYellow;
    }
    if (position.y === -Math.floor(N / 2)) {
        sides[BoxSides.DOWN].color = ColorBlue;
    }
    if (position.y === Math.floor(N / 2)) {
        sides[BoxSides.UP].color = ColorWhite;
    }
    if (position.z === -Math.floor(N / 2)) {
        sides[BoxSides.NORTH].color = ColorRed;
    }
    if (position.z === Math.floor(N / 2)) {
        sides[BoxSides.SOUTH].color = ColorOrange;
    }
    return sides;
}