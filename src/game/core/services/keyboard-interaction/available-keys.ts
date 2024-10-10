import { Key } from "./key";

export const leftArrow = new Key("Left Arrow", 37, { shift: false });
export const upArrow = new Key("Up Arrow", 38);
export const rightArrow = new Key("Right Arrow", 39, { shift: false });
export const downArrow = new Key("Down Arrow", 40);
export const shiftLeftArrow = new Key("Shift Left Arrow", 37, { shift: true });
export const shiftRightArrow = new Key("Shift Right Arrow", 39, {
  shift: true,
});
export const W = new Key('W', 87);
export const A = new Key('A', 65);
export const S = new Key('S', 83);
export const D = new Key('D', 68);

export const AvailableKeys = [
  leftArrow,
  upArrow,
  rightArrow,
  downArrow,
  shiftLeftArrow,
  shiftRightArrow,
  W,
  A,
  S,
  D
];
