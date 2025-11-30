const { expect } = require('chai');
const sinon = require('sinon');

describe('config', function () {
    let dotenvStub;
    let mongooseConnectStub;

    beforeEach(function () {
        delete require.cache[require.resolve('../../app/config/index')];
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
        process.env.MONGODB_URI = 'mongodb://localhost:27017/restasaurus';
        const config = require('../../app/config/index');
        for (const property of Object.values(config)) {
            expect(property).to.not.equal('');
        }
    });

    it('should use the default values if no value provided in config', function () {
        process.env.NODE_ENV = '';
        process.env.PORT = '';
        process.env.MONGODB_URI = 'mongodb://localhost:27017/restasaurus';

        const config = require('../../app/config/index');
        for (const property of Object.values(config)) {
            expect(property).to.not.equal('');
        }
    });

    it('should throw error when MONGODB_URI is not set', function () {
        delete process.env.MONGODB_URI;        
        expect(() => {
            delete require.cache[require.resolve('../../app/config/index')];
            require('../../app/config/index');
        }).to.throw('MONGODB_URI environment variable is not set. Please configure your .env file.');
    });
});
