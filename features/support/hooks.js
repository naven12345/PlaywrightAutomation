const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');
const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');


Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

After(async function(){
    console.log("execute after browser closed");
})

AfterStep(async function({result}){
    if(result.status===Status.FAILED){
        await this.page.screenshot({path:'failedScreenshot.png'});
    }
})