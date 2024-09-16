import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  pairwise,
  startWith,
} from "rxjs";
import { Camera } from "../camera";
import { Scene } from "../scene";
import { PointerInteractionService } from "./pointer-interaction.service";
import { Box } from "../box";
import { AvailableKeys, KeyboardInteractionService } from "./keyboard-interaction.service";

export class GameEventsService {
  onPointerOver: Observable<Box>;
  onPointerLeave: Observable<Box>;
  onKeydown: Observable<typeof AvailableKeys[keyof typeof AvailableKeys]>;

  private _pointerInteractionService: PointerInteractionService;
  private _keyboardInteractionService = new KeyboardInteractionService();

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
      map(([prev]) => prev!)
    );
    this.onPointerOver = this._pointerInteractionService.hoveredObject$.pipe(
      map((o) => (o instanceof Box ? o : null)),
      distinctUntilChanged(),
      filter((o) => !!o)
    );
    this.onKeydown = this._keyboardInteractionService.onKeydown;
  }

  update() {
    this._pointerInteractionService.update();
  }
}
