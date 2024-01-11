const { Dinosaur } = require("../models/Dinosaur");
const { DinosaurInfo } = require("../models/DinosaurInfo");
const { DinosaurImage } = require("../models/DinosaurImage");

async function pushDinosaurToDB(data) {
	try {
		const dinosaur = data.dinosaur;
		const dinoInfo = data.dinoInfo;
		const dinoImage = data.dinoImage;
		await Dinosaur.create(dinosaur);
		await DinosaurInfo.create(dinoInfo);
		await DinosaurImage.create(dinoImage);
		console.log("Successfully saved dinosaur to database");
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	pushDinosaurToDB: pushDinosaurToDB,
};
