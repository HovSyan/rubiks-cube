import { Camera } from "../../../camera";
import { Scene } from "../../../scene";
import { Key } from "../../keyboard-interaction/key";
import { KeyboardHandler } from "../_handler.base";
import { A, D, S, W } from "../../keyboard-interaction/available-keys";
import { Box } from "../../../box";

export abstract class NavigationHandlerBase extends KeyboardHandler {
    constructor(readonly camera: Camera, readonly scene: Scene) {
        super(scene);
    }

    handle(): void {
        const activeBox = this.scene.getActiveBox();
        this.scene.setActiveBox(activeBox ? this.getNextBox(activeBox) : this.scene.getNearestBoxFromCamera(this.camera));
    }

    abstract getNextBox(currentBox: Box): Box;
}