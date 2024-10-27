import React, { CSSProperties, useEffect, useRef } from "react";
import { ToasterMessageModel } from "./toaster-message-model";
import Icon from "../icon/Icon";

import './ToasterMessage.css';

export type ToasterMessageProps = {
    message: ToasterMessageModel;
    onTimeout?: () => any;
}

const iconColor: Record<ToasterMessageModel['type'], string> = {
    info: '#000',
    warning: '#c15c3a',
    error: '#eee'
}

export default function ToasterMessage({ message, onTimeout }: ToasterMessageProps) {
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onAnimationEnd = onTimeout || (() => {});
        messageRef.current?.addEventListener('animationend', onAnimationEnd)
        return () => messageRef.current?.removeEventListener('animationend', onAnimationEnd);
    }, [onTimeout, messageRef.current])

    return <div className="toaster-message"
        ref={messageRef} 
        style={{
            '--close-timeout': message.options.closeTimeout + 'ms',
            'maxWidth': message.options.maxWidth
        } as CSSProperties}
    >
        <Icon name={message.type} color={iconColor[message.type]}></Icon>
        {message.options.enableHtml 
            ? <div className="toaster-message__text" dangerouslySetInnerHTML={{ __html: message.text }}></div>
            : <div className="toaster-message__text">{ message.text }</div>
        }
    </div>;
}