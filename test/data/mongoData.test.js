const { expect } = require('chai');
const mongoose = require('mongoose');
const sinon = require('sinon');

describe('connect', function () {
    let connectStub;
    let infoLogSpy;
    let errorLogSpy;

    beforeEach(function () {
        process.env.NODE_ENV = 'testing';
        const { logger } = require('../../app/config/logger');
        connectStub = sinon.stub(mongoose, 'connect');
        infoLogSpy = sinon.spy(logger, 'info');
        errorLogSpy = sinon.spy(logger, 'error');
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should connect to the database and log a success message', async function () {
        const { connect } = require('../../app/data/mongoData');
        connectStub.resolves();

        const result = await connect();

        expect(result).to.be.ok;
        expect(infoLogSpy.calledOnce).to.be.true;
        expect(infoLogSpy.calledWith('Successfully connected to the MongoDB database.')).to.be.true;
    });

    it('should log an error message if the connection fails', async function () {
        const { connect } = require('../../app/data/mongoData');
        const error = new Error('Connection failed');
        connectStub.rejects(error);

        await connect();

        expect(errorLogSpy.calledOnce).to.be.true;
        expect(errorLogSpy.calledWith(error)).to.be.true;
    });
});

describe('disconnect', function () {
    let disconnectStub;
    let infoLogSpy;
    let errorLogSpy;

    beforeEach(function () {
        process.env.NODE_ENV = 'testing';
        const { logger } = require('../../app/config/logger');
        disconnectStub = sinon.stub(mongoose, 'disconnect');
        infoLogSpy = sinon.spy(logger, 'info');
        errorLogSpy = sinon.spy(logger, 'error');
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should disconnect from the database and log a success message', async function () {
        const { disconnect } = require('../../app/data/mongoData');

        disconnectStub.resolves();

        await disconnect();

        expect(infoLogSpy.calledOnce).to.be.true;
        expect(infoLogSpy.calledWith('Successfully disconnected from the MongoDB database.')).to.be.true;
    });

    it('should log an error message if the disconnection fails', async function () {
        const { disconnect } = require('../../app/data/mongoData');
        const error = new Error('Disconnection failed');
        disconnectStub.rejects(error);

        await disconnect();

        expect(errorLogSpy.calledOnce).to.be.true;
        expect(errorLogSpy.calledWith(error)).to.be.true;
    });
});
