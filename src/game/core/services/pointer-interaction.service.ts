import { combineLatest, fromEvent, map, merge, Observable, share, startWith, Subject, tap } from "rxjs";
import { Object3D, Raycaster, Vector2 } from "three";
import { Camera } from "../camera";
import { WindowDimensions$ } from "../window-dimensions";
import { Scene } from "../scene";

export class PointerInteractionService {
    hoveredObject$: Observable<Object3D | undefined>;
    hoveredObjects$: Observable<Array<Object3D | undefined>>;

    private _raycaster = new Raycaster();
    private _mousePos$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(
        startWith({ x: 0, y: 0 }), 
        map(({ x, y }) => new Vector2(x, y))
    );
    private _updateSubject = new Subject<void>();

    constructor(private _camera: Camera, private _scene: Scene) {
        const prepareRaycaster$ = combineLatest([this._mousePos$, this._updateSubject]).pipe(
            map(([position]) => this._toNDC(position)),
            map((ndc) => this._raycaster.setFromCamera(ndc, this._camera)),
        )
        this.hoveredObject$ = prepareRaycaster$.pipe(
            map(() => this._raycaster.intersectObject(this._scene)[0]?.object),
            share() 
        )
        this.hoveredObjects$ = prepareRaycaster$.pipe(
            map(() => this._raycaster.intersectObjects(this._scene.children).map((i) => i?.object)),
            share()
        );
    }

    update() {
        this._updateSubject.next();
    }

    private _toNDC(position: Vector2) {
        const { width, height } = WindowDimensions$.value;
        return new Vector2((position.x / width) * 2 - 1, - (position.y / height) * 2 + 1);
    }
}