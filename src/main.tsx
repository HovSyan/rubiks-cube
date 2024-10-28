import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ToasterList from './toaster/ToasterList';
import GameCanvas from './game/GameCanvas';
import Header from './header/Header';
import { AutosaveToasterMessage, LoadedWithDifferentDimensionsMessage, ToasterMessageModel } from './toaster/toaster-message-model';

import './main.css';

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);

function Main() {
    const [toasters, setToasters] = useState<ToasterMessageModel[]>([]);

    const onMessageTimeout = (id: ToasterMessageModel['id']) => {
        setToasters(toasters.filter((t) => t.id !== id));
    }

    const addMessage = (msg: ToasterMessageModel) => {
        setToasters(toasters.concat(msg));
    }
    
    return <>
        <Header></Header>
        <GameCanvas 
            onAutosave={() => addMessage(AutosaveToasterMessage())}
            onGameLoadedWithDifferentDimensions={({ from, to }) => addMessage(LoadedWithDifferentDimensionsMessage(from, to))}
        ></GameCanvas>;
        <ToasterList messages={toasters} onMessageTimeout={onMessageTimeout}></ToasterList>
    </>
}
