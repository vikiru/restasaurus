/**
 * Gets the Wikipedia URL from the page data.
 *
 * @param {object} pageData - The page data to get the URL from.
 * @returns {string} The Wikipedia URL.
 */
function getWikipediaURL(pageData) {
    return pageData.fullurl || '';
}

/**
 * Gets the last revision from the page data.
 *
 * @param {object} pageData - The page data to get the last revision from.
 * @returns {string} The last revision.
 */
function getLastRevision(pageData) {
    if (pageData.revisions && pageData.revisions[0]) {
        return pageData.revisions[0].timestamp || '';
    }
    return '';
}

/**
 * Gets the revision history URL for a dinosaur.
 *
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The revision history URL.
 */
function getRevisionHistoryURL(dinosaurName) {
    return `https://en.wikipedia.org/w/index.php?title=${dinosaurName}&action=history`;
}

/**
 * Gets the license from the license information.
 *
 * @param {object} licenseInfo - The license information to get the license from.
 * @returns {string} The license.
 */
function getLicense(licenseInfo) {
    return licenseInfo.text || '';
}

/**
 * Gets the license URL from the license information.
 *
 * @param {object} licenseInfo - The license information to get the license URL from.
 * @returns {string} The license URL.
 */
function getLicenseURL(licenseInfo) {
    return licenseInfo.url || '';
}

/**
 * Gets the permalink for a dinosaur from the page data.
 *
 * @param {string} dinosaurName - The name of the dinosaur.
 * @param {object} pageData - The page data to get the permalink from.
 * @returns {string} The permalink.
 */
function getPermalink(dinosaurName, pageData) {
    if (dinosaurName && pageData.revisions && pageData.revisions[0]) {
        return `https://en.wikipedia.org/w/index.php?title=${dinosaurName}&oldid=${pageData.revisions[0].revid}`;
    }
    return '';
}

/**
 * Formats a date string.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Creates a citation from the source data.
 *
 * @param {object} sourceData - The source data to create a citation from.
 * @returns {string} The created citation.
 */
function createCitation(sourceData) {
    const formattedRevision = formatDate(sourceData.lastRevision);
    const formattedAccessed = formatDate(sourceData.dateAccessed);

    const citation = `${sourceData.author}. "${sourceData.pageTitle}." ${sourceData.source}. ${sourceData.publisher}, ${formattedRevision}. Web. ${formattedAccessed}.`;
    return citation;
}

/**
 * Processes the retrieved source data from the Wikipedia api and updates the source information of the MongooseData
 * instance.
 *
 * @param {object} data - The data object to handle.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @param {object} pageData - The page data to handle.
 * @param {object} licenseInfo - The license information to handle.
 * @returns {object} The source information of the data.
 */
function handleSourceInformation(data, dinosaurName, pageData, licenseInfo) {
    data.source.pageTitle = dinosaurName;
    data.source.wikipediaURL = getWikipediaURL(pageData);
    data.source.lastRevision = getLastRevision(pageData);
    data.source.revisionHistoryURL = getRevisionHistoryURL(dinosaurName);
    data.source.dateAccessed = new Date().toISOString();
    data.source.license = getLicense(licenseInfo);
    data.source.licenseURL = getLicenseURL(licenseInfo);
    data.source.permalink = getPermalink(dinosaurName, pageData);
    data.source.citation = createCitation(data.source);
    return data.source;
}

module.exports = {
    handleSourceInformation,
    createCitation,
    getWikipediaURL,
    getLastRevision,
    getRevisionHistoryURL,
    getLicense,
    getLicenseURL,
    getPermalink,
};
