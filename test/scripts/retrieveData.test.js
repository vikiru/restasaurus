const { assert, expect } = require('chai');
const parser = require('node-html-parser');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const { MongooseData } = require('../../app/models/MongooseData');

describe('retrieveData', function () {
    let logger;
    let readJSONFileStub;
    let urlConstructorStub;
    let urlHandlerStub;
    let writeDataStub;
    let fetchStub;
    let delayStub;
    let retrieveData;

    beforeEach(function () {
        logger = require('../../app/config/logger');
        sinon.stub(logger.logger, 'info').resolves();
        sinon.stub(logger.logger, 'error').resolves();
        sinon.stub(logger.logger, 'http').resolves();
        readJSONFileStub = sinon.stub();
        urlConstructorStub = sinon.stub().resolves();
        urlHandlerStub = sinon.stub().resolves();
        writeDataStub = sinon.stub().resolves();
        delayStub = sinon.stub().resolves();

        fetchStub = sinon.stub(global, 'fetch').resolves({
            ok: true,
            json: () => Promise.resolve({ data: [] }),
        });
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('retrieveImageData', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('should retrieve image data from JSON file', async function () {
            readJSONFileStub.withArgs('./imageData.json').resolves([{}, {}]);
            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    urlConstructor: urlConstructorStub,
                    urlHandler: urlHandlerStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                },
            });
            const data = await retrieveData.retrieveImageData(['name']);
            expect(data).to.deep.equal([{}, {}]);
        });

        it('should handle errors when reading JSON file', async function () {
            fetchStub = sinon.stub().resolves();
            readJSONFileStub = sinon.stub().resolves();
            urlConstructorStub = sinon.stub().returns();
            urlHandlerStub = sinon.stub().resolves();
            writeDataStub = sinon.stub().resolves();
            delayStub = sinon.stub().resolves();

            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    urlConstructor: urlConstructorStub,
                    urlHandler: urlHandlerStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                },
            });
            const error = new Error('Read file failed');
            readJSONFileStub.rejects(error);
            urlHandlerStub.resolves({ data: [] });
            try {
                await retrieveData.retrieveImageData(['name1', 'name2']);
                expect(readJSONFileStub.calledOnce).to.be.true;
                expect(urlHandlerStub.calledOnce).to.be.true;
                expect(writeDataStub.calledOnce).to.be.true;
            } catch (e) {
                expect(e).to.be.not.undefined;
            }
        });
    });

    describe('retrieveHTMLData', function () {
        beforeEach(function () {
            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    urlConstructor: urlConstructorStub,
                    urlHandler: urlHandlerStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                },
            });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should retrieve HTML data from JSON file', async function () {
            const names = ['name1', 'name2'];
            const expectedData = [
                { name: 'name1', url: 'url1' },
                { name: 'name2', url: 'url2' },
            ];
            readJSONFileStub.resolves(expectedData);
            const data = await retrieveData.retrieveHTMLData(names);
            expect(data).to.deep.equal(expectedData);
        });

        it('should retrieve HTML data from Wikipedia API when reading JSON file fails', async function () {
            const names = ['name1', 'name2'];
            const expectedData = [
                { name: 'name1', url: 'url1' },
                { name: 'name2', url: 'url2' },
            ];
            readJSONFileStub.rejects(new Error('Failed to read file'));
            urlConstructorStub.returns(['url1', 'url2']);
            urlHandlerStub.resolves({ data: expectedData });
            writeDataStub.resolves();
            const data = await retrieveData.retrieveHTMLData(names);
            expect(data).to.deep.equal(expectedData);
        });
    });

    describe('processHTMLData', function () {
        const handleClassification = require('../../app/utils/handleClassification');
        const handleFeature = require('../../app/utils/handleFeature');
        let classificationStub;
        let missingFeatureStub;
        let featureStub;

        const dino = new MongooseData('Dino');

        beforeEach(function () {
            classificationStub = sinon.stub(handleClassification, 'retrieveBoxData').returns(dino);
            featureStub = sinon.stub(handleFeature, 'retrieveDietAndLocomotionType').returns();
            missingFeatureStub = sinon.stub(handleFeature, 'findMissingFeatures').returns();
            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    urlConstructor: urlConstructorStub,
                    urlHandler: urlHandlerStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                },
                '../utils/handleClassification': {
                    retrieveBoxData: classificationStub,
                },
                '../utils/handleFeature': {
                    retrieveDietAndLocomotionType: featureStub,
                    findMissingFeatures: missingFeatureStub,
                },
            });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should process HTML data correctly', function () {
            const htmlData = parser.parse(
                '<table class="infobox"><tr><td>Species:</td><td>Value</td></tr><tr><td>Species:</td><td>Value</td></tr></table>',
            );
            retrieveData.processHTMLData(htmlData, dino);
            expect(dino.name).to.equal('Dino');
        });
    });

    describe('processPageData', function () {
        let dietStub;
        let locomotionTypeStub;
        let descriptionStub;
        let sourceStub;
        const handleFeature = require('../../app/utils/handleFeature');
        const handleSource = require('../../app/utils/handleSource');

        const pageData = { extract: '' };
        const htmlData = '';
        const mongooseData = new MongooseData('Dino');

        beforeEach(function () {
            dietStub = sinon.stub(handleFeature, 'findDiet').returns('');
            locomotionTypeStub = sinon.stub(handleFeature, 'findLocomotionType').returns('');
            descriptionStub = sinon.stub(handleFeature, 'findDescription').returns('');
            sourceStub = sinon.stub(handleSource, 'handleSourceInformation').returns(mongooseData.source);

            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    urlConstructor: urlConstructorStub,
                    urlHandler: urlHandlerStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                },
                '../utils/handleClassification': {
                    handleSourceInformation: sourceStub,
                },
                '../utils/handleFeature': {
                    findDiet: dietStub,
                    findLocomotionType: locomotionTypeStub,
                    findDescription: descriptionStub,
                },
            });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should process page data correctly from pageData', function () {
            retrieveData.processPageData(pageData, htmlData, mongooseData);
            expect(mongooseData).to.deep.equal(new MongooseData('Dino'));
        });

        it('should process page data correctly from parse.text', function () {
            retrieveData.processPageData({ parse: { text: '' } }, htmlData, mongooseData);
            expect(mongooseData).to.deep.equal(new MongooseData('Dino'));
        });
    });

    describe('processData', function () {
        let dietStub;
        let locomotionTypeStub;
        let descriptionStub;
        let sourceStub;
        let htmlDataStub;
        let pageDataStub;
        let imageDataStub;
        const handleFeature = require('../../app/utils/handleFeature');
        const handleSource = require('../../app/utils/handleSource');
        const handleImage = require('../../app/utils/handleImage');

        beforeEach(function () {
            dietStub = sinon.stub(handleFeature, 'findDiet').returns('');
            locomotionTypeStub = sinon.stub(handleFeature, 'findLocomotionType').returns('');
            descriptionStub = sinon.stub(handleFeature, 'findDescription').returns('');
            sourceStub = sinon.stub(handleSource, 'handleSourceInformation').returns('');
            htmlDataStub = sinon.stub(retrieveData, 'processHTMLData').returns('');
            pageDataStub = sinon.stub(retrieveData, 'processPageData').returns();
            imageDataStub = sinon.stub(handleImage, 'processImageData').returns();

            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    urlConstructor: urlConstructorStub,
                    urlHandler: urlHandlerStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                },
                '../utils/handleClassification': {
                    handleSourceInformation: sourceStub,
                },
                '../utils/handleFeature': {
                    findDiet: dietStub,
                    findLocomotionType: locomotionTypeStub,
                    findDescription: descriptionStub,
                },
                '../utils/handleImage': {
                    processImageData: imageDataStub,
                },
                './retrieveData': {
                    processHTMLData: htmlDataStub,
                    processPageData: pageDataStub,
                },
            });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should process data correctly', async function () {
            const pageData = { extract: '' };
            const imageData = 'testImageData';
            const htmlData = parser.parse(
                '<table class="infobox"><tr>Stegosaurus</tr><tr><td>Species:</td><td>Value</td></tr><tr><td>Species:</td><td>Value</td></tr></table>',
            );
            const result = await retrieveData.processData(pageData, imageData, htmlData);
            expect(result.source).to.equal('');
            expect(result.classificationInfo.speciesInfo).to.deep.equal([
                { speciesType: 'Species', value: 'Value' },
                { speciesType: 'Species', value: 'Value' },
            ]);
        });
    });

    describe('retrieveData', function () {
        let retrieveAndFilterDinoDataStub;
        let retrieveImageDataStub;
        let retrieveHTMLDataStub;
        let retrievePageDataStub;
        let namesStub;
        let filteredNamesStub;
        const htmlData = parser.parse(
            '<table class="infobox"><tr>Stegosaurus</tr><tr><td>Species:</td><td>Value</td></tr><tr><td>Species:</td><td>Value</td></tr></table>',
        );
        const pageData = { extract: '' };

        afterEach(function () {
            sinon.restore();
        });

        it('should retrieve data correctly', async function () {
            readJSONFileStub = sinon.stub().resolves('');
            retrieveAndFilterDinoDataStub = sinon
                .stub()
                .resolves({ data: [{ pageimage: 'image' }, { pageimage: 'image' }], filteredNames: '' });
            retrieveImageDataStub = sinon.stub().resolves('');
            retrieveHTMLDataStub = sinon.stub().resolves('');

            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    urlConstructor: urlConstructorStub,
                    urlHandler: urlHandlerStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                    retrieveAndFilterDinoData: retrieveAndFilterDinoDataStub,
                },
                './retrieveData': {
                    retrieveImageData: retrieveImageDataStub,
                    retrieveHTMLData: retrieveHTMLDataStub,
                },
            });

            const result = await retrieveData.retrieveData();

            expect(result).to.deep.equal({
                pageData: '',
                imageData: '',
                htmlData: '',
            });
        });

        it('should handle errors correctly', async function () {
            readJSONFileStub = sinon.stub().throws(new Error('Read file failed'));
            retrieveAndFilterDinoDataStub = sinon
                .stub()
                .resolves({ data: [{ pageimage: 'image' }, { pageimage: 'image' }], filteredNames: '' });
            fetchStub = sinon.stub().resolves({
                ok: true,
                json: Promise.resolve({ parse: { text: '' }, extract: '' }),
            });
            retrieveHTMLDataStub = sinon.stub().resolves(htmlData);
            retrievePageDataStub = sinon.stub().resolves(pageData);
            namesStub = sinon.stub().resolves([]);
            filteredNamesStub = sinon.stub().resolves([]);

            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                    retrieveAndFilterDinoData: retrieveAndFilterDinoDataStub,
                    retrievePageData: retrievePageDataStub,
                    constructDinoNames: namesStub,
                    filterDinoNames: filteredNamesStub,
                },
                './retrieveData': {
                    retrieveImageData: retrieveImageDataStub,
                    retrieveHTMLData: retrieveHTMLDataStub,
                },
            });

            const result = await retrieveData.retrieveData();

            expect(result).to.deep.equal({
                pageData: [{ pageimage: 'image' }, { pageimage: 'image' }],
                imageData: [],
                htmlData: [],
            });
        });

        it('should handle errors correctly when there is no pageimage', async function () {
            readJSONFileStub = sinon.stub().throws(new Error('Read file failed'));
            retrieveAndFilterDinoDataStub = sinon.stub().resolves({
                data: [
                    { key: '', otherKey: '' },
                    { key: '', otherKey: '' },
                ],
                filteredNames: '',
            });
            fetchStub = sinon.stub().resolves({
                ok: true,
                json: Promise.resolve({ parse: { text: '' }, extract: '' }),
            });
            retrieveHTMLDataStub = sinon.stub().resolves(htmlData);
            retrievePageDataStub = sinon.stub().resolves(pageData);
            namesStub = sinon.stub().resolves([]);
            filteredNamesStub = sinon.stub().resolves([]);

            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    readJSONFile: readJSONFileStub,
                    writeData: writeDataStub,
                    delay: delayStub,
                    retrieveAndFilterDinoData: retrieveAndFilterDinoDataStub,
                    retrievePageData: retrievePageDataStub,
                    constructDinoNames: namesStub,
                    filterDinoNames: filteredNamesStub,
                },
                './retrieveData': {
                    retrieveImageData: retrieveImageDataStub,
                    retrieveHTMLData: retrieveHTMLDataStub,
                },
            });

            const result = await retrieveData.retrieveData();

            expect(result).to.deep.equal({
                pageData: [
                    { key: '', otherKey: '' },
                    { key: '', otherKey: '' },
                ],
                imageData: [],
                htmlData: [],
            });
        });
    });

    describe('processAllData', function () {
        let processDataStub;
        let retrieveDataStub;
        const htmlData = [
            `
        <table class="infobox">
            <tr><td>Stegosaurus</td></tr>
            <tr><td>Domain:</td><td>Value</td></tr>
            <tr><td>Species:</td><td>Value</td></tr>
        </table>
        `,
        ];
        const pageData = [{ parse: { text: '' }, extract: 'Some text here' }];
        const imageData = [{}, {}];
        const dino = new MongooseData('Dino');
        dino.classificationInfo.domain = 'Domain';

        beforeEach(function () {
            processDataStub = sinon.stub();
            writeDataStub = sinon.stub();
            retrieveDataStub = sinon.stub();
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should process all retrieved data', async function () {
            processDataStub = sinon.stub();
            writeDataStub = sinon.stub();
            retrieveDataStub = sinon.stub();
            readJSONFileStub = sinon.stub();
            fetchStub = sinon.stub();

            processDataStub.resolves({ classificationInfo: { domain: 'Value' } });
            writeDataStub.resolves();
            retrieveDataStub.resolves({ pageData, imageData, htmlData });

            readJSONFileStub.withArgs('./pageData.json').resolves(pageData);
            readJSONFileStub.withArgs('./imageData.json').resolves(imageData);
            readJSONFileStub.withArgs('./htmlData.json').resolves(htmlData);

            fetchStub.resolves({
                query: {
                    pages: {
                        page1: { pageid: 1, title: 'Page 1' },
                        page2: { pageid: 2, title: 'Page 2' },
                    },
                    rightsinfo: {
                        rights: 'Some rights info',
                    },
                },
                parse: {
                    text: 'Some text',
                },
            });

            retrieveData = proxyquire('../../app/scripts/retrieveData', {
                './constructDinoNames': {
                    fetchData: fetchStub,
                    processData: processDataStub,
                    writeData: writeDataStub,
                    retrieveData: retrieveDataStub,
                    readJSONFile: readJSONFileStub,
                    delay: delayStub,
                },
            });

            const result = await retrieveData.processAllData();
            expect(result).to.be.an('array');
        });
    });
});
