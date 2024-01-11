const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DinosaurSourceSchema = new Schema({
	source: {
		pageTitle: String,
		author: String,
		wikipediaURL: String,
		license: String,
		licenseURL: String,
		lastRevision: String,
		dateAccessed: String,
		revisionHistoryURL: String,
		source: String,
		publisher: String,
		citation: String,
	},
});

const DinosaurSource = model("DinosaurSource", DinosaurSourceSchema);

module.exports = {
	DinosaurSourceSchema: DinosaurSourceSchema,
	DinosaurSource: DinosaurSource,
};
