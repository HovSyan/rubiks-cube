export class Key {
    constructor(readonly name: string, readonly code: number, readonly options?: { shift?: boolean }) {}
  
    matches(e: KeyboardEvent) {
      return e.keyCode === this.code && e.shiftKey === !!this.options?.shift
    }
  }
  