const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('constructDinoNames', () => {
    const logger = require('../../app/config/logger');
    const fetchData = require('../../app/utils/fetchData');
    const writeData = require('../../app/utils/writeData');
    const handleSetup = require('../../app/utils/handleSetup');

    const infoStub = sinon.stub(logger.logger, 'info');
    const errorStub = sinon.stub(logger.logger, 'error');
    const httpStub = sinon.stub(logger.logger, 'http');
    const writeDataStub = sinon.stub(writeData, 'writeData');
    const fetchDataStub = sinon.stub(fetchData, 'fetchData');
    const retrieveNamesStub = sinon.stub(handleSetup, 'retrieveAllDinoNames');
    const handleStub = sinon.stub(handleSetup, 'handleUrls');
    const processStub = sinon.stub(handleSetup, 'processData');

    beforeEach(() => {
        infoStub.callsFake(() => {});
        errorStub.callsFake(() => {});
        httpStub.callsFake(() => {});

        writeDataStub.callsFake(() => {});
        fetchDataStub.callsFake(() => {});
        retrieveNamesStub.callsFake(() => ['Tyrannosaurus', 'Stegosaurus']);
        handleStub.callsFake(() => {});
        processStub.callsFake(() => ['Stegosaurus', 'Tyrannosaurus']);
    });

    afterEach(() => {
        infoStub.restore();
        errorStub.restore();
        httpStub.restore();
        writeDataStub.restore();
        fetchDataStub.restore();
        retrieveNamesStub.restore();
        handleStub.restore();
        processStub.restore();
    });

    it('should call the necessary functions and return the expected names', async () => {
        const constructDinoNames = proxyquire('../../app/scripts/constructDinoNames', {
            '../utils/writeData': writeData,
            '../utils/fetchData': fetchData,
            '../utils/handleSetup': {
                retrieveAllDinoNames: retrieveNamesStub,
                handleUrls: handleStub,
                processData: processStub,
            },
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
