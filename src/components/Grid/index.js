import React from "react";

import "./style.css";
import { range } from "../../utilities";

import GameCell from "../GameCell";

export default function Grid(props) {
    const renderCell = (j) => {
        return (
            <GameCell
                key={"GRID_NUM_" + j}
                index={j}
                value={props.array[j]}
                actionClick={() => props.handleClick(j)}
            />
        );
    };

    const returnArray = () => {
        const r = range(0, props.side - 1);
        return r.map((i) => (
            <div key={"ROW_NUM_" + i} className="grid-row">
                {r.map((y) => renderCell(i * props.side + y))}
            </div>
        ));
    };

    return <div>{returnArray(3)}</div>;
}
