import React, { useId, useLayoutEffect } from "react";
import { Game } from "./core/game";

const game = new Game();

export default function GameCanvas() {
    const id = useId()

    useLayoutEffect(() => {
        document.getElementById(id)?.replaceWith(game.canvas);
        game.start();
    })

    return <div id={id}></div>
}

