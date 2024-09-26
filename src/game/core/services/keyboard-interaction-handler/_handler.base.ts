import { Scene } from "../../scene";
import { Key } from "../keyboard-interaction/key";

export abstract class KeyboardHandler {
    constructor(protected scene: Scene) {}

    abstract handle(key: Key): void;
}