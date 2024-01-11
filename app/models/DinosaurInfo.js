const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const DinosaurInfoSchema = new Schema({
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
		type: SchemaTypes.ObjectId,
		ref: "DinosaurSource",
		required: true,
	},
});

const DinosaurInfo = model("DinosaurInfo", DinosaurInfoSchema);

module.exports = {
	DinosaurInfoSchema: DinosaurInfoSchema,
	DinosaurInfo: DinosaurInfo,
};
