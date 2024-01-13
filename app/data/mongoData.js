const mongoose = require("mongoose");
const config = require("../config/index.js");

async function connect() {
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	try {
		await mongoose.connect(config.mongoString, options);
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
