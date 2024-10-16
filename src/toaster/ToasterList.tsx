import React from "react";
import { ToasterMessageModel } from "./toaster-message-model";
import ToasterMessage from "./ToasterMessage";

import './ToasterList.css';

export type ToasterListProps = {
    messages: ToasterMessageModel[];
    onMessageTimeout?: (id: ToasterMessageModel['id']) => any;
}

export default function ToasterList({ messages, onMessageTimeout }: ToasterListProps) {
    return <div className="toaster-list">
        {messages.map((m) => <ToasterMessage message={m} onTimeout={() => onMessageTimeout?.(m.id)} key={m.id}></ToasterMessage>)}
    </div>
}
