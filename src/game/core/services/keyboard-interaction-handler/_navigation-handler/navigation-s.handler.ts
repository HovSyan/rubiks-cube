import { Box } from "../../../box";
import { NavigationHandlerBase } from "./navigation-handler.base";

export class NavigationSHandler extends NavigationHandlerBase {
    getNextBox(currentBox: Box): Box {
        const adjacentBoxes = this.scene.getAdjacentBoxes(currentBox);
        let result = currentBox;
        let maxY = currentBox.getScreenCoordinates(this.camera).y;

        for (const box of adjacentBoxes) {
            const y = box.getScreenCoordinates(this.camera).y;
            if (box.isVisibleFromCamera(this.camera) && y > maxY) {
                result = box;
                maxY = y;
            }
        }

        return result;
    }
}