const { ClassificationInfo } = require("../models/ClassificationInfo");
const { Dinosaur } = require("../models/Dinosaur");
const { DinosaurImage } = require("../models/DinosaurImage");
const { DinosaurSource } = require("../models/DinosaurSource");

async function convertToSchema(mongooseData) {
	const keys = {
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
			"species",
		],
		dinosaur: [
			"name",
			"temporalrange",
			"diet",
			"locomotionType",
			"descriptions",
		],
	};

	const dinosaur = {};
	for (const key in keys) {
		if (key in mongooseData) {
			dinosaur[key] = createSubObject(mongooseData[key], keys[key]);
		} else {
			dinosaur[key] = createSubObject(mongooseData, keys[key]);
		}
	}

	const dinoSource = new DinosaurSource(mongooseData.source);
	const classification = new ClassificationInfo(dinosaur.classificationInfo);
	const dinoImage = new DinosaurImage(mongooseData.image);
	const dino = new Dinosaur({
		name: mongooseData.name,
		temporalRange: mongooseData.temporalrange.replace(",,", ","),
		diet: mongooseData.diet,
		locomotionType: mongooseData.locomotionType,
		description: mongooseData.description,
		classificationInfo: classification,
		source: dinoSource,
		image: dinoImage,
	});

	const data = {
		dinosaur: dino,
		classificationInfo: classification,
		image: dinoImage,
		source: dinoSource,
	};

	return data;
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
	createSubObject: createSubObject,
};
