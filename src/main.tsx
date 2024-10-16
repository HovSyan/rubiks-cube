import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import GameCanvas from './game/GameCanvas';

import './main.css';
import { AutosaveToasterMessage, ToasterMessageModel } from './toaster/toaster-message-model';
import ToasterList from './toaster/ToasterList';

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);

function Main() {
    const [toasters, setToasters] = useState<ToasterMessageModel[]>([]);

    const onMessageTimeout = (id: ToasterMessageModel['id']) => {
        setToasters(toasters.filter((t) => t.id !== id));
    }
    
    return <>
        <ToasterList messages={toasters} onMessageTimeout={onMessageTimeout}></ToasterList>
        <GameCanvas onAutosave={() => setToasters(toasters.concat(AutosaveToasterMessage()))}></GameCanvas>;
    </>
}
