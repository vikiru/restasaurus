const { MongooseData } = require("../models/MongooseData");
const {
	retrieveInformation,
	retrieveHTMLContent,
} = require("../utils/scriptHelpers");
const { writeData } = require("../utils/writeData");
const dinosaurNames = require("../scripts/dinosaurNames.json");

async function retrieveAllDinoData() {
	const names = dinosaurNames.names;
	const data = [];
	for (const name of names) {
		let mongooseData = new MongooseData(name);
		console.log(
			`Started data retrieval for ${name}, ${names.indexOf(name) + 1} / ${
				names.length
			}`,
		);
		mongooseData = await retrieveInformation(name, mongooseData);
		mongooseData = await retrieveHTMLContent(name, mongooseData);
		data.push(mongooseData);
		console.log(`Finished data retrieval for ${name}\n`);
	}
	writeData(data);
}

retrieveAllDinoData();

module.exports = {
	retrieveAllDinoData: retrieveAllDinoData,
};
