import Source from "./Source.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const infoSchema = new Schema({
	name: String,
	summary: String,
	domain: String,
	phylum: String,
	clades: [String],
	family: String,
	genus: String,
	timePeriod: String,
	source: Source,
});

const Info = model("Info", infoSchema);
export default Info;
