const fs = require("fs");
function writeData(dinosaurData) {
	fs.writeFile(
		"app/scripts/dinosaurJson.json",
		JSON.stringify(dinosaurData, null, 2),
		err => {
			if (err) {
				console.error(err);
			} else {
				console.log("Successfully saved data to file.");
			}
		},
	);
}

module.exports = {
	writeData: writeData,
};
