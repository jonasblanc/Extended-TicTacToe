import React, { useEffect } from "react";
import "./style.css";

export default function GameCell(props) {
    useEffect(() => {}, [props.value]);
    return (
        <button
            className="square"
            onClick={() => {
                props.actionClick();
            }}
        >
            {props.value}
        </button>
    );
}
