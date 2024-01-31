const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const { MongooseData } = require('../../app/models/MongooseData');

describe('handleImage', function () {
    describe('getImageDescription', function () {
        const handleImage = require('../../app/utils/handleImage');
        it('should return image description when metaData.ImageDescription exists', function () {
            const metaData = { ImageDescription: { value: '<p>Description</p>' } };
            const result = handleImage.getImageDescription(metaData);
            expect(result).to.equal('Description');
        });

        it('should return empty string when metaData.ImageDescription does not exist', function () {
            const metaData = {};
            const result = handleImage.getImageDescription(metaData);
            expect(result).to.equal('');
        });
    });

    describe('getLicense', function () {
        const handleImage = require('../../app/utils/handleImage');
        it('should return UsageTerms.value when LicenseShortName.value is not "Public domain"', function () {
            const metaData = {
                LicenseShortName: { value: 'CC BY-SA 3.0' },
                UsageTerms: { value: 'Creative Commons Attribution-Share Alike 3.0' },
            };
            const result = handleImage.getLicense(metaData);
            expect(result).to.equal('Creative Commons Attribution-Share Alike 3.0');
        });

        it('should return LicenseShortName.value when LicenseShortName.value is "Public domain"', function () {
            const metaData = { LicenseShortName: { value: 'Public domain' } };
            const result = handleImage.getLicense(metaData);
            expect(result).to.equal('Public domain');
        });
    });

    describe('getLicenseURL', function () {
        const handleImage = require('../../app/utils/handleImage');
        it('should return LicenseUrl.value when LicenseShortName.value is not "Public domain"', function () {
            const metaData = {
                LicenseShortName: { value: 'CC BY-SA 3.0' },
                LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/3.0' },
            };
            const result = handleImage.getLicenseURL(metaData);
            expect(result).to.equal('https://creativecommons.org/licenses/by-sa/3.0');
        });

        it('should return "https://creativecommons.org/public-domain/" when LicenseShortName.value is "Public domain"', function () {
            const metaData = { LicenseShortName: { value: 'Public domain' } };
            const result = handleImage.getLicenseURL(metaData);
            expect(result).to.equal('https://creativecommons.org/public-domain/');
        });
    });

    describe('getDateCreated', function () {
        const handleImage = require('../../app/utils/handleImage');
        it('should return date when metaData.DateTime exists', function () {
            const metaData = { DateTime: { value: '2007-12-12T00:00:00Z' } };
            const result = handleImage.getDateCreated(metaData);
            expect(result).to.equal('2007-12-12T00:00:00.000Z');
        });

        it('should return empty string when metaData.DateTime does not exist', function () {
            const metaData = {};
            const result = handleImage.getDateCreated(metaData);
            expect(result).to.equal('');
        });
    });

    describe('handleAuthor', function () {
        const handleImage = require('../../app/utils/handleImage');
        let data;
        let authorInfo;

        beforeEach(function () {
            data = { image: {} };
        });

        it('should handle author info when it is a link', function () {
            authorInfo = '<a href="https://example.com">Author</a>';
            const result = handleImage.handleAuthor(data, authorInfo);
            expect(result.image.author).to.equal('Author');
            expect(result.image.authorURL).to.equal('https://example.com');
        });

        it('should handle author info when it is not a link', function () {
            authorInfo = 'Author';
            const result = handleImage.handleAuthor(data, authorInfo);
            expect(result.image.author).to.equal('Author');
            expect(result.image.authorURL).to.equal('');
        });

        it('should handle author info with no matching href tag', function () {
            authorInfo = '<a></a>';
            const result = handleImage.handleAuthor(data, authorInfo);
            expect(result.image.author).to.equal('');
            expect(result.image.authorURL).to.equal('');
        });

        it('should handle author info when it is a link without https', function () {
            authorInfo = '<a href="example.com">Author</a>';
            const result = handleImage.handleAuthor(data, authorInfo);
            expect(result.image.author).to.equal('Author');
            expect(result.image.authorURL).to.equal('https://example.com');
        });
    });

    describe('processImageData', function () {
        const handleImage = require('../../app/utils/handleImage');
        let imageData;
        let data;
        let getImageTitleStub;
        let getImageDescriptionStub;
        let handleAuthorStub;
        let getLicenseStub;
        let getLicenseURLStub;
        let getDateCreatedStub;

        beforeEach(function () {
            data = new MongooseData('Dino');
            getImageTitleStub = sinon.stub(handleImage, 'getImageTitle');
            getImageDescriptionStub = sinon.stub(handleImage, 'getImageDescription');
            handleAuthorStub = sinon.stub(handleImage, 'handleAuthor');
            getLicenseStub = sinon.stub(handleImage, 'getLicense');
            getLicenseURLStub = sinon.stub(handleImage, 'getLicenseURL');
            getDateCreatedStub = sinon.stub(handleImage, 'getDateCreated');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should process image data when imageinfo exists', function () {
            imageData = {
                title: 'File:Image.jpg',
                imageinfo: [
                    {
                        url: '',
                        descriptionurl: '',
                        descriptionshorturl: '',
                        extmetadata: {
                            DateTime: {
                                value: '2022-02-21T14:54:31Z',
                                source: '',
                                hidden: '',
                            },
                            ObjectName: {
                                value: '',
                                source: '',
                            },
                            CommonsMetadataExtension: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Categories: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Assessments: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            ImageDescription: {
                                value: '',
                                source: '',
                            },
                            DateTimeOriginal: {
                                value: '',
                                source: '',
                            },
                            Credit: {
                                value: '',
                                source: '',
                            },
                            Artist: {
                                value: '',
                                source: '',
                            },
                            LicenseShortName: {
                                value: '',
                                source: '',
                            },
                            UsageTerms: {
                                value: '',
                                source: '',
                            },
                            AttributionRequired: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            LicenseUrl: {
                                value: '',
                                source: '',
                            },
                            Copyrighted: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Restrictions: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            License: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                        },
                    },
                ],
            };
            getDateCreatedStub.returns('2022-02-21T14:54:31.000Z');
            handleImage.processImageData(imageData, data);
            expect(data.image.title).to.equal('Image');
            expect(data.image.dateCreated).to.equal('2022-02-21T14:54:31.000Z');
        });

        it('should handle author info using Credit if Artist is not present', function () {
            imageData = {
                title: 'File:Image.jpg',
                imageinfo: [
                    {
                        url: '',
                        descriptionurl: '',
                        descriptionshorturl: '',
                        extmetadata: {
                            DateTime: {
                                value: '2022-02-21T14:54:31Z',
                                source: '',
                                hidden: '',
                            },
                            ObjectName: {
                                value: '',
                                source: '',
                            },
                            CommonsMetadataExtension: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Categories: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Assessments: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            ImageDescription: {
                                value: '',
                                source: '',
                            },
                            DateTimeOriginal: {
                                value: '',
                                source: '',
                            },
                            Credit: {
                                value: 'Author',
                                source: '',
                            },
                            LicenseShortName: {
                                value: '',
                                source: '',
                            },
                            UsageTerms: {
                                value: '',
                                source: '',
                            },
                            AttributionRequired: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            LicenseUrl: {
                                value: '',
                                source: '',
                            },
                            Copyrighted: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Restrictions: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            License: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                        },
                    },
                ],
            };
            handleImage.processImageData(imageData, data);
            getDateCreatedStub.returns('2022-02-21T14:54:31.000Z');
            expect(data.image.title).to.equal('Image');
            expect(data.image.dateCreated).to.equal('2022-02-21T14:54:31.000Z');
            expect(data.image.author).to.equal('Author');
        });

        it('should not use default values for author if no Artist or Credit is provided', function () {
            imageData = {
                title: 'File:Image.jpg',
                imageinfo: [
                    {
                        url: '',
                        descriptionurl: '',
                        descriptionshorturl: '',
                        extmetadata: {
                            DateTime: {
                                value: '2022-02-21T14:54:31Z',
                                source: '',
                                hidden: '',
                            },
                            ObjectName: {
                                value: '',
                                source: '',
                            },
                            CommonsMetadataExtension: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Categories: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Assessments: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            ImageDescription: {
                                value: '',
                                source: '',
                            },
                            DateTimeOriginal: {
                                value: '',
                                source: '',
                            },
                            LicenseShortName: {
                                value: '',
                                source: '',
                            },
                            UsageTerms: {
                                value: '',
                                source: '',
                            },
                            AttributionRequired: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            LicenseUrl: {
                                value: '',
                                source: '',
                            },
                            Copyrighted: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            Restrictions: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                            License: {
                                value: '',
                                source: '',
                                hidden: '',
                            },
                        },
                    },
                ],
            };
            handleImage.processImageData(imageData, data);
            getDateCreatedStub.returns('2022-02-21T14:54:31.000Z');
            expect(data.image.title).to.equal('Image');
            expect(data.image.dateCreated).to.equal('2022-02-21T14:54:31.000Z');
            expect(data.image.author).to.equal('');
        });

        it('should not process image data when imageinfo does not exist', function () {
            imageData = {};
            handleImage.processImageData(imageData, data);
            expect(data).to.deep.equal(data);
        });
    });
});
