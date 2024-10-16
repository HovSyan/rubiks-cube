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
    size?: IconSize
}

export default function Icon({ name, size }: IconProps) {
    return <svg viewBox="0 0 24 24" width={`${size || 24}px`} height={`${size || 24}px`}>
        <use xlinkHref={'sprite.svg#' + name}></use>
    </svg>
}