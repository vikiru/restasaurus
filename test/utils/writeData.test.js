const fs = require('fs').promises;
const path = require('path');

const { assert, expect } = require('chai');
const sinon = require('sinon');

const { MongooseData } = require('../../app/models/MongooseData');

describe('writeData', function () {
    const dinoData = new MongooseData('Stegosaurus');
    const scriptsDir = path.resolve(__dirname, '../../app/scripts');
    const filePath = path.join(scriptsDir, 'testDinoData.json');

    afterEach(function () {
        sinon.restore();
    });

    it('should save the data to the file when provided a valid object', async function () {
        sinon.stub(fs, 'writeFile').resolves();
        const { writeData } = require('../../app/utils/writeData');
        await writeData(dinoData, 'testDinoData.json');
        assert.doesNotThrow(writeData, Error);
    });

    it('should throw an error when trying to save undefined object to file', async function () {
        const error = new Error('Write file failed');
        sinon.stub(fs, 'writeFile').rejects(error);
        const { writeData } = require('../../app/utils/writeData');
        await writeData(undefined, 'testDinoData.json');
        try {
            await fs.access(filePath, fs.constants.F_OK);
        } catch (err) {
            expect(err).to.not.be.null;
        }
    });
});
