import { Box } from "../../../box";
import { NavigationHandlerBase } from "./navigation-handler.base";

export class NavigationDHandler extends NavigationHandlerBase {
    getNextBox(currentBox: Box): Box {
        const adjacentBoxes = this.scene.getAdjacentBoxes(currentBox);
        let result = currentBox;
        let maxX = currentBox.getScreenCoordinates(this.camera).x;

        for (const box of adjacentBoxes) {
            const x = box.getScreenCoordinates(this.camera).x;
            if (box.isVisibleFromCamera(this.camera) && x > maxX) {
                result = box;
                maxX = x;
            }
        }

        return result;
    }
}