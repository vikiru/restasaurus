const fs = require("fs");
const path = require("path");

async function writeData(dinosaurData, filename) {
	const filePath = path.resolve(__dirname, `../scripts/${filename}`);
	fs.writeFile(filePath, JSON.stringify(dinosaurData, null, 2), err => {
		if (err) {
			console.error(err);
		} else {
			console.log("Successfully saved data to file.");
		}
	});
}

module.exports = {
	writeData: writeData,
};
