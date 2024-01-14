const fs = require("fs");

async function writeData(dinosaurData, filename) {
	fs.writeFile(filename, JSON.stringify(dinosaurData, null, 2), err => {
		if (err) {
			console.error(err);
		} else {
			console.log("Successfully saved data to file.");
		}
	});
}

module.exports = {
	writeData,
};
