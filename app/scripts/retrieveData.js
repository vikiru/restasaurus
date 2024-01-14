const { MongooseData } = require("../models/MongooseData");
const {
	retrieveInformation,
	retrieveHTMLContent,
} = require("../utils/scriptHelpers");
const { writeData } = require("../utils/writeData");
const dinosaurNames = require("../scripts/filteredNames.json");

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
		console.log(mongooseData);
		data.push(mongooseData);
		console.log(`Finished data retrieval for ${name}\n`);
	}
	await writeData(data, "dinosaurData.json");
}

retrieveAllDinoData();

module.exports = {
	retrieveAllDinoData: retrieveAllDinoData,
};
