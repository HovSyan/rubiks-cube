import { BoxGeometry, EdgesGeometry, Intersection, Mesh, MultiplyBlending, Raycaster } from "three";
import { ColorBlack } from "./colors";
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";

export class Edges extends LineSegments2 {
    static ACTIVE_LINE_WIDTH = 5;

    private _active = false;

    set active(v: boolean) {
        this._active = v;
        this.material.linewidth = v ? Edges.ACTIVE_LINE_WIDTH : 1;
    }

    get active() {
        return this._active;
    }

    constructor(box: Mesh<BoxGeometry, any>) {
        super(new LineSegmentsGeometry().fromEdgesGeometry(new EdgesGeometry(box.geometry)), new LineMaterial({ color: ColorBlack }))
        box.add(this);
    }

    raycast(raycaster: Raycaster, intersects: Intersection[]) {}
}