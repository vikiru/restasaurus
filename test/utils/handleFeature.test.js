const chai = require('chai');
const { parse } = require('node-html-parser');
const sinon = require('sinon');

const { MongooseData } = require('../../app/models/MongooseData');

const { expect } = chai;

describe('handleFeature', function () {
    describe('findFeature', function () {
        afterEach(function () {
            sinon.restore();
        });

        it('should handle case where there are no matches', function () {
            const htmlData = '<p>This dinosaur was a bipedal carnivore\n</p>';
            const root = parse(htmlData);
            const matchStub = sinon.stub(String.prototype, 'match');
            const dietRegex = /(\b\w*(ivore|ivorous))s?\b/gim;
            matchStub.returns(null);
            const handleFeature = require('../../app/utils/handleFeature');
            const feature = handleFeature.findFeature(root, dietRegex, []);
            expect(feature).to.be.equal('');
        });

        it('should handle cases where there are ties in matches', function () {
            const htmlData = '<p>This dinosaur was a bipedal carnivore, maybe omnivorous\n</p>';
            const root = parse(htmlData);
            const dietRegex = /(\b\w*(ivore|ivorous))s?\b/gim;
            const handleFeature = require('../../app/utils/handleFeature');
            const feature = handleFeature.findFeature(root, dietRegex, []);
            expect(feature).to.be.equal('');
        });

        it('should handle cases where there are no ties in matches', function () {
            const htmlData = '<p>This dinosaur was a bipedal carnivore carnivore\n</p>';
            const root = parse(htmlData);
            const dietRegex = /(\b\w*(ivore|ivorous))s?\b/gim;
            const handleFeature = require('../../app/utils/handleFeature');
            const feature = handleFeature.findFeature(root, dietRegex, []);
            expect(feature).to.be.equal('carnivore');
        });
    });

    describe('findDescription', function () {
        const handleFeature = require('../../app/utils/handleFeature');
        it('should return the structuredText of the first paragraph that includes the name', function () {
            const htmlData = '<p>Some text</p><p>Text with name</p>';
            const root = parse(htmlData);
            const description = handleFeature.findDescription(root, 'name');

            expect(description).to.equal('Text with name');
        });

        it('should return undefined when no paragraph includes the name', function () {
            const htmlData = '<p>Some text</p><p>More text</p>';
            const root = parse(htmlData);
            const description = handleFeature.findDescription(root, 'name');

            expect(description).to.be.undefined;
        });
    });

    describe('searchClassification', function () {
        const handleFeature = require('../../app/utils/handleFeature');
        it('should set diet and locomotionType when value is in defaults', function () {
            const items = [{ value: 'Ankylosauridae' }];
            const defaults = {
                Ankylosauridae: { diet: 'herbivore', locomotionType: 'quadruped' },
            };
            const data = new MongooseData('Test');
            handleFeature.searchClassification(items, defaults, data);
            expect(data.diet).to.equal('herbivore');
            expect(data.locomotionType).to.equal('quadruped');
        });

        it('should not overwrite existing diet and locomotionType', function () {
            const items = [{ value: 'Ankylosauridae' }, { value: 'Ceratopsidae' }];
            const defaults = {
                Ankylosauridae: { diet: 'herbivore', locomotionType: 'quadruped' },
                Ceratopsidae: { diet: 'carnivore', locomotionType: 'biped' },
            };
            const data = new MongooseData('Test');
            data.diet = 'carnivore';
            data.locomotionType = 'biped';
            handleFeature.searchClassification(items, defaults, data);
            expect(data.diet).to.equal('carnivore');
            expect(data.locomotionType).to.equal('biped');
        });

        it('should ignore items not in defaults', function () {
            const items = [{ value: 'Unknown' }];
            const defaults = {
                Ankylosauridae: { diet: 'herbivore', locomotionType: 'quadruped' },
            };
            const data = new MongooseData('Test');
            handleFeature.searchClassification(items, defaults, data);
            expect(data.diet).to.equal('');
            expect(data.locomotionType).to.equal('');
        });

        it('should use item if it has no value property', function () {
            const items = ['Ankylosauridae', 'Ceratopsidae'];
            const defaults = {
                Ankylosauridae: { diet: 'herbivore', locomotionType: 'quadruped' },
            };
            const data = new MongooseData('Test');
            handleFeature.searchClassification(items, defaults, data);
            expect(data.diet).to.equal('herbivore');
            expect(data.locomotionType).to.equal('quadruped');
        });
    });

    describe('retrieveDietAndLocomotionType', function () {
        const handleFeature = require('../../app/utils/handleFeature');
        let data;
        beforeEach(function () {
            data = new MongooseData('Dino');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return biped carnivore as locomotion and diet from extract', function () {
            const pageData = {
                extract: 'This dinosaur was a bipedal carnivore',
            };
            handleFeature.retrieveDietAndLocomotionType(pageData, data);
            expect(data.diet).to.equal('carnivore');
            expect(data.locomotionType).to.equal('biped');
        });

        it('should return biped carnivore as locomotion and diet', function () {
            const pageData = {
                structuredText:
                    'This dinosaur was a bipedal carnivore\nIt was not the first bipedal carnivore of its kind.\ncarnivore biped carnivore biped carnivore\n',
            };
            handleFeature.retrieveDietAndLocomotionType(pageData, data);
            expect(data.diet).to.equal('carnivore');
            expect(data.locomotionType).to.equal('biped');
        });

        it('should return an empty string when there is no valid match in extract', function () {
            const pageData = {
                extract: '',
            };
            handleFeature.retrieveDietAndLocomotionType(pageData, data);
            expect(data.diet).to.equal('');
            expect(data.locomotionType).to.equal('');
        });

        it('should return an empty string when there is no valid match in text', function () {
            const pageData = {
                structuredText: 'This text contains feature but not in exec\nThis is another line',
            };
            handleFeature.retrieveDietAndLocomotionType(pageData, data);
            expect(data.diet).to.equal('');
            expect(data.locomotionType).to.equal('');
        });

        it('should return herbivore even when there are other diet types', function () {
            const pageData = {
                structuredText:
                    'This text contains herbivore\nThis is another herbivore\nherbivore\ncarnivore\ncarnivore\ninsectivore\n',
            };
            handleFeature.retrieveDietAndLocomotionType(pageData, data);
            expect(data.diet).to.equal('herbivore');
            expect(data.locomotionType).to.equal('');
        });

        it('should select the feature with the highest count', function () {
            const pageData = {
                structuredText:
                    'Dinosaur carnivore\nherbivore\nDinosaur omnivore\nDinosaur omnivore\nDinosaur omnivore\n',
            };
            handleFeature.retrieveDietAndLocomotionType(pageData, data);
            expect(data.diet).to.equal('omnivore');
            expect(data.locomotionType).to.equal('');
        });
    });

    describe('findMissingFeatures', function () {
        const handleFeature = require('../../app/utils/handleFeature');
        let data;
        beforeEach(function () {
            data = new MongooseData('Dino');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should call findFeatureByClassification when diet is empty', function () {
            data.locomotionType = 'biped';
            handleFeature.findMissingFeatures(data);
            expect(data).to.deep.equal(data);
        });

        it('should call findFeatureByClassification when locomotion is empty', function () {
            data.diet = 'carnivore';
            handleFeature.findMissingFeatures(data);
            expect(data).to.deep.equal(data);
        });

        it('should not call findFeatureByClassification when both diet and locomotion are not empty', function () {
            const featureByClassificationStub = sinon.stub(handleFeature, 'findFeatureByClassification');
            data.diet = 'carnivore';
            data.locomotionType = 'biped';
            handleFeature.findMissingFeatures(data);
            expect(featureByClassificationStub.calledOnce).to.be.false;
        });
    });
});
