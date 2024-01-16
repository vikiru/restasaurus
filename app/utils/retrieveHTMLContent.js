const parser = require('node-html-parser');

const { fetchData } = require('./fetchData');
const { retrieveBoxData } = require('./handleClassification');
const { findDiet, findLocomotionType, findFeatureByClassification } = require('./handleFeature');

/**
 * Fetches and parses HTML from a specific Wikipedia page.
 *
 * @param {string} dinosaurName - The name of the dinosaur to fetch information about.
 * @returns {Promise<object>} The parsed HTML text.
 */
async function fetchAndParseHTML(dinosaurName) {
    const request = await fetchData(
        `https://en.wikipedia.org/w/api.php?action=parse&page=${dinosaurName}&prop=text&formatversion=2&format=json`,
    );
    const htmlText = request.parse.text;
    return parser.parse(htmlText);
}

/**
 * Retrieves the diet and locomotion type from the parsed HTML and updates the data object.
 *
 * @param {Object} parsedHTML - The parsed HTML object.
 * @param {Object} data - The data object to be updated.
 * @returns {Object} The updated data object.
 */
function retrieveDietAndLocomotionType(parsedHTML, data) {
    data.diet = findDiet(parsedHTML);
    data.locomotionType = findLocomotionType(parsedHTML);
    return data;
}

/**
 * Finds missing features in the data object.
 *
 * @param {Object} data - The data object.
 */
function findMissingFeatures(data) {
    if (data.diet === '' || data.locomotionType === '') {
        findFeatureByClassification(data);
    }
}

/**
 * Retrieves HTML content related to a specific dinosaur and updates the data object.
 *
 * @param {string} dinosaurName - The name of the dinosaur to fetch information about.
 * @param {object} data - The data object to be updated with retrieved information.
 * @returns {Promise<object>} The updated data object.
 */
async function retrieveHTMLContent(dinosaurName, data) {
    const parsedHTML = await fetchAndParseHTML(dinosaurName);
    data = retrieveBoxData(parsedHTML, data);
    data = retrieveDietAndLocomotionType(parsedHTML, data);
    data = findMissingFeatures(data);
    return data;
}

module.exports = {
    retrieveHTMLContent,
    fetchAndParseHTML,
    retrieveDietAndLocomotionType,
    findMissingFeatures,
};
