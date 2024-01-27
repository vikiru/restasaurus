const parser = require('node-html-parser');

const { logger } = require('../config/logger');

const { fetchData } = require('./fetchData');
const { writeData } = require('./writeData');

/**
 * Extracts a dinosaur name from an HTML item.
 *
 * @param {object} item - The HTML item to extract a name from.
 * @returns {string | null} The extracted dinosaur name, or null if no name was found.
 */
function extractNameFromItem(item) {
    const iTag = item.querySelector('i');
    if (iTag) {
        const { innerHTML } = iTag;
        const pattern = /<a href="\/wiki\/([^"]*)"(?!.*class="mw-redirect")/;
        const match = innerHTML.match(pattern);
        if (match) {
            return match[1].trim();
        }
    }
    return null;
}

/**
 * Extracts dinosaur names from the HTML text.
 *
 * @param {object} htmlText - The HTML text to extract names from.
 * @returns {string[]} The extracted dinosaur names.
 */
function extractDinoNames(htmlText) {
    const names = new Set();
    const div = htmlText.querySelector('.mw-content-ltr');
    if (div) {
        const lists = div.querySelectorAll('ul');
        lists.forEach((list) => {
            const items = list.querySelectorAll('li');
            items.forEach((item) => {
                const dinoName = extractNameFromItem(item);
                if (dinoName) {
                    names.add(dinoName);
                }
            });
        });
    }
    return Array.from(names);
}

/**
 * Retrieves all dinosaur names.
 *
 * @returns {Promise<string[]>} The retrieved dinosaur names.
 */
async function retrieveAllDinoNames() {
    logger.info('Retrieving all dino names.');
    const startTime = process.hrtime();
    const data = await fetchData(
        'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_dinosaur_genera&prop=text&formatversion=2&format=json',
    );

    const htmlText = parser.parse(data.parse.text);
    const names = extractDinoNames(htmlText).sort();

    const endTime = process.hrtime(startTime);
    const timeInSeconds = endTime[0] + endTime[1] / 1e9;
    const formattedSeconds = timeInSeconds.toFixed(2);
    logger.info(
        `Finished retrieving all dinosaur names in ${formattedSeconds} seconds. ${names.length} names were retrieved.`,
    );
    logger.info(`Saving names to file.`);
    await writeData(names, 'allDinoNames.json');
    return names;
}

module.exports = {
    extractDinoNames,
    extractNameFromItem,
    retrieveAllDinoNames,
};
