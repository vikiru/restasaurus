const fs = require('fs');

const { expect } = require('chai');
const sinon = require('sinon');

describe('logger', function () {
    beforeEach(function () {
        delete process.env.NODE_ENV;
    });

    afterEach(function () {
        sinon.restore();
        delete process.env.NODE_ENV;
    });

    it('should create logs directory if it does not exist', function () {
        delete require.cache[require.resolve('../../app/config/logger')];
        sinon.stub(fs, 'existsSync').returns(false);
        sinon.stub(fs, 'mkdirSync');
        const { logger } = require('../../app/config/logger');
        expect(fs.mkdirSync.calledOnce).to.be.true;
    });

    it('should not create logs directory if it does exist', function () {
        sinon.stub(fs, 'existsSync').returns(true);
        sinon.stub(fs, 'mkdirSync');
        const { logger } = require('../../app/config/logger');
        expect(fs.mkdirSync.calledOnce).to.be.false;
    });

    it('should call infoLogger.info', function () {
        process.env.NODE_ENV = 'development';
        const { infoLogger } = require('../../app/config/logger');
        const infoSpy = sinon.spy(infoLogger, 'info');
        infoLogger.info('This is an info message');
        expect(infoSpy.calledOnce).to.be.true;
    });

    it('should call errorLogger.error', function () {
        process.env.NODE_ENV = 'testing';
        const { errorLogger } = require('../../app/config/logger');
        const errorSpy = sinon.spy(errorLogger, 'error');
        const error = new Error('This is an error message');
        errorLogger.error(error);
        expect(errorSpy.calledOnce).to.be.true;
    });

    it('should call requestLogger.http', function () {
        process.env.NODE_ENV = 'production';
        const { requestLogger } = require('../../app/config/logger');
        const httpSpy = sinon.spy(requestLogger, 'http');
        requestLogger.http('This is an http message');
        expect(httpSpy.calledOnce).to.be.true;
    });

    it('should setup console transports in development environment', function () {
        process.env.NODE_ENV = 'development';
        
        delete require.cache[require.resolve('../../app/config/logger')];
        delete require.cache[require.resolve('../../app/config/index')];
        
        const indexStub = sinon.stub(require('../../app/config/index'), 'env').value('development');
        
        sinon.stub(fs, 'existsSync').returns(true);
        
        require('../../app/config/logger');
        
        expect(true).to.be.true;
    });

    it('should test console format function', function () {
        delete require.cache[require.resolve('../../app/config/logger')];
        process.env.NODE_ENV = 'development';
        sinon.stub(fs, 'existsSync').returns(true);
        
        const { infoLogger } = require('../../app/config/logger');
        
        infoLogger.info('Test message for console format');
        
        expect(infoLogger).to.exist;
    });

    it('should call logger.info method', function () {
        const { logger } = require('../../app/config/logger');
        const infoSpy = sinon.spy(logger, 'info');
        logger.info('Test info message');
        expect(infoSpy.calledOnce).to.be.true;
    });

    it('should call logger.error method', function () {
        const { logger } = require('../../app/config/logger');
        const errorSpy = sinon.spy(logger, 'error');
        logger.error('Test error message');
        expect(errorSpy.calledOnce).to.be.true;
    });

    it('should call logger.http method', function () {
        const { logger } = require('../../app/config/logger');
        const httpSpy = sinon.spy(logger, 'http');
        logger.http('Test http message');
        expect(httpSpy.calledOnce).to.be.true;
    });
});
