const chai = require('chai');
const sinon = require('sinon');

const assert = chai.assert;

const logger = require('../../app/config/logger');
const {
    returnHome,
    retrieveAllDinosaurs,
    retrieveDinoById,
    apiEndpoints,
    retrieveAllImages,
    retrieveAllNames,
    retrieveDinoByDiet,
    retrieveDinoByName,
    retrieveDinosaursByQuery,
    retrieveRandomImages,
    retrieveDinoByLocomotion,
    retrieveImageById,
    retrieveRandomDinosaurs,
    retrieveAllClades,
    retrieveAllDiets,
    retrieveAllLocomotions,
} = require('../../app/controllers/controller');
const dinosaurService = require('../../app/services/index');

describe('Controller - Functionality Tests', function () {
    describe('returnHome', function () {
        let jsonStub;
        let statusStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return the correct response', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            await returnHome(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({
                    apiVersion: 'v1',
                    apiEndpoints,
                    rateLimit: '20 requests per hour',
                    disclaimer:
                        'The information within the API is taken directly from Wikipedia, as is and may have been modified since the last time it was retrieved. All images and text belong to their respective authors and attribution is provided accordingly for both.',
                }),
                'json method was not called with the correct response',
            );
        });
    });

    describe('retrieveAllDinosaurs', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveAllDinosaurs');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return dinosaurs', async function () {
            const req = { query: { page: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: ['dinosaur1', 'dinosaur2'] });

            await retrieveAllDinosaurs(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ data: ['dinosaur1', 'dinosaur2'] }),
                'json method was not called with the correct response',
            );
        });

        it('should return dinosaurs on page 1 if no page specified', async function () {
            const req = { query: { page: undefined } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: ['dinosaur1', 'dinosaur2'] });

            await retrieveAllDinosaurs(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ data: ['dinosaur1', 'dinosaur2'] }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no dinosaurs found', async function () {
            const req = { query: { page: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: [] });

            await retrieveAllDinosaurs(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({ error: 'Sorry, there was an error retrieving all dinosaurs' }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { query: { page: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveAllDinosaurs(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({ error: ' Sorry, an unexpected error occurred while retrieving all dinosaurs' }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveAllImages', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveAllImages');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return images on page 1', async function () {
            const req = { query: { page: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: ['image1', 'image2'] });

            await retrieveAllImages(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ data: ['image1', 'image2'] }),
                'json method was not called with the correct response',
            );
        });

        it('should return all images on page 1 if no page specified', async function () {
            const req = { query: { page: undefined } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: ['image1', 'image2'] });

            await retrieveAllImages(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ data: ['image1', 'image2'] }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no images found', async function () {
            const req = { query: { page: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: [] });

            await retrieveAllImages(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, there was an error retrieving all dinosaur images',
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { query: { page: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveAllImages(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occurred while retrieving all dinosaur images',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveAllClades', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveAllClades');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return all dinosaur clades', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([
                { clade: 'Sauropodamorpha', count: 1 },
                { clade: 'Theropoda', count: 1 },
            ]);

            await retrieveAllClades(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({
                    uniqueClades: 2,
                    data: [
                        { clade: 'Sauropodamorpha', count: 1 },
                        { clade: 'Theropoda', count: 1 },
                    ],
                }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no clades found', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: [] });

            await retrieveAllClades(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, there was an error retrieving all dinosaur clades',
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveAllClades(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occurred while retrieving all dinosaur clades',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveAllDiets', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveAllDiets');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return all dinosaur diets', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([
                {
                    diet: 'herbivore',
                    count: 1,
                },
                {
                    diet: 'carnivore',
                    count: 1,
                },
            ]);

            await retrieveAllDiets(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({
                    uniqueDiets: 2,
                    data: [
                        {
                            diet: 'herbivore',
                            count: 1,
                        },
                        {
                            diet: 'carnivore',
                            count: 1,
                        },
                    ],
                }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no diets found', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ uniqueDiets: 0, data: [] });

            await retrieveAllDiets(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, there was an error retrieving all dinosaur diets',
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveAllDiets(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occurred while retrieving all dinosaur diets',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveAllLocomotions', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveAllLocomotions');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return all dinosaur locomotions', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([
                {
                    locomotionType: 'biped',
                    count: 1,
                },
                {
                    locomotionType: 'quadruped',
                    count: 1,
                },
            ]);

            await retrieveAllLocomotions(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({
                    uniqueLocomotions: 2,
                    data: [
                        {
                            locomotionType: 'biped',
                            count: 1,
                        },
                        {
                            locomotionType: 'quadruped',
                            count: 1,
                        },
                    ],
                }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no locomotions found', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ uniqueDiets: 0, data: [] });

            await retrieveAllLocomotions(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, there was an error retrieving all dinosaur locomotions',
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveAllLocomotions(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occurred while retrieving all dinosaur locomotions',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveAllNames', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveAllNames');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return all dinosaur names', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves(['Stegosaurus', 'Tyrannosaurus']);

            await retrieveAllNames(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 2, data: ['Stegosaurus', 'Tyrannosaurus'] }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no names found', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: [] });

            await retrieveAllNames(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, there was an error retrieving all dinosaur names',
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = {};
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveAllNames(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occurred while retrieving all dinosaur names',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveDinoByName', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveDinosaurByName');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return dinosaur with a specific name', async function () {
            const req = { params: { name: 'Stegosaurus' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ name: 'Stegosaurus' });

            await retrieveDinoByName(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ name: 'Stegosaurus' }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there is no dinosaur found with a specific name', async function () {
            const req = { params: { name: 'this dinosaur does not exist' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves(null);

            await retrieveDinoByName(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({ error: 'Sorry, there doesnt seem to be a dinosaur matching that name.' }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { params: { name: 'Stegosaurus' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveDinoByName(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occured trying to find a dinosaur matching that name.',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveDinoById', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveDinosaurById');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return dinosaur with id of 1', async function () {
            const req = { params: { id: 1 } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ name: 'Stegosaurus' });

            await retrieveDinoById(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ name: 'Stegosaurus' }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there is no dinosaur matching id', async function () {
            const req = { params: { id: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves(null);

            await retrieveDinoById(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, there doesnt seem to be a dinosaur matching that id.',
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { params: { id: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveDinoById(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occured while retrieving a dinosaur matching the specified id.',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveDinoByDiet', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveDinosaursByDiet');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return dinosaurs with a specific diet', async function () {
            const req = { params: { diet: 'herbivore' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{ name: 'Stegosaurus' }, { name: 'T-Rex' }]);

            await retrieveDinoByDiet(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 2, data: [{ name: 'Stegosaurus' }, { name: 'T-Rex' }] }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no dinosaurs found with a specific diet', async function () {
            const req = { params: { diet: 'this diet does not exist' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: [] });

            await retrieveDinoByDiet(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({ error: "Sorry, there doesn't seem to be any dinosaurs matching that diet." }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { params: { diet: 'herbivore' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveDinoByDiet(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occured while retrieving all dinosaurs matching that diet.',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveDinoByLocomotion', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveDinosaursByLocomotion');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return dinosaurs with a specific locomotion type', async function () {
            const req = { params: { locomotion: 'biped' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}, {}]);

            await retrieveDinoByLocomotion(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 2, data: [{}, {}] }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no dinosaurs found with a specific locomotion type', async function () {
            const req = { params: { locomotion: 'biped' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([]);

            await retrieveDinoByLocomotion(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({
                    error: "Sorry, there doesn't seem to be any dinosaurs matching that locomotion type.",
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { params: { locomotion: 'biped' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveDinoByLocomotion(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occured while retrieving all dinosaurs matching that diet.',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveImageById', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'retrieveImageById');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return dinosaur image with a specific id', async function () {
            const req = { params: { id: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({});

            await retrieveImageById(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(jsonStub.calledWith({}), 'json method was not called with the correct response');
        });

        it('should return status 404 when there is no dinosaur image found with a specific id', async function () {
            const req = { params: { id: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves(null);

            await retrieveImageById(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({ error: 'Sorry, there doesnt seem to be a dinosaur image matching that id.' }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { params: { id: '1' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveImageById(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected occurred while trying to recieve an image matching that id.',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveRandomDinosaurs', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'returnRandomDinosaurs');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return a specific number of random dinosaurs', async function () {
            const req = { params: { count: '5' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}, {}, {}, {}, {}]);

            await retrieveRandomDinosaurs(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({
                    count: 5,
                    data: [{}, {}, {}, {}, {}],
                }),
                'json method was not called with the correct response',
            );
        });

        it('should return 1 dinosaur if no count is provided', async function () {
            const req = { params: { count: undefined } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}]);

            await retrieveRandomDinosaurs(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({
                    count: 1,
                    data: [{}],
                }),
                'json method was not called with the correct response',
            );
        });

        it('should return a max of 10 random dinosaurs if count is greater than 10', async function () {
            const req = { params: { count: '15' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

            await retrieveRandomDinosaurs(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({
                    count: 10,
                    data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { params: { count: '5' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveRandomDinosaurs(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occurred while trying to retrieve a random number of dinosaurs.',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveRandomImages', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'returnRandomImages');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return a specific number of random dinosaur images', async function () {
            const req = { params: { count: '5' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}, {}, {}, {}, {}]);

            await retrieveRandomImages(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 5, data: [{}, {}, {}, {}, {}] }),
                'json method was not called with the correct response',
            );
        });

        it('should return 1 image if no count is provided', async function () {
            const req = { params: { count: undefined } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}]);

            await retrieveRandomImages(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 1, data: [{}] }),
                'json method was not called with the correct response',
            );
        });

        it('should return a max of 10 images if count is greater than 10', async function () {
            const req = { params: { count: '15' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

            await retrieveRandomImages(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 10, data: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { params: { count: '5' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveRandomImages(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({
                    error: 'Sorry, an unexpected error occurred while trying to retrieve a random number of dinosaur images.',
                }),
                'json method was not called with the correct error message',
            );
        });
    });

    describe('retrieveDinosaursByQuery', function () {
        let jsonStub;
        let statusStub;
        let dinosaurServiceStub;
        let loggerStub;

        beforeEach(function () {
            jsonStub = sinon.stub();
            statusStub = sinon.stub().returns({ json: jsonStub });
            dinosaurServiceStub = sinon.stub(dinosaurService, 'returnDinosaursByQuery');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should return dinosaurs matching a specific query', async function () {
            const req = { query: { clade: 'Theropoda', diet: 'carnivore', locomotion: 'biped' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}, {}]);

            await retrieveDinosaursByQuery(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 2, data: [{}, {}] }),
                'json method was not called with the correct response',
            );
        });

        it('should handle clade as an array of strings', async function () {
            const req = { query: { clade: ['Theropoda'], diet: 'carnivore', locomotion: 'biped' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves([{}, {}]);

            await retrieveDinosaursByQuery(req, res);

            assert(statusStub.calledWith(200), 'status method was not called with 200');
            assert(
                jsonStub.calledWith({ count: 2, data: [{}, {}] }),
                'json method was not called with the correct response',
            );
        });

        it('should return status 404 when there are no dinosaurs found matching a specific query', async function () {
            const req = { query: { clade: 'Theropoda', diet: 'carnivore', locomotion: 'biped' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.resolves({ data: [] });

            await retrieveDinosaursByQuery(req, res);

            assert(statusStub.calledWith(404), 'status method was not called with 404');
            assert(
                jsonStub.calledWith({ error: 'Sorry, there doesnt seem to be any dinosaurs matching that query.' }),
                'json method was not called with the correct response',
            );
        });

        it('should handle errors correctly', async function () {
            const req = { query: { clade: 'Theropoda', diet: 'carnivore', locomotion: 'biped' } };
            const res = {};

            res.status = statusStub;
            dinosaurServiceStub.rejects(new Error('Test error'));

            await retrieveDinosaursByQuery(req, res);

            assert(loggerStub.calledOnce, 'logger.error was not called');
            assert(statusStub.calledWith(500), 'status method was not called with 500');
            assert(
                jsonStub.calledWith({ error: 'Sorry, an unexpected error occured while performing that query.' }),
                'json method was not called with the correct error message',
            );
        });
    });
});
