import { EdgesGeometry, Intersection, LineBasicMaterial, LineSegments, MeshBasicMaterial, Raycaster } from "three";
import { Box } from "./box/box";

export class Edges extends LineSegments {
    constructor(box: Box) {
        super(new EdgesGeometry(box.geometry), new LineBasicMaterial({ color: '#000' }))
        this.position.copy(box.position);
    }

    raycast(raycaster: Raycaster, intersects: Intersection[]): void {
        return;
    }
}