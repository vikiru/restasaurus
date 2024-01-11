const express = require("express");
const {
	retrieveAllDinosaurs,
	returnHome,
	retrieveById,
	retrieveByName,
	retrieveByDiet,
	retrieveByLocomotion,
} = require("../controllers/controller");
const router = express.Router();

router.get("/", returnHome);
router.get("/dinosaurs", retrieveAllDinosaurs);
router.get("/dinosaurs/id/:id", retrieveById);
router.get("/dinosaurs/name/:name", retrieveByName);
router.get("/dinosaurs/diet/:diet", retrieveByDiet);
router.get("/dinosaurs/locomotion/:locomotion", retrieveByLocomotion);
router.get("/dinosaurs/random/:count", () => console.log("random count"));

module.exports = router;
