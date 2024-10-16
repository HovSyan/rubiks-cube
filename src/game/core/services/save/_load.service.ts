import { Color, Quaternion, Vector3 } from "three";
import { Box } from "../../box";
import { SAVE_SLOTS, SavedJSON } from "./models";

export class LoadService {
    load(slot: SAVE_SLOTS): Box[] | undefined {
        const json = localStorage.getItem(slot);
        const result: Box[] = [];

        if (!json) {
          return;
        }
    
        for (const obj of JSON.parse(json) as SavedJSON) {
          const position = new Vector3().fromArray(obj, 0);
          const colors = obj.slice(3, 9).map((c) => new Color(c));
          const quaternion = new Quaternion().fromArray(obj, 9);
          const box = new Box(position);
          box.setColors(colors);
          box.applyQuaternion(quaternion);
          result.push(box);
        }

        return result;
    }
}