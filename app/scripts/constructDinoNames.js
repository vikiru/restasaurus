const fs = require('fs');

const { logger } = require('../config/logger');
const { fetchData } = require('../utils/fetchData');
const { REQUEST_DELAY } = require('../utils/helperConstants');
const { retrieveAllDinoNames } = require('../utils/retrieveAllDinoNames');
const { writeData } = require('../utils/writeData');

/**
 * The `delay` function returns a promise that resolves after a specified amount of time.
 *
 * @param time - The `time` parameter is the duration in milliseconds for which the delay should occur.
 * @returns A Promise object.
 */
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

/**
 * The function returns a URL for querying image information from Wikipedia based on a given list of names.
 *
 * @param names - The `names` parameter is an array of strings that represents the names of the images you want to
 *   query.
 * @returns A URL string that can be used to query image information from the Wikipedia API.
 */
function constructImageQuery(names) {
    return `action=query&prop=imageinfo&iiprop=extmetadata|url&titles=${names}&format=json`;
}

/**
 * Returns a string that represents a query for page information in a specific format.
 *
 * @param names - The `names` parameter is an array of page titles to query.
 * @returns A string that represents a query for a group of pages.
 */
function constructPageQuery(names) {
    return `action=query&meta=siteinfo&siprop=rightsinfo&prop=revisions|pageimages|info|extracts&exintro=&explaintext=&inprop=url&titles=${names}&format=json`;
}

/**
 * The function returns an HTML query string for parsing a specific page.
 *
 * @param name - The name parameter is the name of the page to query.
 * @returns A string that represents an HTML query.
 */
function constructHTMLQuery(name) {
    return `action=parse&page=${name}&prop=text&formatversion=2&format=json`;
}

/**
 * Takes a result and a queryType as parameters and returns a query based on the queryType.
 *
 * @param result - The `result` parameter is the data used to construct the query, typically a string
 * @param queryType - The `queryType` parameter is a string that specifies the type of query to be constructed. It can
 *   have one of the following values: "dino", "image", or "html".
 * @returns The function `getQueryByType` returns the result of calling the appropriate query function based on the
 *   `queryType` parameter.
 */
function getQueryByType(result, queryType) {
    const queryFunctions = {
        dino: constructPageQuery,
        image: constructImageQuery,
        html: constructHTMLQuery,
    };
    const queryFunction = queryFunctions[queryType];
    if (queryFunction) {
        return queryFunction(result);
    }
}

/**
 * The function `handleMultiplePages` takes an array of names and a query type, and returns an array of URLs based on
 * the Wikipedia API.
 *
 * @param names - An array of names. Each name represents a page on Wikipedia.
 * @param queryType - The queryType parameter is a string that specifies the type of query to be performed. It
 *   determines the specific API query parameters to be used in the URL.
 * @returns The function `handleMultiplePages` returns an array of URLs.
 */
function handleMultiplePages(names, queryType) {
    const baseUrl = 'https://en.wikipedia.org/w/api.php?';
    const groupSize = 50;
    const urls = [];
    for (let i = 0; i < names.length; i += groupSize) {
        const group = names.slice(i, i + groupSize);
        const result = group.join('|');
        const query = getQueryByType(result, queryType);
        const url = `${baseUrl}${query}`;
        urls.push(url);
    }
    return urls;
}

/**
 * The function `handleSinglePage` takes an array of names and a query type, and returns an array of URLs based on the
 * names and query type.
 *
 * @param names - An array of names (strings) representing the pages you want to query.
 * @param queryType - The `queryType` parameter is a string that specifies the type of query to be performed on the
 *   Wikipedia API. It determines what information will be retrieved for each name in the `names` array.
 * @returns An array of URLs.
 */
function handleSinglePage(names, queryType) {
    const baseUrl = 'https://en.wikipedia.org/w/api.php?';
    const urls = [];
    for (let i = 0; i < names.length; i++) {
        const result = names[i];
        const query = getQueryByType(result, queryType);
        const url = `${baseUrl}${query}`;
        urls.push(url);
    }
    return urls;
}

/**
 * Takes an array of names and a query type, and constructs a list of URLs for querying the Wikipedia API.
 *
 * @param names - An array of names that will be used to construct the URL. Each name will be included in the URL as a
 *   parameter.
 * @param queryType - The queryType parameter is a string that specifies the type of query to be constructed.
 * @returns An array of URLs.
 */
function urlConstructor(names, queryType) {
    let urls;
    if (queryType === 'html') {
        urls = handleSinglePage(names, queryType);
    } else {
        urls = handleMultiplePages(names, queryType);
    }
    return urls;
}

/**
 * The function `constructDinoNames` reads dinosaur names from a JSON file, and if it fails, it retrieves the names from
 * the Wikipedia API.
 *
 * @returns The function `constructDinoNames` returns a promise that resolves to the `names` variable.
 */
async function constructDinoNames() {
    let names;
    try {
        const data = await fs.promises.readFile('./allDinoNames.json', 'utf8');
        names = JSON.parse(data);
        logger.info('Successfully read all dino names from JSON file.');
        return names;
    } catch (err) {
        logger.error(`Read file failed: ${err.message}\nProceeding to retrieve name data from Wikipedia API.`);
        names = await retrieveAllDinoNames();
        return names;
    }
}

/**
 * The `urlHandler` function fetches data from multiple URLs and returns the collected data.
 *
 * @param urls - An array of URLs from which data needs to be fetched.
 * @param requestDelay
 * @returns An object with a property called "data". The value of "data" is an array that contains the fetched data from
 *   the URLs.
 */
async function urlHandler(urls, requestDelay) {
    const data = [];
    const total = urls.length;
    for (const url of urls) {
        const index = urls.indexOf(url) + 1;
        logger.info(`Fetching data from URL (${index} of ${total}): ${url}`);
        const urlResult = await fetchData(url);
        if (urlResult && 'query' in urlResult && 'pages' in urlResult.query) {
            const pageData = Object.values(urlResult.query.pages);
            const rightsInfo = urlResult.query.rightsinfo;
            for (const page of pageData) {
                page.rightsInfo = rightsInfo;
            }
            data.push(pageData);
        } else if (urlResult && 'parse' in urlResult && 'text' in urlResult.parse) {
            const pageHTML = urlResult.parse.text;
            data.push(pageHTML);
        }
        await requestDelay;
    }
    const result = { data: data.flat() };
    return result;
}

/**
 * The function retrieves data from multiple URLs based on a given array of names.
 *
 * @param names - The `names` parameter is an array of names.
 * @returns The data retrieved from the URLs.
 */
async function retrievePageData(names) {
    const urls = urlConstructor(names, 'dino');
    const { data } = await urlHandler(urls, delay(REQUEST_DELAY));
    return data;
}

/**
 * The function filters dinosaur data by checking if each data object has a 'pageimage' property, and then saves the
 * filtered data and names to JSON files.
 *
 * @param data - The `data` parameter is an array of objects representing dinosaur data. Each object in the array should
 *   have a `title` property and a `pageimage` property.
 * @returns An array of filtered dinosaur names.
 */
async function filterDinoNames(data) {
    logger.info('Filtering retrieved dinosaur data.');
    const filteredData = data.filter((dinoData) => 'pageimage' in dinoData);
    const filteredNames = [];
    filteredData.forEach((dinoData) => filteredNames.push(dinoData.title));
    logger.info(
        'Successfully finished filtering dinosaur data. Proceeding to save filtered data and names to JSON files.',
    );
    await writeData(filteredData, 'pageData.json');
    await writeData(filteredNames, 'filteredNames.json');
    return filteredNames;
}

/**
 * The function reads a JSON file asynchronously and returns the parsed data.
 *
 * @param filePath - The `filePath` parameter is a string that represents the path to the JSON file that you want to
 *   read. It should include the file name and extension.
 * @returns A promise that resolves to the parsed JSON data from the file.
 */
async function readJSONFile(filePath) {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

/**
 * The function retrieves and filters dinosaur data from a JSON file, and if that fails, it retrieves the data from the
 * Wikipedia API.
 *
 * @returns An object containing two properties: "data" and "filteredNames".
 */
async function retrieveAndFilterDinoData() {
    const dinoData = {};
    try {
        logger.info('Attempting to read page data and filtered names from JSON file.');
        dinoData.data = await readJSONFile('./pageData.json');
        dinoData.filteredNames = await readJSONFile('./filteredNames.json');
        logger.info('Successfully read page data and filtered names from JSON file.');
        return dinoData;
    } catch (error) {
        logger.error(`Read file failed: ${error.message}\nProceeding to retrieve data from Wikipedia API.`);
        const names = await constructDinoNames();
        logger.info('Retrieving page data for all dinosaurs from Wikipedia API');
        dinoData.data = await retrievePageData(names);
        dinoData.filteredNames = await filterDinoNames(dinoData.data);
        return dinoData;
    }
}

module.exports = {
    delay,
    constructDinoNames,
    constructImageQuery,
    constructHTMLQuery,
    constructPageQuery,
    handleSinglePage,
    handleMultiplePages,
    urlConstructor,
    urlHandler,
    getQueryByType,
    retrievePageData,
    retrieveAndFilterDinoData,
    filterDinoNames,
    readJSONFile,
};
