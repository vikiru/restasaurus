const { keywordRegex } = require('./helperConstants').default;

/**
 * Assigns classification information to the data object based on the keyword and value.
 *
 * @param {object} data - The data object to assign classification information to.
 * @param {string} keyword - The keyword to determine the type of classification information.
 * @param {string} value - The value of the classification information.
 */
function assignClassificationInfo(data, keyword, value) {
    if (keyword === 'Scientific classification') {
        return;
    }
    const actions = {
        order: () =>
            data.classificationInfo.orderInfo.push({
                orderType: keyword,
                value,
            }),
        class: () =>
            data.classificationInfo.classInfo.push({
                classType: keyword,
                value,
            }),
        family: () =>
            data.classificationInfo.familyInfo.push({
                familyType: keyword,
                value,
            }),
        tribe: () =>
            data.classificationInfo.tribeInfo.push({
                tribeType: keyword,
                value,
            }),
        genus: () =>
            data.classificationInfo.genusInfo.push({
                genusType: keyword,
                value,
            }),
        clade: () => data.classificationInfo.clade.push(value),
        species: () =>
            data.classificationInfo.speciesInfo.push({
                speciesType: keyword,
                value,
            }),
        binomial: () =>
            data.classificationInfo.speciesInfo.push({
                speciesType: keyword,
                value,
            }),
    };
    const match = keyword.match(keywordRegex);
    let text = keyword.toLowerCase();
    if (match) {
        text = match[0].toLowerCase();
    }
    const action = actions[text];
    if (action) {
        action();
    } else {
        data.classificationInfo[text] = value;
    }
}

/**
 * Retrieves the information box from the HTML.
 *
 * @param {string} html - The HTML string.
 * @returns {object} The information box element.
 */
function getInfoBox(html) {
    return html
        .getElementsByTagName('table')
        .find((table) => table.attributes.class === 'infobox biota')
        .querySelector('tbody');
}

/**
 * Retrieves all row elements from the information box.
 *
 * @param {object} infoBox - The information box element.
 * @returns {Array} An array of row elements.
 */
function getRows(infoBox) {
    return infoBox.querySelectorAll('tr');
}

/**
 * Returns the temporal range value for a given Dinosaur.
 *
 * @param {Array} rowData - An array of data elements from a row.
 * @returns {string} The temporal range value.
 */
function handleTemporalRange(rowData) {
    return rowData.reduce((temporalRange, data) => {
        const text = data.trim();
        if (text.includes('Temporal range')) {
            return text.replace('Temporal range: ', '').trim();
        }
        if (text.includes('Ma') && !text.includes('Temporal range')) {
            return `${temporalRange}, ${text}`;
        }
        return temporalRange;
    }, '');
}

/**
 * Handles a row of data.
 *
 * @param {Array} rowData - An array of data elements from a row.
 * @param {object} data - The data object to populate.
 */
function handleRowData(rowData, data) {
    let keyword = rowData[0].structuredText.trim();
    if (!keywordRegex.test(keyword)) {
        keyword = rowData[0].structuredText.toLowerCase();
    }
    keyword = keyword.replace(':', '');
    let value = rowData[1].structuredText.trim().replace('†', '');
    if (value.includes('\n')) {
        [value] = value.split('\n');
    }
    assignClassificationInfo(data, keyword, value);
}

/**
 * Handles a header row of data.
 *
 * @param {Array} headerData - An array of header elements from a row.
 * @param {Array} rows - An array of row elements.
 * @param {object} data - The data object to populate.
 */
function handleHeaderData(headerData, rows, data) {
    const keyword = headerData[0].structuredText.trim();
    const index = rows.indexOf(rows) + 1;
    const headerRowData = rows[index].querySelectorAll('td');
    if (headerRowData.length > 0) {
        let value = headerRowData[0].structuredText.trim().replace('†', '');
        if (value.includes('\n')) {
            [value] = value.split('\n');
        }
        assignClassificationInfo(data, keyword, value);
    }
}

/**
 * Handles the first row of data.
 *
 * @param {object} firstRow - The first row element.
 * @param {object} data - The data object to populate.
 */
function handleFirstRow(firstRow, data) {
    const firstRowData = firstRow.structuredText.split('\n');
    data.name = firstRowData[0].trim();
    data.temporalrange = handleTemporalRange(firstRowData);
}

/**
 * Handles all other rows of data.
 *
 * @param {Array} rows - An array of row elements.
 * @param {object} data - The data object to populate.
 */
function handleOtherRows(rows, data) {
    rows.forEach((row) => {
        const rowData = row.querySelectorAll('td');
        const headerData = row.querySelectorAll('th');
        if (rowData.length > 1) {
            handleRowData(rowData, data);
        } else if (headerData.length === 1 && keywordRegex.test(headerData[0].structuredText.trim())) {
            handleHeaderData(headerData, rows, data);
        }
    });
}

/**
 * Retrieves the data from the information box section of a Wikipedia article.
 *
 * @param {string} html - The HTML string.
 * @param {object} data - The data object to populate.
 * @returns {object} The populated data object.
 */
function retrieveBoxData(html, data) {
    const infoBox = getInfoBox(html);
    const rows = getRows(infoBox);
    handleFirstRow(rows[0], data);
    handleOtherRows(rows, data);
    return data;
}

module.exports = {
    assignClassificationInfo,
    retrieveBoxData,
    getInfoBox,
    getRows,
    handleFirstRow,
    handleOtherRows,
    handleHeaderData,
    handleTemporalRange,
};
