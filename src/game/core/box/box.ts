import {
  BoxGeometry,
  Color,
  Mesh,
  Plane,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { Edges } from "../edges";
import { createMaterial, U_ACTIVE, U_COLOR } from "./box-material";
import { Camera } from "../camera";
import { WindowDimensions$ } from "../window-dimensions";
import { converter_NDCToScreen, getDimensionMinMaxCoordinates } from "../utils";
import { GameSettings } from "../settings";
import { degToRad } from "three/src/math/MathUtils";

export class Box extends Mesh<BoxGeometry, ShaderMaterial[]> {
  static MINIMUM_ANGLE_TO_BE_CONSIDERED_VISIBLE = 80;
  set active(v: boolean) {
    if (v === this._active) return;
    this._active = v;
    this.material.forEach((m) => (m.uniforms[U_ACTIVE].value = v));
    this._edges.active = v;
  }

  get active() {
    return this._active;
  }

  private _active = false;
  private _edges: Edges;

  constructor(position: Vector3) {
    super(new BoxGeometry(1, 1, 1), createMaterial(position));
    this.position.copy(position);
    this._edges = new Edges(this);
  }

  getPlanes() {
    const planes: Plane[] = [];
    const { min, max } = getDimensionMinMaxCoordinates(GameSettings.dimension);
    this.position.toArray().forEach((value, index) => {
      if (value === min || value === max) {
        const normal = new Vector3().setComponent(index, value);
        planes.push(
          new Plane().setFromNormalAndCoplanarPoint(normal, this.position)
        );
      }
    });
    return planes;
  }

  getScreenCoordinates(camera: Camera): Vector2 {
    const vector = new Vector3().copy(this.position).project(camera);
    return converter_NDCToScreen(vector);
  }

  isInViewport(camera: Camera, padding: number) {
    const viewport = WindowDimensions$.value;
    const screen = this.getScreenCoordinates(camera);
    return (
      0 + padding < screen.x &&
      screen.x < viewport.width - padding &&
      0 + padding < screen.y &&
      screen.y < viewport.height - padding
    );
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
      if (
        plane.normal.angleTo(camera.position) <
        degToRad(Box.MINIMUM_ANGLE_TO_BE_CONSIDERED_VISIBLE)
      ) {
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
