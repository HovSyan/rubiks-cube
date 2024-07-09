import { PerspectiveCamera as Camera3js, Vector3 } from 'three';
import { WindowDimensions$ } from './window-dimensions';

export class Camera {
    camera = new Camera3js(45, WindowDimensions$.value.aspect);

    constructor() {
        this.camera.position.z = 10;
        this.camera.position.y = 10;
        this.camera.up.set(0,0,1);
        
        WindowDimensions$.subscribe(({ aspect }) => this.camera.aspect = aspect);
    }
}