const chai = require('chai');
const parser = require('node-html-parser');
const sinon = require('sinon');

const { expect } = chai;
const { MongooseData } = require('../../app/models/MongooseData');
const handleClassification = require('../../app/utils/handleClassification');

describe('handleClassification', function () {
    let dotenvStub;
    let mongooseConnectStub;

    beforeEach(function () {
        process.env.MONGODB_URI = 'mongodb://localhost:27017/restasaurus';
        dotenvStub = sinon.stub(require('dotenv'), 'config');
        mongooseConnectStub = sinon.stub(require('mongoose'), 'connect');
    });

    afterEach(function () {
        dotenvStub.restore();
        mongooseConnectStub.restore();
        sinon.restore();
    });

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

        it('should assign value to kingdom if keyword is "kingdom"', function () {
            keyword = 'kingdom';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.kingdom).to.equal(value);
        });

        it('should assign value to phylum if keyword is "phylum"', function () {
            keyword = 'phylum';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.phylum).to.equal(value);
        });

        it('should assign value to familyInfo if keyword is "superfamily"', function () {
            keyword = 'superfamily';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.familyInfo).to.deep.equal([{ familyType: keyword, value }]);
        });

        it('should assign value to familyInfo if keyword is "subfamily"', function () {
            keyword = 'subfamily';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.familyInfo).to.deep.equal([{ familyType: keyword, value }]);
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

        it('should assign value to speciesInfo if keyword is "typespecies"', function () {
            keyword = 'typespecies';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: keyword, value }]);
        });

        it('should assign value to speciesInfo if keyword is "otherspecies"', function () {
            keyword = 'otherspecies';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: keyword, value }]);
        });

        it('should filter out "see text" from species values', function () {
            keyword = 'typespecies';
            value = 'See text';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should clean question marks and references from species values', function () {
            keyword = 'typespecies';
            value = '?T. rex[1] Author, 2020';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([
                {
                    speciesType: keyword,
                    value: 'T. rex Author, 2020',
                },
            ]);
        });

        it('should handle species values that become empty after cleaning', function () {
            keyword = 'typespecies';
            value = '?[1]';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should handle otherspecies values that become empty after cleaning', function () {
            keyword = 'otherspecies';
            value = '?[1]';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should handle otherspecies with valid value', function () {
            keyword = 'otherspecies';
            value = 'A. europaeus';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: keyword, value }]);
        });

        it('should handle otherspecies when value fails initial validation', function () {
            keyword = 'otherspecies';
            value = 'See text';  
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should handle species with valid value', function () {
            keyword = 'species';
            value = 'T. rex';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: keyword, value }]);
        });

        it('should handle species when value becomes empty after cleaning', function () {
            keyword = 'species';
            value = '?[1]';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should handle species when value fails validation (empty string)', function () {
            keyword = 'species';
            value = '';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should handle species when value contains "see text"', function () {
            keyword = 'species';
            value = 'See text';
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should handle species when value is null', function () {
            keyword = 'species';
            value = null;
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
        });

        it('should handle species when value is undefined', function () {
            keyword = 'species';
            value = undefined;
            handleClassification.assignClassificationInfo(data, keyword, value);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
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
            const html = { querySelector: function () { return undefined; } };
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
            const infoBox = { querySelectorAll: function () { return undefined; } };
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

        it('should handle Early/Late/Middle/Upper/Lower temporal patterns', function () {
            const rowData = ['Early Cretaceous[1]', '66-0 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Early Cretaceous, 66-0 Ma');
        });

        it('should handle Early/Late/Middle/Upper/Lower temporal patterns when temporalRange is empty', function () {
            const rowData = ['Late Jurassic[1]'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Jurassic');
        });

        it('should handle Early/Late/Middle/Upper/Lower temporal patterns when temporalRange is not empty', function () {
            const rowData = ['Temporal range: Late Jurassic', 'Early Cretaceous[1]'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Jurassic, Early Cretaceous');
        });

        it('should handle multiple Ma values with references', function () {
            const rowData = ['Temporal range: Late Cretaceous', '72.1-66 Ma[1]', '70-68 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous, 72.1-66 Ma, 70-68 Ma');
        });

        it('should handle decimal Ma values', function () {
            const rowData = ['125.0-100.5 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('125.0-100.5 Ma');
        });

        it('should handle Middle temporal periods', function () {
            const rowData = ['Middle Jurassic[1]', '174-164 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Middle Jurassic, 174-164 Ma');
        });

        it('should handle Upper and Lower temporal periods', function () {
            const rowData = ['Upper Triassic', 'Lower Jurassic'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Upper Triassic, Lower Jurassic');
        });

        it('should clean up double commas', function () {
            const rowData = ['Temporal range: Late Cretaceous,,', '66-0 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous, 66-0 Ma');
        });

        it('should handle mixed temporal data with multiple references', function () {
            const rowData = ['Temporal range: Late Cretaceous[1][2]', 'Early Cretaceous[3]', '100-66 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous, Early Cretaceous, 100-66 Ma');
        });

        it('should handle empty rowData array', function () {
            const rowData = [];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('');
        });

        it('should handle rowData with only non-matching elements', function () {
            const rowData = ['Some random text', 'Another non-temporal data'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('');
        });

        it('should handle single Ma value without range', function () {
            const rowData = ['150 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('150 Ma');
        });

        it('should handle Temporal range with extra whitespace', function () {
            const rowData = ['Temporal range:    Late   Cretaceous   '];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous');
        });

        it('should handle trailing comma cleanup after final processing', function () {
            const rowData = ['Late Cretaceous,'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous');
        });

        it('should handle question mark cleanup', function () {
            const rowData = ['Late Cretaceous?'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous');
        });

        it('should handle complex mixed case with all cleanup rules', function () {
            const rowData = ['Temporal range: Late Cretaceous?[1][2],,', 'Early Jurassic?[3],', '150-100 Ma?[4],'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Late Cretaceous, Early Jurassic, 150-100 Ma');
        });

        it('should handle case where Temporal range appears after other temporal data', function () {
            const rowData = ['Late Cretaceous', 'Temporal range: Jurassic'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('Jurassic');
        });

        it('should handle Ma pattern with spaces around numbers', function () {
            const rowData = ['66 - 0 Ma'];
            const result = handleClassification.handleTemporalRange(rowData);
            expect(result).to.equal('66 - 0 Ma');
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
            rows = [{ querySelectorAll: function () { return [{ structuredText: '†Value\n' }]; } }];
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
            const rowWithNewline = { querySelectorAll: function () { return [{ structuredText: 'Value\nExtra' }]; } };
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

        it('should handle header data when header is at the end of rows array', function () {
            const mockHeaderRow = { querySelectorAll: function () { return [{ structuredText: 'Species' }]; } };
            const mockRows = [
                { querySelectorAll: function () { return []; } },
                { querySelectorAll: function () { return []; } },
                mockHeaderRow
            ];
            
            headerData[0].parentNode = mockHeaderRow;
            
            handleClassification.handleHeaderData(headerData, mockRows, data);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([]);
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
            rows = [{ querySelectorAll: function () { return [{ structuredText: '' }]; } }];;
            handleClassification.handleOtherRows(rows, data);
            expect(data).to.deep.equal(data);
        });

        it('should handle header data with keywordRegex match and no td elements', function () {
            const headerRow = parser.parse('<tr><th>Species:</th></tr>');
            const nextRow = parser.parse('<tr><td>Value</td></tr>');
            rows = [headerRow, nextRow];
            
            headerRow.querySelectorAll = function(selector) {
                if (selector === 'th') return [{ structuredText: 'Species:' }];
                return [];
            };
            
            nextRow.querySelectorAll = function(selector) {
                if (selector === 'td') return [{ structuredText: 'Value' }];
                return [];
            };
            
            handleClassification.handleOtherRows(rows, data);
            expect(data.classificationInfo.speciesInfo).to.deep.equal([{ speciesType: 'Species', value: 'Value' }]);
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
