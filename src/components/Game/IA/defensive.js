import {
    isInBound,
    getElem,
    countRightDownDiagOfLength,
    countLeftDownDiagOfLength,
    countDownColumnOfLength,
    countRightLineOfLength,
} from "../arrayUtilities";

import { random } from "./random";

const WINNING_LENGTH = 5;
const OWN_ALIGNMENT = true;
const ADV_ALIGNMENT = false;
const ONE_BOUNDED = 1;
const UNBOUNDED = 2;

const DEBUG = false;

function debugAlert(message) {
    if (DEBUG) {
        alert(message);
    }
}
export default function defense(grid, side, ownSymbol) {
    const total = [hasUnBoundedAlignment, hasOneBoundedAlignment];

    // IA has alignment of 4 and we can align a other one => win
    var r = checkPredict(total, 4, 4, grid, side, ownSymbol, OWN_ALIGNMENT);
    if (r !== -1) {
        debugAlert("0");
        return r;
    }

    // Adversary has alignment of 4
    r = checkPredict(total, 4, 4, grid, side, ownSymbol, ADV_ALIGNMENT);
    if (r !== -1) {
        debugAlert("1");
        return r;
    }

    // IA has alignment of 3 unbounded
    r = checkPredict([hasUnBoundedAlignment], 3, 3, grid, side, ownSymbol, OWN_ALIGNMENT);
    if (r !== -1) {
        debugAlert("2");
        return r;
    }

    // Adversary has alignment of 3 unbounded
    r = checkPredict([hasUnBoundedAlignment], 4, 3, grid, side, ownSymbol, ADV_ALIGNMENT);
    if (r !== -1) {
        debugAlert("3");
        return r;
    }

    // No vital move need

    // Adversary has alignment of 3  or 2 bounded or one bounded
    r = checkPredict(total, 3, 2, grid, side, ownSymbol, ADV_ALIGNMENT);
    if (r !== -1) {
        debugAlert("4");
        return r;
    }

    // IA has alignment of 3 , 2 or 1
    r = checkPredict(total, 3, 1, grid, side, ownSymbol, OWN_ALIGNMENT);
    if (r !== -1) {
        debugAlert("5");
        return r;
    }
    //alert("random");
    return random(grid, side);
}

/**
 * Check every given predicates sort by priority order over all grid for a given range of lengths
 * @param {*} predicates
 * @param {*} max - Max length
 * @param {*} min - Min length
 * @param {*} grid
 * @param {*} side
 * @param {*} ownSymbol
 * @param {*} isCheckingOwnCombi - true if searching for own alignment
 *
 * @return a position aligned with the alignment that fullfilled a predicate
 */
function checkPredict(predicates, max, min, grid, side, ownSymbol, isCheckingOwnCombi) {
    let next_pos = 0;

    for (let l = max; l >= min; --l) {
        for (let p = 0; p < predicates.length; ++p) {
            for (let i = 0; i < side; ++i) {
                for (let j = 0; j < side; ++j) {
                    next_pos = predicates[p](grid, side, i, j, ownSymbol, l, isCheckingOwnCombi);
                    if (next_pos !== -1) {
                        return next_pos;
                    }
                }
            }
        }
    }
    return -1;
}

/**
 * Check if there is a one-bounded alignemnt start at (i,j) of given length
 * @param {*} array
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} ownSymbol
 * @param {*} length
 * @param {*} isCheckingOwnCombi - true if searching for own alignment
 */
function hasOneBoundedAlignment(array, side, i, j, ownSymbol, length, isCheckingOwnCombi) {
    return __hasUnBoundedAlignment__(
        array,
        side,
        i,
        j,
        ownSymbol,
        length,
        isCheckingOwnCombi,
        ONE_BOUNDED
    );
}

const alignments = [
    countRightDownDiagOfLength,
    countLeftDownDiagOfLength,
    countDownColumnOfLength,
    countRightLineOfLength,
];

/**
 * Check if there is a unbounded alignemnt start at (i,j) of given length
 * @param {*} array
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} ownSymbol
 * @param {*} length
 * @param {*} isCheckingOwnCombi - true if searching for own alignment
 */
function hasUnBoundedAlignment(array, side, i, j, ownSymbol, length, isCheckingOwnCombi) {
    return __hasUnBoundedAlignment__(
        array,
        side,
        i,
        j,
        ownSymbol,
        length,
        isCheckingOwnCombi,
        UNBOUNDED
    );
}

// Helper function for hasOneBoundedCombin and hasUnBoundedCombin
function __hasUnBoundedAlignment__(
    array,
    side,
    i,
    j,
    ownSymbol,
    length,
    isCheckingOwnCombi,
    numberOfUnboundedSide
) {
    const FIRST_BOUND = 0;
    const SECOND_BOUND = 1;

    for (let alignmentIdx = 0; alignmentIdx < alignments.length; ++alignmentIdx) {
        // Compute number of aligned symbols starting at pos (i,j)
        const size = alignments[alignmentIdx](array, side, i, j, WINNING_LENGTH);

        // If it is currently checking for this number of symbols
        var symbol = null;
        if (size === length) {
            symbol = getElem(array, side, i, j);
        }

        // If symbol match what we are currently looking for
        if (
            symbol != null &&
            ((symbol !== ownSymbol && !isCheckingOwnCombi) ||
                (symbol === ownSymbol && isCheckingOwnCombi))
        ) {
            const hasFirstBound = isFirstBounded(array, side, i, j, alignmentIdx);
            const sizeOfSecondBoundedAlignment = lengthBeforeSecondBound(
                array,
                side,
                i,
                j,
                alignmentIdx
            );
            const hasSecondBound = sizeOfSecondBoundedAlignment > 0;
            const potentialPlaceForSecondBound = -sizeOfSecondBoundedAlignment;

            if (size === 3) {
                debugAlert(
                    hasSecondBound +
                        " - hasSecondBound " +
                        potentialPlaceForSecondBound +
                        " - potentialPlaceForSecondBound"
                );
            }

            const bounds = computeBounds(
                i,
                j,
                hasSecondBound ? sizeOfSecondBoundedAlignment : potentialPlaceForSecondBound
            );
            const i_1 = bounds[alignmentIdx][FIRST_BOUND][0];
            const j_1 = bounds[alignmentIdx][FIRST_BOUND][1];

            switch (numberOfUnboundedSide) {
                case UNBOUNDED:
                    if (!hasFirstBound && !hasSecondBound) {
                        if (potentialPlaceForSecondBound > 0) {
                            const i_2 = bounds[alignmentIdx][SECOND_BOUND][0];
                            const j_2 = bounds[alignmentIdx][SECOND_BOUND][1];
                            debugAlert("no second bound: " + i_2 + " " + j_2);
                            return Number(i_2 * side) + Number(j_2);
                        } else {
                            debugAlert("unbounded: " + i_1 + " " + j_1);
                            return Number(i_1 * side) + Number(j_1);
                        }
                    }
                    break;
                case ONE_BOUNDED:
                    if (!hasSecondBound && potentialPlaceForSecondBound > 0) {
                        const i_2 = bounds[alignmentIdx][SECOND_BOUND][0];
                        const j_2 = bounds[alignmentIdx][SECOND_BOUND][1];
                        debugAlert("no second bound: " + i_2 + " " + j_2);
                        return Number(i_2 * side) + Number(j_2);
                    }
                    if (!hasFirstBound) {
                        debugAlert("no first bound: " + i_1 + " " + j_1);

                        return Number(i_1 * side) + Number(j_1);
                    }
                    break;
                default:
                    return new Error(
                        "Bad parameter: numberOfUnboundedSide " +
                            numberOfUnboundedSide +
                            " should be 1 or 2"
                    );
            }
        }
    }

    return -1;
}

function isFirstBounded(grid, side, i, j, alignmentNumber) {
    const bounds = computeBounds(i, j, 0); // Length doesn't matter for first bound
    const i_1 = bounds[alignmentNumber][0][0];
    const j_1 = bounds[alignmentNumber][0][1];
    if (!isInBound(side, i_1, j_1)) {
        return true;
    }
    const elem = getElem(grid, side, i_1, j_1);
    return elem != null;
}

function lengthBeforeSecondBound(grid, side, i, j, alignmentNumber) {
    var placeForSecondBound = 0;
    for (let length = 1; length < WINNING_LENGTH; length++) {
        const bounds = computeBounds(i, j, length);
        const i_2 = bounds[alignmentNumber][1][0];
        const j_2 = bounds[alignmentNumber][1][1];
        if (!isInBound(side, i_2, j_2)) {
            return length;
        }
        const elem = getElem(grid, side, i_2, j_2);
        if (elem !== null && elem !== getElem(grid, side, i, j)) {
            return length;
        } else {
            if (elem === null && placeForSecondBound === 0) {
                placeForSecondBound = length;
            }
        }
    }
    return -placeForSecondBound;
}

function computeBounds(i, j, length) {
    const tab = [
        [
            // Right down diag
            [[i - 1], [j - 1]],
            [[i + length], [j + length]],
        ],
        [
            // Left down diag
            [[i - 1], [j + 1]],
            [[i + length], [j - length]],
        ],
        [
            // Down column
            [[i - 1], [j]],
            [[i + length], [j]],
        ],
        [
            // Right line
            [[i], [j - 1]],
            [[i], [j + length]],
        ],
    ];
    return tab;
}
