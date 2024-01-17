const { assert, expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const logger = require('../../app/config/logger');
const fetchData = require('../../app/utils/fetchData');
const writeData = require('../../app/utils/writeData');
const handleSetup = require('../../app/utils/handleSetup');

describe('constructDinoNames', function () {
    it('should call the necessary functions and return the expected names', async function () {
        const writeDataStub = sinon.stub(writeData, 'writeData').callsFake(() => {});
        const fetchDataStub = sinon.stub(fetchData, 'fetchData').callsFake(() => {});
        const retrieveNamesStub = sinon
            .stub(handleSetup, 'retrieveAllDinoNames')
            .callsFake(() => ['Tyrannosaurus', 'Stegosaurus']);
        const handleStub = sinon.stub(handleSetup, 'handleUrls').callsFake(() => {});
        const processStub = sinon.stub(handleSetup, 'processData').callsFake(() => ['Stegosaurus', 'Tyrannosaurus']);

        const constructDinoNames = proxyquire('../../app/scripts/constructDinoNames', {
            '../utils/writeData': writeDataStub,
            '../utils/fetchData': fetchDataStub,
            '../utils/handleSetup': retrieveNamesStub,
            handleStub,
            processStub,
        });

        const { names } = await constructDinoNames.constructDinoNames();

        expect(retrieveNamesStub.calledOnce).to.be.true;
        expect(handleStub.calledOnce).to.be.true;
        expect(processStub.calledOnce).to.be.true;
        expect(names).to.have.length(2);
        expect(names[0]).to.be.equal('Stegosaurus');
        expect(names[1]).to.be.equal('Tyrannosaurus');
    });
});
