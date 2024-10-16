export type ToasterMessageType = 'info' | 'warning' | 'error';

let toasterId = 1;

export const AutosaveToasterMessage = () => {
    return new ToasterMessageModel('info', 'Autosaved!', 2000);
}

export class ToasterMessageModel {
    id = toasterId++;
    constructor(readonly type: ToasterMessageType, readonly text: string, readonly closeTimeout: number) {}
}