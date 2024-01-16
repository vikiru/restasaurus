const { logger } = require('../config/logger');
const { MongooseData } = require('../models/MongooseData');
const { retrieveHTMLContent } = require('../utils/retrieveHTMLContent');
const { retrieveInformation } = require('../utils/retrieveInformation');
const { writeData } = require('../utils/writeData');

const dinosaurNames = require('./filteredNames.json');

/**
 * Asynchronously retrieves data for all dinosaurs and writes it to a JSON file.
 * This function iterates over a list of dinosaur names, retrieves information for each dinosaur, and then writes the collected data to a JSON file. The function logs the start and end of data retrieval for each dinosaur, as well as the total time taken to retrieve data for all dinosaurs.
 * @returns {Promise<void>} A Promise that resolves when the data has been written to the JSON file.
 */
async function retrieveAllDinoData() {
    const { names } = dinosaurNames;
    const data = [];
    const totalTimeStart = process.hrtime();
    for (const name of names) {
        const startTime = process.hrtime();
        let mongooseData = new MongooseData(name);
        const position = names.indexOf(name) + 1;
        const total = names.length;
        logger.info(`Started data retrieval for ${name} (${position} of ${total})`);
        mongooseData = await retrieveInformation(name, mongooseData);
        mongooseData = await retrieveHTMLContent(name, mongooseData);
        data.push(mongooseData);

        const endTime = process.hrtime(startTime);
        const timeInSeconds = endTime[0] + endTime[1] / 1e9;
        const formattedSeconds = timeInSeconds.toFixed(2);
        logger.info(`Finished data retrieval for ${name}. Completed in ${formattedSeconds} seconds.\n`);
    }
    const totalTimeEnd = process.hrtime(totalTimeStart);
    const timeInSeconds = totalTimeEnd[0] + totalTimeEnd[1] / 1e9;
    const formattedSeconds = timeInSeconds.toFixed(2);
    logger.info(
        `Finished data retrieval for all dinosaurs, completed in ${formattedSeconds} seconds. Saving data to file now.`,
    );
    await writeData(data, 'dinosaurData.json');
}

retrieveAllDinoData();

module.exports = {
    retrieveAllDinoData,
};
