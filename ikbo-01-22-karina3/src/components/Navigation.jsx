import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css"


const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Main</Link></li>
                <li><Link to="/details/1">Details 1</Link></li>
                <li><Link to="/details/2">Details 2</Link></li>
                <li><Link to="/details/3">Details 3</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
