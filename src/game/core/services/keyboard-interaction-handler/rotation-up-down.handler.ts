import { Vector3 } from "three";
import { RotationHandler } from "./_rotation-handler.base";

const Pi = Math.PI;

export class UpRotationHandler extends RotationHandler {
    protected _getRotationAxis(): Vector3 {
        const { axisX, axisZ, cameraDirection, angleToX, angleToZ } = this._getRotationParams();
        if (Math.min(angleToX, Pi - angleToX) > Math.min(angleToZ, Pi - angleToZ)) {
            return cameraDirection.z < 0 ? axisX.negate() : axisX;
        } else {
            return cameraDirection.x < 0 ? axisZ : axisZ.negate();
        }
    }
}

export class DownRotationHandler extends RotationHandler {
    protected _getRotationAxis(): Vector3 {
        const { axisX, axisZ, cameraDirection, angleToX, angleToZ } = this._getRotationParams();
        if (Math.min(angleToX, Pi - angleToX) > Math.min(angleToZ, Pi - angleToZ)) {
            return cameraDirection.z < 0 ? axisX : axisX.negate();
        } else {
            return cameraDirection.x > 0 ? axisZ : axisZ.negate();
        }
    }
}