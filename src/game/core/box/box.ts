import { BoxGeometry, Color, Mesh, Plane, Raycaster, ShaderMaterial, Vector2, Vector3 } from "three";
import { Edges } from "../edges";
import { createMaterial, U_ACTIVE, U_COLOR } from "./box-material";
import { Camera } from "../camera";
import { WindowDimensions$ } from "../window-dimensions";
import { converter_NDCToScreen } from "../utils";
import { GameSettings } from "../settings";
import { degToRad } from "three/src/math/MathUtils";

export class Box extends Mesh<BoxGeometry, ShaderMaterial[]> {
  static MINIMUM_ANGLE_TO_BE_CONSIDERED_VISIBLE = 80;
  set active(v: boolean) {
    if (v === this._active) return;
    this._active = v;
    this.material.forEach((m) => (m.uniforms[U_ACTIVE].value = v));
  }

  get active() {
    return this._active;
  }

  private _active = false;

  constructor(position: Vector3) {
    super(new BoxGeometry(1, 1, 1), createMaterial(position));
    this.position.copy(position);
    new Edges(this);
  }

  getPlanes() {
    const planes: Plane[] = []
    this.position.toArray().forEach((value, index) => {
      if (Math.abs(value) === Math.floor(GameSettings.dimension / 2)) {
        const normal = new Vector3().setComponent(index, value);
        planes.push(new Plane().setFromNormalAndCoplanarPoint(normal, this.position));
      }
    })
    return planes;
  }

  getScreenCoordinates(camera: Camera): Vector2 {
    const vector = new Vector3().copy(this.position).project(camera);
    return converter_NDCToScreen(vector);
  }

  getColors(): Color[] {
    return this.material.map(
      ({ uniforms }) => uniforms[U_COLOR].value as Color
    );
  }

  setColors(colors: Color[]): this {
    this.material.forEach((m, i) => {
      m.uniforms[U_COLOR].value = colors[i];
    });
    return this;
  }

  isVisibleFromCamera(camera: Camera) {
    for (const plane of this.getPlanes()) {
      if (plane.normal.angleTo(camera.position) < degToRad(Box.MINIMUM_ANGLE_TO_BE_CONSIDERED_VISIBLE)) {
        return true;
      }
    }
    return false;
  }

  toJSON() {
    return [
      ...this.position.toArray(),
      ...this.getColors().map((c) => c.toJSON()),
      ...this.quaternion.toJSON(),
    ];
  }
}
