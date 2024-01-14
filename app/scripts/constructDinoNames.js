const { writeData } = require("../utils/writeData");
const {
	constructUrls,
	handleUrls,
	processData,
	retrieveAllDinoNames,
} = require("../utils/handleSetup");

async function constructDinoNames() {
	const allDinoNames = await retrieveAllDinoNames();
	const urls = constructUrls(allDinoNames);
	const dataObjs = await handleUrls(urls);
	console.log("\nStarting filtering process for dino names");
	const names = processData(dataObjs).sort();
	await writeData({ names: names }, "filteredNames.json");
}

constructDinoNames();

module.exports = {
	constructDinoNames: constructDinoNames,
};
