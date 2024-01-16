const { ClassificationInfo } = require("../models/ClassificationInfo");
const { DinosaurSource } = require("../models/DinosaurSource");
const { DinosaurImage } = require("../models/DinosaurImage");
const { Dinosaur } = require("../models/Dinosaur");
const MAX_PAGE = 20;
const { logger } = require("../config/logger");

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
		logger.info(`Successfully saved dinosaur, ${name} to database`);
	} catch (error) {
		console.error(error);
	}
}

async function retrieveAllDinosaurs(page) {
	const dinosaurs = await Dinosaur.findAllDinosaurs(page);
	const prevPage = page - 1 > 0 ? `/api/v1/dinosaurs?page=${page - 1}` : "";
	const nextPage =
		page + 1 < MAX_PAGE ? `/api/v1/dinosaurs?page=${page + 1}` : "";
	return {
		prevPage: prevPage,
		currentPage: page,
		nextPage: nextPage,
		count: dinosaurs.length,
		data: dinosaurs,
	};
}

async function retrieveAllImages(page) {
	const dinosaurImages = await Dinosaur.findAllImages(page);
	const prevPage = page - 1 > 0 ? `/api/v1/images?page=${page - 1}` : "";
	const nextPage =
		page + 1 < MAX_PAGE ? `/api/v1/images?page=${page + 1}` : "";
	return {
		prevPage: prevPage,
		currentPage: page,
		nextPage: nextPage,
		count: dinosaurImages.length,
		data: dinosaurImages,
	};
}

async function retrieveAllNames() {
	const dinosaurs = await Dinosaur.findAllNames();
	return dinosaurs.map(dino => dino.name).sort();
}

async function retrieveDinosaurById(id) {
	const dinosaur = await Dinosaur.findById(id);
	return dinosaur;
}

async function retrieveDinosaurByName(name) {
	const dinosaur = await Dinosaur.findByName(name);
	return dinosaur;
}

async function retrieveDinosaursByDiet(diet) {
	const dinosaurs = await Dinosaur.findByDiet(diet);
	return dinosaurs;
}

async function retrieveDinosaursByLocomotion(diet) {
	const dinosaurs = await Dinosaur.findByLocomotion(diet);
	return dinosaurs;
}

async function retrieveImageById(id) {
	const image = await Dinosaur.findImageById(id);
	return image;
}

async function returnRandomDinosaurs(count) {
	const dinosaurs = await Dinosaur.returnRandomDinosaurs(count);
	return dinosaurs;
}

async function returnRandomImages(count) {
	const dinosaurImages = await Dinosaur.returnRandomImages(count);
	return dinosaurImages;
}

async function returnDinosaursByQuery(clade, diet, locomotion) {
	const query = {
		$match: {},
	};

	if (diet) {
		query["$match"]["diet"] = diet;
	}

	if (locomotion) {
		query["$match"]["locomotionType"] = locomotion;
	}

	if (clade) {
		query["$match"]["classificationInfo.clade"] = { $in: clade };
	}
	const dinosaurs = await Dinosaur.returnDinosaursByQuery(query);
	return dinosaurs;
}

module.exports = {
	pushDinosaurToDB: pushDinosaurToDB,
	retrieveAllDinosaurs: retrieveAllDinosaurs,
	retrieveAllImages: retrieveAllImages,
	retrieveAllNames: retrieveAllNames,
	retrieveDinosaurById: retrieveDinosaurById,
	retrieveDinosaurByName: retrieveDinosaurByName,
	retrieveDinosaursByDiet: retrieveDinosaursByDiet,
	retrieveDinosaursByLocomotion: retrieveDinosaursByLocomotion,
	retrieveImageById: retrieveImageById,
	returnRandomDinosaurs: returnRandomDinosaurs,
	returnRandomImages: returnRandomImages,
	returnDinosaursByQuery: returnDinosaursByQuery,
};
