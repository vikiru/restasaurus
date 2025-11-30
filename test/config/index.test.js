const { expect } = require('chai');
const sinon = require('sinon');

describe('config', function () {
    let dotenvStub;
    let mongooseConnectStub;

    beforeEach(function () {
        
        dotenvStub = sinon.stub(require('dotenv'), 'config');
        mongooseConnectStub = sinon.stub(require('mongoose'), 'connect');
    });

    afterEach(function () {
        dotenvStub.restore();
        mongooseConnectStub.restore();
        delete process.env.NODE_ENV;
        delete process.env.PORT;
        delete process.env.MONGODB_URI;
    });

    it('should have values for every property in config', function () {
        const config = require('../../app/config/index');
        for (const property of Object.values(config)) {
            expect(property).to.not.equal('');
        }
    });

    it('should use the default values if no value provided in config', function () {
        process.env.NODE_ENV = '';
        process.env.PORT = '';

        const config = require('../../app/config/index');
        for (const property of Object.values(config)) {
            expect(property).to.not.equal('');
        }
    });

    it('should use default development environment when NODE_ENV is undefined', function () {
        delete require.cache[require.resolve('../../app/config/index')];
        
        delete process.env.NODE_ENV;
        
        const config = require('../../app/config/index');
        expect(config.env).to.equal('development');
    });

    it('should use default port 3000 when PORT is undefined', function () {
        delete require.cache[require.resolve('../../app/config/index')];
        
        delete process.env.PORT;
        
        const config = require('../../app/config/index');
        expect(config.port).to.equal(3000);
    });

    it('should use default values when both NODE_ENV and PORT are undefined', function () {
        delete require.cache[require.resolve('../../app/config/index')];
        
        delete process.env.NODE_ENV;
        delete process.env.PORT;
        
        const config = require('../../app/config/index');
        expect(config.env).to.equal('development');
        expect(config.port).to.equal(3000);
    });
});
