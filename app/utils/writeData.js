const fs = require('fs');
const path = require('path');

const { logger } = require('../config/logger');

/**
 * Asynchronously writes dinosaur data to a JSON file.
 *
 * @async
 * @function
 * @param {object} dinosaurData - The dinosaur data to be written to the file.
 * @param {string} filename - The name of the file where the data will be saved.
 * @returns {Promise<void>} A promise that resolves when the file has been successfully written.
 */
async function writeData(dinosaurData, filename) {
    const filePath = path.resolve(__dirname, `../scripts/${filename}`);
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(dinosaurData, null, 2));
        logger.info('Successfully saved data to file.');
    } catch (err) {
        logger.error(err);
    }
}

module.exports = {
    writeData,
};
