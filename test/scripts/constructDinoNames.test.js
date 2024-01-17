const { expect } = require('chai');
const sinon = require('sinon');
const sinonTest = require('sinon-test');
const proxyquire = require('proxyquire');
const logger = require('../../app/config/logger');
const fetchData = require('../../app/utils/fetchData');
const writeData = require('../../app/utils/writeData');
const handleSetup = require('../../app/utils/handleSetup');

const test = sinonTest(sinon);

describe('constructDinoNames', function () {
    it(
        'should call the necessary functions and return the expected names',
        test(async function () {
            sinon.stub(logger.logger, 'info').callsFake(() => {});
            sinon.stub(logger.logger, 'error').callsFake(() => {});
            sinon.stub(logger.logger, 'http').callsFake(() => {});

            const writeDataStub = sinon.stub(writeData, 'writeData').callsFake(() => {});
            const fetchDataStub = sinon.stub(fetchData, 'fetchData').callsFake(() => {});
            const retrieveNamesStub = sinon
                .stub(handleSetup, 'retrieveAllDinoNames')
                .callsFake(() => ['Tyrannosaurus', 'Stegosaurus']);
            const handleStub = sinon.stub(handleSetup, 'handleUrls').callsFake(() => {});
            const processStub = sinon
                .stub(handleSetup, 'processData')
                .callsFake(() => ['Stegosaurus', 'Tyrannosaurus']);

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
        }),
    );
});
