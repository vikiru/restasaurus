const dinosaurService = require("../services/index");
const { logger } = require("../config/logger");

const apiEndpoints = {
	home: "/api/v1",
	getAllDinos: "/api/v1/dinosaurs",
	getDinoById: "/api/v1/dinosaurs/:id",
	getAllImages: "/api/v1/images",
	getImageById: "/api/v1/images/:id",
	getDinoByName: "/api/v1/dinosaurs/name/:name",
	getDinoByQuery: "/api/v1/dinosaurs/search",
	getDinosByDiet: "/api/v1/dinosaurs/diet/:diet",
	getDinosByLocomotion: "/api/v1/dinosaurs/locomotion/:locomotion",
	getRandomDinos: "/api/v1/dinosaurs/random/:count",
};

async function returnHome(req, res) {
	res.status(200).json({
		apiVersion: "v1",
		apiEndpoints: apiEndpoints,
		rateLimit: "20 requests per hour",
		disclaimer:
			"The information within the API is taken directly from Wikipedia, as is and may have been modified since the last time it was retrieved. All images and text belong to their respective authors and attribution is provided accordingly for both.",
	});
}

async function retrieveAllDinosaurs(req, res) {
	try {
		const page = parseInt(req.query.page || 1);
		const result = await dinosaurService.retrieveAllDinosaurs(page);
		if (result.data.length > 0) {
			res.status(200).json(result);
		} else {
			res.status(404).json(
				"Sorry, there was an error retrieving all dinosaurs",
			);
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: " Sorry, an unexpected error occurred while retrieving all dinosaurs",
		});
	}
}

async function retrieveAllImages(req, res) {
	try {
		const page = parseInt(req.query.page || 1);
		const result = await dinosaurService.retrieveAllImages(page);
		if (result.data.length > 0) {
			res.status(200).json(result);
		} else {
			res.status(404).json({
				error: "Sorry, there was an error retrieving all dinosaur images",
			});
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Sorry, an unexpected error occurred while retrieving all dinosaur images",
		});
	}
}

async function retrieveAllNames(req, res) {
	try {
		const names = await dinosaurService.retrieveAllNames();
		if (names.length > 0) {
			res.status(200).json({ count: names.length, names: names });
		} else {
			res.status(404).json({
				error: "Sorry, there was an error retrieving all dinosaur names",
			});
		}
	} catch (error) {
		logger.error(error);
		res.status(404).json({
			error: " Sorry, an unexpected error occurred while retrieving all dinosaur names",
		});
	}
}

async function retrieveDinoById(req, res) {
	try {
		const id = req.params.id;
		const dinosaur = await dinosaurService.retrieveDinosaurById(id);
		if (dinosaur) {
			res.status(200).json(dinosaur);
		} else {
			res.status(404).json({
				error: "Sorry, there doesnt seem to be a dinosaur matching that id.",
			});
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Sorry, an unexpected error occured while retrieving a dinosaur matching the specified id.",
		});
	}
}

async function retrieveDinoByName(req, res) {
	try {
		const name = req.params.name;
		const dinosaur = await dinosaurService.retrieveDinosaurByName(name);
		if (dinosaur) {
			res.status(200).json(dinosaur);
		} else {
			res.status(404).json({
				error: "Sorry, there doesnt seem to be a dinosaur matching that name.",
			});
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Sorry, an unexpected error occured trying to find a dinosaur matching that name.",
		});
	}
}

async function retrieveDinoByDiet(req, res) {
	try {
		const diet = req.params.diet;
		const dinosaurs = await dinosaurService.retrieveDinosaurByDiet(diet);
		if (dinosaurs.length > 0) {
			return res
				.status(200)
				.json({ count: dinosaurs.length, data: dinosaurs });
		} else {
			return res.status(404).json({
				error: "Sorry, there doesn't seem to be any dinosaurs matching that diet.",
			});
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Sorry, an unexpected error occured while retrieving all dinosaurs matching that diet.",
		});
	}
}

async function retrieveDinoByLocomotion(req, res) {
	try {
		const locomotion = req.params.locomotion;
		const dinosaurs =
			await dinosaurService.retrieveDinosaursByLocomotion(locomotion);
		if (dinosaurs.length > 0) {
			return res
				.status(200)
				.json({ count: dinosaurs.length, dinosaurdata: dinosaurs });
		} else {
			return res.status(404).json({
				error: "Sorry, there doesn't seem to be any dinosaurs matching that locomotion type.",
			});
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Sorry, an unexpected error occured while retrieving all dinosaurs matching that diet.",
		});
	}
}

async function retrieveImageById(req, res) {
	try {
		const id = req.params.id;
		const dinosaurImage = await dinosaurService.retrieveImageById(id);
		if (dinosaurImage) {
			res.status(200).json(dinosaurImage);
		} else {
			res.status(404).json({
				error: "Sorry, there doesnt seem to be a dinosaur image matching that id.",
			});
		}
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Sorry, an unexpected occurred while trying to recieve an image matching that id.",
		});
	}
}

async function retrieveRandomDinosaurs(req, res) {
	const count = parseInt(req.params.count) || 1;
	const size = count <= 10 ? count : 10;
	try {
		const dinosaurs = await dinosaurService.returnRandomDinosaurs(size);
		res.status(200).json(dinosaurs);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Sorry, an unexpected error occurred while trying to retrieve a random number of dinosaurs.",
		});
	}
}

module.exports = {
	returnHome: returnHome,
	retrieveAllDinosaurs: retrieveAllDinosaurs,
	retrieveAllImages: retrieveAllImages,
	retrieveAllNames: retrieveAllNames,
	retrieveDinoById: retrieveDinoById,
	retrieveDinoByName: retrieveDinoByName,
	retrieveDinoByDiet: retrieveDinoByDiet,
	retrieveDinoByLocomotion: retrieveDinoByLocomotion,
	retrieveImageById: retrieveImageById,
	retrieveRandomDinosaurs: retrieveRandomDinosaurs,
	apiEndpoints: apiEndpoints,
};
