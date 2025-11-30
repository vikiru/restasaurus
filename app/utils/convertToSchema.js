const { ClassificationInfo } = require('../models/ClassificationInfo');
const { Dinosaur } = require('../models/Dinosaur');
const { DinosaurImage } = require('../models/DinosaurImage');
const { DinosaurSource } = require('../models/DinosaurSource');

const {
  sortInfo,
  getFamilySorter,
  getOrderSorter,
  getClassSorter,
} = require('./classificationInfoSorter');

/**
 * Creates a sub-object from a given object, including only the specified keys.
 *
 * @param {object} obj - The original object.
 * @param {Array} keys - The keys to include in the sub-object.
 * @returns {object} The sub-object containing only the specified keys.
 */
function createSubObject(obj, keys) {
  const subObject = {};
  keys.forEach(key => {
    if (Object.hasOwn(obj, key)) {
      subObject[key] = obj[key];
    }
  });
  return subObject;
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
function createDinosaurInstance(
  mongooseData,
  classification,
  dinoSource,
  dinoImage
) {
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
 * @param classificationInfo - The classification information of a given dinosaur.
 * @returns ClassificationInfo - The sorted classification information.
 */
async function sortClasssificationInfo(classificationInfo) {
  const familyInfo = classificationInfo.familyInfo;
  const orderInfo = classificationInfo.orderInfo;
  const classInfo = classificationInfo.classInfo;

  classificationInfo.familyInfo = sortInfo(familyInfo, getFamilySorter());
  classificationInfo.orderInfo = sortInfo(orderInfo, getOrderSorter());
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
  mongooseData.classificationInfo = await sortClasssificationInfo(
    mongooseData.classificationInfo
  );
  const dinoSource = new DinosaurSource(mongooseData.source);
  const classification = new ClassificationInfo(
    mongooseData.classificationInfo
  );
  const dinoImage = new DinosaurImage(mongooseData.image);
  const dino = createDinosaurInstance(
    mongooseData,
    classification,
    dinoSource,
    dinoImage
  );
  return createDataObject(dino, classification, dinoImage, dinoSource);
}

module.exports = {
  convertToSchema,
  createDinosaurInstance,
  createDataObject,
  createSubObject,
  sortClasssificationInfo,
};
