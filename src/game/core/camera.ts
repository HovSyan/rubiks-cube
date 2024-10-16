import { PerspectiveCamera as Camera3js } from 'three';
import { WindowDimensions$ } from './window-dimensions';
import { Subject, takeUntil } from 'rxjs';

export class Camera extends Camera3js {
    private _destroySubject = new Subject<void>();

    constructor() {
        super()
        this.position.z = 10;
        this.position.y = 10;
        this.fov = 45;

        WindowDimensions$.pipe(takeUntil(this._destroySubject)).subscribe(({ aspect }) => {
            this.aspect = aspect;
            this.updateProjectionMatrix();
        });
    }

    destroy() {
        this._destroySubject.next();
        this._destroySubject.complete();
    }
}