const { Dinosaur } = require("../models/Dinosaur");
const { DinosaurInfo } = require("../models/DinosaurInfo");

const apiEndpoints = {
	getAllDinos: "/api/v1/dinosaurs",
	getDinoById: "/api/v1/dinosaurs/id/:id",
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
		rateLimit: "5 requests per hour",
		disclaimer:
			"The information within the API is taken directly from Wikipedia, as is and may have been modified since the last time it was retrieved. All images and text belong to their respective authors and attribution is provided accordingly for both.",
	});
}

async function retrieveAllDinosaurs(req, res) {
	try {
		const dinosaurs = await Dinosaur.find();
		res.status(200).json(dinosaurs);
	} catch (error) {
		console.error(error);
	}
}

async function retrieveById(req, res) {
	try {
		const id = req.params.id;
		const dinosaur = await Dinosaur.findOne({ id: id });
		console.log(dinosaur);
		res.status(200).json(dinosaur);
	} catch (error) {
		console.error(error);
		res.status(404).json({
			error: "Sorry, there does not seem to be a dinosaur matching that id.",
		});
	}
}

async function retrieveByName(req, res) {
	try {
		const name = req.params.name;
		const dinosaurInfo = await DinosaurInfo.findOne({ name: name });
		let dinosaur = {};
		if (dinosaurInfo) {
			dinosaur = await Dinosaur.findOne({ info: dinosaurInfo._id });
			res.status(200).json(dinosaur);
		} else {
			res.status(404).json({
				error: "Sorry, there doesnt seem to be a dinosaur matching that name.",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(404).json({
			error: "Sorry, there doesnt seem to be a dinosaur matching that name.",
		});
	}
}

async function retrieveByDiet(req, res) {
	try {
		const diet = req.params.diet;
		const dinosaurInfos = await DinosaurInfo.find({ diet: diet });
		const dinosaurs = [];
		if (dinosaurInfos) {
			for (const dinosaurInfo of dinosaurInfos) {
				const dinosaur = await Dinosaur.findOne({
					info: dinosaurInfo._id,
				});
				dinosaurs.push(dinosaur);
			}
			return res.status(200).json(dinosaurs);
		} else {
			return res.status(404).json({
				error: "Sorry, there doesnt seem to be any dinosaurs matching that diet.",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(404).json({
			error: "Sorry, there doesnt seem to be any dinosaurs matching that diet.",
		});
	}
}
module.exports = {
	returnHome: returnHome,
	retrieveAllDinosaurs: retrieveAllDinosaurs,
	retrieveById: retrieveById,
	retrieveByName: retrieveByName,
	retrieveByDiet: retrieveByDiet,
	apiEndpoints: apiEndpoints,
};
