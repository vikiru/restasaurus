const { logger } = require("../config/logger");
const { createClient } = require("redis");

async function connect() {
	try {
		const redis = createClient();
		await redis.connect();
		logger.info("Successfully connected to Redis");
		return redis;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	connect: connect,
};
