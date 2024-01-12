const { Dinosaur } = require("../models/Dinosaur");
const { DinosaurInfo } = require("../models/DinosaurInfo");
const { DinosaurImage } = require("../models/DinosaurImage");

async function convertToSchema(mongooseData) {
	const mongooseImage = mongooseData.image;
	const dinoImage = returnDinoImage(mongooseImage);
	const dinoInfo = returnDinoInfo(mongooseData);

	const dinosaur = new Dinosaur({
		info: dinoInfo,
		image: dinoImage,
	});

	const data = {
		dinosaur: dinosaur,
		dinoInfo: dinoInfo,
		dinoImage: dinoImage,
	};
	return data;
}

function returnDinoInfo(mongooseData) {
	const mongooseSource = mongooseData.source;
	const dinoInfo = new DinosaurInfo({
		name: mongooseData.name,
		temporalRange: mongooseData.temporalrange,
		domain: mongooseData.domain,
		kingdom: mongooseData.kingdom,
		phylum: mongooseData.phylum,
		clades: mongooseData.clade,
		subOrder: mongooseData.suborder,
		family: mongooseData.family,
		subFamily: mongooseData.subfamily,
		tribe: mongooseData.tribe,
		genus: mongooseData.genus,
		species: mongooseData.species,
		description: mongooseData.description,
		diet: mongooseData.diet,
		locomotionType: mongooseData.locomotionType,
		source: mongooseSource,
	});
	return dinoInfo;
}

function returnDinoImage(mongooseImage) {
	const dinoImage = new DinosaurImage({
		title: mongooseImage.title,
		description: mongooseImage.description,
		author: mongooseImage.author,
		authorURL: mongooseImage.authorURL,
		imageURL: mongooseImage.imageURL,
		license: mongooseImage.license,
		licenseURL: mongooseImage.licenseURL,
		dateCreated: mongooseImage.dateCreated,
		dateAccessed: mongooseImage.dateAccessed,
	});
	return dinoImage;
}

module.exports = {
	convertToSchema: convertToSchema,
	returnDinoInfo: returnDinoInfo,
	returnDinoImage: returnDinoImage,
};
