const mongoose = require("mongoose");
const mongooseHidden = require("mongoose-hidden")();
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { DinosaurInfo } = require("./DinosaurInfo");
const { DinosaurImage } = require("./DinosaurImage");
const { Schema, SchemaTypes, model } = mongoose;

const DinosaurSchema = new Schema(
	{
		id: Number,
		name: String,
		info: {
			type: SchemaTypes.ObjectId,
			ref: DinosaurInfo,
			required: true,
			autopopulate: true,
		},
		image: {
			type: SchemaTypes.ObjectId,
			ref: DinosaurImage,
			required: true,
			autopopulate: true,
		},
	},
	{ timestamps: true },
	{ retainKeyOrder: true },
);

DinosaurSchema.plugin(AutoIncrement, { inc_field: "id" });
DinosaurSchema.plugin(require("mongoose-autopopulate"));
DinosaurSchema.plugin(mongooseHidden);

const Dinosaur = model("Dinosaur", DinosaurSchema);

module.exports = {
	DinosaurSchema: DinosaurSchema,
	Dinosaur: Dinosaur,
};
