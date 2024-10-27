import React, { useEffect, useId } from "react";
import { Game, SAVE_SLOTS } from "./core/game";


export type TGameCanvasProps = {
    onAutosave?: () => unknown;
    onGameLoadedWithDifferentDimensions?: (_: { from: number; to: number }) => unknown;
}

export default function GameCanvas({ onAutosave, onGameLoadedWithDifferentDimensions }: TGameCanvasProps) {
    const id = useId();

    useEffect(() => {
        const game = new Game();
        document.getElementById(id)?.replaceWith(game.canvas);
        const subscriptions = [
            game.events.listen('GAME_AUTOSAVED').subscribe(() => onAutosave?.()),
            game.events.listen('GAME_LOADED_WITH_DIFFERENT_DIMENSION').subscribe(({ data }) => {
                if (data && typeof data === 'object' && 'from' in data && 'to' in data) {
                    onGameLoadedWithDifferentDimensions?.(data as { from: number, to: number })
                }
            })
        ];
        game.start();
        game.loadGame(SAVE_SLOTS.SAVE_SLOT_AUTOSAVE);
        return () => {
            subscriptions.forEach(s => s.unsubscribe());
            game.destroy();
        };
    }, [])

    return <div id={id}></div>
}

