const fs = require('fs');

const { expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('constructDinoNames - Script', function () {
    let writeStub;

    beforeEach(function () {
        const logger = require('../../app/config/logger');
        sinon.stub(logger.logger, 'info').resolves();
        sinon.stub(logger.logger, 'error').resolves();
        sinon.stub(logger.logger, 'http').resolves();

        writeStub = sinon.stub(fs.promises, 'writeFile');
        writeStub.callsFake((path, data, options, callback) => callback(null));
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('delay', function () {
        it('should resolve after specified delay', async function () {
            const setTimeoutStub = sinon.stub(global, 'setTimeout');
            setTimeoutStub.callsFake((resolve) => resolve());

            const start = Date.now();
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            await constructDinoNames.delay();
            const duration = Date.now() - start;

            expect(duration).to.be.lessThan(100);

            setTimeoutStub.restore();
        });
    });

    describe('constructImageQuery', function () {
        it('should construct image query correctly', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const names = 'dino1|dino2|dino3';
            const expectedQuery = `action=query&prop=imageinfo&iiprop=extmetadata|url&titles=${names}&format=json`;
            const actualQuery = constructDinoNames.constructImageQuery(names);
            expect(actualQuery).to.equal(expectedQuery);
        });
    });

    describe('constructPageQuery', function () {
        it('should construct page query correctly', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const names = 'dino1|dino2|dino3';
            const expectedQuery = `action=query&meta=siteinfo&siprop=rightsinfo&prop=revisions|pageimages|info|extracts&exintro=&explaintext=&inprop=url&titles=${names}&format=json`;
            const actualQuery = constructDinoNames.constructPageQuery(names);
            expect(actualQuery).to.equal(expectedQuery);
        });
    });

    describe('constructHTMLQuery', function () {
        it('should construct HTML query correctly', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const name = 'dino1';
            const expectedQuery = `action=parse&page=${name}&prop=text&formatversion=2&format=json`;
            const actualQuery = constructDinoNames.constructHTMLQuery(name);
            expect(actualQuery).to.equal(expectedQuery);
        });
    });

    describe('getQueryByType', function () {
        it('should get correct query function by type', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const result = 'dino1';
            const queryType = 'image';
            const expectedQuery = constructDinoNames.constructImageQuery(result);
            const actualQuery = constructDinoNames.getQueryByType(result, queryType);
            expect(actualQuery).to.equal(expectedQuery);
        });
        
        it('should return undefined for invalid query type', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const result = 'dino1';
            const queryType = 'invalid';
            const actualQuery = constructDinoNames.getQueryByType(result, queryType);
            expect(actualQuery).to.be.undefined;
        });
    });

    describe('handleSinglePage', function () {
        it('should construct URLs correctly', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const names = ['dino1', 'dino2'];
            const queryType = 'html';
            const expectedUrls = [
                'https://en.wikipedia.org/w/api.php?action=parse&page=dino1&prop=text&formatversion=2&format=json',
                'https://en.wikipedia.org/w/api.php?action=parse&page=dino2&prop=text&formatversion=2&format=json',
            ];
            const actualUrls = constructDinoNames.handleSinglePage(names, queryType);
            expect(actualUrls).to.deep.equal(expectedUrls);
        });
    });

    describe('urlConstructor', function () {
        it('should call handleSinglePage when queryType is html', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const names = ['dino1', 'dino2'];
            const queryType = 'html';
            const handleSinglePageStub = sinon.stub().returns([]);
            const handleMultiplePagesStub = sinon.stub().returns([]);
            constructDinoNames.urlConstructor(names, queryType);
            expect(handleMultiplePagesStub.called).to.be.false;
        });

        it('should call handleMultiplePages when queryType is not html', function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const names = ['dino1', 'dino2'];
            const queryType = 'image';
            const handleSinglePageStub = sinon.stub().returns([]);
            const handleMultiplePagesStub = sinon.stub().returns([]);
            constructDinoNames.urlConstructor(names, queryType);
            expect(handleSinglePageStub.called).to.be.false;
        });
    });

    describe('constructDinoNames', function () {
        let constructDinoNames;
        let readJSONFileStub;
        let retrieveAllDinoNamesStub;
        let fetchStub;
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

        beforeEach(function () {
            
            
            readJSONFileStub = sinon.stub(fs.promises, 'readFile');
            retrieveAllDinoNamesStub = sinon.stub();
            fetchStub = sinon.stub(global, 'fetch').resolves({
                ok: true,
                json: () => Promise.resolve(expectedData),
            });

            constructDinoNames = proxyquire('../../app/scripts/constructDinoNames', {
                'fs': { 
                    promises: { 
                        readFile: readJSONFileStub, 
                        writeFile: sinon.stub().resolves() 
                    } 
                },
                '../utils/retrieveAllDinoNames': { 
                    retrieveAllDinoNames: retrieveAllDinoNamesStub 
                },
                'node-fetch': fetchStub,
            });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return names from JSON file when it exists', async function () {
            const names = ['dino1', 'dino2'];
            readJSONFileStub.resolves(JSON.stringify(names));

            const result = await constructDinoNames.constructDinoNames();

            expect(result).to.deep.equal(names);
            expect(readJSONFileStub.calledOnce).to.be.true;
        });

        it('should retrieve names from Wikipedia API when JSON file does not exist', async function () {
            const error = new Error('File not found');
            const names = ['Stegosaurus'];
            readJSONFileStub.rejects(error);
            retrieveAllDinoNamesStub.resolves(names);

            const result = await constructDinoNames.constructDinoNames();

            expect(result).to.deep.equal(names);
            expect(retrieveAllDinoNamesStub.calledOnce).to.be.true;
        });
    });

    describe('urlHandler', function () {
        let constructDinoNames;
        let fetchStub;
        let delayStub;

        beforeEach(function () {
            fetchStub = sinon.stub(global, 'fetch');
            delayStub = sinon.stub().resolves();
            constructDinoNames = require('../../app/scripts/constructDinoNames');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should handle URLs correctly with query.pages', async function () {
            const urls = ['url1'];
            const expectedData = { query: { pages: { 1: { title: 'Title' } }, rightsinfo: {} } };
            fetchStub.resolves({
                ok: true,
                json: () => Promise.resolve(expectedData),
            });
            const result = await constructDinoNames.urlHandler(urls, delayStub);
            expect(result.data).to.deep.equal([{ title: 'Title', rightsInfo: {} }]);
        });

        it('should handle URLs correctly with parse.text', async function () {
            const urls = ['url1'];
            const expectedData = { parse: { text: {} } };
            fetchStub.resolves({
                ok: true,
                json: () => Promise.resolve(expectedData),
            });
            const result = await constructDinoNames.urlHandler(urls, delayStub);
            expect(result.data).to.deep.equal([{}]);
        });

        it('should handle fetch errors correctly', async function () {
            const urls = ['url1'];
            const error = new Error('Fetch error');
            const expectedData = { parse: { text: {} } };
            fetchStub.resolves({
                ok: false,
                json: () => Promise.resolve(expectedData),
            });
            const result = await constructDinoNames.urlHandler(urls, delayStub);
            expect(result.data).to.deep.equal([]);
        });
    });

    describe('retrievePageData', function () {
        it('should retrieve page data correctly', async function () {
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const names = [];
            const expectedData = { data: [] };
            const result = await constructDinoNames.retrievePageData(names);
            expect(result).to.deep.equal(expectedData.data);
        });
    });

    describe('filterDinoNames', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('should filter dinosaur data and write to files', async function () {
            sinon.stub(fs, 'writeFile').resolves();
            const constructDinoNames = require('../../app/scripts/constructDinoNames');
            const data = [
                { title: 'Dino1', pageimage: 'image1' },
                { title: 'Dino2' },
                { title: 'Dino3', pageimage: 'image3' },
            ];
            const result = await constructDinoNames.filterDinoNames(data);
            expect(result).to.deep.equal(['Dino1', 'Dino3']);
        });
    });

    describe('readJSONFile', function () {
        let readJSONFileStub;
        let constructDinoNames;
        const filePath = './test.json';
        const data = { key: 'value' };

        beforeEach(function () {
            readJSONFileStub = sinon.stub(fs.promises, 'readFile');
            constructDinoNames = require('../../app/scripts/constructDinoNames');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return parsed JSON data when file exists', async function () {
            const filePath = './test.json';
            const data = { key: 'value' };
            readJSONFileStub.resolves(JSON.stringify(data));

            const result = await constructDinoNames.readJSONFile(filePath);

            expect(result).to.deep.equal(data);
            sinon.assert.calledOnce(readJSONFileStub);
        });

        it('should throw an error when file does not exist', async function () {
            const filePath = './nonexistent.json';
            const error = new Error('ENOENT: no such file or directory, open \'/home/vikiru/projects/restasaurus/app/scripts/nonexistent.json\'');
            readJSONFileStub.rejects(error);

            try {
                await constructDinoNames.readJSONFile(filePath);
                expect.fail('Expected error was not thrown');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.include('ENOENT');
                expect(err.message).to.include('no such file or directory');
            }
            expect(readJSONFileStub.calledOnce).to.be.true;
        });
    });

    describe('retrieveAndFilterDinoData', function () {
        let constructDinoNames;
        let readFileStub;
        let constructDinoNamesStub;
        let retrievePageDataStub;
        let filterDinoNamesStub;
        let fetchStub;
        const expectedData = {
            data: ['dino1', 'dino2'],
            filteredNames: ['name1', 'name2'],
            parse: { text: {} },
        };

        beforeEach(function () {
            fetchStub = sinon.stub(global, 'fetch').resolves({
                ok: true,
                json: () => Promise.resolve(expectedData),
            });
            readFileStub = sinon.stub(fs.promises, 'readFile');
            constructDinoNamesStub = sinon.stub();
            retrievePageDataStub = sinon.stub();
            filterDinoNamesStub = sinon.stub();

            constructDinoNames = proxyquire('../../app/scripts/constructDinoNames', {
                fs: { promises: { readFile: readFileStub, writeFile: sinon.stub().resolves() } },
                constructDinoNames: constructDinoNamesStub,
                retrievePageData: retrievePageDataStub,
                filterDinoNames: filterDinoNamesStub,
            });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should retrieve dino data from JSON file', async function () {
            readFileStub.resolves(JSON.stringify({ data: ['dino1', 'dino2'], filteredNames: ['name1', 'name2'] }));
            const result = await constructDinoNames.retrieveAndFilterDinoData();
            expect(result.data).to.deep.equal({ data: ['dino1', 'dino2'], filteredNames: ['name1', 'name2'] });
        });

        it('should retrieve and filter dino data correctly', async function () {
            readFileStub.rejects(new Error('Read file failed'));
            constructDinoNamesStub.resolves([]);
            retrievePageDataStub.resolves({ data: [] });
            filterDinoNamesStub.resolves([]);
            const result = await constructDinoNames.retrieveAndFilterDinoData();
            expect(result).to.deep.equal({ data: [], filteredNames: [] });
        });
    });
});
