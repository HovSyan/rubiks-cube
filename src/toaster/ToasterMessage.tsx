import React, { CSSProperties, useEffect, useLayoutEffect, useRef } from "react";
import { ToasterMessageModel } from "./toaster-message-model";
import Icon from "../icon/Icon";

import './ToasterMessage.css';

export type ToasterMessageProps = {
    message: ToasterMessageModel;
    onTimeout?: () => any;
}

export default function ToasterMessage({ message, onTimeout }: ToasterMessageProps) {
    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onAnimationEnd = onTimeout || (() => {});
        messageRef.current?.addEventListener('animationend', onAnimationEnd)
        return () => messageRef.current?.removeEventListener('animationend', onAnimationEnd);
    }, [onTimeout, messageRef.current])

    return <div className="toaster-message" ref={messageRef} style={{'--close-timeout': message.closeTimeout + 'ms'} as CSSProperties}>
        <Icon name={message.type}></Icon>
        <div className="toaster-message__text">{message.text}</div>
    </div>;
}