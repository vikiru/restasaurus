const parser = require('node-html-parser');

const { logger } = require('../config/logger');
const { MongooseData } = require('../models/MongooseData');
const { retrieveBoxData } = require('../utils/handleClassification');
const {
    findDiet,
    findLocomotionType,
    retrieveDietAndLocomotionType,
    findMissingFeatures,
} = require('../utils/handleFeature');
const { processImageData } = require('../utils/handleImage');
const { handleSourceInformation } = require('../utils/handleSource');
const { writeData } = require('../utils/writeData');

const { urlConstructor, urlHandler, retrieveAndFilterDinoData, readJSONFile } = require('./constructDinoNames');

/** @param names */
async function retrieveImageData(names) {
    const urls = urlConstructor(names, 'image');
    const { data } = await urlHandler(urls);
    await writeData(data, 'imageData.json');
    return data;
}

/** @param names */
async function retrieveHTMLData(names) {
    const urls = urlConstructor(names, 'html');
    console.log(urls.length);
    const { data } = await urlHandler(urls);
    await writeData(data, 'htmlData.json');
    return data;
}

/**
 * @param htmlData
 * @param mongooseData
 */
function processHTMLData(htmlData, mongooseData) {
    retrieveBoxData(htmlData, mongooseData);
    retrieveDietAndLocomotionType(htmlData, mongooseData);
    findMissingFeatures(mongooseData);
}

/**
 * @param pageData
 * @param htmlData
 * @param mongooseData
 */
function processPageData(pageData, htmlData, mongooseData) {
    if ('extract' in pageData) {
        mongooseData.diet = findDiet(pageData);
        mongooseData.locomotionType = findLocomotionType(pageData);
    } else {
        mongooseData.diet = findDiet(htmlData);
        mongooseData.locomotionType = findLocomotionType(htmlData);
    }
    mongooseData.source = handleSourceInformation(mongooseData, mongooseData.name, pageData, pageData.rightsInfo);
}

/**
 * @param pageData
 * @param imageData
 * @param htmlData
 */
async function processData(pageData, imageData, htmlData) {
    const parsedHTML = parser.parse(htmlData);
    const mongooseData = new MongooseData(pageData.title);
    processPageData(pageData, parsedHTML, mongooseData);
    processHTMLData(parsedHTML, mongooseData);
    processImageData(imageData, mongooseData);
    return mongooseData;
}

async function retrieveData() {
    const result = {};
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
        if (data !== undefined) {
            for (let i = 0; i < data.length; i++) {
                if ('pageimage' in data[i]) {
                    const fileName = `File:${data[i].pageimage.replace('&', '%26')}`;
                    imageNames.push(fileName);
                }
            }
            result.pageData = data;
            result.imageData = await retrieveImageData(imageNames);
            result.htmlData = await retrieveHTMLData(filteredNames);
            return result;
        }
    }
}

/**
 * @param pageData
 * @param imageData
 * @param htmlData
 */
async function processAllData() {
    const { pageData, imageData, htmlData } = await retrieveData();
    logger.info('Starting to process all retrieved data. This may take some time, please wait.');
    const startTime = process.hrtime();

    const promises = pageData.map((data, index) => {
        return processData(pageData[index], imageData[index], htmlData[index]);
    });
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
}

processAllData();

module.exports = {
    retrieveImageData,
    retrieveHTMLData,
    processPageData,
    processHTMLData,
    retrieveData,
    processData,
    processAllData,
};
