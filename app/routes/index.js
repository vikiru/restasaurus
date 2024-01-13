const express = require("express");
const {
	retrieveAllDinosaurs,
	retrieveAllImages,
	returnHome,
	retrieveDinoById,
	retrieveByName,
	retrieveByDiet,
	retrieveByLocomotion,
	retrieveImageById,
} = require("../controllers/controller");
const router = express.Router();

router.get("/", returnHome);
router.get("/dinosaurs", retrieveAllDinosaurs);
router.get("/dinosaurs/:id", retrieveDinoById);
router.get("/images", retrieveAllImages);
router.get("/images/:id", retrieveImageById);
router.get("/dinosaurs/name/:name", retrieveByName);
router.get("/dinosaurs/diet/:diet", retrieveByDiet);
router.get("/dinosaurs/locomotion/:locomotion", retrieveByLocomotion);
router.get("/dinosaurs/random/:count", () => console.log("random count"));

module.exports = router;
