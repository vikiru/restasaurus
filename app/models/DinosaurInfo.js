const mongoose = require("mongoose");
const mongooseHidden = require("mongoose-hidden")();
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
		diet: String,
		locomotionType: String,
		description: String,
		source: {
			pageTitle: String,
			author: String,
			wikipediaURL: String,
			license: String,
			licenseURL: String,
			lastRevision: String,
			permalink: String,
			dateAccessed: String,
			revisionHistoryURL: String,
			source: String,
			publisher: String,
			citation: String,
		},
	},
	{ retainKeyOrder: true },
);

DinosaurInfoSchema.plugin(mongooseHidden);

const DinosaurInfo = model("DinosaurInfo", DinosaurInfoSchema);

module.exports = {
	DinosaurInfoSchema: DinosaurInfoSchema,
	DinosaurInfo: DinosaurInfo,
};
