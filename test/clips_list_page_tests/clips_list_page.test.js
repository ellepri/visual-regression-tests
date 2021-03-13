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

describe('Clips list page', () => {
    it('1', async () => {
        await page.goto(utilities.baseUrl + '/programmes/b006q2x0/clips', { waitUntil: 'networkidle2' });
        await page.click('.br-box-subtle');
        await page.waitFor(700);
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['.footer__recommendations', '#edr_lwrap_first', '.footer__service', '#cookiePrompt']);
        const image = await utilities.screenshotDOMElement('.br-container');
        expect(image).toMatchImageSnapshot();
    });

    it('2', async () => {
        await page.goto(utilities.baseUrl + '/programmes/b07c9m1x/clips', { waitUntil: 'networkidle2' });
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['.footer__recommendations', '#edr_lwrap_first', '.footer__service', '#cookiePrompt', '.on-air-panel']);
        const image = await utilities.screenshotDOMElement('.br-container');
        expect(image).toMatchImageSnapshot();
    });

    it('3', async () => {
        await page.goto(utilities.baseUrl + '/programmes/b09g8t0d/clips', { waitUntil: 'networkidle2' });
        await page.click('.ml__button--dropdown');
        await page.hover('.br-masthead__masterbrand');
        await page.waitFor(700);
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['.footer__recommendations', '#edr_lwrap_first', '.footer__service', '#cookiePrompt']);
        const image = await utilities.screenshotDOMElement('.br-container');
        expect(image).toMatchImageSnapshot();
    });
});
