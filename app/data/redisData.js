const { createClient } = require('redis');

const { logger } = require('../config/logger');

/**
 * Establishes a connection to Redis and returns the Redis client.
 *
 * @returns {Promise<object>} The connected Redis client.
 * @throws Will throw an error if the connection fails.
 */
async function connect() {
  try {
    const redis = createClient();
    await redis.connect();
    logger.info('Successfully connected to Redis');
    return redis;
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  connect,
};
