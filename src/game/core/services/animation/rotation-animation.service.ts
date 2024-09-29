import { Object3D, Quaternion, Vector3 } from "three";
import { AnimationBase, AnimationCallbacks } from "./animation.base";
import { GameSettings } from "../../settings";
import gsap, { } from "gsap";

export class RotationAnimation extends AnimationBase {
  private _tween: gsap.core.Tween;

  get isActive() {
    return this._tween.isActive();
  }

  constructor(private _obj: Object3D, private _axis: Vector3, protected callbacks: AnimationCallbacks) {
    super(callbacks);
    this._tween = gsap.to({}, { duration: GameSettings.rotationSpeed });
    this._tween.eventCallback("onUpdate", () => { this.update() });
    this._tween.eventCallback("onComplete", () => { this.complete() });
    this._tween.pause();
  }

  start(): this {
    this.callbacks.onStart?.();
    this._tween.duration() === 0 ? this.complete() : this._tween.restart();
    return this;
  }

  update(progress = this._tween.progress()) {
    this.callbacks.onUpdate?.();
    this._obj.quaternion.slerpQuaternions(
      new Quaternion(),
      new Quaternion().setFromAxisAngle(this._axis, Math.PI / 2),
      progress
    );
    return this;
  }

  complete(): this {
    this.update(1);
    this.callbacks.onComplete?.();
    this._cleanup();
    return this;
  }

  private _cleanup() {
    this._tween.kill();
  }
}
