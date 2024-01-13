const mongoose = require("mongoose");
const { ClassificationInfo } = require("./ClassificationInfo");
const { DinosaurSource } = require("./DinosaurSource");
const mongooseHidden = require("mongoose-hidden")();
const { Schema, SchemaTypes, model } = mongoose;

const DinosaurInfoSchema = new Schema(
	{
		temporalRange: String,
		classificationInfo: {
			type: SchemaTypes.ObjectId,
			ref: ClassificationInfo,
			required: true,
			autopopulate: true,
		},
		diet: String,
		locomotionType: String,
		description: String,
		source: {
			type: SchemaTypes.ObjectId,
			ref: DinosaurSource,
			required: true,
			autopopulate: true,
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

DinosaurInfoSchema.index({ diet: 1, locomotionType: 1 });
const DinosaurInfo = model("DinosaurInfo", DinosaurInfoSchema);

module.exports = {
	DinosaurInfoSchema: DinosaurInfoSchema,
	DinosaurInfo: DinosaurInfo,
};
