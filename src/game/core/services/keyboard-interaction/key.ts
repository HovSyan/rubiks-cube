export class Key {
    constructor(readonly name: string, readonly code: number, readonly options?: { shift?: boolean }) {}
  
    matches(e: KeyboardEvent) {
      return e.keyCode === this.code && this._matchesOptions(e);
    }

    private _matchesOptions(e: KeyboardEvent) {
      return this.options?.shift === undefined || this.options.shift === e.shiftKey;
    }
  }
  