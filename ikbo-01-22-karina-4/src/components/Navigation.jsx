import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
    return (
        <nav className="nav-bar">
            <ul>
                <li><Link to="/">Main</Link></li>
                <li><Link to="/details/1">Detail 1</Link></li>
                <li><Link to="/details/2">Detail 2</Link></li>
                <li><Link to="/dialogs">Dialogs</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;