import { WebGLRenderer } from "three";
import { WindowDimensions$ } from "./window-dimensions";
import { Subject, takeUntil } from "rxjs";

export class Renderer extends WebGLRenderer {
    private _destroySubject = new Subject<void>();

    constructor() {
        super({ antialias: true });
        this.setPixelRatio(window.devicePixelRatio);
        WindowDimensions$.pipe(takeUntil(this._destroySubject)).subscribe(({ width, height }) => this.setSize(width, height))
    }

    destroy() {
        this.dispose();
        this._destroySubject.next();
        this._destroySubject.complete();
    }
}