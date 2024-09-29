export type AnimationCallbacks = {
    onStart?: () => any;
    onUpdate?: () => any;
    onComplete?: () => any;
}

export abstract class AnimationBase {
    constructor(protected _callbacks: AnimationCallbacks) {}
    abstract start(): this;
    abstract update(progress?: number): this;
    abstract complete(): this;
}