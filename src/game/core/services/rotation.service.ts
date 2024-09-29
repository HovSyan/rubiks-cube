import { Object3D, Vector3 } from "three";
import { Box } from "../box";
import { Scene } from "../scene";
import { RotationAnimation } from "./animation";

export class RotationService {
  private _animation: RotationAnimation | null = null;

  constructor(private _scene: Scene) {}

  rotateBoxes(boxes: Box[], axis: Vector3) {
    if (this._animation?.isActive) {
      return;
    }

    const origin = new Object3D();

    this._animation = new RotationAnimation(origin, axis, {
      onStart: () => {
        boxes.forEach((b) => origin.attach(b));
        this._scene.add(origin);
      },
      onComplete: () => {
        [...origin.children].forEach((box) => {
          this._scene.attach(box);
          box.position.round();
        });
        this._scene.remove(origin);
      }
    }).start()
  }
}
