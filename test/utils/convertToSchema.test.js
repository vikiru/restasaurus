const { expect } = require('chai');
const sinon = require('sinon');

const ClassificationInfo = require('../../app/models/ClassificationInfo');
const DinosaurImage = require('../../app/models/DinosaurImage');
const DinosaurSource = require('../../app/models/DinosaurSource');
const { MongooseData } = require('../../app/models/MongooseData');
const schemaConvert = require('../../app/utils/convertToSchema');

describe('convertToSchema', () => {
    let getClassificationAndDinosaurKeysStub;
    let createDinosaurObjectStub;
    let DinosaurSourceStub;
    let ClassificationInfoStub;
    let DinosaurImageStub;
    let createDinosaurInstanceStub;
    let createDataObjectStub;

    beforeEach(() => {
        getClassificationAndDinosaurKeysStub = sinon.stub(schemaConvert, 'getClassificationAndDinosaurKeys');
        createDinosaurObjectStub = sinon.stub(schemaConvert, 'createDinosaurObject');
        DinosaurSourceStub = sinon.stub(DinosaurSource, 'DinosaurSource');
        ClassificationInfoStub = sinon.stub(ClassificationInfo, 'ClassificationInfo');
        DinosaurImageStub = sinon.stub(DinosaurImage, 'DinosaurImage');
        createDinosaurInstanceStub = sinon.stub(schemaConvert, 'createDinosaurInstance');
        createDataObjectStub = sinon.stub(schemaConvert, 'createDataObject');
    });

    afterEach(() => {
        getClassificationAndDinosaurKeysStub.restore();
        createDinosaurObjectStub.restore();
        DinosaurSourceStub.restore();
        ClassificationInfoStub.restore();
        DinosaurImageStub.restore();
        createDinosaurInstanceStub.restore();
        createDataObjectStub.restore();
    });

    it('should convert data to defined schema', async () => {
        const mongooseData = new MongooseData('Tyrannosaurus');
        const expectedSchema = {};

        getClassificationAndDinosaurKeysStub.returns([]);
        createDinosaurObjectStub.returns({});
        DinosaurSourceStub.returns({});
        ClassificationInfoStub.returns({});
        DinosaurImageStub.returns({});
        createDinosaurInstanceStub.returns({});
        createDataObjectStub.returns(expectedSchema);

        const result = await schemaConvert.convertToSchema(mongooseData);
        expect(Object.keys(result).length).to.be.equal(4);
    });
});
