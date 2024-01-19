const { expect } = require('chai');
const sinon = require('sinon');

const { ClassificationInfo } = require('../../app/models/ClassificationInfo');
const { Dinosaur } = require('../../app/models/Dinosaur');
const { DinosaurImage } = require('../../app/models/DinosaurImage');
const { DinosaurSource } = require('../../app/models/DinosaurSource');
const { MongooseData } = require('../../app/models/MongooseData');
const services = require('../../app/services/index');
const { convertToSchema } = require('../../app/utils/convertToSchema');

describe('Services - Functionality Tests', function () {
    describe('pushDinosaurToDB', function () {
        let DinosaurStub;
        let ClassificationInfoStub;
        let DinosaurSourceStub;
        let DinosaurImageStub;
        let pushSpy;
        const mongooseData = new MongooseData('Stegosaurus');

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'create');
            ClassificationInfoStub = sinon.stub(ClassificationInfo, 'create').callsFake(() => {});
            DinosaurSourceStub = sinon.stub(DinosaurSource, 'create').callsFake(() => {});
            DinosaurImageStub = sinon.stub(DinosaurImage, 'create').callsFake(() => {});
            pushSpy = sinon.spy(services, 'pushDinosaurToDB');
        });

        afterEach(function () {
            DinosaurStub.restore();
            ClassificationInfoStub.restore();
            DinosaurSourceStub.restore();
            DinosaurImageStub.restore();
            pushSpy.restore();
        });

        it('should save the dinosaur to database', async function () {
            const data = await convertToSchema(mongooseData);
            await services.pushDinosaurToDB(data);
            expect(pushSpy.calledOnce).to.be.true;
        });

        it('should not save undefined to database', async function () {
            const data = undefined;
            await services.pushDinosaurToDB(data);
            expect(pushSpy.calledOnce).to.be.true;
        });
    });

    describe('retrieveAllDinosaurs', function () {
        let DinosaurStub;
        const mongooseData = new MongooseData('Stegosaurus');
        const fakeData = [mongooseData, mongooseData];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findAllDinosaurs').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve all dinosaurs within database on first page', async function () {
            const result = await services.retrieveAllDinosaurs(1);
            expect(result.prevPage).to.equal('');
            expect(result.currentPage).to.equal(1);
            expect(result.nextPage).to.equal('/api/v1/dinosaurs?page=2');
            expect(result.count).to.equal(fakeData.length);
            expect(result.data).to.deep.equal(fakeData);
        });

        it('should retrieve all dinosaurs within database on last page', async function () {
            const result = await services.retrieveAllDinosaurs(20);
            expect(result.prevPage).to.equal('/api/v1/dinosaurs?page=19');
            expect(result.currentPage).to.equal(20);
            expect(result.nextPage).to.equal('');
            expect(result.count).to.equal(fakeData.length);
            expect(result.data).to.deep.equal(fakeData);
        });
    });

    describe('retrieveAllImages', function () {
        let DinosaurStub;
        const fakeImage = { image: {} };
        const fakeData = [fakeImage, fakeImage];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findAllImages').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve all dinosaur images within database on first page', async function () {
            const result = await services.retrieveAllImages(1);
            expect(result.prevPage).to.equal('');
            expect(result.currentPage).to.equal(1);
            expect(result.nextPage).to.equal('/api/v1/images?page=2');
            expect(result.count).to.equal(fakeData.length);
            expect(result.data).to.deep.equal(fakeData);
        });

        it('should retrieve all dinosaur images within database on last page', async function () {
            const result = await services.retrieveAllImages(20);
            expect(result.prevPage).to.equal('/api/v1/images?page=19');
            expect(result.currentPage).to.equal(20);
            expect(result.nextPage).to.equal('');
            expect(result.count).to.equal(fakeData.length);
            expect(result.data).to.deep.equal(fakeData);
        });
    });

    describe('retrieveDinosaurById', function () {
        let DinosaurStub;
        const mongooseData = new MongooseData('Stegosaurus');

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findById').callsFake(() => mongooseData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve dinosaur with id of 1', async function () {
            const result = await services.retrieveDinosaurById(1);
            expect(result).to.exist;
            expect(result).to.be.an('object');
            expect(result).to.deep.equal(mongooseData);
        });
    });

    describe('retrieveAllNames', function () {
        let DinosaurStub;
        const fakeData = [new MongooseData('Stegosaurus'), new MongooseData('T-Rex')];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findAllNames').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve all names within database', async function () {
            const result = await services.retrieveAllNames();
            expect(result).to.be.an('array');
            expect(result.length).to.be.equal(2);
        });
    });

    describe('retrieveDinosaurByName', function () {
        let DinosaurStub;
        const fakeData = new MongooseData('Stegosaurus');

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findByName').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve dinosaur by name', async function () {
            const result = await services.retrieveDinosaurByName('Stegosaurus');
            expect(result).to.exist;
            expect(result).to.be.an('object');
            expect(result).to.deep.equal(fakeData);
        });
    });

    describe('retrieveDinosaursByDiet', function () {
        let DinosaurStub;
        const fakeData = [new MongooseData('Stegosaurus')];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findByDiet').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve dinosaur by diet', async function () {
            const result = await services.retrieveDinosaursByDiet('herbivore');
            expect(result).to.exist;
            expect(result).to.be.an('array');
            expect(result.length).to.equal(1);
            expect(result[0]).to.deep.equal(fakeData[0]);
        });
    });

    describe('retrieveDinosaursByLocomotion', function () {
        let DinosaurStub;
        const fakeData = [new MongooseData('Stegosaurus')];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findByLocomotion').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve dinosaur by locomotion', async function () {
            const result = await services.retrieveDinosaursByLocomotion('quadruped');
            expect(result).to.exist;
            expect(result).to.be.an('array');
            expect(result.length).to.equal(1);
            expect(result[0]).to.deep.equal(fakeData[0]);
        });
    });

    describe('retrieveImageById', function () {
        let DinosaurStub;
        const fakeData = { image: {} };

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'findImageById').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should retrieve image with id of 1', async function () {
            const result = await services.retrieveImageById(1);
            expect(result).to.exist;
            expect(result).to.be.an('object');
            expect(result).to.deep.equal(fakeData);
        });
    });

    describe('returnRandomDinosaurs', function () {
        let DinosaurStub;
        const fakeData = [new MongooseData('Stegosaurus')];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'returnRandomDinosaurs').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should return a random number of dinosaurs', async function () {
            const result = await services.returnRandomDinosaurs(1);
            expect(result.length).to.equal(1);
            expect(result[0]).to.be.an('object');
            expect(result[0]).to.deep.equal(fakeData[0]);
        });
    });

    describe('returnRandomImages', function () {
        let DinosaurStub;
        const fakeData = [{ image: {} }];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'returnRandomImages').callsFake(() => fakeData);
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should return a random number of dinosaurs', async function () {
            const result = await services.returnRandomImages(1);
            expect(result.length).to.equal(1);
            expect(result[0]).to.be.an('object');
            expect(result[0]).to.deep.equal(fakeData[0]);
        });
    });

    describe('returnDinosaursByQuery', function () {
        let DinosaurStub;
        const fakeData = [new MongooseData('Stegosaurus')];

        beforeEach(function () {
            DinosaurStub = sinon.stub(Dinosaur, 'returnDinosaursByQuery');
        });

        afterEach(function () {
            DinosaurStub.restore();
        });

        it('should return the matching dinosaur by query', async function () {
            DinosaurStub.callsFake(() => fakeData);
            const diet = 'herbivore';
            const locomotionType = 'quadruped';
            const clade = ['Ornithischia'];

            const result = await services.returnDinosaursByQuery(clade, diet, locomotionType);
            expect(result.length).to.equal(1);
            expect(result[0]).to.be.an('object');
            expect(result[0]).to.deep.equal(fakeData[0]);
        });

        it('should return undefined if no query parameters are provided', async function () {
            const result = await services.returnDinosaursByQuery(undefined, undefined, undefined);
            expect(result).to.equal(undefined);
        });
    });
});
