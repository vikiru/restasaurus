const { expect } = require('chai');
const sinon = require('sinon');

const ClassificationInfo = require('../../app/models/ClassificationInfo');
const DinosaurImage = require('../../app/models/DinosaurImage');
const DinosaurSource = require('../../app/models/DinosaurSource');
const { MongooseData } = require('../../app/models/MongooseData');
const schemaConvert = require('../../app/utils/convertToSchema');

describe('convertToSchema', function () {
    let getClassificationAndDinosaurKeysStub;
    let createDinosaurObjectStub;
    let DinosaurSourceStub;
    let ClassificationInfoStub;
    let DinosaurImageStub;
    let createDinosaurInstanceStub;
    let createDataObjectStub;

    beforeEach(function () {
        DinosaurSourceStub = sinon.stub(DinosaurSource, 'DinosaurSource');
        ClassificationInfoStub = sinon.stub(ClassificationInfo, 'ClassificationInfo');
        DinosaurImageStub = sinon.stub(DinosaurImage, 'DinosaurImage');
        createDinosaurInstanceStub = sinon.stub(schemaConvert, 'createDinosaurInstance');
        createDataObjectStub = sinon.stub(schemaConvert, 'createDataObject');
    });

    afterEach(function () {
        DinosaurSourceStub.restore();
        ClassificationInfoStub.restore();
        DinosaurImageStub.restore();
        createDinosaurInstanceStub.restore();
        createDataObjectStub.restore();
    });

    describe('createSubObject', function () {
        it('should return a sub-object with the specified keys', function () {
            const obj = { a: 1, b: 2, c: 3 };
            const keys = ['a', 'c'];
            const result = schemaConvert.createSubObject(obj, keys);
            expect(result).to.deep.equal({ a: 1, c: 3 });
        });

        it('should return an empty object if no keys match', function () {
            const obj = { a: 1, b: 2, c: 3 };
            const keys = ['d', 'e'];
            const result = schemaConvert.createSubObject(obj, keys);
            expect(result).to.deep.equal({});
        });

        it('should call Object.prototype.hasOwnProperty for each key', function () {
            const obj = { a: 1, b: 2, c: 3 };
            const keys = ['a', 'c'];
            const hasOwnPropertyStub = sinon.stub(Object.prototype, 'hasOwnProperty');
            schemaConvert.createSubObject(obj, keys);
            expect(hasOwnPropertyStub.callCount).to.equal(keys.length);
            hasOwnPropertyStub.restore();
        });
    });

    it('should convert data to defined schema', async function () {
        const mongooseData = new MongooseData('Tyrannosaurus');
        const expectedSchema = {};

        DinosaurSourceStub.returns({});
        ClassificationInfoStub.returns({});
        DinosaurImageStub.returns({});
        createDinosaurInstanceStub.returns({});
        createDataObjectStub.returns(expectedSchema);

        const result = await schemaConvert.convertToSchema(mongooseData);
        expect(Object.keys(result).length).to.be.equal(4);
    });
});
