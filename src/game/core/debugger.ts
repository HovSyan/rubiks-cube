import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Scene } from "./scene";
import { AxesHelper } from "three";

export class Debugger {
    private _axesHelper: AxesHelper | null = null;
    private _previousAutoRotate: boolean | null = null;
    private _started = false;

    constructor(private _scene: Scene, private _orbitControls: OrbitControls) {}

    start(): this {
        if (this._started) return this;

        this._axesHelper = new AxesHelper(15);
        this._previousAutoRotate = this._orbitControls.autoRotate;
        this._orbitControls.autoRotate = false;
        this._scene.add(this._axesHelper);
        this._started = true;
        return this;
    }

    stop(): this {
        if (!this._started) return this;

        this._scene.remove(this._axesHelper!);
        this._orbitControls.autoRotate = this._previousAutoRotate!;
        this._cleanup();
        this._started = false;
        return this;
    }

    destroy() {
        this._cleanup();
    }

    private _cleanup() {
        this._axesHelper?.dispose();

        this._axesHelper = this._previousAutoRotate = null;
    }
}