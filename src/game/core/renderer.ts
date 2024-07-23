import { WebGLRenderer } from "three";
import { WindowDimensions$ } from "./window-dimensions";

export class Renderer extends WebGLRenderer {
    constructor() {
        super({ antialias: true });
        this.setPixelRatio(window.devicePixelRatio);
        WindowDimensions$.subscribe(({ width, height }) => this.setSize(width, height))
    }
}