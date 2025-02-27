import React from "react";
import { Link } from "react-router-dom";
import "../styles/DialogItem.css";

const DialogItem = ({ name, id }) => {
    let path = "/dialogs/" + id;
    return (
        <div className="dialog-item">
            <Link to={path}>{name}</Link>
        </div>
    );
};

export default DialogItem;