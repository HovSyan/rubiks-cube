import React from "react";

import './HeaderMenu.css';

export type HeaderMenuProps = {
    name: string;
}

export default function HeaderMenu({ name }: HeaderMenuProps) {
    return <div className="header-menu">
        <span className="header-menu__title">{name}</span>
    </div>
}