const { logger } = require('../config/logger');

/**
 * Fetches data from a given URL and returns the response data as an object.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<object>} The fetched data as a JSON object.
 * @throws Will throw an error if the fetch operation fails or if the response status is not OK.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
        }
        const data = await response.json();
        logger.http(`Successfully fetched data from ${url}`);
        return data;
    } catch (error) {
        logger.error(`Fetch failed: ${error.message}`);
    }
}

module.exports = {
    fetchData,
};
