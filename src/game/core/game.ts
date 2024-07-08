import { Box } from "./box";
import { Scene } from "./scene";
import { Renderer } from "./renderer";
import { Camera } from "./camera";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Game {
    private _renderer: Renderer;
    private _camera = new Camera();
    private _scene = new Scene();
    private _animationFrameRequest: ReturnType<Window['requestAnimationFrame']> | undefined;

    constructor(canvas: HTMLCanvasElement) {
        this._renderer = new Renderer(canvas);
        this._createBoxes()
        new OrbitControls(this._camera.camera, canvas);
    }

    start() {
        this._render();
    }

    stop() {
        this._animationFrameRequest && cancelAnimationFrame(this._animationFrameRequest);
        this._animationFrameRequest = undefined;
    }

    private _render() {
        this._renderer.render(this._scene, this._camera);
        this._animationFrameRequest = requestAnimationFrame(() => this._render());
    }

    private _createBoxes() {
        this._scene.add(new Box())
    }
}