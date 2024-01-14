const { Dinosaur } = require("../models/Dinosaur");
const { DinosaurImage } = require("../models/DinosaurImage");
const { ClassificationInfo } = require("../models/ClassificationInfo");
const { DinosaurSource } = require("../models/DinosaurSource");

async function pushDinosaurToDB(data) {
	try {
		const { dinosaur, classificationInfo, source, image } = data;
		const { name } = dinosaur;
		await Promise.all([
			Dinosaur.create(dinosaur),
			ClassificationInfo.create(classificationInfo),
			DinosaurSource.create(source),
			DinosaurImage.create(image),
		]);
		console.log(`Successfully saved dinosaur, ${name} to database`);
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	pushDinosaurToDB,
};
