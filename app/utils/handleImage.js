const parser = require('node-html-parser');

/**
 * Handles the author information in the data.
 *
 * @param {object} data - The data object to handle.
 * @param {string} authorInfo - The author information to handle.
 * @returns {object} The handled data object.
 */
function handleAuthor(data, authorInfo) {
    if (authorInfo.startsWith('<a') || authorInfo.includes('href=')) {
        const authorAnchor = parser.parse(authorInfo);
        const { innerHTML, structuredText } = authorAnchor;
        data.image.author = structuredText;
        const hrefRegex = /href="[/]*([\w]*[^"]*)/gim;
        const match = hrefRegex.exec(innerHTML);
        if (match && match[1]) {
            data.image.authorURL = `https://${match[1]}`;
        }
    } else {
        data.image.author = authorInfo;
        data.image.authorURL = '';
    }
    return data;
}

/**
 * Gets the main data from the result object.
 *
 * @param {object} result - The result object to get the main data from.
 * @returns {object} The main data.
 */
function getMainData(result) {
    return result.query.pages[Object.keys(result.query.pages)[0]];
}

/**
 * Gets the image title from the title string.
 *
 * @param {string} title - The title string to get the image title from.
 * @returns {string} The image title.
 */
function getImageTitle(title) {
    const imageTitle = title.replace('File:', '');
    const extension = imageTitle.lastIndexOf('.');
    return imageTitle.substring(0, extension);
}

/**
 * Gets the image description from the metadata object.
 *
 * @param {object} metaData - The metadata object to get the image description from.
 * @returns {string} The image description.
 */
function getImageDescription(metaData) {
    if (metaData.ImageDescription) {
        return parser.parse(metaData.ImageDescription.value).structuredText;
    }
    return '';
}

/**
 * Gets the license from the metadata object.
 *
 * @param {object} metaData - The metadata object to get the license from.
 * @returns {string} The license.
 */
function getLicense(metaData) {
    if (metaData.LicenseShortName && metaData.LicenseShortName.value !== 'Public domain' && metaData.UsageTerms) {
        return metaData.UsageTerms.value;
    }
    return metaData.LicenseShortName.value;
}

/**
 * Gets the license URL from the metadata object.
 *
 * @param {object} metaData - The metadata object to get the license URL from.
 * @returns {string} The license URL.
 */
function getLicenseURL(metaData) {
    if (metaData.LicenseShortName && metaData.LicenseShortName.value !== 'Public domain' && metaData.LicenseUrl) {
        return metaData.LicenseUrl.value;
    }
    return 'https://creativecommons.org/public-domain/';
}

/**
 * Gets the date created from the metadata object.
 *
 * @param {object} metaData - The metadata object to get the date created from.
 * @returns {string} The date created.
 */
function getDateCreated(metaData) {
    if (metaData.DateTime) {
        return new Date(metaData.DateTime.value).toISOString();
    }
    return '';
}

/**
 * Handles the image data in the data.
 *
 * @param {object} data - The data object to handle.
 * @param {object} result - The result object to handle.
 * @returns {object} The handled data object.
 */
function handleImageData(data, result) {
    const mainData = getMainData(result);
    if (mainData.imageinfo) {
        const {
            imageinfo: [imageInfo],
            title,
        } = mainData;
        const { extmetadata: metaData } = imageInfo;

        data.image.title = getImageTitle(title);
        data.image.description = getImageDescription(metaData);
        if ('Artist' in metaData) {
            data = handleAuthor(data, metaData.Artist.value);
        } else if ('Credit' in metaData && !('Artist' in metaData)) {
            data = handleAuthor(data, metaData.Credit.value);
        }
        data.image.imageURL = imageInfo.descriptionurl;
        data.image.license = getLicense(metaData);
        data.image.licenseURL = getLicenseURL(metaData);
        data.image.dateCreated = getDateCreated(metaData);
        data.image.dateAccessed = new Date().toISOString();
    }
    return data;
}

module.exports = {
    handleAuthor,
    handleImageData,
    getMainData,
    getImageTitle,
    getImageDescription,
    getLicense,
    getLicenseURL,
    getDateCreated,
};
