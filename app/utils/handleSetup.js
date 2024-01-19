const parser = require('node-html-parser');

const { logger } = require('../config/logger');

const { fetchData } = require('./fetchData');
const { writeData } = require('./writeData');

/**
 * Constructs URLs for fetching dinosaur data.
 *
 * @param {string[]} dinoNames - The names of the dinosaurs.
 * @returns {string[]} The constructed URLs.
 */
function constructUrls(dinoNames) {
    const baseUrl = 'https://en.wikipedia.org/w/api.php?';
    const groupSize = 10;
    const urls = [];
    for (let i = 0; i < dinoNames.length; i += groupSize) {
        const group = dinoNames.slice(i, i + groupSize);
        let result = group.join('|').trim();
        result = result.replace(',', '').trim();

        const url = `${baseUrl}action=query&prop=extracts&exintro&explaintext&titles=${result}&format=json`;
        urls.push(url);
    }
    return urls;
}

/**
 * Extracts data from the fetched pages.
 *
 * @param {object} pages - The fetched pages.
 * @returns {object[]} The extracted data objects.
 */
function extractDataFromPages(pages) {
    const dataObjs = [];
    Object.keys(pages).forEach((key) => {
        const page = pages[key];
        if ('extract' in page && 'title' in page) {
            const { title } = page;
            const { extract } = page;
            dataObjs.push({ title, extract });
        }
    });
    return dataObjs;
}

/**
 * Handles the fetching of data from the constructed URLs.
 *
 * @param {string[]} urls - The URLs to fetch data from.
 * @returns {Promise<object[]>} The fetched data objects.
 */
async function handleUrls(urls) {
    const dataObjs = [];
    logger.info('Starting Wikipedia info fetching from constructed URLs.');
    const startTime = process.hrtime();
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const result = await fetchData(url);
        const { pages } = result.query;
        dataObjs.push(...extractDataFromPages(pages));
    }
    const endTime = process.hrtime(startTime);
    const timeInSeconds = endTime[0] + endTime[1] / 1e9;
    const formattedSeconds = timeInSeconds.toFixed(2);
    logger.info(
        `Finished Wikipedia info fetching from constructed URLs. Total time taken: ${formattedSeconds} seconds.`,
    );
    return dataObjs;
}

/**
 * Checks if a dinosaur's extract matches the specified criteria.
 *
 * @param {string} extract - The dinosaur's extract.
 * @returns {boolean} Whether the extract matches the criteria.
 */
function isMatched(extract) {
    const locomotionRegex = /(bipedal|biped|flying|quadrupedal|quadruped)/gim;
    const dietRegex = /(\b\w*(ivore|ivorous))s?\b/gim;
    return dietRegex.test(extract) || locomotionRegex.test(extract);
}

/**
 * Processes the fetched data to find matching dinosaurs.
 *
 * @param {object[]} allData - The fetched data.
 * @returns {string[]} The names of the matching dinosaurs.
 */
function processData(allData) {
    const names = new Set();
    allData.forEach((data) => {
        if (isMatched(data.extract)) {
            names.add(data.title);
        }
    });
    return Array.from(names);
}

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
        const pattern = /href="\/wiki\/([^"]*)"/;
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
    const lists = div.querySelectorAll('ul');
    const filteredLists = lists.slice(1, 79);
    filteredLists.forEach((list) => {
        const items = list.querySelectorAll('li');
        items.forEach((item) => {
            const dinoName = extractNameFromItem(item);
            if (dinoName) {
                names.add(dinoName);
            }
        });
    });
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
    await writeData({ names }, 'allDinoNames.json');
    return names;
}

module.exports = {
    constructUrls,
    processData,
    handleUrls,
    extractDataFromPages,
    isMatched,
    extractDinoNames,
    extractNameFromItem,
    retrieveAllDinoNames,
};
