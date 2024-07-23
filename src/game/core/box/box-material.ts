import { Color, MeshBasicMaterial, Vector3 } from "three";
import { GameSettings } from "../settings";

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
        sides[BoxSides.WEST].color = new Color('green');
    }
    if (position.x === Math.floor(N / 2)) {
        sides[BoxSides.EAST].color = new Color('red');
    }
    if (position.y === -Math.floor(N / 2)) {
        sides[BoxSides.DOWN].color = new Color('blue');
    }
    if (position.y === Math.floor(N / 2)) {
        sides[BoxSides.UP].color = new Color('pink');
    }
    if (position.z === -Math.floor(N / 2)) {
        sides[BoxSides.NORTH].color = new Color('purple');
    }
    if (position.z === Math.floor(N / 2)) {
        sides[BoxSides.SOUTH].color = new Color('grey');
    }
    return sides;
}