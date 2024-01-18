const sinon = require('sinon');
const { expect } = require('chai');
const { infoLogger, errorLogger, requestLogger } = require('../../app/config/logger');

describe('logger', function () {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call infoLogger.info', function () {
        const infoSpy = sandbox.spy(infoLogger, 'info');
        infoLogger.info('This is an info message');
        expect(infoSpy.calledOnce).to.be.true;
    });

    it('should call errorLogger.error', function () {
        const errorSpy = sandbox.spy(errorLogger, 'error');
        const error = new Error('This is an error message');
        errorLogger.error(error);
        expect(errorSpy.calledOnce).to.be.true;
    });

    it('should call requestLogger.http', function () {
        const httpSpy = sandbox.spy(requestLogger, 'http');
        requestLogger.http('This is an http message');
        expect(httpSpy.calledOnce).to.be.true;
    });
});
