import {
    isInBound,
    getElem,
    countRightDownDiagOfLength,
    countLeftDownDiagOfLength,
    countDownColumnOfLength,
    countRightLineOfLength,
} from "../arrayUtilities";

import random from "./random";

const WINNING_LENGTH = 5;
const OWN_ALIGNMENT = true;
const ADV_ALIGNMENT = false;
const ONE_BOUNDED = 1;
const UNBOUNDED = 2;
const NO_MATCH = -1;

const DEBUG = false;
/**
 * Alert when DEBUG is true
 * @param {*} message
 */
function debugAlert(message) {
    if (DEBUG) {
        alert(message);
    }
}

/**
 * Smart Bob, first generation "IA"
 * @param {*} grid
 * @param {*} side
 * @param {*} ownSymbol
 */
export default function smartBobNextMove(grid, side, ownSymbol) {
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

    // No vital move needed

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
 * @param {*} max - Max length (included)
 * @param {*} min - Min length (included)
 * @param {*} grid
 * @param {*} side
 * @param {*} ownSymbol
 * @param {*} isCheckingOwnCombi - true if searching for own alignment
 *
 * @return a position aligned with the alignment that fullfilled a predicate or -1 if no predicate fullfilled
 */
function checkPredict(predicates, max, min, grid, side, ownSymbol, isCheckingOwnCombi) {
    let next_pos = 0;

    // Check for the given length range
    for (let l = max; l >= min; --l) {
        // For all predicates
        for (let p = 0; p < predicates.length; ++p) {
            // Over the whole array
            for (let i = 0; i < side; ++i) {
                for (let j = 0; j < side; ++j) {
                    // If a preidacte is true return next move otherwise return NO_MATCH
                    next_pos = predicates[p](grid, side, i, j, ownSymbol, l, isCheckingOwnCombi);
                    if (next_pos !== NO_MATCH) {
                        return next_pos;
                    }
                }
            }
        }
    }
    return NO_MATCH;
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

const countFunctionArray = [
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

    for (let alignIdx = 0; alignIdx < countFunctionArray.length; ++alignIdx) {
        // Compute number of aligned symbols starting at pos (i,j)
        const size = countFunctionArray[alignIdx](array, side, i, j, WINNING_LENGTH);

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
            const hasFirstBound = isFirstBounded(array, side, i, j, alignIdx);
            const sizeSecondBound = lengthBeforeSecondBound(array, side, i, j, alignIdx);
            const hasSecondBound = sizeSecondBound > 0;
            const sizePotSecBound = -sizeSecondBound;

            const lengthSecBound = hasSecondBound ? sizeSecondBound : sizePotSecBound;

            const posFirstBound = computeBoundPos(
                i,
                j,
                side,
                lengthSecBound,
                alignIdx,
                FIRST_BOUND
            );
            const posSecBound = computeBoundPos(i, j, side, lengthSecBound, alignIdx, SECOND_BOUND);

            switch (numberOfUnboundedSide) {
                case UNBOUNDED:
                    if (!hasFirstBound && !hasSecondBound) {
                        if (sizePotSecBound > 0) {
                            return posSecBound;
                        } else {
                            return posFirstBound;
                        }
                    }
                    break;
                case ONE_BOUNDED:
                    if (!hasSecondBound && sizePotSecBound > 0) {
                        return posSecBound;
                    }
                    if (!hasFirstBound) {
                        return posFirstBound;
                    }
                    break;
                default:
                    throw new Error(
                        "Bad parameter: numberOfUnboundedSide " +
                            numberOfUnboundedSide +
                            " should be 1 or 2"
                    );
            }
        }
    }

    return NO_MATCH;
}

/**
 * Return true if the given alignment is first bounded
 * Here are the first bound represented by "b"
 * |--0--|--1--|--2--|--3--|
 * |-----|-----|-----|-----|
 * |-b---|---b-|-b---|-bxx-|
 * |--x--|--x--|-x---|-----|
 * |---x-|-x---|-x---|-----|
 * |-----|-----|-----|-----|
 * @param {*} grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} alignmentNumber
 */
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

/**
 * Return the distance to second bound if the alignment is second bounded
 * Return the to distance to the first place to second bound the alignemt if the alignment is not second bounded (in minus)
 * Example: |------| with(1,1) will return -2 because there is a place for second bound at distance 2
 *          |-xx-x-|
 * Here are an example of second bounds represented by "b"
 * |--0--|--1--|--2--|--3--|
 * |-----|-----|-----|-----|
 * |-x---|---x-|-x---|-xxb-|
 * |--x--|--x--|-x---|-----|
 * |---b-|-b---|-b---|-----|
 * |-----|-----|-----|-----|
 * @param {*} grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} alignmentNumber
 */
function lengthBeforeSecondBound(grid, side, i, j, alignmentNumber) {
    var placeForSecondBound = 0;
    for (let length = 1; length < WINNING_LENGTH; length++) {
        const bounds = computeBounds(i, j, length);
        const i_2 = bounds[alignmentNumber][1][0];
        const j_2 = bounds[alignmentNumber][1][1];

        // Blocked by the bound of the grid
        if (!isInBound(side, i_2, j_2)) {
            return length;
        }
        const elem = getElem(grid, side, i_2, j_2);
        // If there is a cell not null and filled with an other symbol => blocked
        if (elem !== null && elem !== getElem(grid, side, i, j)) {
            return length;
        } else {
            // Keep in mind the first empty space
            if (elem === null && placeForSecondBound === 0) {
                placeForSecondBound = length;
            }
        }
    }
    return -placeForSecondBound;
}

/**
 * Compute position in array of bound specified bound
 * @param {*} i
 * @param {*} j
 * @param {*} side
 * @param {*} length
 * @param {*} alignmentNumber
 * @param {*} boundNumber
 */
function computeBoundPos(i, j, side, length, alignmentNumber, boundNumber) {
    const bounds = computeBounds(i, j, length);
    const i_1 = bounds[alignmentNumber][boundNumber][0];
    const j_1 = bounds[alignmentNumber][boundNumber][1];
    return Number(i_1 * side) + Number(j_1);
}

/**
 * Compute bounds for all 4 alignemnts for the given length
 * @param {*} i
 * @param {*} j
 * @param {*} length
 */
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
