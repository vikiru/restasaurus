const path = require('path');
const { assert, expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { MongooseData } = require('../../app/models/MongooseData');

describe('writeData', function () {
    const dinoData = new MongooseData('Stegosaurus');
    let writeFileStub;
    let writeData;

    beforeEach(function () {
        writeFileStub = sinon.stub().resolves();
        const loggerStub = {
            error: sinon.stub(),
            info: sinon.stub(),
        };
        const writeDataModule = proxyquire('../../app/utils/writeData', {
            'node:fs': {
                promises: {
                    writeFile: writeFileStub,
                },
                access: sinon.stub().rejects(new Error('File does not exist')),
            },
            '../config/logger': {
                logger: loggerStub,
            },
        });
        writeData = writeDataModule.writeData;
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should save the data to the file when provided a valid object', async function () {
        await writeData(dinoData, 'testDinoData.json');
        assert.doesNotThrow(writeData, Error);
        expect(writeFileStub.called).to.be.true;
    });

    it('should throw an error when trying to save undefined object to file', async function () {
        const error = new Error('Write file failed');
        writeFileStub.rejects(error);
        try {
            await writeData(undefined, 'testDinoData.json');
            expect(writeFileStub.called).to.be.true;
        } catch (err) {
            expect(err.message).to.include('Write file failed');
        }
    });
});
