import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import GameCanvas from './game/GameCanvas';

import './main.css';

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);

function Main() {
    return <GameCanvas />
}
