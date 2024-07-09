import { BehaviorSubject, Observable, Subject } from 'rxjs';

class Dimensions {
    width = window.innerWidth;
    height = window.innerHeight;

    get aspect() {
        return this.width / this.height
    }
}

const _inner$ = new BehaviorSubject(new Dimensions())

window.addEventListener('resize', () => _inner$.next(new Dimensions()))

export const WindowDimensions$: Observable<Dimensions> & Pick<BehaviorSubject<Dimensions>, 'value'> = _inner$;
