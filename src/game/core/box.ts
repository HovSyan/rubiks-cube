import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export class Box {
    mesh: Mesh;

    private _geometry: BoxGeometry;
    private _material = new MeshBasicMaterial({ color: '#' + Math.floor(Math.random()*16777215).toString(16) });

    constructor() {
        this._geometry = new BoxGeometry(1, 1, 1);
        this.mesh = new Mesh(this._geometry, this._material);
    }
}