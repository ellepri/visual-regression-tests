module.exports = {
    preset: 'jest-puppeteer',
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    //testEnvironment: 'jest-environment-puppeteer'
}