function isInBound(side, i, j) {
    if (0 <= i && i < side && 0 <= j && j < side) {
        return true;
    }
    return false;
}

function getElem(array, side, i, j) {
    if (!isInBound(side, i, j)) {
        alert("index out of bound");
    }
    return array[Number(i * side) + Number(j)];
}

function hasRightDownDiagOfLength(array, side, i, j, length) {
    if (countRightDownDiagOfLength(array, side, i, j, length) === length) {
        return getElem(array, side, i, j);
    }
    return null;
}

function countRightDownDiagOfLength(array, side, i, j, length) {
    let count = 0;

    if (i <= side - length && j <= side - length && i >= 0 && j >= 0) {
        let symbol = getElem(array, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(array, side, i + it, j + it);
                if (elem === symbol) {
                    count++;
                }
            }
        }
    }
    return count;
}

function hasLeftDownDiagOfLength(array, side, i, j, length) {
    if (countLeftDownDiagOfLength(array, side, i, j, length) === length) {
        return getElem(array, side, i, j);
    }
    return null;
}

function countLeftDownDiagOfLength(array, side, i, j, length) {
    let count = 0;
    if (i <= side - length && j < side && i >= 0 && j >= length - 1) {
        let symbol = getElem(array, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(array, side, i + it, j - it);
                if (elem === symbol) {
                    count++;
                }
            }
        }
    }
    return count;
}

function hasRightLineOfLength(array, side, i, j, length) {
    if (countRightLineOfLength(array, side, i, j, length) === length) {
        return getElem(array, side, i, j);
    }
    return null;
}
function countRightLineOfLength(array, side, i, j, length) {
    let count = 0;
    if (i < side && j <= side - length && i >= 0 && j >= 0) {
        let symbol = getElem(array, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(array, side, i, j + it);
                if (elem === symbol) {
                    count++;
                }
            }
        }
    }
    return count;
}

function hasDownColumnOfLength(array, side, i, j, length) {
    if (countDownColumnOfLength(array, side, i, j, length) === length) {
        return getElem(array, side, i, j);
    }
    return null;
}

function countDownColumnOfLength(array, side, i, j, length) {
    let count = 0;
    if (i <= side - length && j < side && i >= 0 && j >= 0) {
        let symbol = getElem(array, side, i, j);
        if (symbol != null) {
            count = 1;
            for (let it = 1; it < length; it++) {
                const elem = getElem(array, side, i + it, j);
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

function calculateWinner(array, side, lengthToWin) {
    const predicates = [
        hasRightDownDiagOfLength,
        hasLeftDownDiagOfLength,
        hasDownColumnOfLength,
        hasRightLineOfLength,
    ];
    for (let i = 0; i < side; ++i) {
        for (let j = 0; j < side; ++j) {
            for (let p = 0; p < predicates.length; ++p) {
                const symbol = predicates[p](array, side, i, j, lengthToWin);
                if (symbol != null) {
                    return symbol;
                }
            }
        }
    }
    return null;
}

export { calculateWinner };
