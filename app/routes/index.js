const {
	returnHome,
	retrieveAllDinosaurs,
	retrieveAllImages,
	retrieveAllNames,
	retrieveDinoById,
	retrieveDinoByName,
	retrieveDinoByDiet,
	retrieveDinoByLocomotion,
	retrieveImageById,
} = require("../controllers/controller");
const express = require("express");
const router = express.Router();

router.get("/", returnHome);
router.get("/dinosaurs", retrieveAllDinosaurs);
router.get("/dinosaurs/:id", retrieveDinoById);
router.get("/images", retrieveAllImages);
router.get("/names", retrieveAllNames);
router.get("/images/:id", retrieveImageById);
router.get("/dinosaurs/name/:name", retrieveDinoByName);
router.get("/dinosaurs/diet/:diet", retrieveDinoByDiet);
router.get("/dinosaurs/locomotion/:locomotion", retrieveDinoByLocomotion);
router.get("/dinosaurs/random/:count", () => logger.info("random count"));

module.exports = router;
