import { Plane, Scene as Scene3js, Vector3 } from 'three';
import { Box } from './box';
import { Camera } from './camera';
import { GameSettings } from './settings';

export class Scene extends Scene3js {
    private _activeBoxes = new Set<Box>();

    setActiveBox(b: Box, clear = true) {
        clear && this._activeBoxes.forEach((b) => this.removeActiveBox(b))
        this._activeBoxes.add(b);
        b.active = true;
    }

    removeActiveBox(b: Box) {
        if (this._activeBoxes.delete(b)) {
            b.active = false;
        }
    }

    getNearestBoxFromCamera(camera: Camera) {
        let minDistance = this.children[0].position.distanceTo(camera.position);
        return this.children.reduce<Box>((result, current) => {
            const currentDistance = current.position.distanceTo(camera.position);
            if (currentDistance < minDistance && current instanceof Box) {
                minDistance = currentDistance;
                return current;
            }
            return result;
        }, this.children[0] as Box)
    }

    getAdjacentBoxes(target: Box) {
        const result: Box[] = [];
        const N = GameSettings.dimension;
        this.forEachBox((b) => b.position.toArray().some((c) => Math.abs(c) === Math.floor(N / 2)) && b.position.distanceTo(target.position) === 1 && result.push(b));
        return result;
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