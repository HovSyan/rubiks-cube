import { filter, fromEvent, map } from "rxjs";
import { AvailableKeys } from "./available-keys";

export class KeyboardInteractionService {
  onKeydown = fromEvent<KeyboardEvent>(window, "keydown").pipe(
    map((e) => AvailableKeys.find((k) => k.matches(e))),
    filter(Boolean),
  );
}
