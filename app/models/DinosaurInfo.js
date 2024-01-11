const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DinosaurInfoSchema = new Schema(
	{
		name: String,
		temporalRange: String,
		domain: String,
		kingdom: String,
		phylum: String,
		clades: [String],
		subOrder: String,
		family: String,
		subFamily: String,
		tribe: String,
		genus: String,
		species: String,
		description: String,
		diet: String,
		locomotionType: String,
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
	},
	{ retainKeyOrder: true },
);

const DinosaurInfo = model("DinosaurInfo", DinosaurInfoSchema);

module.exports = {
	DinosaurInfoSchema: DinosaurInfoSchema,
	DinosaurInfo: DinosaurInfo,
};
