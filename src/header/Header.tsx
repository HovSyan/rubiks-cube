import React from "react";
import HeaderMenu from "./header-menu/HeaderMenu";

import './Header.css';

export default function Header() {
    return <header className="header">
        <HeaderMenu name="Save"/>
        <HeaderMenu name="Load"/>
        <HeaderMenu name="Settings"/>
        <HeaderMenu name="About"/>
    </header>
} 