import { EdgesGeometry, Intersection, LineBasicMaterial, LineSegments, MeshBasicMaterial, Raycaster } from "three";
import { Box } from "./box/box";
import { ColorBlack } from "./colors";

export class Edges extends LineSegments {
    constructor(box: Box) {
        super(new EdgesGeometry(box.geometry), new LineBasicMaterial({ color: ColorBlack, precision: 'highp', dithering: true, fog: false }))
        this.position.copy(box.position);
    }

    raycast(raycaster: Raycaster, intersects: Intersection[]): void {
        return;
    }
}