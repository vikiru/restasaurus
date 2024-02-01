const { logger } = require('../config/logger');
const dinosaurService = require('../services/index');

const apiEndpoints = {
    home: '/api/v1',
    getAllClades: '/api/v1/clades',
    getAllDiets: '/api/v1/diets',
    getAllLocomotions: '/api/v1/locomotions',
    getAllNames: '/api/v1/names',
    getAllDinos: '/api/v1/dinosaurs',
    getDinoById: '/api/v1/dinosaurs/:id',
    getDinoByName: '/api/v1/dinosaurs/name/:name',
    getDinosByDiet: '/api/v1/dinosaurs/diet/:diet',
    getDinosByLocomotion: '/api/v1/dinosaurs/locomotion/:locomotion',
    getRandomDinos: '/api/v1/dinosaurs/random/:count',
    getDinosaurByQuery: '/api/v1/search',
    getAllImages: '/api/v1/images',
    getImageById: '/api/v1/images/:id',
    getRandomImages: '/api/v1/images/random/:count',
};

/**
 * Sends a response with the home page information of the API.
 *
 * @async
 * @function
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Promise representing the completion of the Express response.
 */
async function returnHome(req, res) {
    res.status(200).json({
        apiVersion: 'v1',
        apiEndpoints,
        rateLimit: '20 requests per hour',
        disclaimer:
            'The information within the API is taken directly from Wikipedia, as is and may have been modified since the last time it was retrieved. All images and text belong to their respective authors and attribution is provided accordingly for both.',
    });
}

/**
 * Retrieves all dinosaurs.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveAllDinosaurs(req, res) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const result = await dinosaurService.retrieveAllDinosaurs(page);
        if (result.data.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Sorry, there was an error retrieving all dinosaurs' });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: ' Sorry, an unexpected error occurred while retrieving all dinosaurs',
        });
    }
}

/**
 * Retrieves all dinosaur images.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveAllImages(req, res) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const result = await dinosaurService.retrieveAllImages(page);
        if (result.data.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                error: 'Sorry, there was an error retrieving all dinosaur images',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occurred while retrieving all dinosaur images',
        });
    }
}

/**
 * Retrieves all dinosaur names.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveAllNames(req, res) {
    try {
        const names = await dinosaurService.retrieveAllNames();
        if (names.length > 0) {
            res.status(200).json({ count: names.length, data: names });
        } else {
            res.status(404).json({
                error: 'Sorry, there was an error retrieving all dinosaur names',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occurred while retrieving all dinosaur names',
        });
    }
}

/**
 * The function retrieves all dinosaur diets and returns them as a JSON response, or returns an error message if there
 * was an issue retrieving the diets.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveAllDiets(req, res) {
    try {
        const diets = await dinosaurService.retrieveAllDiets();
        if (diets.length > 0) {
            res.status(200).json({
                uniqueDiets: diets.length,
                data: diets,
            });
        } else {
            res.status(404).json({
                error: 'Sorry, there was an error retrieving all dinosaur diets',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occurred while retrieving all dinosaur diets',
        });
    }
}

/**
 * The function retrieves all dinosaur locomotions and returns them in a JSON response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveAllLocomotions(req, res) {
    try {
        const locomotions = await dinosaurService.retrieveAllLocomotions();
        if (locomotions.length > 0) {
            res.status(200).json({
                uniqueLocomotions: locomotions.length,
                data: locomotions,
            });
        } else {
            res.status(404).json({
                error: 'Sorry, there was an error retrieving all dinosaur locomotions',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occurred while retrieving all dinosaur locomotions',
        });
    }
}

/**
 * The function retrieves all dinosaur clades and returns them as a JSON response, handling any errors that occur.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveAllClades(req, res) {
    try {
        const clades = await dinosaurService.retrieveAllClades();
        if (clades.length > 0) {
            res.status(200).json({
                uniqueClades: clades.length,
                data: clades,
            });
        } else {
            res.status(404).json({
                error: 'Sorry, there was an error retrieving all dinosaur clades',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occurred while retrieving all dinosaur clades',
        });
    }
}

/**
 * Retrieves a dinosaur by ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveDinoById(req, res) {
    try {
        const { id } = req.params;
        const dinosaur = await dinosaurService.retrieveDinosaurById(id);
        if (dinosaur) {
            res.status(200).json(dinosaur);
        } else {
            res.status(404).json({
                error: 'Sorry, there doesnt seem to be a dinosaur matching that id.',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occured while retrieving a dinosaur matching the specified id.',
        });
    }
}

/**
 * Retrieves a dinosaur by name.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveDinoByName(req, res) {
    try {
        const { name } = req.params;
        const dinosaur = await dinosaurService.retrieveDinosaurByName(name);
        if (dinosaur) {
            res.status(200).json(dinosaur);
        } else {
            res.status(404).json({
                error: 'Sorry, there doesnt seem to be a dinosaur matching that name.',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occured trying to find a dinosaur matching that name.',
        });
    }
}

/**
 * Retrieves dinosaurs by diet.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveDinoByDiet(req, res) {
    try {
        const { diet } = req.params;
        const dinosaurs = await dinosaurService.retrieveDinosaursByDiet(diet);
        if (dinosaurs.length > 0) {
            res.status(200).json({ count: dinosaurs.length, data: dinosaurs });
        } else {
            res.status(404).json({
                error: "Sorry, there doesn't seem to be any dinosaurs matching that diet.",
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occured while retrieving all dinosaurs matching that diet.',
        });
    }
}

/**
 * Retrieves dinosaurs by locomotion type.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveDinoByLocomotion(req, res) {
    try {
        const { locomotion } = req.params;
        const dinosaurs = await dinosaurService.retrieveDinosaursByLocomotion(locomotion);
        if (dinosaurs.length > 0) {
            res.status(200).json({ count: dinosaurs.length, data: dinosaurs });
        } else {
            res.status(404).json({
                error: "Sorry, there doesn't seem to be any dinosaurs matching that locomotion type.",
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occured while retrieving all dinosaurs matching that diet.',
        });
    }
}

/**
 * Retrieves a dinosaur image by ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveImageById(req, res) {
    try {
        const { id } = req.params;
        const dinosaurImage = await dinosaurService.retrieveImageById(id);
        if (dinosaurImage) {
            res.status(200).json(dinosaurImage);
        } else {
            res.status(404).json({
                error: 'Sorry, there doesnt seem to be a dinosaur image matching that id.',
            });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected occurred while trying to recieve an image matching that id.',
        });
    }
}

/**
 * Retrieves a random number of dinosaurs.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveRandomDinosaurs(req, res) {
    const count = parseInt(req.params.count, 10) || 1;
    const size = count <= 10 ? count : 10;
    try {
        const dinosaurs = await dinosaurService.returnRandomDinosaurs(size);
        res.status(200).json({ count: dinosaurs.length, data: dinosaurs });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occurred while trying to retrieve a random number of dinosaurs.',
        });
    }
}

/**
 * Retrieves a random number of dinosaur images.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveRandomImages(req, res) {
    const count = parseInt(req.params.count, 10) || 1;
    const size = count <= 10 ? count : 10;
    try {
        const dinosaurImages = await dinosaurService.returnRandomImages(size);
        res.status(200).json({
            count: dinosaurImages.length,
            data: dinosaurImages,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Sorry, an unexpected error occurred while trying to retrieve a random number of dinosaur images.',
        });
    }
}

/**
 * Retrieves dinosaurs by a query. Available query parameters include clade, diet, locomotion.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
async function retrieveDinosaursByQuery(req, res) {
    try {
        let { clade } = req.query;
        const { diet, locomotion } = req.query;
        if (typeof clade === 'string') {
            clade = clade.split(',').map((item) => item.trim());
        }

        const dinosaurs = await dinosaurService.returnDinosaursByQuery(clade, diet, locomotion);

        if (dinosaurs.length > 0) {
            res.status(200).json({ count: dinosaurs.length, data: dinosaurs });
        } else {
            res.status(404).json({
                error: 'Sorry, there doesnt seem to be any dinosaurs matching that query.',
            });
        }
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({
            error: 'Sorry, an unexpected error occured while performing that query.',
        });
    }
}

module.exports = {
    apiEndpoints,
    returnHome,
    retrieveAllDinosaurs,
    retrieveAllImages,
    retrieveAllNames,
    retrieveAllDiets,
    retrieveAllLocomotions,
    retrieveAllClades,
    retrieveDinoById,
    retrieveDinoByName,
    retrieveDinoByDiet,
    retrieveDinoByLocomotion,
    retrieveImageById,
    retrieveRandomDinosaurs,
    retrieveRandomImages,
    retrieveDinosaursByQuery,
};
