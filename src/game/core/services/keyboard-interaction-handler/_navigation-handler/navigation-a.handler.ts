import { Box } from "../../../box";
import { NavigationHandlerBase } from "./navigation-handler.base";

export class NavigationAHandler extends NavigationHandlerBase {
    getNextBox(currentBox: Box): Box {
        const adjacentBoxes = this.scene.getAdjacentBoxes(currentBox);
        let result = currentBox;
        let minX = currentBox.getScreenCoordinates(this.camera).x;

        for (const box of adjacentBoxes) {
            const x = box.getScreenCoordinates(this.camera).x;
            if (box.isVisibleFromCamera(this.camera) && x < minX) {
                result = box;
                minX = x;
            }
        }

        return result;
    }
}