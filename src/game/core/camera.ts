import { PerspectiveCamera as Camera3js } from 'three';
import { WindowDimensions$ } from './window-dimensions';

export class Camera extends Camera3js {
    constructor() {
        super()
        this.position.z = 10;
        this.position.y = 10;
        this.fov = 45;

        WindowDimensions$.subscribe(({ aspect }) => {
            this.aspect = aspect;
            this.updateProjectionMatrix();
        });
    }
}