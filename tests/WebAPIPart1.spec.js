const {test, expect, request } = require("@playwright/test");
const {APIUtils} = require('../utils/APIUtils');
const payload = {"userEmail":"selenium@hello.com","userPassword":"Rahul@123"};
const orderPayload = {orders:[{country:"QA",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;
test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,payload);
    response = await apiUtils.createOrder(orderPayload);
})


test('end to end flow', async ({page})=>{

    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);


    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i=0;i<await rows.count();i++){
        const rowId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const detailsOrderId = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(detailsOrderId)).toBeTruthy();
})