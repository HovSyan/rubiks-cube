import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { Game } from "./core/game";

export default forwardRef(function GameCanvas(_, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();

    useEffect(() => {
        game?.start();
    }, [game]);

    useLayoutEffect(() => {
        setGame(new Game(canvasRef.current!));
    }, []);
    
    return <canvas ref={canvasRef} ></canvas>
})

