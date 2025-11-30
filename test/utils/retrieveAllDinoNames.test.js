const fs = require('fs');

const chai = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const { expect } = chai;

describe('retrieveAllDinoNames', function () {
    let fetchStub;
    let writeStub;
    let retrieveAllDinoNames;
    let logger;
    const url =
        'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_dinosaur_genera&prop=text&formatversion=2&format=json';

    beforeEach(function () {
        logger = require('../../app/config/logger');
        sinon.stub(logger.logger, 'info').resolves();
        sinon.stub(logger.logger, 'error').resolves();
        if (typeof global.fetch !== 'function') {
            global.fetch = sinon.stub();
        }
        fetchStub = sinon.stub(global, 'fetch');
        writeStub = sinon.stub(fs.promises, 'writeFile');
        writeStub.callsFake((path, data, options, callback) => callback(null));
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
        fetchStub.withArgs(url).resolves({
            ok: true,
            json: () => Promise.resolve(expectedData),
        });
        retrieveAllDinoNames = proxyquire('../../app/utils/retrieveAllDinoNames', {
            '../../app/utils/fetchData': fetchStub,
        }).retrieveAllDinoNames;
        const names = await retrieveAllDinoNames();
        expect(fetchStub.calledOnce).to.be.true;
        expect(names.length).to.equal(1);
    });

    it('should return an empty array if no matching div found', async function () {
        const expectedData = {
            parse: {
                text: ` `,
            },
        };
        fetchStub.withArgs(url).resolves({
            ok: true,
            json: () => Promise.resolve(expectedData),
        });
        retrieveAllDinoNames = proxyquire('../../app/utils/retrieveAllDinoNames', {
            '../../app/utils/fetchData': fetchStub,
        }).retrieveAllDinoNames;
        const names = await retrieveAllDinoNames();
        expect(fetchStub.calledOnce).to.be.true;
        expect(names.length).to.equal(0);
    });
});
