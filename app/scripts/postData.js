const dinosaurData = require("./dinosaurData");
const { convertToSchema } = require("../utils/convertToSchema");
const { pushDinosaurToDB } = require("../services/index");
const mongoDB = require("../data/mongoData");

async function postAllDinosaurs() {
	mongoDB.connect();
	for (const dinosaur of dinosaurData) {
		const dinosaurSchema = await convertToSchema(dinosaur);
		await pushDinosaurToDB(dinosaurSchema);
	}
	mongoDB.disconnect();
}

postAllDinosaurs();

module.exports = {
	postAllDinosaurs: postAllDinosaurs,
};
