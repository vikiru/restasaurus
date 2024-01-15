const { retrieveInformation } = require("../utils/retrieveInformation");
const { retrieveHTMLContent } = require("../utils/retrieveHTMLContent");
const dinosaurNames = require("../scripts/filteredNames.json");
const { MongooseData } = require("../models/MongooseData");
const { writeData } = require("../utils/writeData");
const { logger } = require("../config/logger");

async function retrieveAllDinoData() {
	const names = dinosaurNames.names;
	const data = [];
	for (const name of names) {
		let mongooseData = new MongooseData(name);
		logger.info(
			`Started data retrieval for ${name}, ${names.indexOf(name) + 1} / ${
				names.length
			}`,
		);
		mongooseData = await retrieveInformation(name, mongooseData);
		mongooseData = await retrieveHTMLContent(name, mongooseData);
		data.push(mongooseData);

		logger.info(`Finished data retrieval for ${name}\n`);
	}

	await writeData(data, "dinosaurData.json");
}

retrieveAllDinoData();

module.exports = {
	retrieveAllDinoData: retrieveAllDinoData,
};
