import React from "react";
import { useParams } from "react-router-dom";

const DialogDetails = () => {
    const { id } = useParams();

    return (
        <div>
            <h2>Dialog with {id}</h2>
            <p>Hello here.</p>
        </div>
    );
};

export default DialogDetails;
