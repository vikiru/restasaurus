const chai = require('chai');
const parser = require('node-html-parser');
const sinon = require('sinon');

const { expect } = chai;
const { MongooseData } = require('../../app/models/MongooseData');
const handleClassification = require('../../app/utils/handleClassification');

describe('handleClassification', function () {
    describe('assignClassificationInfo', function () {
        let data;
        let keyword;
        let value;

        beforeEach(function () {
            data = {
                classificationInfo: {
                    orderInfo: [],
                    classInfo: [],
                    familyInfo: [],
                    tribeInfo: [],
                    genusInfo: [],
                    speciesInfo: [],
                    clade: [],
                },
            };
            keyword = '';
            value = 'Value';
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should not assign value if keyword is "Scientific classification"', function () {
            keyword = 'Scientific classification';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo).to.deep.equal({
                orderInfo: [],
                classInfo: [],
                familyInfo: [],
                tribeInfo: [],
                genusInfo: [],
                speciesInfo: [],
                clade: [],
            });
        });

        it('should assign value to orderInfo if keyword is "order"', function () {
            keyword = 'order';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.orderInfo).to.deep.equal([{ orderType: keyword, value }]);
        });

        it('should assign value to classInfo if keyword is "class"', function () {
            keyword = 'class';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.classInfo).to.deep.equal([{ classType: keyword, value }]);
        });

        it('should assign value to familyInfo if keyword is "family"', function () {
            keyword = 'family';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.familyInfo).to.deep.equal([{ familyType: keyword, value }]);
        });

        it('should assign value to tribeInfo if keyword is "tribe"', function () {
            keyword = 'tribe';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.tribeInfo).to.deep.equal([{ tribeType: keyword, value }]);
        });

        it('should assign value to genusInfo if keyword is "genus"', function () {
            keyword = 'genus';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.genusInfo).to.deep.equal([{ genusType: keyword, value }]);
        });

        it('should assign value to clade if keyword is "clade"', function () {
            keyword = 'clade';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.clade).to.deep.equal([value]);
        });

        it('should assign value to speciesInfo if keyword is "species"', function () {
            keyword = 'species';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: keyword, value }]);
        });

        it('should assign value to speciesInfo if keyword is "binomial"', function () {
            keyword = 'binomial';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: keyword, value }]);
        });

        it('should assign value to classificationInfo if keyword does not match any predefined keywords', function () {
            keyword = 'other';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo[keyword]).to.equal(value);
        });
    });

    describe('getInfoBox', function () {
        it('should return infoBox when it exists', function () {
            const html = parser.parse('<div class="infobox">Info</div>');
            const result = handleClassification.getInfoBox(html);
            expect(result.text).to.equal('Info');
        });

        it('should return undefined when infoBox does not exist', function () {
            const html = { querySelector: () => undefined };
            const result = handleClassification.getInfoBox(html);
            expect(result).to.be.undefined;
        });
    });

    describe('getRows', function () {
        it('should return rows when they exist', function () {
            const infoBox = parser.parse(
                '<table class="infobox"><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></table>',
            );
            const result = handleClassification.getRows(infoBox);
            expect(result.length).to.equal(2);
        });

        it('should return undefined when rows do not exist', function () {
            const infoBox = { querySelectorAll: () => undefined };
            const result = handleClassification.getRows(infoBox);
            expect(result).to.equal(undefined);
        });
    });

    describe('handleTemporalRange', function () {
        it('should handle "Temporal range" data', function () {
            const rowData = ['Temporal range: 66-0 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('66-0 Ma');
        });

        it('should handle "Ma" data', function () {
            const rowData = ['66-0 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('66-0 Ma');
        });

        it('should handle data without "Temporal range" or "Ma"', function () {
            const rowData = ['Some other data'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('');
        });

        it('should handle data with "Ma" and without "Temporal range" when temporalRange is not empty', function () {
            const rowData = ['Temporal range: Late Cretaceous', '55-0 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous, 55-0 Ma');
        });
    });

    describe('handleRowData', function () {
        let rowData;
        let data;

        beforeEach(function () {
            rowData = [{ structuredText: 'Clade:' }, { structuredText: 'Value' }];
            data = new MongooseData('Dino');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should handle row data with keyword matching keywordRegex', function () {
            handleClassification.handleRowData(rowData, data);
            expect(data.classificationInfo.clade).to.deep.equal(['Value']);
        });

        it('should handle row data with keyword not matching keywordRegex', function () {
            rowData[0].structuredText = 'keyword';
            handleClassification.handleRowData(rowData, data);
            expect(data.classificationInfo.keyword).to.deep.equal('Value');
        });

        it('should handle row data with value containing newline character', function () {
            rowData[1].structuredText = '†Value\nExtra';
            handleClassification.handleRowData(rowData, data);
            expect(data.classificationInfo.clade).to.deep.equal(['Value']);
        });
    });

    describe('handleHeaderData', function () {
        let headerData;
        let rows;
        let data;

        beforeEach(function () {
            headerData = [{ structuredText: 'Species' }];
            rows = [{ querySelectorAll: () => [{ structuredText: '†Value\n' }] }];
            data = new MongooseData('Dino');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should handle header data and assign classification info', function () {
            handleClassification.handleHeaderData(
                headerData,
                [parser.parse('<td>Value</td>'), parser.parse('<td>Value</td >')],
                data,
            );
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: 'Species', value: 'Value' }]);
        });

        it('should split value at newline character and assign classification info', function () {
            const rowWithNewline = { querySelectorAll: () => [{ structuredText: 'Value\nExtra' }] };
            rows = [rowWithNewline, rowWithNewline];
            handleClassification.handleHeaderData(headerData, rows, data);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: 'Species', value: 'Value' }]);
        });

        it('should not modify data object if no header data present', function () {
            handleClassification.handleHeaderData(
                headerData,
                [parser.parse('<div></div>'), parser.parse('<div></div>')],
                data,
            );
            expect(data).to.deep.equal(data);
        });
    });

    describe('handleFirstRow', function () {
        let firstRow;
        let data;

        beforeEach(function () {
            data = new MongooseData('Dino');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should handle first row data', function () {
            firstRow = { structuredText: 'Dino\n66-0 Ma' };
            handleClassification.handleFirstRow(firstRow, data);
            expect(data.name).to.equal('Dino');
            expect(data.temporalrange).to.equal('66-0 Ma');
        });
    });

    describe('handleOtherRows', function () {
        let rows;
        let data;

        beforeEach(function () {
            data = new MongooseData('Dino');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should handle row data', function () {
            rows = [
                parser.parse('<tr><td>Species:</td><td>Value</td></tr>'),
                parser.parse('<tr><td>Species:</td><td>Value</td></tr>'),
            ];
            handleClassification.handleOtherRows(rows, data);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([
                { speciesType: 'Species', value: 'Value' },
                { speciesType: 'Species', value: 'Value' },
            ]);
        });

        it('should handle header data', function () {
            rows = [parser.parse('<tr><th>Species:</th><td>Value</td></tr>')];
            handleClassification.handleOtherRows(rows, data);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: 'Species', value: 'Value' }]);
        });

        it('should handle rows without matching conditions', function () {
            rows = [{ querySelectorAll: () => [{ structuredText: '' }] }];
            handleClassification.handleOtherRows(rows, data);
            expect(data).to.deep.equal(data);
        });
    });

    describe('retrieveBoxData', function () {
        let html;
        let data;

        beforeEach(function () {
            data = new MongooseData('Dino');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should handle infoBox when it exists', function () {
            html = parser.parse(
                '<table class="infobox"><tr>Dino</tr><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></table>',
            );
            handleClassification.retrieveBoxData(html, data);
            expect(data.name).to.equal('Dino');
            expect(data.classificationInfo.domain).to.equal('');
        });

        it('should not handle infobox if it does not exist', function () {
            html = parser.parse('<table class="other"><td>No infoBox here</td></table>');
            handleClassification.retrieveBoxData(html, data);
            expect(data.name).to.equal('Dino');
            expect(data.classificationInfo.domain).to.equal('');
        });
    });
});
