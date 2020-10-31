import React, { useState } from "react";
import "./style.css";

import { range } from "../../utilities";

export default function GameSettings(props) {
    const [side, setSide] = useState((props.minSide + props.maxSide) / 2);
    const [players, setPlayers] = useState(["X", "O"]);
    const [firstPlayer, setFirstPlayer] = useState(players[0]);

    const optionListSide = (min, max) => {
        return (
            <select value={side} onChange={(newSide) => setSide(newSide.target.value)}>
                {range(props.minSide, props.maxSide).map((x) => (
                    <option key={"SIDE_NUM_" + x} value={x}>
                        {x}
                    </option>
                ))}
            </select>
        );
    };

    const optionFirstPlayer = () => {
        return (
            <select
                value={firstPlayer}
                onChange={(newFirst) => setFirstPlayer(newFirst.target.value)}
            >
                {players.map((x) => (
                    <option key={"PLAYER_" + x} value={x}>
                        {x}
                    </option>
                ))}
            </select>
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(side, firstPlayer);
    };

    return (
        <form onSubmit={handleSubmit} className="vertical-form">
            <label>
                Select the width of the grid:
                {optionListSide(props.minSide, props.maxSide)}
            </label>
            <label>
                Select the first player:
                {optionFirstPlayer()}
            </label>
            <input type="submit" value="Start" />
        </form>
    );
}
