import { BoxGeometry, Color, Mesh, ShaderMaterial, Vector3 } from "three";
import { Edges } from "../edges";
import { createMaterial, U_ACTIVE, U_COLOR } from "./box-material";

export class Box extends Mesh<BoxGeometry, ShaderMaterial[]> {
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

  toJSON() {
    return [
      ...this.position.toArray(),
      ...this.getColors().map((c) => c.toJSON()),
      ...this.quaternion.toJSON(),
    ];
  }
}
