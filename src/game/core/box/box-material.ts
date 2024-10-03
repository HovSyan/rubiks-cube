import { ShaderMaterial, Uniform, Vector3 } from "three";
import { GameSettings } from "../settings";
import { ColorBlack, ColorBlue, ColorGreen, ColorOrange, ColorRed, ColorWhite, ColorYellow } from "../colors";
import vertexShader from './shaders/vertex.shader.glsl';
import fragmentShader from './shaders/fragment.shader.glsl';

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
    const N = GameSettings.dimension;
    const sides = Array.from({ length: 6 }, () => new ShaderMaterial({
        uniforms: {
            [U_COLOR]: new Uniform(ColorBlack),
            [U_ACTIVE]: new Uniform(false),
        },
        vertexShader,
        fragmentShader,
    }));

    if (position.x === -Math.floor(N / 2)) {
        sides[BoxSides.WEST].uniforms[U_COLOR].value = ColorGreen.clone().convertLinearToSRGB();
    }
    if (position.x === Math.floor(N / 2)) {
        sides[BoxSides.EAST].uniforms[U_COLOR].value = ColorYellow.clone().convertLinearToSRGB();
    }
    if (position.y === -Math.floor(N / 2)) {
        sides[BoxSides.DOWN].uniforms[U_COLOR].value = ColorBlue.clone().convertLinearToSRGB();
    }
    if (position.y === Math.floor(N / 2)) {
        sides[BoxSides.UP].uniforms[U_COLOR].value = ColorWhite.clone().convertLinearToSRGB();
    }
    if (position.z === -Math.floor(N / 2)) {
        sides[BoxSides.NORTH].uniforms[U_COLOR].value = ColorRed.clone().convertLinearToSRGB();
    }
    if (position.z === Math.floor(N / 2)) {
        sides[BoxSides.SOUTH].uniforms[U_COLOR].value = ColorOrange.clone().convertLinearToSRGB();
    }
    return sides;
}