const { logger } = require('../config/logger');

const { fetchData } = require('./fetchData');
const { findDiet, findLocomotionType } = require('./handleFeature');
const { handleImageData } = require('./handleImage');
const { handleSourceInformation } = require('./handleSource');

/**
 * Constructs a URL for querying Wikipedia's API for an image of a dinosaur.
 *
 * @param {string} imageName - The name of the image to construct the query for.
 * @returns {string} The constructed URL.
 */
function getImageQueryURL(imageName) {
    return `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata|url&titles=File:${imageName}&format=json`;
}

/**
 * Constructs a URL for querying Wikipedia's API for information about a dinosaur.
 *
 * @param {string} dinosaurName - The name of the dinosaur to construct the query for.
 * @returns {string} The constructed URL.
 */
function getQueryURL(dinosaurName) {
    return `https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=rightsinfo&prop=revisions|pageimages|info|extracts&exintro=&explaintext=&inprop=url&titles=${dinosaurName}&format=json`;
}

/**
 * Extracts the page data from the result of a Wikipedia API query.
 *
 * @param {object} result - The result of a Wikipedia API query.
 * @returns {object} The extracted page data.
 */
function getPageData(result) {
    const pageDataKey = Object.keys(result.query.pages)[0];
    return result.query.pages[pageDataKey.toString()];
}

/**
 * Extracts the license information from the result of a Wikipedia API query.
 *
 * @param {object} result - The result of a Wikipedia API query.
 * @returns {object} The extracted license information.
 */
function getLicenseInfo(result) {
    return result.query.rightsinfo;
}

/**
 * Extracts the description from the page data of a Wikipedia API query.
 *
 * @param {object} pageData - The page data of a Wikipedia API query.
 * @returns {string} The extracted description.
 */
function getDescription(pageData) {
    return pageData.extract.split('\n')[0];
}

/**
 * Asynchronously retrieves information about a dinosaur from Wikipedia.
 *
 * @param {string} dinosaurName - The name of the dinosaur to retrieve information about.
 * @param {object} data - An object to store the retrieved information.
 * @returns {Promise<object>} The data object populated with the retrieved information.
 */
async function retrieveInformation(dinosaurName, data) {
    logger.info(`Fetching Wikipedia data for ${dinosaurName}.`);
    const result = await fetchData(getQueryURL(dinosaurName));
    const pageData = getPageData(result);
    const licenseInfo = getLicenseInfo(result);

    if (pageData.extract) {
        data.description = getDescription(pageData);
    }

    data.diet = findDiet(pageData);
    data.locomotionType = findLocomotionType(pageData);
    data.source = handleSourceInformation(data, dinosaurName, pageData, licenseInfo);

    if (pageData.pageimage) {
        logger.info(`Fetching Wikipedia image data for ${dinosaurName}.`);
        const imageResult = await fetchData(getImageQueryURL(pageData.pageimage));
        data = handleImageData(data, imageResult);
    }
    return data;
}

module.exports = {
    retrieveInformation,
    getPageData,
    getQueryURL,
    getDescription,
    getLicenseInfo,
    getImageQueryURL,
};
