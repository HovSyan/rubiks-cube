import { BoxGeometry, EdgesGeometry, Intersection, LineBasicMaterial, LineSegments, Mesh, Raycaster } from "three";
import { ColorBlack } from "./colors";

export class Edges extends LineSegments<EdgesGeometry, LineBasicMaterial> {
    constructor(box: Mesh<BoxGeometry, any>) {
        super(new EdgesGeometry(box.geometry), new LineBasicMaterial({ color: ColorBlack, precision: 'highp', dithering: true, fog: false }))
        box.add(this);
    }

    raycast(raycaster: Raycaster, intersects: Intersection[]) {}
}