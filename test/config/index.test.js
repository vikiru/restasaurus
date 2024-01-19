const { expect } = require('chai');

describe('config', () => {
    beforeEach(() => {
        delete require.cache[require.resolve('../../app/config/index')];
    });

    afterEach(() => {
        delete process.env.NODE_ENV;
        delete process.env.PORT;
    });

    it('should have values for every property in config', () => {
        const config = require('../../app/config/index');
        for (const property of Object.values(config)) {
            expect(property).to.not.equal('');
        }
    });

    it('should use the default values if no value provided in config', () => {
        process.env.NODE_ENV = '';
        process.env.PORT = '';

        const config = require('../../app/config/index');
        for (const property of Object.values(config)) {
            expect(property).to.not.equal('');
        }
    });
});
