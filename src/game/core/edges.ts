import { EdgesGeometry, LineSegments, MeshBasicMaterial } from "three";
import { Box } from "./box";

export class Edges {
    edge: LineSegments;

    constructor(box: Box) {
        this.edge = new LineSegments(new EdgesGeometry(box.mesh.geometry), new MeshBasicMaterial({ color: '#000' }));
        this.edge.position.copy(box.mesh.position);
    }
}