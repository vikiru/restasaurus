const fs = require('fs').promises;

const { expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('constructDinoNames - Script', function () {
    describe('delay', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        it('should resolve after specified delay', async function () {
            const delayTime = 1;
            const delayStub = sinon.stub(constructDinoNames, 'delay').resolves();
            await constructDinoNames.delay(delayTime);
            expect(delayStub.calledOnceWith(delayTime)).to.be.true;
        });
    });

    describe('constructImageQuery', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        it('should construct image query correctly', function () {
            const names = 'dino1|dino2|dino3';
            const expectedQuery = `action=query&prop=imageinfo&iiprop=extmetadata|url&titles=${names}&format=json`;
            const actualQuery = constructDinoNames.constructImageQuery(names);
            expect(actualQuery).to.equal(expectedQuery);
        });
    });

    describe('constructPageQuery', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        it('should construct page query correctly', function () {
            const names = 'dino1|dino2|dino3';
            const expectedQuery = `action=query&meta=siteinfo&siprop=rightsinfo&prop=revisions|pageimages|info|extracts&exintro=&explaintext=&inprop=url&titles=${names}&format=json`;
            const actualQuery = constructDinoNames.constructPageQuery(names);
            expect(actualQuery).to.equal(expectedQuery);
        });
    });

    describe('constructHTMLQuery', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        it('should construct HTML query correctly', function () {
            const name = 'dino1';
            const expectedQuery = `action=parse&page=${name}&prop=text&formatversion=2&format=json`;
            const actualQuery = constructDinoNames.constructHTMLQuery(name);
            expect(actualQuery).to.equal(expectedQuery);
        });
    });

    describe('getQueryByType', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        it('should get correct query function by type', function () {
            const result = 'dino1';
            const queryType = 'image';
            const expectedQuery = constructDinoNames.constructImageQuery(result);
            const actualQuery = constructDinoNames.getQueryByType(result, queryType);
            expect(actualQuery).to.equal(expectedQuery);
        });
    });

    describe('handleSinglePage', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        it('should construct URLs correctly', function () {
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
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        it('should call handleSinglePage when queryType is html', function () {
            const names = ['dino1', 'dino2'];
            const queryType = 'html';
            const handleSinglePageStub = sinon.stub().returns([]);
            const handleMultiplePagesStub = sinon.stub().returns([]);
            constructDinoNames.urlConstructor(names, queryType);
            expect(handleMultiplePagesStub.called).to.be.false;
        });

        it('should call handleMultiplePages when queryType is not html', function () {
            const names = ['dino1', 'dino2'];
            const queryType = 'image';
            const handleSinglePageStub = sinon.stub().returns([]);
            const handleMultiplePagesStub = sinon.stub().returns([]);
            constructDinoNames.urlConstructor(names, queryType);
            expect(handleSinglePageStub.called).to.be.false;
        });
    });

    describe('constructDinoNames', function () {
        let readJSONFileStub;
        let constructDinoNames;

        afterEach(function () {
            sinon.restore();
        });

        it('should return names from JSON file when it exists', async function () {
            const names = ['dino1', 'dino2'];
            constructDinoNames = proxyquire('../../app/scripts/constructDinoNames', {
                './constructDinoNames': {
                    readJSONFile: sinon.stub().resolves(names),
                    retrieveAllDinoNames: sinon.stub().resolves(),
                },
            });
            const result = await constructDinoNames.constructDinoNames();

            expect(result).to.deep.equal(names);
            sinon.assert.calledOnce(readJSONFileStub);
        });

        it('should retrieve names from Wikipedia API when JSON file does not exist', async function () {
            const error = new Error('File not found');
            const names = ['Stegosaurus'];
            const readFileStub = sinon.stub(fs, 'readFile').rejects(error);
            const retrieveAllDinoNamesStub = sinon.stub().resolves(names);
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
            const fetchStub = sinon.stub(global, 'fetch').resolves({
                ok: true,
                json: () => Promise.resolve(expectedData),
            });
            constructDinoNames = proxyquire('../../app/scripts/constructDinoNames', {
                '../utils/fetchData': fetchStub,
            });
            const result = await constructDinoNames.constructDinoNames();
            expect(result).to.deep.equal(names);
        });
    });

    describe('urlHandler', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        let fetchStub;
        let delayStub;

        beforeEach(function () {
            fetchStub = sinon.stub(global, 'fetch');
            delayStub = sinon.stub().resolves();
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
        let urlConstructorStub;
        let fetchStub;
        let delayStub;
        let constructDinoNames;

        beforeEach(function () {
            fetchStub = sinon.stub().callsFake(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ data: [] }),
                }),
            );
            delayStub = sinon.stub().resolves();
            urlConstructorStub = sinon.stub().returns(['url1', 'url2']);
            constructDinoNames = proxyquire('../../app/scripts/constructDinoNames', {
                fetchData: fetchStub,
                urlConstructor: urlConstructorStub,
                delay: delayStub,
            });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should retrieve page data correctly', async function () {
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
            const expectedFilteredNames = ['Dino1', 'Dino3'];

            const result = await constructDinoNames.filterDinoNames(data);

            expect(result).to.deep.equal(expectedFilteredNames);
        });
    });

    describe('readJSONFile', function () {
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        afterEach(function () {
            sinon.restore();
        });

        it('should return parsed JSON data when file exists', async function () {
            const filePath = './test.json';
            const data = { key: 'value' };
            const readFileStub = sinon.stub(fs, 'readFile').resolves(JSON.stringify(data));

            const result = await constructDinoNames.readJSONFile(filePath);
            expect(result).to.deep.equal(data);
        });

        it('should throw an error when file does not exist', async function () {
            const filePath = './nonexistent.json';
            const error = new Error('File not found');
            const readFileStub = sinon.stub(fs, 'readFile').rejects(error);

            try {
                await constructDinoNames.readJSONFile(filePath);
                expect.fail('Expected error was not thrown');
            } catch (actualError) {
                expect(actualError).to.equal(error);
            }
        });
    });

    describe('retrieveAndFilterDinoData', function () {
        sinon.stub(fs, 'writeFile').resolves();
        const constructDinoNames = require('../../app/scripts/constructDinoNames');
        let readJSONFileStub;
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
            readJSONFileStub = sinon.stub(constructDinoNames, 'readJSONFile');
            constructDinoNamesStub = sinon.stub(constructDinoNames, 'constructDinoNames');
            retrievePageDataStub = sinon.stub(constructDinoNames, 'retrievePageData');
            filterDinoNamesStub = sinon.stub(constructDinoNames, 'filterDinoNames');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should retrieve dino data from JSON file', async function () {
            const readFileStub = sinon
                .stub(fs, 'readFile')
                .resolves(JSON.stringify({ data: ['dino1', 'dino2'], filteredNames: ['name1', 'name2'] }));
            readJSONFileStub.resolves({ data: ['dino1', 'dino2'], filteredNames: ['name1', 'name2'] });
            const result = await constructDinoNames.retrieveAndFilterDinoData();
            expect(result.data).to.deep.equal({ data: ['dino1', 'dino2'], filteredNames: ['name1', 'name2'] });
        });

        it('should retrieve and filter dino data correctly', async function () {
            readJSONFileStub.resolves(['dino1', 'dino2']);
            constructDinoNamesStub.resolves(['name1', 'name2']);
            retrievePageDataStub.resolves({ data: ['dino1', 'dino2'] });
            filterDinoNamesStub.resolves(['name1', 'name2']);

            const result = await constructDinoNames.retrieveAndFilterDinoData();

            expect(result).to.deep.equal({ data: [], filteredNames: [] });
        });
    });
});
