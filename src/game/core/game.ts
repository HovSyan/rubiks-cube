import { Box } from "./box/box";
import { Scene } from "./scene";
import { Renderer } from "./renderer";
import { Camera } from "./camera";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";
import { Debugger } from "./debugger";
import { GameSettings, IGameSettings } from "./settings";
import { GameEventsService } from "./services";
import { KeyboardInteractionHandlerService } from "./services/keyboard-interaction-handler/service";
import { SAVE_SLOTS, SaveService } from "./services/save.service";

export class Game {
  private _renderer: Renderer;
  private _camera = new Camera();
  private _scene = new Scene();
  private _eventsService = new GameEventsService(this._camera, this._scene);
  private _keyboardHandlerService = new KeyboardInteractionHandlerService(
    this._camera,
    this._scene
  );
  private _saveService = new SaveService(this._scene);
  private _debugger: Debugger | null = null;
  private _orbitControls: OrbitControls;

  get canvas() {
    return this._renderer.domElement;
  }

  constructor(settings: Partial<IGameSettings> = {}) {
    Object.assign(GameSettings, settings);
    this._renderer = new Renderer();
    this._orbitControls = new OrbitControls(this._camera, this.canvas);
    this._orbitControls.autoRotate = GameSettings.autoRotate;
    this._eventsService.onPointerOver.subscribe((o) =>
      this._scene.setActiveBox(o)
    );
    this._eventsService.onPointerLeave.subscribe((o) =>
      this._scene.removeActiveBox(o)
    );
    this._eventsService.onKeydown.subscribe((key) =>
      this._keyboardHandlerService.handleKeydown(key)
    );
    this._createBoxes();
    (window as any).start = () => this.start();
    (window as any).stop = () => this.stop();
    (window as any).debug = () => this.debug();
  }

  debug() {
    return (
      this._debugger ||
      (this._debugger = new Debugger(this._scene, this._orbitControls).start())
    );
  }

  start(): this {
    this._orbitControls.enabled = true;
    this._renderer.setAnimationLoop(() => this._render());
    return this;
  }

  stop(): this {
    this._renderer.setAnimationLoop(null);
    this._orbitControls.enabled = false;
    return this;
  }

  loadGame(savedSlot: SAVE_SLOTS) {
    this._saveService.loadSave(savedSlot);
  }

  private _render() {
    this._renderer.render(this._scene, this._camera);
    this._eventsService.update();
    this._orbitControls.update();
  }

  private _createBoxes() {
    const N = GameSettings.dimension;
    const from = -Math.floor(N / 2);
    const to = Math.floor(N / 2);
    for (let i = from; i <= to; i++) {
      for (let j = from; j <= to; j++) {
        for (let k = from; k <= to; k++) {
          this._scene.add(new Box(new Vector3(i, j, k)));
        }
      }
    }
  }
}
