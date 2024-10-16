import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  pairwise,
  startWith,
  Subject,
  takeUntil,
} from "rxjs";
import { Camera } from "../camera";
import { Scene } from "../scene";
import { PointerInteractionService } from "./pointer-interaction.service";
import { Box } from "../box";
import { Key, KeyboardInteractionService } from "./keyboard-interaction";

export class GameEventsService {
  onPointerOver: Observable<Box>;
  onPointerLeave: Observable<Box>;
  onKeydown: Observable<Key>;

  private _pointerInteractionService: PointerInteractionService;
  private _keyboardInteractionService = new KeyboardInteractionService();
  private _destroySubject = new Subject<void>();

  constructor(camera: Camera, scene: Scene) {
    this._pointerInteractionService = new PointerInteractionService(
      camera,
      scene
    );
    this.onPointerLeave = this._pointerInteractionService.hoveredObject$.pipe(
      map((o) => (o instanceof Box ? o : null)),
      startWith(null),
      pairwise(),
      filter(([prev, current]) => !!prev && prev !== current),
      map(([prev]) => prev!),
      takeUntil(this._destroySubject),
    );
    this.onPointerOver = this._pointerInteractionService.hoveredObject$.pipe(
      map((o) => (o instanceof Box ? o : null)),
      distinctUntilChanged(),
      filter((o) => !!o),
      takeUntil(this._destroySubject),
    );
    this.onKeydown = this._keyboardInteractionService.onKeydown.pipe(takeUntil(this._destroySubject));
  }

  update() {
    this._pointerInteractionService.update();
  }

  destroy() {
    this._destroySubject.next();
    this._destroySubject.complete();
    this._keyboardInteractionService.destroy();
    this._pointerInteractionService.destroy();
  }
}
