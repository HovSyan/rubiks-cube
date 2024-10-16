export interface IGameSettings {
    dimension: number;
    autoRotate: boolean;
    rotationSpeed: 1 | .5 | .2 | 0;
    autosaveTime: 5 | 2 | 1 | 0;
}

export const GameSettings: IGameSettings = {
    dimension: 3,
    autoRotate: false,
    rotationSpeed: .5,
    autosaveTime: 1,
};