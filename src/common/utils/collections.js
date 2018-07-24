// helper functions that work on collections
/**
 * Immediately add an element to an array, and return a function, which remove that element from array when invoked
 * @param col
 * @returns {function(*=): function(): undefined}
 */
function addRemove(col) {
    return (element) => {

        col.push(element);

        return () => remove1Mutate(col, element);
    };
}

exports.addRemove = addRemove;

/**
 * Remove an element from an array, mutating that array, returns undefined
 * @param col the target array
 * @param targetElem
 */
function remove1Mutate(col, targetElem) {
    if (col == null) {
        return;
    }

    let i = col.indexOf(targetElem);
    if (i === -1) {
        return;
    }
    col.splice(i, 1);
}
exports.remove1Mutate = remove1Mutate;