import { Key } from "./key";

export const leftArrow = new Key("Left Arrow", 37);
export const upArrow = new Key("Up Arrow", 38);
export const rightArrow = new Key("Right Arrow", 39);
export const downArrow = new Key("Down Arrow", 40);
export const shiftLeftArrow = new Key("Shift Left Arrow", 37, { shift: true });
export const shiftRightArrow = new Key("Shift Right Arrow", 39, {
  shift: true,
});

export const AvailableKeys = [
  leftArrow,
  upArrow,
  rightArrow,
  downArrow,
  shiftLeftArrow,
  shiftRightArrow,
];
