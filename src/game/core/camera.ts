import { PerspectiveCamera as Camera3js, Vector3 } from 'three';
import { WindowDimensions$ } from './window-dimensions';
import { Subject, takeUntil } from 'rxjs';
import { GameInnerEventsService } from './services/inner-events';
import { Scene } from './scene';

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

        GameInnerEventsService.getInstance().listen('BOXES_SET')
            .pipe(takeUntil(this._destroySubject))
            .subscribe(({ data }) => {
                const scene = data as Scene;
                const initialPosition = new Vector3().copy(this.position)
                let scalar = 1;

                const checkAndZoomOut = () => {
                    if (!scene.allBoxesAreInViewport(this)) {
                        this.position.copy(new Vector3().copy(initialPosition).multiplyScalar(scalar));
                        scalar += .1
                        requestAnimationFrame(checkAndZoomOut);
                    }
                }
                checkAndZoomOut();
            })
    }

    destroy() {
        this._destroySubject.next();
        this._destroySubject.complete();
    }
}