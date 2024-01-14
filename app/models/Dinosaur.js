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

DinosaurSchema.index({ id: 1, name: 1 });

DinosaurSchema.statics.findAllDinosaurs = function () {
	return this.find().populate("classificationInfo image source");
};

DinosaurSchema.statics.findById = function (id) {
	return this.findOne({ id: id });
};

DinosaurSchema.statics.findByName = function (name) {
	return this.findOne({ "info.name": name }).populate(
		"classificationInfo image source",
	);
};

DinosaurSchema.statics.findAllNames = function () {
	return this.find({}, "name");
};

DinosaurSchema.statics.findAllImages = function () {
	return this.find().select("image").populate("image");
};

DinosaurSchema.statics.findImageById = function (id) {
	return this.findOne({ id: id }).select("image").populate("image");
};

DinosaurSchema.statics.findByDiet = function (diet) {
	return this.find({ "info.diet": diet }).populate(
		"classificationInfo image source",
	);
};

DinosaurSchema.statics.findByLocomotion = function (locomotionType) {
	return this.find({ "info.locomotionType": locomotionType }).populate(
		"classificationInfo image source",
	);
};

const Dinosaur = model("Dinosaur", DinosaurSchema);

module.exports = {
	DinosaurSchema: DinosaurSchema,
	Dinosaur: Dinosaur,
};
