const { cladeDefaults, orderDefaults, familyDefaults } = require('./helperConstants');

/**
 * Finds a specific feature in the page data. The feature that is being searched for is the diet and locomotionType.
 *
 * @param {object} pageData - The page data to search.
 * @param {RegExp} featureRegex - The regular expression to match the feature.
 * @param {Array} replacements - The array of original and replacement pairs.
 * @returns {string} The found feature.
 */
function findFeature(pageData, featureRegex, replacements) {
    let feature = '';
    if ('extract' in pageData) {
        const matches = pageData.extract.match(featureRegex);
        if (matches && matches.length > 0) {
            [feature] = matches;
            replacements.forEach(([original, replacement]) => {
                feature = feature.replace(original, replacement);
            });
        }
    } else {
        const pageText = pageData.structuredText.split('\n');
        const featureCount = {};
        const filteredText = pageText.map((text) => text.trim()).filter((text) => featureRegex.test(text));
        filteredText.forEach((text) => {
            const match = featureRegex.exec(text);
            if (match) {
                let featureType = match[0].toLowerCase();
                replacements.forEach(([original, replacement]) => {
                    featureType = featureType.replace(original, replacement);
                });
                featureCount[featureType] = (featureCount[featureType] || 0) + 1;
            }
        });
        if (Object.keys(featureCount).length > 0) {
            const maxCountKey = Object.entries(featureCount).reduce((maxEntry, currentEntry) => {
                return currentEntry[1] > maxEntry[1] ? currentEntry : maxEntry;
            })[0];
            feature = maxCountKey;
        }
    }
    return feature;
}

/**
 * Finds the diet of a dinosaur from the page data.
 *
 * @param {object} pageData - The page data to search.
 * @returns {string} The found diet.
 */
function findDiet(pageData) {
    const dietRegex = /(\b\w*(ivore|ivorous))s?\b/gim;
    const replacements = [
        ['orous', 'ore'],
        ['mega', ''],
        ['vores', 'vore'],
    ];
    return findFeature(pageData, dietRegex, replacements);
}

/**
 * The function `findDescription` takes in HTML data and a name as parameters, and returns the first paragraph that
 * contains the given name.
 *
 * @param htmlData - The `htmlData` parameter is expected to be an HTML document or a DOM element that contains the HTML
 *   structure.
 * @param name - The name parameter is a string that represents the name of the dinosaur
 * @returns The structured text of the first paragraph that contains the given name.
 */
function findDescription(htmlData, name) {
    const paragraphs = htmlData.querySelectorAll('p');
    const filteredParagraphs = paragraphs.filter((paragraph) => paragraph.structuredText.includes(name));
    if (filteredParagraphs.length > 0) {
        const firstParagraph = filteredParagraphs[0];
        return firstParagraph.structuredText;
    }
}

/**
 * Finds the locomotion type of a dinosaur from the page data.
 *
 * @param {object} pageData - The page data to search.
 * @returns {string} The found locomotion type.
 */
function findLocomotionType(pageData) {
    const locomotionRegex = /(bipedal|biped|quadrupedal|quadruped|glide|gliding|flying|swim|swimming)/gim;
    const replacements = [
        ['pedal', 'ped'],
        ['swim', 'swimming'],
        ['glide', 'gliding'],
    ];
    return findFeature(pageData, locomotionRegex, replacements);
}

/**
 * Searches the classificationInfo of a dinosaur and updates the data object with its diet and locomotionType.
 *
 * @param {Array} items - The items to search.
 * @param {object} defaults - The default values.
 * @param {object} data - The data object to be updated.
 */
function searchClassification(items, defaults, data) {
    items.forEach((item) => {
        const value = item.value || item;
        if (value in defaults) {
            data.diet = data.diet || defaults[value].diet;
            data.locomotionType = data.locomotionType || defaults[value].locomotionType;
        }
    });
}

/**
 * The function "findFeatureByClassification" searches for specific features based on classification information.
 *
 * @param data - The `data` parameter is an object that contains information about the classification of a feature. It
 *   includes the `classificationInfo` property, which is an object that contains information about the feature's
 *   classification, such as the family, order, and clade it belongs to.
 */
function findFeatureByClassification(data) {
    const { classificationInfo } = data;
    const families = classificationInfo.familyInfo;
    const orders = classificationInfo.orderInfo;
    const clades = classificationInfo.clade;

    searchClassification(clades, cladeDefaults, data);
    searchClassification(families, familyDefaults, data);
    searchClassification(orders, orderDefaults, data);
}

/**
 * Retrieves the diet and locomotion type from the parsed HTML and updates the data object.
 *
 * @param {object} parsedHTML - The parsed HTML object.
 * @param {object} data - The data object to be updated.
 * @returns {object} The updated data object.
 */
function retrieveDietAndLocomotionType(parsedHTML, data) {
    data.diet = findDiet(parsedHTML);
    data.locomotionType = findLocomotionType(parsedHTML);
}

/**
 * Finds missing features in the data object.
 *
 * @param {object} data - The data object.
 */
function findMissingFeatures(data) {
    if (data.diet === '' || data.locomotionType === '') {
        findFeatureByClassification(data);
    }
}

module.exports = {
    findFeature,
    findDiet,
    findDescription,
    findLocomotionType,
    findFeatureByClassification,
    searchClassification,
    retrieveDietAndLocomotionType,
    findMissingFeatures,
};
