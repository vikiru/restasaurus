import Source from "./Source.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const infoSchema = new Schema({
	name: String,
	temporalRange: String,
	domain: String,
	phylum: String,
	clades: [String],
	subOrder: String,
	family: String,
	subFamily: String,
	tribe: String,
	genus: String,
	species: String,
	description: String,
	diet: String,
	locomotionType: String,
	source: Source,
});

const Info = model("Info", infoSchema);
export default Info;
