import { Scene as Scene3js } from 'three';
import { Box } from './box';

export class Scene {
    scene = new Scene3js();

    add(...box: Box[]) {
        this.scene.add(...box.map((b) => b.mesh));
    }
}