const mongoose = require("mongoose");
const mongooseHidden = require("mongoose-hidden")();
const { Schema, SchemaTypes, model } = mongoose;

const DinosaurInfoSchema = new Schema(
	{
		temporalRange: String,
		domain: String,
		kingdom: String,
		phylum: String,
		clades: [String],
		classInfo: [
			{
				classType: String,
				value: String,
				_id: false,
			},
		],
		orderInfo: [
			{
				orderType: String,
				value: String,
				_id: false,
			},
		],
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
			permalink: String,
			revisionHistoryURL: String,
			lastRevision: String,
			dateAccessed: String,
			source: String,
			publisher: String,
			citation: String,
		},
	},
	{ retainKeyOrder: true },
);

DinosaurInfoSchema.plugin(mongooseHidden, {
	hidden: {
		_id: true,
		__v: true,
	},
});

const DinosaurInfo = model("DinosaurInfo", DinosaurInfoSchema);

module.exports = {
	DinosaurInfoSchema: DinosaurInfoSchema,
	DinosaurInfo: DinosaurInfo,
};
