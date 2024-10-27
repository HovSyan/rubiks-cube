export type ToasterMessageType = "info" | "warning" | "error";

let toasterId = 1;

export const AutosaveToasterMessage = () => {
  return new ToasterMessageModel("info", "Autosaved!");
};

export const LoadedWithDifferentDimensionsMessage = (
  from: number,
  to: number
) => {
  return new ToasterMessageModel(
    "warning",
    `A game is loaded with different setting dimensions! Falling back to loaded dimensions ( from <i>${from}</i> to <i>${to}</i> )`,
    { maxWidth: 500, enableHtml: true, closeTimeout: 5000 }
  );
};

export type ToasterMessageOptions = {
    closeTimeout?: number,
    maxWidth?: number,
    enableHtml?: boolean,
}

const DefaultToasterMessageOptions = (): ToasterMessageOptions => ({
    closeTimeout: 2000,
    maxWidth: 300,
    enableHtml: false
})

export class ToasterMessageModel {
  readonly id = toasterId++;
  readonly options = DefaultToasterMessageOptions();

  constructor(
    readonly type: ToasterMessageType,
    readonly text: string,
    options: ToasterMessageOptions = {}
  ) {
    Object.assign(this.options, options);
  }
}
