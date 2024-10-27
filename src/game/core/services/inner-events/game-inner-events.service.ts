import { filter, Subject } from "rxjs";
import { GameInnerEvent } from "./game-inner-events";

export class GameInnerEventsService {
  static getInstance() {
    return (GameInnerEventsService._INSTANCE =
      GameInnerEventsService._INSTANCE || new GameInnerEventsService());
  }

  static destroyInstance() {
    GameInnerEventsService._INSTANCE?._subject.complete();
    GameInnerEventsService._INSTANCE = null;
  }

  private static _INSTANCE: GameInnerEventsService | null = null;

  private _subject = new Subject<{ event: GameInnerEvent; data?: unknown }>();
  private _debounceTimeouts = new Map<
    GameInnerEvent,
    ReturnType<Window["setTimeout"]>
  >();

  private constructor() {}

  listen(event: GameInnerEvent) {
    return this._subject.pipe(filter((s) => s.event === event));
  }

  emitDebounce(event: GameInnerEvent, debounceTime = 0, data?: unknown) {
    if (this._debounceTimeouts.has(event)) {
      clearTimeout(this._debounceTimeouts.get(event));
    }

    this._debounceTimeouts.set(
      event,
      window.setTimeout(() => {
        this.emit(event, data);
      }, debounceTime)
    );
  }

  emit(event: GameInnerEvent, data?: unknown) {
    return this._subject.next({ event, data });
  }
}
