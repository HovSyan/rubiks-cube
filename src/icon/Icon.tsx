import React from "react";

import '../assets/icons/source-icons/error.svg';
import '../assets/icons/source-icons/info.svg';
import '../assets/icons/source-icons/warning.svg';

export type SourceIcons = 'info' | 'error' | 'warning';

export const enum IconSize {
    SMALL = 16,
    MEDIUM = 24,
    BIG = 32,
}

export type IconProps = {
    name: SourceIcons;
    size?: IconSize;
    color?: string;
}

export default function Icon({ name, size, color }: IconProps) {
    const sizeStr = `${size || 24}px`;
    return <svg viewBox="0 0 24 24" 
        width={sizeStr} height={sizeStr} 
        style={{ 
            minWidth: sizeStr, 
            minHeight: sizeStr,
            color
        }}
    >
        <use xlinkHref={'sprite.svg#' + name}></use>
    </svg>
}