const express = require('express');

const {
  returnHome,
  retrieveAllDinosaurs,
  retrieveAllImages,
  retrieveAllNames,
  retrieveAllDiets,
  retrieveAllClades,
  retrieveAllLocomotions,
  retrieveDinoById,
  retrieveDinoByName,
  retrieveDinoByDiet,
  retrieveDinoByLocomotion,
  retrieveImageById,
  retrieveRandomDinosaurs,
  retrieveRandomImages,
  retrieveDinosaursByQuery,
} = require('../controllers/controller');

const router = express.Router();

router.get('/', returnHome);
router.get('/names', retrieveAllNames);
router.get('/diets', retrieveAllDiets);
router.get('/locomotions', retrieveAllLocomotions);
router.get('/clades', retrieveAllClades);
router.get('/dinosaurs', retrieveAllDinosaurs);
router.get('/dinosaurs/:id', retrieveDinoById);
router.get('/dinosaurs/name/:name', retrieveDinoByName);
router.get('/dinosaurs/diet/:diet', retrieveDinoByDiet);
router.get('/dinosaurs/locomotion/:locomotion', retrieveDinoByLocomotion);
router.get('/dinosaurs/random/:count', retrieveRandomDinosaurs);
router.get('/images', retrieveAllImages);
router.get('/images/:id', retrieveImageById);
router.get('/images/random/:count', retrieveRandomImages);
router.get('/search', retrieveDinosaursByQuery);

module.exports = router;
