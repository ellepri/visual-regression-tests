module.exports = {
    launch: {
        defaultViewport: {
            width: 1500,
            height: 1000
        },
        args: [`--window-size=1500,1000`],
        //slowMo: 250,
        headless: true,
        devtools: false
    },
    exitOnPageError: false,
    browserContext: 'default', //incognito
}