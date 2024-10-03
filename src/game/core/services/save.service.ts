import { Color, Quaternion, Vector3 } from "three";
import { Box } from "../box";
import { Scene } from "../scene";

export const enum SAVE_SLOTS {
  SAVE_SLOT_AUTOSAVE = "SAVE_SLOT_AUTOSAVE",
  SAVE_SLOT_1 = "SAVE_SLOT_1",
  SAVE_SLOT_2 = "SAVE_SLOT_2",
  SAVE_SLOT_3 = "SAVE_SLOT_3",
}

export type SavedJSON = Array<[
  // positions
  number, number, number,
  // colors
  number, number, number, number, number, number,
  // quaternion
  number, number, number, number
]>;

export class SaveService {
  constructor(private _scene: Scene) {}

  loadSave(slot: SAVE_SLOTS) {
    const json = localStorage.getItem(slot);

    if (!json) {
      return;
    }

    this._scene.clear();
    for (const obj of JSON.parse(json) as SavedJSON) {
      const position = new Vector3().fromArray(obj, 0);
      const colors = obj.slice(3, 9).map((c) => new Color(c));
      const quaternion = new Quaternion().fromArray(obj, 9);
      const box = new Box(position);
      box.setColors(colors);
      box.applyQuaternion(quaternion);
      this._scene.add(box);
    }
  }

  save(saveSlot: SAVE_SLOTS) {
    const json = this._getJSON();
    localStorage.setItem(saveSlot, JSON.stringify(json));
  }

  private _getJSON(): SavedJSON {
    const result: SavedJSON = [];
    this._scene.forEachBox((b) => {
      result.push(b.toJSON() as SavedJSON[number]);
    });
    return result;
  }
}
