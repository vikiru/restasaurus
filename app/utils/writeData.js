const { logger } = require("../config/logger");
const path = require("path");
const fs = require("fs");

async function writeData(dinosaurData, filename) {
	const filePath = path.resolve(__dirname, `../scripts/${filename}`);
	fs.writeFile(filePath, JSON.stringify(dinosaurData, null, 2), err => {
		if (err) {
			console.error(err);
		} else {
			logger.info("Successfully saved data to file.");
		}
	});
}

module.exports = {
	writeData: writeData,
};
