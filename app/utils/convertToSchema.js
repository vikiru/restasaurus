const { ClassificationInfo } = require('../models/ClassificationInfo');
const { Dinosaur } = require('../models/Dinosaur');
const { DinosaurImage } = require('../models/DinosaurImage');
const { DinosaurSource } = require('../models/DinosaurSource');

const { sortInfo, getFamilySorter, getOrderSorter, getClassSorter } = require('./classificationInfoSorter');

/**
 * Gets the keys for the classification and dinosaur objects.
 *
 * @function
 * @returns {object} An object containing arrays of keys for the classification and dinosaur objects.
 */
function getClassificationAndDinosaurKeys() {
    return {
        classificationInfo: [
            'domain',
            'kingdom',
            'phylum',
            'clade',
            'classInfo',
            'orderInfo',
            'familyInfo',
            'tribeInfo',
            'genusInfo',
            'speciesInfo',
        ],
        dinosaur: ['name', 'temporalrange', 'diet', 'locomotionType', 'descriptions'],
    };
}

/**
 * Creates a sub-object from a given object, including only the specified keys.
 *
 * @param {object} obj - The original object.
 * @param {Array} keys - The keys to include in the sub-object.
 * @returns {object} The sub-object containing only the specified keys.
 */
function createSubObject(obj, keys) {
    const subObject = {};
    keys.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            subObject[key] = obj[key];
        }
    });
    return subObject;
}

/**
 * Creates a dinosaur object from the MongooseData instance.
 *
 * @function
 * @param {object} mongooseData - The mongoose data.
 * @param {object} keys - The keys for the dinosaur object.
 * @returns {object} The created dinosaur object.
 */
function createDinosaurObject(mongooseData, keys) {
    const dinosaur = {};
    Object.keys(keys).forEach((key) => {
        if (key in mongooseData) {
            dinosaur[key] = createSubObject(mongooseData[key], keys[key]);
        } else {
            dinosaur[key] = createSubObject(mongooseData, keys[key]);
        }
    });
    return dinosaur;
}

/**
 * Creates a Dinosaur instance using a combination of the defined Mongoose schemas and the data within the class,
 * MongooseData.
 *
 * @function
 * @param {object} mongooseData - The mongoose data.
 * @param {object} classification - The classification information.
 * @param {object} dinoSource - The dinosaur source.
 * @param {object} dinoImage - The dinosaur image.
 * @returns {object} The created dinosaur instance.
 */
function createDinosaurInstance(mongooseData, classification, dinoSource, dinoImage) {
    return new Dinosaur({
        name: mongooseData.name,
        temporalRange: mongooseData.temporalrange.replace(',,', ','),
        diet: mongooseData.diet,
        locomotionType: mongooseData.locomotionType,
        description: mongooseData.description,
        classificationInfo: classification,
        source: dinoSource,
        image: dinoImage,
    });
}

/**
 * Creates a data object which contains the Dinosaur, DinosaurImage, DinosaurSource and ClassificationInfo instances
 * which will be saved to the MongoDB database.
 *
 * @function
 * @param {object} dino - The dinosaur object.
 * @param {object} classification - The classification information.
 * @param {object} dinoImage - The dinosaur image.
 * @param {object} dinoSource - The dinosaur source.
 * @returns {object} The created data object.
 */
function createDataObject(dino, classification, dinoImage, dinoSource) {
    return {
        dinosaur: dino,
        classificationInfo: classification,
        image: dinoImage,
        source: dinoSource,
    };
}

/**
 * Sort the classification information of a given dinosaur by the specified order.
 *
 * @param classificationInfo
 */
async function sortClasssificationInfo(classificationInfo) {
    const familyInfo = classificationInfo.familyInfo;
    const orderInfo = classificationInfo.orderInfo;
    const classInfo = classificationInfo.classInfo;

    classificationInfo.family = sortInfo(familyInfo, getFamilySorter());
    classificationInfo.order = sortInfo(orderInfo, getOrderSorter());
    classificationInfo.classInfo = sortInfo(classInfo, getClassSorter());
    return classificationInfo;
}

/**
 * Converts a Javascript class, MongooseData to defined Mongoose schema.
 *
 * @async
 * @function
 * @param {object} mongooseData - The data to be converted.
 * @returns {Promise<object>} A promise that resolves to the created data object.
 */
async function convertToSchema(mongooseData) {
    const keys = getClassificationAndDinosaurKeys();

    mongooseData.classificationInfo = sortClasssificationInfo(mongooseData.classificationInfo);

    const dinosaur = createDinosaurObject(mongooseData, keys);
    const dinoSource = new DinosaurSource(mongooseData.source);

    const classification = new ClassificationInfo(dinosaur.classificationInfo);
    const dinoImage = new DinosaurImage(mongooseData.image);
    const dino = createDinosaurInstance(mongooseData, classification, dinoSource, dinoImage);
    return createDataObject(dino, classification, dinoImage, dinoSource);
}

module.exports = {
    convertToSchema,
    getClassificationAndDinosaurKeys,
    createDinosaurObject,
    createDinosaurInstance,
    createDataObject,
    createSubObject,
    sortClasssificationInfo,
};
