const { expect } = require('chai');
const mongoose = require('mongoose');
const sinon = require('sinon');

describe('mongoData', function () {
    describe('connect', function () {
        let connectStub;
        let infoLogStub;
        let errorLogStub;

        beforeEach(function () {
            process.env.NODE_ENV = 'testing';
            const { logger } = require('../../app/config/logger');
            connectStub = sinon.stub(mongoose, 'connect');
            infoLogStub = sinon.stub(logger, 'info').resolves();
            errorLogStub = sinon.stub(logger, 'error').resolves();
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should connect to the database and log a success message', async function () {
            const { connect } = require('../../app/data/mongoData');
            connectStub.resolves();

            const result = await connect();

            expect(result).to.be.ok;
            expect(infoLogStub.calledOnce).to.be.true;
            expect(infoLogStub.calledWith('Successfully connected to the MongoDB database.')).to.be.true;
        });

        it('should log an error message if the connection fails', async function () {
            const { connect } = require('../../app/data/mongoData');
            const error = new Error('Connection failed');
            connectStub.rejects(error);

            try {
                await connect();
                expect.fail('connect() should have thrown an error');
            } catch (err) {
                expect(err).to.equal(error);
                expect(errorLogStub.calledOnce).to.be.true;
                expect(errorLogStub.calledWith("Failed to connect to MongoDB database:", error.message)).to.be.true;
            }
        });
    });

    describe('disconnect', function () {
        let disconnectStub;
        let infoLogStub;
        let errorLogStub;

        beforeEach(function () {
            process.env.NODE_ENV = 'testing';
            const { logger } = require('../../app/config/logger');
            disconnectStub = sinon.stub(mongoose, 'disconnect');
            infoLogStub = sinon.stub(logger, 'info').resolves();
            errorLogStub = sinon.stub(logger, 'error').resolves();
        });

        afterEach(function () {
            sinon.restore();
        });

        it('should disconnect from the database and log a success message', async function () {
            const { disconnect } = require('../../app/data/mongoData');

            disconnectStub.resolves();

            await disconnect();

            expect(infoLogStub.calledOnce).to.be.true;
            expect(infoLogStub.calledWith('Successfully disconnected from the MongoDB database.')).to.be.true;
        });

        it('should log an error message if the disconnection fails', async function () {
            const { disconnect } = require('../../app/data/mongoData');
            const error = new Error('Disconnection failed');
            disconnectStub.rejects(error);

            await disconnect();

            expect(errorLogStub.calledOnce).to.be.true;
            expect(errorLogStub.calledWith(error)).to.be.true;
        });
    });
});
