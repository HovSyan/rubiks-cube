import { PerspectiveCamera as Camera3js } from 'three';
import { WindowDimensions } from './window-dimensions';

export class Camera {
    camera = new Camera3js(45, WindowDimensions.aspect);

    constructor() {
        this.camera.position.z = 5;
    }
}