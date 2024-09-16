import { filter, fromEvent, map } from "rxjs";

export const AvailableKeys = {
  39: "Right Arrow",
} as const;

export class KeyboardInteractionService {
  onKeydown = fromEvent<KeyboardEvent>(window, "keydown").pipe(
    filter(({ keyCode }) => keyCode in AvailableKeys),
    map(({ keyCode }) => AvailableKeys[keyCode as keyof typeof AvailableKeys])
  );
}
