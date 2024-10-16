import { Observable, Subject } from "rxjs";

export class AutosaveService {
    private _onSave = new Subject<void>();
    private _timeout = 0;

    onSave: Observable<void> = this._onSave;

    constructor(private _intervalInMs: number) {
        this.start();
    }

    start() {
        if (this._intervalInMs > 0) {
            this._restart();
        }
    }

    stop() {
        clearTimeout(this._timeout);
    }

    destroy(): void {
        this.stop();
        this._onSave.complete();
    }

    private _restart() {
        clearTimeout(this._timeout);

        setTimeout(() => {
            this._onSave.next();
            this._restart();
        }, this._intervalInMs)
    }
}