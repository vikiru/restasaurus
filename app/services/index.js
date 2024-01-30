const { logger } = require('../config/logger');
const { ClassificationInfo } = require('../models/ClassificationInfo');
const { Dinosaur } = require('../models/Dinosaur');
const { DinosaurImage } = require('../models/DinosaurImage');
const { DinosaurSource } = require('../models/DinosaurSource');

const MAX_PAGE = 20;

/**
 * Asynchronously pushes dinosaur data to the database.
 *
 * @async
 * @function
 * @param {object} data - The dinosaur data to be pushed to the database.
 * @throws {Error} Will throw an error if saving to the database fails.
 */
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
        logger.error(error.message);
    }
}

/**
 * Retrieves all dinosaurs from the database, paginated.
 *
 * @async
 * @function
 * @param {number} page - The page number to retrieve.
 * @returns {Promise<object>} A promise that resolves to an object containing pagination information and the retrieved
 *   dinosaurs.
 */
async function retrieveAllDinosaurs(page) {
    const dinosaurs = await Dinosaur.findAllDinosaurs(page);
    const prevPage = page - 1 > 0 ? `/api/v1/dinosaurs?page=${page - 1}` : '';
    const nextPage = page + 1 < MAX_PAGE ? `/api/v1/dinosaurs?page=${page + 1}` : '';
    return {
        prevPage,
        currentPage: page,
        nextPage,
        count: dinosaurs.length,
        data: dinosaurs,
    };
}

/**
 * Retrieves all dinosaur images from the database, paginated.
 *
 * @async
 * @function
 * @param {number} page - The page number to retrieve.
 * @returns {Promise<object>} A promise that resolves to an object containing pagination information and the retrieved
 *   dinosaur images.
 */
async function retrieveAllImages(page) {
    const dinosaurImages = await Dinosaur.findAllImages(page);
    const prevPage = page - 1 > 0 ? `/api/v1/images?page=${page - 1}` : '';
    const nextPage = page + 1 < MAX_PAGE ? `/api/v1/images?page=${page + 1}` : '';
    return {
        prevPage,
        currentPage: page,
        nextPage,
        count: dinosaurImages.length,
        data: dinosaurImages,
    };
}

/**
 * Retrieves all dinosaur names, sorted in alphabetical order.
 *
 * @async
 * @function
 * @returns {Promise<string[]>} A promise that resolves to an array of dinosaur names.
 */
async function retrieveAllNames() {
    const dinosaurs = await Dinosaur.findAllNames();
    return dinosaurs.map((dino) => dino.name).sort();
}

/**
 * The function retrieves all diets from a database and returns them in a formatted array.
 *
 * @returns The function `retrieveAllDiets` is returning an array of objects, where each object has two properties:
 *   `diet` and `count`.
 */
async function retrieveAllDiets() {
    const diets = await Dinosaur.findAllDiets();
    const formattedDiets = diets.map((diet) => ({
        diet: diet._id.diet,
        count: diet.count,
    }));
    formattedDiets.sort((a, b) => b.count - a   .count);
    return formattedDiets;
}

async function retrieveAllLocomotions() {
    const locomotions = await Dinosaur.findAllLocomotions();
    const formattedLocomotions = locomotions.map((locomotion) => ({
        locomotionType: locomotion._id.locomotionType,
        count: locomotion.count,
    }));
    formattedLocomotions.sort((a, b) => b.count - a.count);
    return formattedLocomotions;
}


/**
 * Retrieves a dinosaur by its ID.
 *
 * @async
 * @function
 * @param {string} id - The ID of the dinosaur.
 * @returns {Promise<object>} A promise that resolves to the dinosaur object.
 */
async function retrieveDinosaurById(id) {
    const dinosaur = await Dinosaur.findById(id);
    return dinosaur;
}

/**
 * Retrieves a dinosaur by its name.
 *
 * @async
 * @function
 * @param {string} name - The name of the dinosaur.
 * @returns {Promise<object>} A promise that resolves to the dinosaur object.
 */
async function retrieveDinosaurByName(name) {
    const dinosaur = await Dinosaur.findByName(name);
    return dinosaur;
}

/**
 * Retrieves dinosaurs by their diet.
 *
 * @async
 * @function
 * @param {string} diet - The diet of the dinosaurs.
 * @returns {Promise<object[]>} A promise that resolves to an array of dinosaur objects.
 */
async function retrieveDinosaursByDiet(diet) {
    const dinosaurs = await Dinosaur.findByDiet(diet);
    return dinosaurs;
}

/**
 * Retrieves dinosaurs by their locomotion.
 *
 * @async
 * @function
 * @param {string} locomotion - The locomotion of the dinosaurs.
 * @returns {Promise<object[]>} A promise that resolves to an array of dinosaur objects.
 */
async function retrieveDinosaursByLocomotion(locomotion) {
    const dinosaurs = await Dinosaur.findByLocomotion(locomotion);
    return dinosaurs;
}

/**
 * Retrieves an image by its ID.
 *
 * @async
 * @function
 * @param {string} id - The ID of the image.
 * @returns {Promise<string>} A promise that resolves to the image URL.
 */
async function retrieveImageById(id) {
    const image = await Dinosaur.findImageById(id);
    return image;
}

/**
 * Returns a specified number of random dinosaurs.
 *
 * @async
 * @function
 * @param {number} count - The number of dinosaurs to return.
 * @returns {Promise<object[]>} A promise that resolves to an array of dinosaur objects.
 */
async function returnRandomDinosaurs(count) {
    const dinosaurs = await Dinosaur.returnRandomDinosaurs(count);
    return dinosaurs;
}

/**
 * Returns a specified number of random dinosaur images.
 *
 * @async
 * @function
 * @param {number} count - The number of dinosaur images to return.
 * @returns {Promise<string[]>} A promise that resolves to an array of image URLs.
 */
async function returnRandomImages(count) {
    const dinosaurImages = await Dinosaur.returnRandomImages(count);
    return dinosaurImages;
}

/**
 * Asynchronously retrieves dinosaurs from a database based on the provided query parameters.
 *
 * @param {string[]} clade - An array of clade names. Dinosaurs belonging to any of these clades will be included in the
 *   results.
 * @param {string} diet - The diet of the dinosaurs to retrieve (e.g., 'herbivore', 'carnivore'). If this parameter is
 *   provided, only dinosaurs with the specified diet will be included in the results.
 * @param {string} locomotion - The type of locomotion of the dinosaurs to retrieve (e.g., 'biped', 'quadruped'). If
 *   this parameter is provided, only dinosaurs with the specified type of locomotion will be included in the results.
 * @returns {Promise<object[]>} A promise that resolves to an array of dinosaur objects that match the provided query
 *   parameters.
 */
async function returnDinosaursByQuery(clade, diet, locomotion) {
    const query = {
        $match: {},
    };

    if (diet) {
        query.$match.diet = diet;
    }

    if (locomotion) {
        query.$match.locomotionType = locomotion;
    }

    if (clade) {
        query.$match['classificationInfo.clade'] = { $in: clade };
    }

    const dinosaurs = await Dinosaur.returnDinosaursByQuery(query);
    return dinosaurs;
}

module.exports = {
    pushDinosaurToDB,
    retrieveAllDinosaurs,
    retrieveAllImages,
    retrieveAllNames,
    retrieveAllDiets,
    retrieveAllLocomotions,
    retrieveDinosaurById,
    retrieveDinosaurByName,
    retrieveDinosaursByDiet,
    retrieveDinosaursByLocomotion,
    retrieveImageById,
    returnRandomDinosaurs,
    returnRandomImages,
    returnDinosaursByQuery,
};
