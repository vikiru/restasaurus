const mongoose = require("mongoose");
const mongooseHidden = require("mongoose-hidden")();
const { Schema, model } = mongoose;

const DinosaurSourceSchema = new Schema(
	{
		pageTitle: String,
		author: String,
		wikipediaURL: String,
		license: String,
		licenseURL: String,
		permalink: String,
		revisionHistoryURL: String,
		lastRevision: String,
		dateAccessed: String,
		source: String,
		publisher: String,
		citation: String,
	},
	{ retainKeyOrder: true },
);

DinosaurSourceSchema.plugin(mongooseHidden, {
	hidden: { _id: true, __v: true, createdAt: true, updatedAt: true },
});

const DinosaurSource = model("DinosaurSource", DinosaurSourceSchema);

module.exports = {
	DinosaurSourceSchema: DinosaurSourceSchema,
	DinosaurSource: DinosaurSource,
};
