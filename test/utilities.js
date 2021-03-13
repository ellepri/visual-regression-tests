module.exports = {

    baseUrl: 'https://www.bbc.co.uk',

    removeElements: async function(elements) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
    
            if (await page.$(element) != null) {
                await page.evaluate(element => {
                    const child = document.querySelector(element);
                    child.parentNode.removeChild(child);
                }, element);
            }
        }
    },
    
    screenshotDOMElement: async function(selector, padding = 0) {
        const rect = await page.evaluate(selector => {
            const element = document.querySelector(selector);
            const { x, y, width, height } = element.getBoundingClientRect();
    
            return { left: x, top: y, width, height, id: element.id };
        }, selector);
    
        if (!rect)
            throw error('Could not find element that matches selector: ${selector}.');
    
        return await page.screenshot({
            //path: 'element.png',
            clip: {
                x: rect.left - padding,
                y: rect.top - padding,
                width: rect.width + padding * 2,
                height: rect.height + padding * 2
            }
        });
    },
    
    scrollPageForLazyLoading: async function() {
        const bodyHandle = await page.$('body');
        const { height } = await bodyHandle.boundingBox();
        await bodyHandle.dispose();
    
        const viewportHeight = page.viewport().height;
        let viewportIncr = 0;
    
        while (viewportIncr + viewportHeight < (height * 2)) {
            await page.evaluate(_viewportHeight => {
                window.scrollBy(0, _viewportHeight);
            }, viewportHeight);
            await page.waitFor(700);
            viewportIncr = viewportIncr + viewportHeight;
        }

        await page.evaluate(() => {
            window.scrollTo(0, -document.body.scrollHeight);
        });
    }
}
