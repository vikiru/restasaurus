const { expect } = require('chai');
const sinon = require('sinon');
const parser = require('node-html-parser');

describe('handleSetup', function () {
    const pages = [
        { title: 'Tyrannosaurus', extract: 'Tyrannosaurus is a genus of coelurosaurian theropod dinosaur.' },
        { title: 'Stegosaurus', extract: 'Stegosaurus is a genus of herbivorous thyreophoran dinosaur.' },
    ];
    const htmlText = `
    <div class="mw-content-ltr">
        <ul>
            <li><i><a href="/wiki/Stegosaurus" title="Stegosaurus">Stegosaurus</a></i></li>
            <li><i><a href="/wiki/Stegosaurus" title="Stegosaurus">Stegosaurus</a></i></li>
            <li><i><a href="/wiki/Stegosaurus" title="Stegosaurus">Stegosaurus</a></i></li>
        </ul>
        <ul>
            <li><i><a title="Stegosaurus">Stegosaurus</a></i></li>
            <li><i><a href="/wiki/Stegosaurus" title="Stegosaurus">Stegosaurus</a></i></li>
            <li><i><a href="/wiki/Stegosaurus" title="Stegosaurus">Stegosaurus</a></i></li>
        </ul>
    </div>
    `;
    const fakeData = { query: { pages }, parse: { text: htmlText } };

    let fetchDataStub;
    let writeData;
    let writeDataStub;

    let infoStub;
    let errorStub;
    let httpStub;

    beforeEach(() => {
        writeData = require('../../app/utils/writeData');
        fetchDataStub = sinon.stub(global, 'fetch');
        writeDataStub = sinon.stub(writeData, 'writeData').callsFake(() => {});
    });

    afterEach(() => {
        fetchDataStub.restore();
        writeDataStub.restore();
    });

    describe('constructUrls', function () {
        const handleSetup = require('../../app/utils/handleSetup');

        it('should return an array of URLs', function () {
            const dinoNames = ['Tyrannosaurus', 'Stegosaurus'];
            const urls = handleSetup.constructUrls(dinoNames);

            expect(urls).to.be.an('array');
            expect(urls.length).to.equal(1);

            urls.forEach((url) => {
                expect(url).to.be.a('string');
                expect(url).to.include(
                    'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles',
                );
            });
        });
    });

    describe('extractDataFromPages', function () {
        const handleSetup = require('../../app/utils/handleSetup');

        it('should return an array of data objects', function () {
            const testPages = {
                page1: { title: 'Title 1', extract: 'Extract 1' },
                page2: { title: 'Title 2' },
            };
            const dataObjs = handleSetup.extractDataFromPages(testPages);
            expect(dataObjs).to.be.an('array');
            expect(dataObjs.length).to.equal(1);

            const dataObj = dataObjs[0];
            expect(dataObj).to.have.all.keys('title', 'extract');
            expect(dataObj.title).to.equal('Title 1');
            expect(dataObj.extract).to.equal('Extract 1');
        });
    });

    describe('handleUrls', function () {
        const handleSetup = require('../../app/utils/handleSetup');

        const dinoNames = ['Tyrannosaurus', 'Stegosaurus'];
        const urls = handleSetup.constructUrls(dinoNames);
        const url = urls[0];

        it('should fetch data from URLs and extract data from pages', async () => {
            fetchDataStub.withArgs(url).resolves({
                ok: true,
                json: () => Promise.resolve(fakeData),
            });
            const result = await handleSetup.handleUrls(urls);
            expect(fetchDataStub.callCount).to.equal(urls.length);
            expect(result.length).to.equal(2);
        });
    });

    describe('isMatched', function () {
        const handleSetup = require('../../app/utils/handleSetup');

        it('should return true', function () {
            const extract = 'bipedal carnivore';
            const result = handleSetup.isMatched(extract);
            expect(result).to.be.true;
        });

        it('should return false', function () {
            const extract = 'bipedals carnivores';
            const result = handleSetup.isMatched(extract);
            expect(result).to.be.true;
        });
    });

    describe('processData', function () {
        const handleSetup = require('../../app/utils/handleSetup');

        it('should return an array of names with length 1', function () {
            const names = handleSetup.processData(pages);
            expect(names.length).to.equal(1);
        });
    });

    describe('extractNameFromItem', function () {
        const handleSetup = require('../../app/utils/handleSetup');
        it('should return a name from valid item', function () {
            const item = parser.parse(
                '<li><i><a href="/wiki/Stegosaurus" title="Stegosaurus">Stegosaurus</a></i></li>',
            );
            const result = handleSetup.extractNameFromItem(item);
            expect(result).to.equal('Stegosaurus');
        });

        it('should return null from invalid item', function () {
            const item = parser.parse('<li><a href="/wiki/Stegosaurus" title="Stegosaurus">Stegosaurus</a></li>');
            const result = handleSetup.extractNameFromItem(item);
            expect(result).to.equal(null);
        });
    });

    describe('extractDinoNames', function () {
        const handleSetup = require('../../app/utils/handleSetup');

        it('should return an array of names from valid HTML', function () {
            const parsedHTML = parser.parse(htmlText);
            const result = handleSetup.extractDinoNames(parsedHTML);
            expect(result.length).to.equal(1);
        });
    });

    describe('retrieveAllDinoNames', function () {
        const handleSetup = require('../../app/utils/handleSetup');

        it('should return an array of names', async function () {
            const url =
                'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_dinosaur_genera&prop=text&formatversion=2&format=json';
            fetchDataStub.withArgs(url).resolves({
                ok: true,
                json: () => Promise.resolve(fakeData),
            });
            const names = await handleSetup.retrieveAllDinoNames();
            expect(names.length).to.be.equal(1);
        });
    });
});
