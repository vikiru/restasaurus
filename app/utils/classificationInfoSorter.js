/**
 * Sorts an array of information based on a specified order.
 *
 * @param {Array} infoArray - The array of information to be sorted.
 * @param {Array} sortOrder - The order in which to sort the information.
 * @returns {Array} The sorted array of information.
 */
function sortInfo(infoArray, sortOrder) {
    return infoArray.sort((a, b) => {
        return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
    });
}

/**
 * Returns an array representing the sorting order for classes.
 *
 * @returns {Array} The sorting order for classes.
 */
function getClassSorter() {
    return ['Superclass', 'Class', 'Subclass', 'Infraclass', 'Subterclass', 'Parvclass'];
}

/**
 * Returns an array representing the sorting order for orders.
 *
 * @returns {Array} The sorting order for orders.
 */
function getOrderSorter() {
    return ['Magnorder', 'Superorder', 'Grandorder', 'Mirorder', 'Order', 'Suborder', 'Infraorder', 'Parvorder'];
}

/**
 * Returns an array representing the sorting order for families.
 *
 * @returns {Array} The sorting order for families.
 */
function getFamilySorter() {
    return ['Family', 'Subfamily'];
}

module.exports = {
    sortInfo,
    getClassSorter,
    getFamilySorter,
    getOrderSorter,
};
