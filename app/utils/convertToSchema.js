const { ClassificationInfo } = require("../models/ClassificationInfo");
const { Dinosaur } = require("../models/Dinosaur");
const { DinosaurImage } = require("../models/DinosaurImage");
const { DinosaurSource } = require("../models/DinosaurSource");

async function convertToSchema(mongooseData) {
	const keys = getClassificationAndDinosaurKeys();
	const dinosaur = createDinosaurObject(mongooseData, keys);
	const dinoSource = new DinosaurSource(mongooseData.source);
	const classification = new ClassificationInfo(dinosaur.classificationInfo);
	const dinoImage = new DinosaurImage(mongooseData.image);
	const dino = createDinosaurInstance(
		mongooseData,
		classification,
		dinoSource,
		dinoImage,
	);
	return createDataObject(dino, classification, dinoImage, dinoSource);
}

function getClassificationAndDinosaurKeys() {
	return {
		classificationInfo: [
			"domain",
			"kingdom",
			"phylum",
			"clade",
			"classInfo",
			"orderInfo",
			"familyInfo",
			"tribeInfo",
			"genusInfo",
			"speciesInfo",
		],
		dinosaur: [
			"name",
			"temporalrange",
			"diet",
			"locomotionType",
			"descriptions",
		],
	};
}

function createDinosaurObject(mongooseData, keys) {
	const dinosaur = {};
	for (const key in keys) {
		if (key in mongooseData) {
			dinosaur[key] = createSubObject(mongooseData[key], keys[key]);
		} else {
			dinosaur[key] = createSubObject(mongooseData, keys[key]);
		}
	}
	return dinosaur;
}

function createDinosaurInstance(
	mongooseData,
	classification,
	dinoSource,
	dinoImage,
) {
	return new Dinosaur({
		name: mongooseData.name,
		temporalRange: mongooseData.temporalrange.replace(",,", ","),
		diet: mongooseData.diet,
		locomotionType: mongooseData.locomotionType,
		description: mongooseData.description,
		classificationInfo: classification,
		source: dinoSource,
		image: dinoImage,
	});
}

function createDataObject(dino, classification, dinoImage, dinoSource) {
	return {
		dinosaur: dino,
		classificationInfo: classification,
		image: dinoImage,
		source: dinoSource,
	};
}

function createSubObject(obj, keys) {
	const subObject = {};
	keys.forEach(key => {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			subObject[key] = obj[key];
		}
	});
	return subObject;
}

module.exports = {
	convertToSchema: convertToSchema,
	getClassificationAndDinosaurKeys: getClassificationAndDinosaurKeys,
	createDinosaurObject: createDinosaurObject,
	createDinosaurInstance: createDinosaurInstance,
	createDataObject: createDataObject,
	createSubObject: createSubObject,
};
