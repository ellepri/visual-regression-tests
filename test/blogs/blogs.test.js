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

describe('Blogs', () => {
    it('1 - Blogs main homepage', async () => {
        await page.goto(utilities.baseUrl + '/blogs', { waitUntil: 'networkidle2' });       
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['#orb-footer', '#cookiePrompt', '#edr_lwrap_first']);     
        const image = await page.screenshot({ fullPage: true });
        expect(image).toMatchImageSnapshot();
    });

    it('2 - The Archers', async () => {
        await page.goto(utilities.baseUrl + '/blogs/thearchers/entries/cdb869f9-ff36-4180-992c-2ecf5346bd55', { waitUntil: 'networkidle2' }); 
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['#orb-footer', '#cookiePrompt', '#edr_lwrap_first', '.on-air-panel']);            
        const image = await page.screenshot({ fullPage: true });
        expect(image).toMatchImageSnapshot();
    });

    it('3 - post page', async () => {
        await page.goto(utilities.baseUrl + '/blogs/aboutthebbc/entries/6551c5ee-959b-459a-b22d-0c3a2882228a', { waitUntil: 'networkidle2' });      
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['#orb-footer', '#cookiePrompt', '#edr_lwrap_first']);  
        const image = await page.screenshot({ fullPage: true });
        expect(image).toMatchImageSnapshot();
    });

    it('4 - see all authors page', async () => {
        await page.goto(utilities.baseUrl + '/blogs/aboutthebbc/authors', { waitUntil: 'networkidle2' });        
        await utilities.scrollPageForLazyLoading();
        await utilities.removeElements(['#orb-footer', '#cookiePrompt', '#edr_lwrap_first']);  
        const image = await page.screenshot({ fullPage: true });
        expect(image).toMatchImageSnapshot();
    });
});