import { Scene } from "../../scene";
import { Key } from "../keyboard-interaction/key";

export interface IKeyboardHandler {
    handle(key: Key): void;
}

export abstract class KeyboardHandler implements IKeyboardHandler{
    constructor(protected scene: Scene) {}

    abstract handle(key: Key): void;
}