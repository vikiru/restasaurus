const mongoose = require("mongoose");
const mongooseHidden = require("mongoose-hidden")();
const { Schema, model } = mongoose;

const ClassificationInfoSchema = new Schema(
	{
		domain: String,
		kingdom: String,
		phylum: String,
		clade: [String],
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
		familyInfo: [{ familyType: String, value: String, _id: false }],
		tribeInfo: [{ tribeType: String, value: String, _id: false }],
		genusInfo: [{ genusType: String, value: String, _id: false }],
		species: String,
	},
	{ retainKeyOrder: true },
);

ClassificationInfoSchema.plugin(mongooseHidden, {
	hidden: {
		_id: true,
		__v: true,
	},
});

const ClassificationInfo = model(
	"ClassificationInfo",
	ClassificationInfoSchema,
);

module.exports = {
	ClassificationInfoSchema: ClassificationInfoSchema,
	ClassificationInfo: ClassificationInfo,
};
