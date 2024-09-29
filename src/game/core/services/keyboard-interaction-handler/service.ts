import { Camera } from "../../camera";
import { Scene } from "../../scene";
import { downArrow, leftArrow, rightArrow, shiftLeftArrow, shiftRightArrow, upArrow } from "../keyboard-interaction/available-keys";
import { Key } from "../keyboard-interaction/key";
import { RotationService } from "../rotation.service";
import { KeyboardHandler } from "./_handler.base";
import { LeftRotationHandler, RightRotationHandler } from "./rotation-left-right.handler";
import { ShiftLeftRotationHandler, ShiftRightRotationHandler } from "./rotation-shift-left-shift-right.handler";
import { DownRotationHandler, UpRotationHandler } from "./rotation-up-down.handler";

export class KeyboardInteractionHandlerService {
    private _handlers = new Map<Key, KeyboardHandler>();
    private _rotationService: RotationService;

    constructor(private _camera: Camera, private _scene: Scene) {
        this._rotationService = new RotationService(this._scene);
        this._handlers.set(leftArrow, new LeftRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(rightArrow, new RightRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(upArrow, new UpRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(downArrow, new DownRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(shiftLeftArrow, new ShiftLeftRotationHandler(this._camera, this._scene, this._rotationService));
        this._handlers.set(shiftRightArrow, new ShiftRightRotationHandler(this._camera, this._scene, this._rotationService));
    }

    handleKeydown(key: Key) {
        this._handlers.get(key)?.handle(key);
    }
}