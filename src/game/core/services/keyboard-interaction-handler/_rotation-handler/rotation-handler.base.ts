import { Plane, Vector3 } from "three";
import { Camera } from "../../../camera";
import { Scene } from "../../../scene";
import { RotationService } from "../../rotation.service";
import { KeyboardHandler } from "../_handler.base";
import { GameInnerEventsService } from "../../inner-events";
import { take } from "rxjs";

export abstract class RotationHandler extends KeyboardHandler {
    constructor(protected camera: Camera, protected scene: Scene, protected rotationService: RotationService) {
        super(scene);
    }

    handle(): void {
        const activeBox = this.scene.getActiveBox();

        if (!activeBox) return;

        const activeBoxPosition = new Vector3().copy(activeBox.position);
        const rotationAxis = this._getRotationAxis();
        const rotationPlane = new Plane().setFromNormalAndCoplanarPoint(rotationAxis, activeBox.position)
        const boxesToRotate = this.scene.getBoxesOnPlane(rotationPlane);
        this.rotationService.rotateBoxes(boxesToRotate, rotationAxis);
        GameInnerEventsService.getInstance().listen('BOXES_ROTATED').pipe(take(1)).subscribe(() => {
            const nextActiveBox = boxesToRotate.find((b) => b.position.equals(activeBoxPosition));
            nextActiveBox && this.scene.setActiveBox(nextActiveBox);
        })
    }

    protected _getRotationParams() {
        const axisX = new Vector3(1, 0, 0);
        const axisZ = new Vector3(0, 0, 1);
        const axisY = new Vector3(0, 0, 1);
        const cameraDirection = new Vector3().copy(this.camera.position).negate();
        const angleToX = cameraDirection.angleTo(axisX);
        const angleToY = cameraDirection.angleTo(axisY);
        const angleToZ = cameraDirection.angleTo(axisZ);
        return { axisX, axisZ, axisY, angleToX, angleToY, angleToZ, cameraDirection }
    }

    protected abstract _getRotationAxis(): Vector3;
}