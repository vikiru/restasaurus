const { createClient } = require("redis");

async function connect() {
	try {
		const redis = createClient();
		await redis.connect();
		console.log("Successfully connected to Redis");
		return redis;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	connect: connect,
};