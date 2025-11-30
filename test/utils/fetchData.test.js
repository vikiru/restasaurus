const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('fetchData', function () {
    let fetchStub;
    let fetchData;
    let urls;
    const expectedData = { key: 'value' };

    beforeEach(function () {
        fetchStub = sinon.stub();
        global.fetch = fetchStub;
        const logger = require('../../app/config/logger');
        sinon.stub(logger.logger, 'http').resolves();
        sinon.stub(logger.logger, 'error').resolves();
        const { urlConstructor } = require('../../app/scripts/constructDinoNames');
        urls = urlConstructor(['Stegosaurus'], 'html');
        fetchData = require('../../app/utils/fetchData').fetchData;
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should fetch data when provided a valid url', async function () {
        fetchStub.withArgs(urls[0]).resolves({
            ok: true,
            json: () => Promise.resolve(expectedData),
        });

        const data = await fetchData(urls[0]);
        expect(data).to.deep.equal(expectedData);
    });

    it('should handle fetch errors', async function () {
        const fakeUrl = 'fake url';
        fetchStub.withArgs(fakeUrl).rejects(new Error('Fetch failed'));
        
        try {
            await fetchData(fakeUrl);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('should handle non-ok responses', async function () {
        fetchStub.withArgs(urls[0]).resolves({
            ok: false,
            status: 404,
            json: () => Promise.resolve({}),
        });
        
        try {
            await fetchData(urls[0]);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });
});
