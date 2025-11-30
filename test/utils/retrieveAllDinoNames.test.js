const fs = require('fs');

const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('retrieveAllDinoNames', function () {
    let retrieveAllDinoNames;
    let logger;
    let fetchDataStub;
    let writeStub;
    const url =
        'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_dinosaur_genera&prop=text&formatversion=2&format=json';

    beforeEach(function () {
        
        
        logger = require('../../app/config/logger');
        sinon.stub(logger.logger, 'info').resolves();
        sinon.stub(logger.logger, 'error').resolves();
        sinon.stub(logger.logger, 'http').resolves();
        
        fetchDataStub = sinon.stub();
        writeStub = sinon.stub(fs.promises, 'writeFile');
        
        retrieveAllDinoNames = proxyquire('../../app/utils/retrieveAllDinoNames', {
            './fetchData': { fetchData: fetchDataStub },
        });
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should retrieve all dino names', async function () {
        const expectedData = {
            parse: {
                text: `
                        <div class="mw-content-ltr">
                            <ul>
                                <li>
                                    <i>
                                        <a href="/wiki/Stegosaurus" title="">Stegosaurus</a>
                                    </i>
                                </li>
                                <li>
                                    <i>
                                        <a title="">Stegosaurus</a>
                                    </i>
                                </li>
                                <li></li>
                            </ul>
                        </div>
                    `,
            },
        };
        fetchDataStub.resolves(expectedData);
        const names = await retrieveAllDinoNames.retrieveAllDinoNames();
        expect(fetchDataStub.calledOnce).to.be.true;
        expect(names.length).to.equal(1);
    });

    it('should return an empty array if no matching div found', async function () {
        const expectedData = {
            parse: {
                text: ` `,
            },
        };
        fetchDataStub.resolves(expectedData);
        const names = await retrieveAllDinoNames.retrieveAllDinoNames();
        expect(fetchDataStub.calledOnce).to.be.true;
        expect(names.length).to.equal(0);
    });
});
