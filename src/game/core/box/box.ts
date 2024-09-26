import { BoxGeometry, Mesh, ShaderMaterial, Vector3 } from "three";
import { Edges } from "../edges";
import { createMaterial, U_ACTIVE } from "./box-material";

export class Box extends Mesh<BoxGeometry, ShaderMaterial[]> {
    set active(v: boolean) {
        if (v === this._active) return;
        this._active = v;
        this.material.forEach((m) => m.uniforms[U_ACTIVE].value = v);
    }

    get active() {
        return this._active;
    }

    private _active = false;

    constructor(position: Vector3) {
        super(new BoxGeometry(1, 1, 1), createMaterial(position))
        this.position.copy(position);
        new Edges(this);
    }
}