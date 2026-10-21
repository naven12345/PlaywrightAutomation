const {expect} = require('@playwright/test');
const {customtest} = require('../utils/Fixtures.js');

customtest('Fixtures demo',async({authenticatePage,createOrder,testData})=>{
    await authenticatePage.goto("https://rahulshettyacademy.com/client");
    await authenticatePage.locator("button[routerlink*='myorders']").click();
    await authenticatePage.locator("tbody").waitFor();
    await expect(authenticatePage.getByText(createOrder.orderId)).toBeVisible();

    console.log(testData.name);
})