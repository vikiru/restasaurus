const { MongooseData } = require("../models/MongooseData");
const {
	retrieveInformation,
	retrieveHTMLContent,
} = require("../utils/scriptHelpers");
const { writeData } = require("../utils/writeData");

async function retrieveAllDinoData() {
	const names = [
		"Abrosaurus",
		"Stegosaurus",
		"Tyrannosaurus",
		"Quetzalcoatlus",
		"Abelisaurus",
		"Velociraptor",
		"Lucianovenator",
		"Chasmosaurus",
		"Pararhabdodon",
		"Oviraptor",
		"Gigantopithecus",
	];
	const data = [];
	for (const name of names) {
		let mongooseData = new MongooseData(name);
		mongooseData = await retrieveInformation(name, mongooseData);
		mongooseData = await retrieveHTMLContent(name, mongooseData);
		data.push(mongooseData);
	}
	writeData(data);
}

retrieveAllDinoData();

module.exports = {
	retrieveAllDinoData: retrieveAllDinoData,
};
