export const enum SAVE_SLOTS {
    SAVE_SLOT_AUTOSAVE = "SAVE_SLOT_AUTOSAVE",
    SAVE_SLOT_1 = "SAVE_SLOT_1",
    SAVE_SLOT_2 = "SAVE_SLOT_2",
    SAVE_SLOT_3 = "SAVE_SLOT_3",
  }
  
  export type SavedJSON = {
    meta: {
      // dimension
      d: number,
      // date
      dt: ReturnType<Date['toISOString']>,
    }
    boxes: Array<
    [
      // positions
      number,
      number,
      number,
      // colors
      number,
      number,
      number,
      number,
      number,
      number,
      // quaternion
      number,
      number,
      number,
      number
    ]
  >;
}