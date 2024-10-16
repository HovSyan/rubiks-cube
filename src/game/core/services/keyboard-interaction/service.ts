import { filter, fromEvent, map, Subject, takeUntil } from "rxjs";
import { AvailableKeys } from "./available-keys";

export class KeyboardInteractionService {
  private _destroySubject = new Subject<void>();

  onKeydown = fromEvent<KeyboardEvent>(window, "keydown").pipe(
    map((e) => AvailableKeys.find((k) => k.matches(e))),
    filter(Boolean),
    takeUntil(this._destroySubject)
  );

  destroy() {
    this._destroySubject.next();
    this._destroySubject.complete();
  }
}
