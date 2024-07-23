import { BoxGeometry, Color, EdgesGeometry, LineBasicMaterial, LineSegments, Material, Mesh, MeshBasicMaterial, PlaneGeometry, ShaderMaterial, Vector3 } from "three";
import { Edges } from "../edges";
import { Scene } from "../scene";
import { GameSettings } from "../settings";
import { createMaterial } from "./box-material";



export class Box extends Mesh<BoxGeometry, MeshBasicMaterial[]> {
    edges: Edges;

    constructor(position: Vector3) {
        super(new BoxGeometry(1, 1, 1), createMaterial(position))
        this.position.copy(position);
        this.edges = new Edges(this);
    }

    appendToScene(scene: Scene) {
        scene.add(this, this.edges);
    }
}