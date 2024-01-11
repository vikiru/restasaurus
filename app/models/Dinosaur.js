import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema, SchemaTypes, model } = mongoose;

const DinosaurSchema = new Schema({
	info: {
		type: SchemaTypes.ObjectId,
		ref: "DinosaurInfo",
		required: true,
	},
	image: {
		type: SchemaTypes.ObjectId,
		ref: "DinosaurImage",
		required: true,
	},
	timestamps: true,
});

DinosaurSchema.plugin(AutoIncrement, { inc_field: "id" });

const Dinosaur = model("Dinosaur", DinosaurSchema);

module.exports = {
	DinosaurSchema: DinosaurSchema,
	Dinosaur: Dinosaur,
};
