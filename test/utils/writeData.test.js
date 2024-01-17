const { expect, done } = require('chai');
const fs = require('fs');
const { writeData } = require('../../app/utils/writeData');
const { MongooseData } = require('../../app/models/MongooseData');
const path = require('path');

describe('writeData', async function () {
    const dinoData = new MongooseData('Stegosaurus');
    it('should save the data to the file when provided a valid object', async function () {
        await writeData(dinoData, 'testDinoData.json');
        const filePath = path.resolve(__dirname, '../../app/scripts/testDinoData.json');
        fs.access(filePath, fs.constants.F_OK, (err) => {
            expect(err).to.be.null;
        });

        fs.unlink(filePath, (err) => {
            expect(err).to.be.null;
        });
    });

    it('should throw an error when trying to save undefined object to file', async function () {
        await writeData(undefined, 'testDinoData.json');
        const filePath = path.resolve(__dirname, '../../app/scripts/testDinoData.json');
        fs.access(filePath, fs.constants.F_OK, (err) => {
            expect(err).to.not.be.null;
        });
    });
});
