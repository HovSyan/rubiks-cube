import { Object3D, Quaternion, Vector3 } from "three";
import { Box } from "../box";
import gsap from "gsap";
import { Scene } from "../scene";

export class RotationService {
  constructor(private _scene: Scene) {}

  rotateBoxes(boxes: Box[], axis: Vector3) {
    const origin = new Object3D();

    boxes.forEach((b) => origin.attach(b));
    this._scene.add(origin);

    const g = gsap
      .fromTo({}, {}, { duration: 0.5 })
      .eventCallback("onUpdate", () => {
        origin.quaternion.slerpQuaternions(
          new Quaternion(),
          new Quaternion().setFromAxisAngle(axis, Math.PI / 2),
          g.progress()
        );
      })
      .eventCallback("onComplete", () => {
        boxes.forEach((b) => {
          this._scene.attach(b);
          b.position.round();
        });
        this._scene.remove(origin);
      });
  }
}
