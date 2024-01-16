const { logger } = require('../config/logger');
const { constructUrls, handleUrls, processData, retrieveAllDinoNames } = require('../utils/handleSetup');
const { writeData } = require('../utils/writeData');

/**
 * Asynchronously retrieves all dinosaur names, constructs URLs for each name, handles the URLs to get data objects, processes the data objects to filter and sort the names, and then writes the filtered names to a JSON file.
 * This function logs the start of the filtering process, the completion of the filtering process with the number of names that passed the filter, the total time taken to retrieve and filter the names, and the start of the data writing process.
 * @returns {Promise<void>} A Promise that resolves when the filtered names have been written to the JSON file.
 */
async function constructDinoNames() {
    const startTime = process.hrtime();
    const allDinoNames = await retrieveAllDinoNames();
    const urls = constructUrls(allDinoNames);
    const dataObjs = await handleUrls(urls);

    logger.info('Starting filtering process for dino names.');
    const names = processData(dataObjs).sort();
    logger.info(`Dinosaur name filtering completed. ${names.length} names passed the filter.`);

    const endTime = process.hrtime(startTime);
    const timeInSeconds = endTime[0] + endTime[1] / 1e9;
    const formattedSeconds = timeInSeconds.toFixed(2);
    logger.info(`Dinosaur name retrieval and filtering completed in ${formattedSeconds} seconds.`);

    logger.info('Proceeding to save filtered names to file.');
    await writeData({ names }, 'filteredNames.json');
}

constructDinoNames();

module.exports = {
    constructDinoNames,
};
