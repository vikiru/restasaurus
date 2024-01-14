const dinosaurData = require("./dinosaurData");
const { convertToSchema } = require("../utils/convertToSchema");
const { pushDinosaurToDB } = require("../services/index");
const mongoDB = require("../data/mongoData");

async function postAllDinosaurs() {
	await mongoDB.connect();
	const dinosaurPromises = dinosaurData.map(async dinosaur => {
		const dinosaurSchema = await convertToSchema(dinosaur);
		return pushDinosaurToDB(dinosaurSchema);
	});
	await Promise.all(dinosaurPromises);
	await mongoDB.disconnect();
}

postAllDinosaurs();

module.exports = {
	postAllDinosaurs,
};
