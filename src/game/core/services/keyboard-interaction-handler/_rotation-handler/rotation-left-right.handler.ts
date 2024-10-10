import { Vector3 } from "three";
import { RotationHandler } from "./rotation-handler.base";

export class LeftRotationHandler extends RotationHandler {
    protected _getRotationAxis(): Vector3 {
        return new Vector3(0, -1, 0);
    }
}

export class RightRotationHandler extends RotationHandler {
    protected _getRotationAxis(): Vector3 {
        return new Vector3(0, 1, 0);
    }
}