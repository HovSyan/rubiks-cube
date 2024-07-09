import { Box } from "./box";
import { Scene } from "./scene";
import { Renderer } from "./renderer";
import { Camera } from "./camera";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from "three";

export class Game {
    private _renderer: Renderer;
    private _camera = new Camera();
    private _scene = new Scene();
    private _orbitControls: OrbitControls;
    private _animationFrameRequest: ReturnType<Window['requestAnimationFrame']> | undefined;

    constructor(canvas: HTMLCanvasElement, gameDimensions = 3) {
        this._renderer = new Renderer(canvas);
        this._createBoxes(gameDimensions)
        this._orbitControls = new OrbitControls(this._camera.camera, canvas);
        this._orbitControls.autoRotate = true;
    }

    start(): this {
        this._render();
        this._orbitControls.enabled = true;
        return this;
    }

    stop(): this {
        this._animationFrameRequest && cancelAnimationFrame(this._animationFrameRequest);
        this._animationFrameRequest = undefined;
        this._orbitControls.enabled = false;
        return this;
    }

    private _render() {
        this._renderer.render(this._scene, this._camera);
        this._orbitControls.update();
        this._animationFrameRequest = requestAnimationFrame(() => this._render());
    }

    private _createBoxes(N: number) {
        const boxes = [] as Box[];
        for(let i = 0; i < N; i++) {
            for(let j = 0; j < N; j++) {
                for(let k = 0; k < N; k++) {
                    boxes.push(new Box(new Vector3(i - Math.floor(N / 2), j - Math.floor(N / 2), k - Math.floor(N / 2))))
                }
            }
        }
        boxes.forEach((b) => b.appendToScene(this._scene));
    }
}