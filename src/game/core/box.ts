import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";

export class Box {
    mesh: Mesh;

    private _geometry: BoxGeometry;
    private _material = new MeshBasicMaterial({ color: '#' + Math.floor(Math.random()*16777215).toString(16) });

    constructor(position: Vector3) {
        this._geometry = new BoxGeometry(1, 1, 1);
        this.mesh = new Mesh(this._geometry, this._material);
        this.mesh.position.copy(position);
    }
}