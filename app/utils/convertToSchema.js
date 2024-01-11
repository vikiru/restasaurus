const { Dinosaur } = require("../models/Dinosaur");
const { DinosaurInfo } = require("../models/DinosaurInfo");
const { DinosaurSource } = require("../models/DinosaurSource");
const { DinosaurImage } = require("../models/DinosaurImage");

async function convertToSchema(mongooseData) {
	const mongooseImage = mongooseData.image;
	const dinoImage = returnDinoImage(mongooseImage);
	const dinoInfo = returnDinoInfo(mongooseData);

	const dinosaur = new Dinosaur({
		info: dinoInfo,
		image: dinoImage,
	});
	return dinosaur;
}

function returnDinoInfo(mongooseData) {
	const mongooseSource = mongooseData.source;
	const dinoSource = returnDinoSource(mongooseSource);
	const dinoInfo = new DinosaurInfo({
		name: mongooseData.name,
		temporalRange: mongooseData.temporalRange,
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
		source: dinoSource,
	});
	return dinoInfo;
}

function returnDinoSource(mongooseSource) {
	const dinoSource = new DinosaurSource({
		pageTitle: mongooseSource.pageTitle,
		author: mongooseSource.author,
		wikipediaURL: mongooseSource.wikipediaURL,
		license: mongooseSource.license,
		licenseURL: mongooseSource.licenseURL,
		lastRevision: mongooseSource.lastRevision,
		dateAccessed: mongooseSource.dateAccessed,
		revisionHistoryURL: mongooseSource.revisionHistoryURL,
		source: mongooseSource.source,
		publisher: mongooseSource.publisher,
		citation: mongooseSource.citation,
	});
	return dinoSource;
}

function returnDinoImage(mongooseImage) {
	const dinoImage = new DinosaurImage({
		title: mongooseImage.title,
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
	returnDinoSource: returnDinoSource,
};
