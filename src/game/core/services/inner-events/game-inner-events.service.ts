import { filter, Subject } from "rxjs";
import { GameInnerEvent } from "./game-inner-events";

export class GameInnerEventsService {
    static getInstance() {
        return (GameInnerEventsService._INSTANCE = GameInnerEventsService._INSTANCE || new GameInnerEventsService());
    }
    
    static destroyInstance() {
        GameInnerEventsService._INSTANCE?._subject.complete();
        GameInnerEventsService._INSTANCE = null;
    }

    private static _INSTANCE: GameInnerEventsService | null = null;
    
    private _subject = new Subject<GameInnerEvent>()

    private constructor() {}

    listen(event: GameInnerEvent) {
        return this._subject.pipe(filter((s) => s === event));
    }

    emit(event: GameInnerEvent) {
        return this._subject.next(event);
    }
}