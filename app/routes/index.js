const express = require("express");
const {
	retrieveAllDinosaurs,
	returnHome,
	retrieveById,
	retrieveByName,
	retrieveByDiet,
	retrieveByLocomotion,
	retrieveAllImages,
	retrieveImageById,
} = require("../controllers/controller");
const router = express.Router();

router.get("/", returnHome);
router.get("/dinosaurs", retrieveAllDinosaurs);
router.get("/dinosaurs/images", retrieveAllImages);
router.get("/dinosaurs/images/:id", retrieveImageById);
router.get("/dinosaurs/id/:id", retrieveById);
router.get("/dinosaurs/name/:name", retrieveByName);
router.get("/dinosaurs/diet/:diet", retrieveByDiet);
router.get("/dinosaurs/locomotion/:locomotion", retrieveByLocomotion);
router.get("/dinosaurs/random/:count", () => console.log("random count"));

module.exports = router;
