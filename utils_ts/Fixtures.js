const base = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');
const {request} = require('@playwright/test');
const payload = {"userEmail":"selenium@hello.com","userPassword":"Rahul@123"};
const orderPayload = {orders:[{country:"QA",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend({
    authenticatePage: async({browser},use)=>{
    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("selenium@hello.com");
    await page.locator("#userPassword").fill("Rahul@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await use(page);
    //teardown
    await context.close();
    },

    createOrder: async({},use)=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,payload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    //teardown
    await apiContext.dispose();
    },

    testData:{
        name:  'user'
    }
})