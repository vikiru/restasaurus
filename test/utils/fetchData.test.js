const { expect } = require('chai');
const sinon = require('sinon');

const { urlConstructor } = require('../../app/scripts/constructDinoNames');

describe('fetchData', function () {
    let fetchStub;
    const urls = urlConstructor(['Stegosaurus']);
    const url = urls[0];
    const expectedData = { key: 'value' };

    beforeEach(function () {
        fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(function () {
        fetchStub.restore();
    });

    it('should fetch data when provided a valid url', async function () {
        fetchStub.withArgs(url).resolves({
            ok: true,
            json: () => Promise.resolve(expectedData),
        });
        const { fetchData } = require('../../app/utils/fetchData');

        const data = await fetchData(url);
        expect(data).to.deep.equal(expectedData);
    });

    it('should handle fetch errors', async function () {
        const fakeUrl = 'fake url';
        fetchStub.withArgs(fakeUrl).rejects(new Error('Fetch failed'));
        const { fetchData } = require('../../app/utils/fetchData');
        try {
            const data = await fetchData(fakeUrl);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });

    it('should handle non-ok responses', async function () {
        fetchStub.withArgs(url).resolves({
            ok: false,
            status: 404,
            json: () => Promise.resolve({}),
        });
        const { fetchData } = require('../../app/utils/fetchData');
        try {
            const data = await fetchData(url);
        } catch (err) {
            expect(err).to.be.an('error');
        }
    });
});
