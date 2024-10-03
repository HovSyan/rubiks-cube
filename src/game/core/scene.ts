import { Plane, Scene as Scene3js } from 'three';
import { Box } from './box';

export class Scene extends Scene3js {
    private _activeBoxes = new Set<Box>();

    setActiveBox(b: Box) {
        this._activeBoxes.add(b);
        b.active = true;
    }

    removeActiveBox(b: Box) {
        if (this._activeBoxes.delete(b)) {
            b.active = false;
        }
    }

    getActiveBox() {
        return this._activeBoxes.keys().next().value as Box | undefined;
    }

    getBoxesOnPlane(p: Plane) {
        return (this.children as Box[]).filter((b) => p.distanceToPoint(b.position) === 0);
    }

    forEachBox(cb: (b: Box) => any) {
        this.traverse((o) => (o instanceof Box) && cb(o));
    }
}