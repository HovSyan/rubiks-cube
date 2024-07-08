import { WebGLRenderer } from "three";
import { Scene } from "./scene";
import { WindowDimensions } from "./window-dimensions";
import { Camera } from "./camera";

export class Renderer {
    private _renderer: WebGLRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this._renderer = new WebGLRenderer({ canvas });
        this._renderer.setSize(WindowDimensions.width, WindowDimensions.height);
    }

    render(scene: Scene, camera: Camera) {
        this._renderer.render(scene.scene, camera.camera);
    }
}