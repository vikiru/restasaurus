const sinon = require('sinon');
const { expect } = require('chai');

describe('logger', function () {
    let sandbox;
    beforeEach(() => {
        delete require.cache[require.resolve('../../app/config/logger')];
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call infoLogger.info', function () {
        process.env.NODE_ENV = 'development';
        const { infoLogger } = require('../../app/config/logger');
        const infoSpy = sandbox.spy(infoLogger, 'info');
        infoLogger.info('This is an info message');
        expect(infoSpy.calledOnce).to.be.true;
    });

    it('should call errorLogger.error', function () {
        process.env.NODE_ENV = 'testing';
        const { errorLogger } = require('../../app/config/logger');
        const errorSpy = sandbox.spy(errorLogger, 'error');
        const error = new Error('This is an error message');
        errorLogger.error(error);
        expect(errorSpy.calledOnce).to.be.true;
    });

    it('should call requestLogger.http', function () {
        process.env.NODE_ENV = 'production';
        const { requestLogger } = require('../../app/config/logger');
        const httpSpy = sandbox.spy(requestLogger, 'http');
        requestLogger.http('This is an http message');
        expect(httpSpy.calledOnce).to.be.true;
    });
});
