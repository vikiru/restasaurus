import mongoose from "mongoose";

const { Schema, model } = mongoose;

const sourceSchema = new Schema({
	source: {
		source: String,
		pageTitle: String,
		author: String,
		publisher: String,
		lastRevision: String,
		dateAccessed: String,
		wikipediaURL: String,
		revisionHistoryURL: String,
		license: String,
		licenseURL: String,
		citation: String,
	},
});

const DinosaurSource = model("DinosaurSource", sourceSchema);
export default DinosaurSource;
