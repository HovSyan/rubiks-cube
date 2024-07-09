import { BoxGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, Material, Mesh, MeshBasicMaterial, PlaneGeometry, ShaderMaterial, Vector3 } from "three";
import { Edges } from "./edges";
import { Scene } from "./scene";

export class Box {
    mesh: Mesh;
    edges: Edges;

    private _geometry: BoxGeometry;
    private _material: Material;

    constructor(position: Vector3) {
        this._geometry = new BoxGeometry(1, 1, 1);
        this._material = this._createMaterial();
        this.mesh = new Mesh(this._geometry, this._material);
        this.mesh.position.copy(position);
        this.edges = new Edges(this);
    }

    appendToScene(scene: Scene) {
        scene.scene.add(this.mesh);
        scene.scene.add(this.edges.edge);
    }

    private _createMaterial() {
        return new MeshBasicMaterial({
            color: '#' + Math.floor(Math.random()*16777215).toString(16)
        })
    }
}