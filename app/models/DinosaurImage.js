const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DinosaurImageSchema = new Schema(
	{
		title: String,
		author: String,
		authorURL: String,
		imageURL: String,
		license: String,
		licenseURL: String,
		dateCreated: String,
		dateAccesed: String,
	},
	{ retainKeyOrder: true },
);

const DinosaurImage = model("DinosaurImage", DinosaurImageSchema);

module.exports = {
	DinosaurImageSchema: DinosaurImageSchema,
	DinosaurImage: DinosaurImage,
};
