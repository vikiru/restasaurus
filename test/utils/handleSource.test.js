const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const handleSource = require('../../app/utils/handleSource');

describe('handleSource', function () {
    describe('getLicense Tests', function () {
        it('should return the correct license text', function () {
            const licenseInfo = { text: 'MIT' };
            const result = handleSource.getLicense(licenseInfo);
            expect(result).to.equal('MIT');
        });

        it('should return an empty string if license text is not provided', function () {
            const licenseInfo = {};
            const result = handleSource.getLicense(licenseInfo);
            expect(result).to.equal('');
        });
    });

    describe('getLicenseURL Tests', function () {
        it('should return the correct license URL', function () {
            const licenseInfo = { url: 'https://license-url.com' };
            const result = handleSource.getLicenseURL(licenseInfo);
            expect(result).to.equal('https://license-url.com');
        });

        it('should return an empty string if license URL is not provided', function () {
            const licenseInfo = {};
            const result = handleSource.getLicenseURL(licenseInfo);
            expect(result).to.equal('');
        });
    });

    describe('getLastRevision', function () {
        it('should return timestamp when revisions exist', function () {
            const pageData = { revisions: [{ timestamp: '2022-01-01T00:00:00Z' }] };
            const result = handleSource.getLastRevision(pageData);
            expect(result).to.equal('2022-01-01T00:00:00Z');
        });

        it('should return empty string when revisions do not exist', function () {
            const pageData = {};
            const result = handleSource.getLastRevision(pageData);
            expect(result).to.equal('');
        });

        it('should return empty string when timestamp does not exist', function () {
            const pageData = { revisions: [{}] };
            const result = handleSource.getLastRevision(pageData);
            expect(result).to.equal('');
        });
    });

    describe('getPermalink', function () {
        it('should return permalink when dinosaurName and revisions exist', function () {
            const dinosaurName = 'Dino';
            const pageData = { revisions: [{ revid: '123' }] };
            const result = handleSource.getPermalink(dinosaurName, pageData);
            expect(result).to.equal('https://en.wikipedia.org/w/index.php?title=Dino&oldid=123');
        });

        it('should return empty string when dinosaurName does not exist', function () {
            const pageData = { revisions: [{ revid: '123' }] };
            const result = handleSource.getPermalink(undefined, pageData);
            expect(result).to.equal('');
        });

        it('should return empty string when revisions do not exist', function () {
            const dinosaurName = 'Dino';
            const result = handleSource.getPermalink(dinosaurName, {});
            expect(result).to.equal('');
        });

        it('should return base Wikipedia url with undefined oldid when revid does not exist', function () {
            const dinosaurName = 'Dino';
            const pageData = { revisions: [{}] };
            const result = handleSource.getPermalink(dinosaurName, pageData);
            expect(result).to.equal('https://en.wikipedia.org/w/index.php?title=Dino&oldid=undefined');
        });
    });

    describe('handleSourceInformation', function () {
        let data;
        let dinosaurName;
        let pageData;
        let licenseInfo;
        let getWikipediaURLStub;
        let getLastRevisionStub;
        let getRevisionHistoryURLStub;
        let getLicenseStub;
        let getLicenseURLStub;
        let getPermalinkStub;
        let createCitationStub;

        beforeEach(function () {
            
            
            data = { source: {} };
            dinosaurName = 'Dino';
            pageData = {};
            licenseInfo = {};
            getWikipediaURLStub = sinon.stub(handleSource, 'getWikipediaURL');
            getRevisionHistoryURLStub = sinon.stub(handleSource, 'getRevisionHistoryURL');
            getLicenseStub = sinon.stub(handleSource, 'getLicense');
            getLicenseURLStub = sinon.stub(handleSource, 'getLicenseURL');
            getPermalinkStub = sinon.stub(handleSource, 'getPermalink');
            createCitationStub = sinon.stub(handleSource, 'createCitation');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should handle source information', function () {
            handleSource.handleSourceInformation(data, dinosaurName, pageData, licenseInfo);
            expect(data.source.pageTitle).to.equal(dinosaurName);
        });
    });
});
