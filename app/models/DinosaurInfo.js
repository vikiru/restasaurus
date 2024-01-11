import DinosaurSource from "./DinosaurSource.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const infoSchema = new Schema({
	name: String,
	temporalRange: String,
	domain: String,
	kingdom: String,
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
	source: DinosaurSource,
});

const Info = model("Info", infoSchema);
module.exports = {
	infoModel: Info,
	infoSchema: infoSchema,
};
