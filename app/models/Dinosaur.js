import Image from "./DinosaurImage.js";
import { infoSchema } from "./DinosaurInfo.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const dinosaurSchema = new Schema({
	info: infoSchema,
	image: Image,
});

const Dinosaur = model("Dinosaur", dinosaurSchema);
export default Dinosaur;
