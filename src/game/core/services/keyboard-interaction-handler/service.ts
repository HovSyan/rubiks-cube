import { Camera } from "../../camera";
import { Scene } from "../../scene";
import { A, D, downArrow, leftArrow, rightArrow, S, shiftLeftArrow, shiftRightArrow, upArrow, W } from "../keyboard-interaction/available-keys";
import { Key } from "../keyboard-interaction/key";
import { RotationService } from "../rotation.service";
import { IKeyboardHandler } from "./_handler.base";
import { NavigationAHandler, NavigationDHandler, NavigationSHandler, NavigationWHandler } from "./_navigation-handler";
import { DownRotationHandler, LeftRotationHandler, RightRotationHandler, ShiftLeftRotationHandler, ShiftRightRotationHandler, UpRotationHandler } from "./_rotation-handler";

export class KeyboardInteractionHandlerService {
    private _handlers = new Map<Key, IKeyboardHandler>();
    private _rotationService: RotationService;

    constructor(private _camera: Camera, private _scene: Scene) {
        this._rotationService = new RotationService(this._scene);
        this._setRotationHandlers();
        this._setNavigationHandlers();
    }

    handleKeydown(key: Key) {
        this._handlers.get(key)?.handle(key);
    }

    private _setRotationHandlers() {
        this._handlers.set(leftArrow, new LeftRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(rightArrow, new RightRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(upArrow, new UpRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(downArrow, new DownRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(shiftLeftArrow, new ShiftLeftRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(shiftRightArrow, new ShiftRightRotationHandler(this._camera, this._scene, this._rotationService));
    }

    private _setNavigationHandlers() {
        this._handlers.set(W, new NavigationWHandler(this._camera, this._scene));
        this._handlers.set(A, new NavigationAHandler(this._camera, this._scene));
        this._handlers.set(S, new NavigationSHandler(this._camera, this._scene));
        this._handlers.set(D, new NavigationDHandler(this._camera, this._scene));
    }
}