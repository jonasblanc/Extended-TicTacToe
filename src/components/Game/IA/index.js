import smartBobNextMove from "./smartBob";
import random from "./random";

/**
 * Return next move of the selected IA
 * @param {*} grid
 * @param {*} side
 * @param {*} ownSymbol
 */
export default function nextMoveIA(grid, side, ownSymbol) {
    //return random(grid, side);
    return smartBobNextMove(grid, side, ownSymbol);
}
