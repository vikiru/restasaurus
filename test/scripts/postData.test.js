const fs = require('fs');

const chai = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const { expect } = chai;

describe('postData', function () {
    describe('postAllDinosaurs', function () {
        let convertToSchemaStub;
        let pushDinosaurToDBStub;
        let postAllDinosaurs;
        let mongoDB;
        let logger;
        let readJSONFileStub;

        beforeEach(function () {
            const { MongooseData } = require('../../app/models/MongooseData');
            mongoDB = require('../../app/data/mongoData');
            logger = require('../../app/config/logger');
            sinon.stub(logger.logger, 'info').resolves();
            sinon.stub(mongoDB, 'connect').resolves();
            sinon.stub(mongoDB, 'disconnect').resolves();
            sinon.stub(console, 'log').resolves();
            sinon.stub(process, 'hrtime').resolves();

            convertToSchemaStub = sinon.stub().resolves({});
            pushDinosaurToDBStub = sinon.stub().resolves({});
            readJSONFileStub = sinon.stub().resolves([new MongooseData('Dino'), new MongooseData('Dino')]);

            postAllDinosaurs = proxyquire('../../app/scripts/postData', {
                '../utils/convertToSchema': convertToSchemaStub,
                '../services/index': { pushDinosaurToDB: pushDinosaurToDBStub },
                './constructDinoNames': { readJSONFile: readJSONFileStub },
            }).postAllDinosaurs;
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should post all dinosaurs', async function () {
            await postAllDinosaurs();
            expect(mongoDB.connect.called).to.be.true;
            expect(mongoDB.disconnect.called).to.be.true;
            expect(pushDinosaurToDBStub.called).to.be.true;
        });
    });
});
