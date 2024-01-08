import Image from "./DinosaurImage.js";
import Info from "./DinosaurInfo.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const dinosaurSchema = new Schema({
	info: Info,
	image: Image,
});

const Dinosaur = model("Dinosaur", dinosaurSchema);
export default Dinosaur;
