import React, { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import GameCanvas from './game/GameCanvas';

import './main.css';
import { Game } from './game/core/game';

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);

function Main() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();

    useLayoutEffect(() => {
        setGame(new Game(canvasRef.current!).start());
    }, [])

    return <GameCanvas ref={canvasRef}/>
}
