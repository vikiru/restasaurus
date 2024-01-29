const { logger } = require('../config/logger');
const mongoDB = require('../data/mongoData');
const { pushDinosaurToDB } = require('../services/index');
const { convertToSchema } = require('../utils/convertToSchema');

const { readJSONFile } = require('./constructDinoNames');

/**
 * Asynchronously saves all dinosaur data to a MongoDB database. This function connects to a MongoDB database, logs the
 * start of the data saving process, and then maps over an array of dinosaur data. For each dinosaur, it converts the
 * dinosaur data to a schema and pushes it to the database. It waits for all dinosaurs to be pushed to the database
 * before logging the end of the data saving process and disconnecting from the database.
 *
 * @returns {Promise<void>} A Promise that resolves when all dinosaur data has been saved to the database and the
 *   database connection has been closed.
 */
async function postAllDinosaurs() {
    const dinosaurData = await readJSONFile('./dinosaurData.json');

    await mongoDB.connect();
    logger.info('Starting to save dinosaur data to MongoDB database.');
    const startTime = process.hrtime();

    const dinosaurPromises = dinosaurData.map(async (dinosaur) => {
        const dinosaurSchema = await convertToSchema(dinosaur);
        return pushDinosaurToDB(dinosaurSchema);
    });
    await Promise.all(dinosaurPromises);

    const endTime = process.hrtime(startTime);
    const timeInSeconds = endTime[0] + endTime[1] / 1e9;
    const formattedSeconds = timeInSeconds.toFixed(2);
    logger.info(`Finishing saving all dinosaur data to MongoDB database. Completed in ${formattedSeconds} seconds.`);

    await mongoDB.disconnect();
}

postAllDinosaurs();

module.exports = {
    postAllDinosaurs,
};

postAllDinosaurs();

module.exports = {
    postAllDinosaurs,
};
