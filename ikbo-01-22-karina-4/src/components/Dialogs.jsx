import React from "react";
import DialogItem from "./DialogItem";
import "../styles/Dialogs.css";

const Dialogs = () => {
    return (
        <div className="dialogs-container">
            <h2>Dialogs</h2>
            <DialogItem name="Alex" id="1" />
            <DialogItem name="Maria" id="2" />
            <DialogItem name="Ethon" id="3" />
        </div>
    );
};

export default Dialogs;