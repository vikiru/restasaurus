const mongoose = require("mongoose");
const config = require("../config/index.js");

async function connect() {
	try {
		await mongoose.connect(config.mongoString);
		console.log("Successfully connected to the MongoDB database.");
		return mongoose.connection;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	connect: connect,
};
