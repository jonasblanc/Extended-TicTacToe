import React, { useEffect, useState } from "react";
import "./style.css";

import Grid from "../Grid";
import GameSettings from "../GameSettings";
import nextMoveIA from "./IA";
import { calculateWinner } from "./arrayUtilities";
export default function Game() {
    const MIN_SIDE = 5;
    const MAX_SIDE = 25;

    const [side, setSide] = useState(15);
    const [array, setArray] = useState(Array((side - 1) * (side - 1)).fill(null));

    const [isCrossNext, setIsCrossNext] = useState(false);
    const [status, setStatus] = useState("Press start to play !");
    const [isFinish, setIsFinish] = useState(true);

    const [round, setRound] = useState(0);

    const handleClick = (i) => {
        if (!isFinish && array[i] == null) {
            handlePlay(i);
        } else {
            //alert("Please choose an empty cell - " + array[i]);
        }
    };

    const handlePlay = (i) => {
        const newArray = array.slice();
        newArray[i] = isCrossNext ? "X" : "O";
        setArray(newArray);
        setIsCrossNext(!isCrossNext);
        setRound(round + 1);
    };

    const handleSubmit = (side, firstPlayer) => {
        setIsCrossNext(firstPlayer === "X");
        const grid = Array((side - 1) * (side - 1)).fill(null);
        setArray(grid);
        setIsFinish(false);
        setSide(side);
        setRound(0);
    };

    const setAndReturnWinner = () => {
        const winner = calculateWinner(array, side, 5);
        if (winner != null) {
            setStatus("Winner is " + winner + " !");
            setIsFinish(true);
            return winner;
        }
        return winner;
    };

    const setUpAndPlay = () => {
        setStatus("Next player is " + (isCrossNext ? "X" : "O"));
        if (!isCrossNext) {
            //alert("Round: " + round);
            const pos = nextMoveIA(array, side, "O");
            handleClick(pos);
        }
    };

    useEffect(() => {
        if (!isFinish) {
            if (setAndReturnWinner() == null) {
                setUpAndPlay();
                //alert("refresh" + round);
            }
        }
    });

    return (
        <div className="game-container">
            <div className="settings-container">
                <GameSettings handleSubmit={handleSubmit} minSide={MIN_SIDE} maxSide={MAX_SIDE} />
            </div>
            <div className="grid-container">
                {status}
                <Grid array={array} side={side} handleClick={handleClick} />
            </div>
            <div className="text-container">
                {"Rules:"}
                <br></br>
                {"Be the first one to align 5 symbols"}
                <br></br>
                <br></br>
                {"Context:"}
                <br></br>
                {
                    "This was my favorite game to keep me busy during boring class in high school. Hey kids, don't be like me, be focused at school, it's important. "
                }
            </div>
        </div>
    );
}
