const { convertToSchema } = require("../utils/convertToSchema");
const { pushDinosaurToDB } = require("../services/index");
const { logger } = require("../config/logger");
const dinosaurData = require("./dinosaurData");
const mongoDB = require("../data/mongoData");

async function postAllDinosaurs() {
	await mongoDB.connect();
	logger.info("Starting to save dinosaur data to MongoDB database.");
	const startTime = process.hrtime();

	const dinosaurPromises = dinosaurData.map(async dinosaur => {
		const dinosaurSchema = await convertToSchema(dinosaur);
		return pushDinosaurToDB(dinosaurSchema);
	});
	await Promise.all(dinosaurPromises);

	const endTime = process.hrtime(startTime);
	const timeInSeconds = endTime[0] + endTime[1] / 1e9;
	const formattedSeconds = timeInSeconds.toFixed(2);
	logger.info(
		`Finishing saving all dinosaur data to MongoDB database. Completed in ${formattedSeconds} seconds.`,
	);

	await mongoDB.disconnect();
}

postAllDinosaurs();

module.exports = {
	postAllDinosaurs,
};
