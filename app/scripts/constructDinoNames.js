const {
	constructUrls,
	handleUrls,
	processData,
	retrieveAllDinoNames,
} = require("../utils/handleSetup");
const { writeData } = require("../utils/writeData");
const { logger } = require("../config/logger");

async function constructDinoNames() {
	const startTime = process.hrtime();
	const allDinoNames = await retrieveAllDinoNames();
	const urls = constructUrls(allDinoNames);
	const dataObjs = await handleUrls(urls);

	logger.info("Starting filtering process for dino names.");
	const names = processData(dataObjs).sort();
	logger.info(
		`Dinosaur name filtering completed. ${names.length} names passed the filter.`,
	);

	const endTime = process.hrtime(startTime);
	const timeInSeconds = endTime[0] + endTime[1] / 1e9;
	const formattedSeconds = timeInSeconds.toFixed(2);
	logger.info(
		`Dinosaur name retrieval and filtering completed in ${formattedSeconds} seconds.`,
	);

	logger.info("Proceeding to save filtered names to file.");
	await writeData({ names: names }, "filteredNames.json");
}

constructDinoNames();

module.exports = {
	constructDinoNames: constructDinoNames,
};
