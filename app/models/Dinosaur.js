const mongoose = require("mongoose");
const mongooseHidden = require("mongoose-hidden")();
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema, SchemaTypes, model } = mongoose;
const { ClassificationInfo } = require("./ClassificationInfo");
const { DinosaurImage } = require("./DinosaurImage");
const { DinosaurSource } = require("./DinosaurSource");

const DinosaurSchema = new Schema(
	{
		id: Number,
		name: { type: String, unique: true },
		temporalRange: String,
		diet: String,
		locomotionType: String,
		description: String,
		classificationInfo: {
			type: SchemaTypes.ObjectId,
			ref: ClassificationInfo,
			required: true,
		},
		image: {
			type: SchemaTypes.ObjectId,
			ref: DinosaurImage,
			required: true,
			autopopulate: false,
		},
		source: {
			type: SchemaTypes.ObjectId,
			ref: DinosaurSource,
			required: true,
		},
	},
	{ timestamps: true },
	{ retainKeyOrder: true },
);

DinosaurSchema.plugin(AutoIncrement, { inc_field: "id" });
DinosaurSchema.plugin(require("mongoose-autopopulate"));
DinosaurSchema.plugin(mongooseHidden, {
	hidden: { _id: true, __v: true, createdAt: true, updatedAt: true },
});

DinosaurSchema.statics.findAllDinosaurs = function (page) {
	const limit = 20;
	return this.find()
		.skip((page - 1) * limit)
		.limit(limit)
		.populate("classificationInfo image source");
};

DinosaurSchema.statics.findById = function (id) {
	return this.findOne({ id: id }).populate("classificationInfo image source");
};

DinosaurSchema.statics.findByName = function (name) {
	return this.findOne({ name: name }).populate(
		"classificationInfo image source",
	);
};

DinosaurSchema.statics.findAllNames = function () {
	return this.find({}, "name");
};

DinosaurSchema.statics.findAllImages = function (page) {
	const limit = 20;
	return this.find({}, "image")
		.skip((page - 1) * limit)
		.limit(limit)
		.populate("image");
};

DinosaurSchema.statics.findImageById = function (id) {
	return this.findOne({ id: id }).select("image").populate("image");
};

DinosaurSchema.statics.findByDiet = function (diet) {
	return this.find({ diet: diet }).populate(
		"classificationInfo image source",
	);
};

DinosaurSchema.statics.findByLocomotion = function (locomotionType) {
	return this.find({ locomotionType: locomotionType }).populate(
		"classificationInfo image source",
	);
};

const Dinosaur = model("Dinosaur", DinosaurSchema);

module.exports = {
	DinosaurSchema: DinosaurSchema,
	Dinosaur: Dinosaur,
};
