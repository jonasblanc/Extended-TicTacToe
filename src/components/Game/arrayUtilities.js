/**
 * Return true if (i,j) is a valid position in the game grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 */
function isInBound(side, i, j) {
    if (0 <= i && i < side && 0 <= j && j < side) {
        return true;
    }
    return false;
}

/**
 * Return the element at position (i,j)
 * @param {*} grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 *
 */
function getElem(grid, side, i, j) {
    if (!isInBound(side, i, j)) {
        throw new Error("Index out of bound");
    }
    return grid[Number(i * side) + Number(j)];
}

//========================================== Count symbol for different alignments ==========================================//

/**
 * If symbol (i,j) is not null, count the number of same symbol on the down right diagonal of given length starting at (i,j)
 * @param {*} grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} length
 */
function countRightDownDiagOfLength(grid, side, i, j, length) {
    let count = 0;

    if (i <= side - length && j <= side - length && i >= 0 && j >= 0) {
        let symbol = getElem(grid, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(grid, side, i + it, j + it);
                if (elem === symbol) {
                    count++;
                }
            }
        }
    }
    return count;
}

/**
 * If symbol (i,j) is not null, count the number of same symbol on the left right diagonal of given length starting at (i,j)
 * @param {*} grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} length
 */
function countLeftDownDiagOfLength(grid, side, i, j, length) {
    let count = 0;
    if (i <= side - length && j < side && i >= 0 && j >= length - 1) {
        let symbol = getElem(grid, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(grid, side, i + it, j - it);
                if (elem === symbol) {
                    count++;
                }
            }
        }
    }
    return count;
}

/**
 * If symbol (i,j) is not null, count the number of same symbol on line of given length going to the right starting at (i,j)
 * @param {*} grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} length
 */
function countRightLineOfLength(grid, side, i, j, length) {
    let count = 0;
    if (i < side && j <= side - length && i >= 0 && j >= 0) {
        let symbol = getElem(grid, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(grid, side, i, j + it);
                if (elem === symbol) {
                    count++;
                }
            }
        }
    }
    return count;
}

/**
 * If symbol (i,j) is not null, count the number of same symbol on column of given length going down starting at (i,j)
 * @param {*} grid
 * @param {*} side
 * @param {*} i
 * @param {*} j
 * @param {*} length
 */
function countDownColumnOfLength(grid, side, i, j, length) {
    let count = 0;
    if (i <= side - length && j < side && i >= 0 && j >= 0) {
        let symbol = getElem(grid, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(grid, side, i + it, j);
                if (elem === symbol) {
                    count++;
                }
            }
        }
    }
    return count;
}

export {
    isInBound,
    getElem,
    countRightDownDiagOfLength,
    countLeftDownDiagOfLength,
    countDownColumnOfLength,
    countRightLineOfLength,
};

//========================================== Helpers for calculateWinner ==========================================//

function hasRightDownDiagOfLength(grid, side, i, j, length) {
    if (countRightDownDiagOfLength(grid, side, i, j, length) === length) {
        return getElem(grid, side, i, j);
    }
    return null;
}

function hasLeftDownDiagOfLength(grid, side, i, j, length) {
    if (countLeftDownDiagOfLength(grid, side, i, j, length) === length) {
        return getElem(grid, side, i, j);
    }
    return null;
}

function hasRightLineOfLength(grid, side, i, j, length) {
    if (countRightLineOfLength(grid, side, i, j, length) === length) {
        return getElem(grid, side, i, j);
    }
    return null;
}

function hasDownColumnOfLength(grid, side, i, j, length) {
    if (countDownColumnOfLength(grid, side, i, j, length) === length) {
        return getElem(grid, side, i, j);
    }
    return null;
}

//========================================== calculateWinner ==========================================//

/**
 * Return the winner's symbol or null if there is no winner
 * @param {*} grid
 * @param {*} side
 * @param {*} lengthToWin
 */
function calculateWinner(grid, side, lengthToWin) {
    const predicates = [
        hasRightDownDiagOfLength,
        hasLeftDownDiagOfLength,
        hasDownColumnOfLength,
        hasRightLineOfLength,
    ];
    for (let i = 0; i < side; ++i) {
        for (let j = 0; j < side; ++j) {
            for (let p = 0; p < predicates.length; ++p) {
                const symbol = predicates[p](grid, side, i, j, lengthToWin);
                if (symbol != null) {
                    return symbol;
                }
            }
        }
    }
    return null;
}

export { calculateWinner };
