const { retrieveInformation } = require("../utils/retrieveInformation");
const { retrieveHTMLContent } = require("../utils/retrieveHTMLContent");
const dinosaurNames = require("../scripts/filteredNames.json");
const { MongooseData } = require("../models/MongooseData");
const { writeData } = require("../utils/writeData");
const { logger } = require("../config/logger");

async function retrieveAllDinoData() {
	const names = dinosaurNames.names;
	const data = [];
	const totalTimeStart = process.hrtime();
	for (const name of names) {
		const startTime = process.hrtime();

		let mongooseData = new MongooseData(name);
		const position = names.indexOf(name) + 1;
		const total = names.length;
		logger.info(
			`Started data retrieval for ${name} (${position} of ${total})`,
		);
		mongooseData = await retrieveInformation(name, mongooseData);
		mongooseData = await retrieveHTMLContent(name, mongooseData);
		data.push(mongooseData);

		const endTime = process.hrtime(startTime);
		const timeInSeconds = endTime[0] + endTime[1] / 1e9;
		const formattedSeconds = timeInSeconds.toFixed(2);
		logger.info(
			`Finished data retrieval for ${name}. Completed in ${formattedSeconds} seconds.\n`,
		);
	}
	const totalTimeEnd = process.hrtime(totalTimeStart);
	const timeInSeconds = totalTimeEnd[0] + totalTimeEnd[1] / 1e9;
	const formattedSeconds = timeInSeconds.toFixed(2);
	logger.info(
		`Finished data retrieval for all dinosaurs, completed in ${formattedSeconds} seconds. Saving data to file now.`,
	);
	await writeData(data, "dinosaurData.json");
}

retrieveAllDinoData();

module.exports = {
	retrieveAllDinoData: retrieveAllDinoData,
};
