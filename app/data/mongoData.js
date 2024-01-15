const config = require("../config/index.js");
const mongoose = require("mongoose");

async function connect() {
	try {
		await mongoose.connect(config.mongoString);
		console.log("Successfully connected to the MongoDB database.");
		return mongoose.connection;
	} catch (error) {
		console.error(error);
	}
}

async function disconnect() {
	try {
		await mongoose.disconnect();
		console.log("Successfully disconnected from the MongoDB database.");
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	connect: connect,
	disconnect: disconnect,
};
