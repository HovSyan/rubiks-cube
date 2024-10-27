import { ShaderMaterial, Uniform, Vector3 } from "three";
import { GameSettings } from "../settings";
import { ColorBlack, ColorBlue, ColorGreen, ColorOrange, ColorRed, ColorWhite, ColorYellow } from "../colors";
import vertexShader from './shaders/vertex.shader.glsl';
import fragmentShader from './shaders/fragment.shader.glsl';
import { getDimensionMinMaxCoordinates } from "../utils";

const enum BoxSides {
    EAST,
    WEST,
    UP,
    DOWN,
    SOUTH,
    NORTH,
}

export const U_COLOR = 'u_color';
export const U_ACTIVE = 'u_active';

export const createMaterial = (position: Vector3) => {
    const sides = Array.from({ length: 6 }, () => new ShaderMaterial({
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        uniforms: {
            [U_COLOR]: new Uniform(ColorBlack),
            [U_ACTIVE]: new Uniform(false),
        },
        vertexShader,
        fragmentShader,
    }));
    const { min, max } = getDimensionMinMaxCoordinates(GameSettings.dimension);

    if (position.x === min) {
        sides[BoxSides.WEST].uniforms[U_COLOR].value = ColorGreen.clone().convertLinearToSRGB();
    }
    if (position.x === max) {
        sides[BoxSides.EAST].uniforms[U_COLOR].value = ColorYellow.clone().convertLinearToSRGB();
    }
    if (position.y === min) {
        sides[BoxSides.DOWN].uniforms[U_COLOR].value = ColorBlue.clone().convertLinearToSRGB();
    }
    if (position.y === max) {
        sides[BoxSides.UP].uniforms[U_COLOR].value = ColorWhite.clone().convertLinearToSRGB();
    }
    if (position.z === min) {
        sides[BoxSides.NORTH].uniforms[U_COLOR].value = ColorRed.clone().convertLinearToSRGB();
    }
    if (position.z === max) {
        sides[BoxSides.SOUTH].uniforms[U_COLOR].value = ColorOrange.clone().convertLinearToSRGB();
    }
    return sides;
}