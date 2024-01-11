const { MongooseData } = require("../models/MongooseData");
const {
	retrieveInformation,
	retrieveHTMLContent,
} = require("../utils/scriptHelpers");

async function retrieveAllDinoData() {
	const names = ["Quetzalcoatlus"];
	for (const name of names) {
		let mongooseData = new MongooseData(name);
		mongooseData = await retrieveInformation(name, mongooseData);
		mongooseData = await retrieveHTMLContent(name, mongooseData);
		console.log(mongooseData);
	}
}

retrieveAllDinoData();
