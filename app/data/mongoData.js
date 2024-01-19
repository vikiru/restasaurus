const mongoose = require('mongoose');

const config = require('../config/index');
const { logger } = require('../config/logger');

/**
 * Asynchronously connects to the MongoDB database.
 *
 * @async
 * @function
 * @returns {Promise<mongoose.Connection>} A promise that resolves to the MongoDB connection object.
 * @throws {Error} Will throw an error if the connection fails.
 */
async function connect() {
    try {
        await mongoose.connect(config.mongoString);
        logger.info('Successfully connected to the MongoDB database.');
        return mongoose.connection;
    } catch (error) {
        logger.error(error);
    }
}

/**
 * Asynchronously disconnects from the MongoDB database.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
 * @throws {Error} Will throw an error if the disconnection fails.
 */
async function disconnect() {
    try {
        await mongoose.disconnect();
        logger.info('Successfully disconnected from the MongoDB database.');
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    connect,
    disconnect,
};
