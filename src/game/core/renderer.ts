import { WebGLRenderer } from "three";
import { Scene } from "./scene";
import { Camera } from "./camera";
import { WindowDimensions$ } from "./window-dimensions";

export class Renderer {
    private _renderer: WebGLRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this._renderer = new WebGLRenderer({ canvas });
        WindowDimensions$.subscribe(({ width, height }) => this._setSize(width, height))
    }

    render(scene: Scene, camera: Camera) {
        this._renderer.render(scene.scene, camera.camera);
    }

    private _setSize(width: number, height: number) {
        this._renderer.setSize(width, height);
    }
}