import React, { useEffect, useId } from "react";
import { Game, SAVE_SLOTS } from "./core/game";


export type TGameCanvasProps = {
    onAutosave?: () => unknown;
}

export default function GameCanvas({ onAutosave }: TGameCanvasProps) {
    const id = useId()

    useEffect(() => {
        const game = new Game();
        document.getElementById(id)?.replaceWith(game.canvas);
        const subscription = game.events.listen('GAME_AUTOSAVED').subscribe(() => onAutosave?.());
        game.start();
        game.loadGame(SAVE_SLOTS.SAVE_SLOT_AUTOSAVE);
        return () => {
            subscription.unsubscribe()
            game.destroy();
        };
    })

    return <div id={id}></div>
}

