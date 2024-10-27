import { Color, Quaternion, Vector3 } from "three";
import { Box } from "../../box";
import { SAVE_SLOTS, SavedJSON } from "./models";

export class LoadService {
    load(slot: SAVE_SLOTS): { meta: SavedJSON['meta'], boxes: Box[] } | undefined {
        const storageItem = localStorage.getItem(slot);

        if (!storageItem) {
          return;
        }
    
        const boxes: Box[] = [];
        const json = JSON.parse(storageItem) as SavedJSON;
        for (const obj of json.boxes) {
          const position = new Vector3().fromArray(obj, 0);
          const colors = obj.slice(3, 9).map((c) => new Color(c));
          const quaternion = new Quaternion().fromArray(obj, 9);
          const box = new Box(position);
          box.setColors(colors);
          box.applyQuaternion(quaternion);
          boxes.push(box);
        }

        return { meta: json.meta, boxes };
    }
}