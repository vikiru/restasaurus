const { expect } = require('chai');
const mongoose = require('mongoose');
const sinon = require('sinon');

const { Dinosaur } = require('../../app/models/Dinosaur');
const { MongooseData } = require('../../app/models/MongooseData');

describe('DinosaurSchema', function () {
    const fakeDino = new MongooseData('Stegosaurus');

    describe('findAllDinosaurs', function () {
        let findStub;

        beforeEach(function () {
            const query = {
                skip: sinon.stub().returnsThis(),
                limit: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().returns(Promise.resolve([fakeDino])),
            };
            findStub = sinon.stub(mongoose.Model, 'find').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return all dinosaurs given a page number', async function () {
            const page = 1;
            const dinosaurs = await Dinosaur.findAllDinosaurs(page);
            expect(dinosaurs.length).to.equal(page);
            expect(dinosaurs[0]).to.deep.equal(fakeDino);
        });
    });

    describe('findById', function () {
        let findStub;
        const query = {
            populate: sinon.stub().returnsThis(),
            exec: sinon.stub().returns(Promise.resolve(fakeDino)),
        };
        beforeEach(function () {
            findStub = sinon.stub(mongoose.Model, 'findOne').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return a dinosaur by its id', async function () {
            const dinosaur = await Dinosaur.findById(1);
            expect(dinosaur).to.be.an('object');
            expect(dinosaur).to.be.deep.equal(fakeDino);
        });
    });

    describe('findByName', function () {
        let findStub;
        const query = {
            populate: sinon.stub().returnsThis(),
            exec: sinon.stub().returns(Promise.resolve(fakeDino)),
        };
        beforeEach(function () {
            findStub = sinon.stub(mongoose.Model, 'findOne').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return a dinosaur by its name', async function () {
            const dinosaur = await Dinosaur.findByName('Stegosaurus');
            expect(dinosaur).to.be.an('object');
            expect(dinosaur).to.be.deep.equal(fakeDino);
        });
    });

    describe('findByDiet', function () {
        let findStub;
        const query = {
            populate: sinon.stub().returnsThis(),
            exec: sinon.stub().returns(Promise.resolve(fakeDino)),
        };
        beforeEach(function () {
            findStub = sinon.stub(mongoose.Model, 'find').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return a dinosaur by its diet', async function () {
            const dinosaur = await Dinosaur.findByDiet('herbivore');
            expect(dinosaur).to.be.an('object');
            expect(dinosaur).to.be.deep.equal(fakeDino);
        });
    });

    describe('findByLocomotion', function () {
        let findStub;
        const query = {
            populate: sinon.stub().returnsThis(),
            exec: sinon.stub().returns(Promise.resolve(fakeDino)),
        };
        beforeEach(function () {
            findStub = sinon.stub(mongoose.Model, 'find').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return a dinosaur by its locomotion', async function () {
            const dinosaur = await Dinosaur.findByLocomotion('quadruped');
            expect(dinosaur).to.be.an('object');
            expect(dinosaur).to.be.deep.equal(fakeDino);
        });
    });

    describe('returnRandomDinosaurs', function () {
        let aggregateStub;

        beforeEach(function () {
            aggregateStub = sinon.stub(mongoose.Model, 'aggregate');
            aggregateStub.returns(Promise.resolve([fakeDino]));
        });

        afterEach(function () {
            aggregateStub.restore();
        });

        it('should return random dinosaurs by count', async function () {
            const dinosaurs = await Dinosaur.returnRandomDinosaurs(1);
            expect(aggregateStub.called).to.be.true;
            expect(dinosaurs.length).to.equal(1);
            expect(dinosaurs[0]).to.deep.equal(fakeDino);
        });
    });

    describe('returnDinosaursByQuery', function () {
        let aggregateStub;

        beforeEach(function () {
            aggregateStub = sinon.stub(mongoose.Model, 'aggregate');
            aggregateStub.returns(Promise.resolve([fakeDino]));
        });

        afterEach(function () {
            aggregateStub.restore();
        });

        it('should return dinosaurs by query', async function () {
            const query = {
                $match: {
                    diet: 'herbivore',
                    locomotionType: 'quadruped',
                    'classificationInfo.clade': { $in: ['Dinosauria'] },
                },
            };
            const dinosaurs = await Dinosaur.returnDinosaursByQuery(query);
            expect(aggregateStub.called).to.be.true;
            expect(dinosaurs.length).to.equal(1);
            expect(dinosaurs[0]).to.deep.equal(fakeDino);
        });
    });

    describe('findAllImages', function () {
        let findStub;

        beforeEach(function () {
            const query = {
                skip: sinon.stub().returnsThis(),
                limit: sinon.stub().returnsThis(),
                populate: sinon.stub().returnsThis(),
                exec: sinon.stub().returns(Promise.resolve([fakeDino.image, fakeDino.image])),
            };
            findStub = sinon.stub(mongoose.Model, 'find').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return all images given a page number', async function () {
            const page = 1;
            const images = await Dinosaur.findAllImages(page);
            expect(images.length).to.equal(2);
            expect(images[0]).to.deep.equal(fakeDino.image);
        });
    });

    describe('findImageById', function () {
        let findStub;
        const query = {
            select: sinon.stub().returnsThis(),
            populate: sinon.stub().returnsThis(),
            exec: sinon.stub().returns(Promise.resolve(fakeDino.image)),
        };
        beforeEach(function () {
            findStub = sinon.stub(mongoose.Model, 'findOne').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return an image by its id', async function () {
            const image = await Dinosaur.findImageById(1);
            expect(image).to.be.an('object');
            expect(image).to.be.deep.equal(fakeDino.image);
        });
    });

    describe('returnRandomImages', function () {
        let aggregateStub;

        beforeEach(function () {
            aggregateStub = sinon.stub(mongoose.Model, 'aggregate');
            aggregateStub.returns(Promise.resolve(fakeDino.image));
        });

        afterEach(function () {
            aggregateStub.restore();
        });

        it('should return random images by count', async function () {
            const images = await Dinosaur.returnRandomImages(1);
            expect(aggregateStub.called).to.be.true;
            expect(images).to.deep.equal(fakeDino.image);
        });
    });

    describe('findAllClades', function () {
        let findStub;

        beforeEach(function () {
            const query = [{ clade: 'Therapoda', count: 1 }];
            findStub = sinon.stub(mongoose.Model, 'aggregate').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return all clades', async function () {
            const clades = await Dinosaur.findAllClades();
            expect(clades.length).to.equal(1);
            expect(clades[0].clade).to.equal('Therapoda');
        });
    });

    describe('findAllDiets', function () {
        let findStub;

        beforeEach(function () {
            const query = [{ diet: 'herbivore', count: 1 }];
            findStub = sinon.stub(mongoose.Model, 'aggregate').resolves(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return all diets', async function () {
            const diets = await Dinosaur.findAllDiets();
            expect(diets.length).to.equal(1);
            expect(diets[0].diet).to.equal('herbivore');
        });
    });

    describe('findAllLocomotions', function () {
        let findStub;

        beforeEach(function () {
            const query = [{ locomotionType: 'biped', count: 1 }];
            findStub = sinon.stub(mongoose.Model, 'aggregate').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return all locomotions', async function () {
            const locomotions = await Dinosaur.findAllLocomotions();
            expect(locomotions.length).to.equal(1);
            expect(locomotions[0].locomotionType).to.equal('biped');
        });
    });

    describe('findAllNames', function () {
        let findStub;

        beforeEach(function () {
            const query = {
                exec: sinon.stub().returns(Promise.resolve({ names: [fakeDino.name, fakeDino.name] })),
            };
            findStub = sinon.stub(mongoose.Model, 'find').returns(query);
        });

        afterEach(function () {
            findStub.restore();
        });

        it('should return all names', async function () {
            const names = await Dinosaur.findAllNames();
            expect(names.names.length).to.equal(2);
            expect(names.names[0]).to.deep.equal(fakeDino.name);
        });
    });
});
