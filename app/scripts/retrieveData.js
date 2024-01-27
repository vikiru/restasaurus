const parser = require('node-html-parser');

const { logger } = require('../config/logger');
const { MongooseData } = require('../models/MongooseData');
const { retrieveBoxData } = require('../utils/handleClassification');
const {
    findDiet,
    findLocomotionType,
    retrieveDietAndLocomotionType,
    findMissingFeatures,
    findDescription,
} = require('../utils/handleFeature');
const { processImageData } = require('../utils/handleImage');
const { handleSourceInformation } = require('../utils/handleSource');
const { writeData } = require('../utils/writeData');

const { urlConstructor, urlHandler, retrieveAndFilterDinoData, readJSONFile } = require('./constructDinoNames');

/**
 * The function `retrieveImageData` attempts to retrieve image data from a JSON file, and if that fails, it retrieves
 * the data from the Wikipedia API and saves it to the JSON file.
 *
 * @param names - The `names` parameter is an array of names. It is used to construct URLs for retrieving image data
 *   from the Wikipedia API. Each name in the array will be used to construct a separate URL.
 * @returns The function `retrieveImageData` returns the image data that is retrieved either from the JSON file or from
 *   the Wikipedia API.
 */
async function retrieveImageData(names) {
    try {
        logger.info('Attempting to retrieve image data from JSON file.');
        const data = await readJSONFile('./imageData.json');
        logger.info('Successfully retrieved image data from JSON file');
        return data;
    } catch (error) {
        logger.error(`Read file failed: ${error.message}. Proceeding to retrieve image data from Wikipedia API.`);
        const urls = urlConstructor(names, 'image');
        logger.info('Starting to retrieve image data from Wikipedia API.');
        const startTime = process.hrtime();

        const { data } = await urlHandler(urls);
        const endTime = process.hrtime(startTime);
        const timeInSeconds = endTime[0] + endTime[1] / 1e9;
        const formattedSeconds = timeInSeconds.toFixed(2);

        logger.info(
            `Successfully retrieved all image data from Wikipedia API. Total time taken is ${formattedSeconds} seconds. Data for ${data.length} images was retrieved.`,
        );
        logger.info('Proceeding to save image data to file');
        await writeData(data, 'imageData.json');
        return data;
    }
}

/**
 * The function `retrieveHTMLData` retrieves HTML data either from a JSON file or from the Wikipedia API, and saves the
 * data to a file if necessary.
 *
 * @param names - The `names` parameter is an array of dinosaur names. It is used to construct URLs for retrieving HTML
 *   data from the Wikipedia API.
 * @returns The function `retrieveHTMLData` returns the HTML data retrieved from either a JSON file or the Wikipedia
 *   API.
 */
async function retrieveHTMLData(names) {
    try {
        logger.info('Attempting to retrieve HTML data from JSON file.');
        const data = await readJSONFile('./htmlData.json');
        logger.info('Successfully retrieved html data from JSON file');
        return data;
    } catch (error) {
        const urls = urlConstructor(names, 'html');

        logger.info('Starting to retrieve HTML data from Wikipedia API.');
        const startTime = process.hrtime();

        const { data } = await urlHandler(urls);
        const endTime = process.hrtime(startTime);
        const timeInSeconds = endTime[0] + endTime[1] / 1e9;
        const formattedSeconds = timeInSeconds.toFixed(2);

        logger.info(
            `Successfully retrieved all HTML data from Wikipedia API. Total time taken is ${formattedSeconds} seconds. Data for ${data.length} dinosaurs was retrieved.`,
        );
        logger.info('Proceeding to save HTML data to file');
        await writeData(data, 'htmlData.json');
        return data;
    }
}

/**
 * The function processes HTML data and Mongoose data to retrieve box data, diet and locomotion type, and find missing
 * features.
 *
 * @param htmlData - The HTML data that contains information about the mongoose.
 * @param mongooseData - The `mongooseData` parameter is likely an object or an array that contains data retrieved from
 *   a MongoDB database using Mongoose. It could be used to store and manipulate data related to mongoose objects or
 *   documents.
 */
function processHTMLData(htmlData, mongooseData) {
    retrieveBoxData(htmlData, mongooseData);
    retrieveDietAndLocomotionType(htmlData, mongooseData);
    findMissingFeatures(mongooseData);
}

/**
 * The function processes page data and updates mongoose data with information about diet, locomotion type, and source
 * information.
 *
 * @param pageData - An object containing data extracted from a webpage. It may have properties such as 'extract',
 *   'rightsInfo', and 'name'.
 * @param htmlData - The `htmlData` parameter is the HTML content of a webpage. It is used as a fallback if the
 *   `pageData` object does not contain the necessary information.
 * @param mongooseData - An object that contains data related to a mongoose. It likely has properties such as "diet",
 *   "locomotionType", "name", and "source".
 */
function processPageData(pageData, htmlData, mongooseData) {
    if ('extract' in pageData) {
        mongooseData.description = pageData.extract.split('\n')[0];
        mongooseData.diet = findDiet(pageData);
        mongooseData.locomotionType = findLocomotionType(pageData);
    } else {
        mongooseData.description = findDescription(htmlData, mongooseData.name) || '';
        mongooseData.diet = findDiet(htmlData);
        mongooseData.locomotionType = findLocomotionType(htmlData);
    }
    mongooseData.source = handleSourceInformation(mongooseData, mongooseData.name, pageData, pageData.rightsInfo);
}

/**
 * The function processData takes in pageData, imageData, and htmlData, parses the HTML data, creates a new MongooseData
 * object, and processes the page data, HTML data, and image data to populate the MongooseData object, then returns the
 * populated MongooseData object.
 *
 * @param pageData - An object containing data about the page, such as the title.
 * @param imageData - The `imageData` parameter is the data related to images that needs to be processed. It could be an
 *   array of image objects, where each object contains information such as image URL, image size, image format, etc.
 * @param htmlData - The `htmlData` parameter is the raw HTML data that you want to process. It could be a string
 *   containing the HTML code of a webpage.
 * @returns The `mongooseData` object.
 */
async function processData(pageData, imageData, htmlData) {
    const parsedHTML = parser.parse(htmlData);
    const mongooseData = new MongooseData(pageData.title);
    processHTMLData(parsedHTML, mongooseData);
    processPageData(pageData, parsedHTML, mongooseData);
    processImageData(imageData, mongooseData);
    return mongooseData;
}

/**
 * The function `retrieveData` attempts to read data from JSON files, and if that fails, it retrieves data from the
 * Wikipedia API.
 *
 * @returns The function `retrieveData()` returns a promise that resolves to an object with three properties:
 *   `pageData`, `htmlData`, and `imageData`.
 */
async function retrieveData() {
    const result = {
        pageData: undefined,
        htmlData: undefined,
        imageData: undefined,
    };
    try {
        logger.info('Attempting to read page, image and html data from JSON files.');
        result.pageData = await readJSONFile('./pageData.json');
        result.imageData = await readJSONFile('./imageData.json');
        result.htmlData = await readJSONFile('./htmlData.json');
        logger.info('Successfully read data from JSON files.');
        return result;
    } catch (error) {
        logger.error(`Read file failed: ${error.message}\nProceeding to retrieve data from Wikipedia API.`);
        const { data, filteredNames } = await retrieveAndFilterDinoData();
        const imageNames = [];
        for (const dataElement of data) {
            if ('pageimage' in dataElement) {
                const fileName = `File:${dataElement.pageimage.replace('&', '%26')}`;
                imageNames.push(fileName);
            }
        }
        result.pageData = data;
        result.imageData = await retrieveImageData(imageNames);
        result.htmlData = await retrieveHTMLData(filteredNames);
        return result;
    }
}

/**
 * The function `processAllData` retrieves data from multiple sources, processes it, filters out irrelevant data, saves
 * the processed data to a file, and logs the total time taken for the entire process.
 */
async function processAllData() {
    const totalTimeStart = process.hrtime();
    const { pageData, imageData, htmlData } = await retrieveData();

    logger.info('Starting to process all retrieved data. This may take some time, please wait.');
    const startTime = process.hrtime();

    const promises = [];
    for (let index = 0; index < pageData.length; index++) {
        promises.push(processData(pageData[index], imageData[index], htmlData[index]));
    }
    const result = await Promise.all(promises);

    const endTime = process.hrtime(startTime);
    const timeInSeconds = endTime[0] + endTime[1] / 1e9;
    const formattedSeconds = timeInSeconds.toFixed(2);

    const filteredData = result.filter((res) => res.classificationInfo.domain !== '');
    logger.info(
        `Finished processing all dinosaur data in ${formattedSeconds} seconds. ${filteredData.length} dinosaurs were processed.`,
    );
    logger.info('Proceeding to save data to file.');
    await writeData(filteredData, 'dinosaurData.json');

    const totalTimeEnd = process.hrtime(totalTimeStart);
    const totalTimeSeconds = totalTimeEnd[0] + totalTimeEnd[1] / 1e9;
    const formattedTotalSeconds = totalTimeSeconds.toFixed(2);
    logger.info(
        `Total time to retrieve all data from Wikipedia API and save to file: ${formattedTotalSeconds} seconds.`,
    );

    return filteredData;
}

processAllData();

module.exports = {
    retrieveHTMLData,
    retrieveImageData,
    processPageData,
    processHTMLData,
    retrieveData,
    processData,
    processAllData,
};
