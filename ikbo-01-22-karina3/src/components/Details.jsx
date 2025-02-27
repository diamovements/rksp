import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Details.css"

const Details = () => {
    let { id } = useParams();
    return (
        <div>
            <h2>Details</h2>
            <p>Detail ID: {id}</p>
        </div>
    );
};

export default Details;
