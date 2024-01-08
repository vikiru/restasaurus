import mongoose from "mongoose";

const { Schema, model } = mongoose;

const imageSchema = new Schema({
	title: String,
	author: String,
	authorURL: String,
	imageURL: String,
	license: String,
	licenseURL: String,
	dateCreated: String,
	dateAccesed: String,
});

const Image = model("Image", imageSchema);
export default Image;
