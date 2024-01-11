const express = require("express");
const router = express.Router();

const apiEndpoints = {
	getAllDinos: "/api/v1/dinosaurs",
	getDinoById: "/api/v1/dinosaurs/:id",
	getDinoByName: "/api/v1/dinosaurs/:name",
	getDinoByQuery: "/api/v1/dinosaurs/search",
	getDinosByTemporalRange: "/api/v1/dinosaurs/:temporalRange",
	getDinosByDiet: "/api/v1/dinosaurs/:diet",
	getRandomDinos: "/api/v1/dinosaurs/random/:count",
};

router.get("/", async (req, res) => {
	res.json({
		apiVersion: "v1",
		apiEndpoints: apiEndpoints,
		rateLimit: "5 requests per hour",
		disclaimer:
			"The information within the API is taken directly from Wikipedia, as is and complies with the CC BY SA 4.0 and CC BY 4.0 licenses for articles and images respectively. Necessary details like title, author, source URL, license type, and license URL are provided for attribution.",
	});
});

// placeholder until route logic has been implemented
router.get("/dinosaurs", (req, res) => {
	res.status(200).json({ message: "all dinos" });
});

router.get("/dinosaurs/:id", () => console.log("id"));
router.get("/dinosaurs/:name", () => console.log("name"));
router.get("/dinosaurs/random/:count", () => console.log("random count"));

module.exports = router;
