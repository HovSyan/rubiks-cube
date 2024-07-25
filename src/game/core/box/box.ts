import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { Edges } from "../edges";
import { Scene } from "../scene";
import { createMaterial } from "./box-material";

export class Box extends Mesh<BoxGeometry, MeshBasicMaterial[]> {
    edges: Edges;

    set active(v: boolean) {
        if (v === this._active) return;
        this._active = v;
        console.log(this.uuid, this._active);
    }

    get active() {
        return this._active;
    }

    private _active = false;

    constructor(position: Vector3) {
        super(new BoxGeometry(1, 1, 1), createMaterial(position))
        this.position.copy(position);
        this.edges = new Edges(this);
    }

    appendToScene(scene: Scene) {
        scene.add(this, this.edges);
    }
}