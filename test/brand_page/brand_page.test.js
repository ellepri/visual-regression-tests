const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const utilities = require('../utilities');

const customConfig = { threshold: 0.5 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customDiffConfig: customConfig,
    noColors: false,
});
expect.extend({ toMatchImageSnapshot });

beforeEach(() => {
    jest.setTimeout(100000);
});

describe('Brand page', () => {
    it('1 - different content under map', async () => {
        await page.goto(utilities.baseUrl + '/programmes/b006qpgr', { waitUntil: 'networkidle2' });
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['.footer__recommendations', '#edr_lwrap_first', '.footer__service', '#cookiePrompt', '.on-air-panel']);
        const image = await utilities.screenshotDOMElement('.br-container');
        expect(image).toMatchImageSnapshot();
    });
});
