const sinon = require('sinon');
const sinonTest = require('sinon-test');
const { expect } = require('chai');
const { constructUrls } = require('../../app/utils/handleSetup');
const { fetchData } = require('../../app/utils/fetchData');

const test = sinonTest(sinon);

describe('fetchData', async function () {
    const fetchStub = sinon.stub(global, 'fetch');
    const urls = constructUrls(['Stegosaurus']);
    const url = urls[0];
    const expectedData = { key: 'value' };

    it(
        'should fetch data when provided a valid url',
        test(async function () {
            fetchStub.withArgs(url).resolves({
                ok: true,
                json: () => Promise.resolve(expectedData),
            });
            const data = await fetchData(url);
            expect(data).to.deep.equal(expectedData);
        }),
    );

    it(
        'should handle fetch errors',
        test(async function () {
            const fakeUrl = 'fake url';
            fetchStub.withArgs(fakeUrl).rejects(new Error('Fetch failed'));
            const data = await fetchData(fakeUrl);
            expect(data).to.be.undefined;
        }),
    );

    it(
        'should handle non-ok responses',
        test(async function () {
            fetchStub.withArgs(url).resolves({
                ok: false,
                status: 404,
                json: () => Promise.resolve({}),
            });
            const data = await fetchData(url);
            expect(data).to.be.undefined;
        }),
    );
});
