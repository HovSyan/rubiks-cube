import { Scene } from "../../scene";
import { Subject, takeUntil } from "rxjs";
import { GameSettings } from "../../settings";
import { GameInnerEventsService } from "../inner-events";
import { AutosaveService } from "./_autosave.service";
import { SAVE_SLOTS, SavedJSON } from "./models";
import { LoadService } from "./_load.service";

export class SaveService {
  private _hasUnsavedChanges = false;
  private _destroySubject = new Subject<void>();
  private _autosave: AutosaveService | null = null;

  constructor(private _scene: Scene) {
    GameInnerEventsService.getInstance()
      .listen("BOXES_ROTATED")
      .pipe(takeUntil(this._destroySubject))
      .subscribe(() => {
        this._hasUnsavedChanges = true;
      });
  }

  initAutosave() {
    this._autosave = new AutosaveService(GameSettings.autosaveTime * 1000 * 60);
    this._autosave.onSave.pipe(takeUntil(this._destroySubject)).subscribe(() => {
      this._hasUnsavedChanges && this.save(SAVE_SLOTS.SAVE_SLOT_AUTOSAVE);
    })
  }

  loadSave(slot: SAVE_SLOTS) {
    const boxes = new LoadService().load(slot);
    if (boxes) {
      this._scene.clear();
      this._scene.add(...boxes);
    }
  }

  save(saveSlot: SAVE_SLOTS) {
    localStorage.setItem(saveSlot, JSON.stringify(this._getJSON()));
    this._hasUnsavedChanges = false;
    GameInnerEventsService.getInstance().emit(saveSlot === SAVE_SLOTS.SAVE_SLOT_AUTOSAVE ? 'GAME_AUTOSAVED' : 'GAME_SAVED');
  }

  destroy(): void {
    this._destroySubject.next();
    this._destroySubject.complete();
    this._autosave?.destroy();
  }

  private _getJSON(): SavedJSON {
    const result: SavedJSON = [];
    this._scene.forEachBox((b) => {
      result.push(b.toJSON() as SavedJSON[number]);
    });
    return result;
  }
}
