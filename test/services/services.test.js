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

        beforeEach(() => {
            DinosaurStub = sinon.stub(Dinosaur, 'create');
            ClassificationInfoStub = sinon.stub(ClassificationInfo, 'create').callsFake(() => {});
            DinosaurSourceStub = sinon.stub(DinosaurSource, 'create').callsFake(() => {});
            DinosaurImageStub = sinon.stub(DinosaurImage, 'create').callsFake(() => {});
            pushSpy = sinon.spy(services, 'pushDinosaurToDB');
        });

        afterEach(() => {
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
        const page = 1;
        let DinosaurStub;
        const mongooseData = new MongooseData('Stegosaurus');
        const fakeData = [mongooseData, mongooseData];

        beforeEach(() => {
            DinosaurStub = sinon.stub(Dinosaur, 'findAllDinosaurs').callsFake(() => fakeData);
        });

        afterEach(() => {
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
});
