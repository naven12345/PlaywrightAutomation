const {test,expect} = require('@playwright/test');


let webContext;
test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("selenium@hello.com");
    await page.locator("#userPassword").fill("Rahul@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');   
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
}
)

test('end to end flow', async ()=>{

    const productName = "ZARA COAT 3";
    const email = "selenium@hello.com";
    const page =  await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0;i<count;i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const condition = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(condition).toBeTruthy();
    await page.locator("//button[text()='Checkout']").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const dropdown = page.locator("//section[contains(@class,'ta-results')]");
    await dropdown.waitFor();
    const count1 = await dropdown.locator("button").count();
    for(let i=0;i<count1;i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === ' India'){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const id = await page.locator("//tr[@class='ng-star-inserted']//child::label").textContent();
    console.log(id);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i=0;i<await rows.count();i++){
        const rowId = await rows.nth(i).locator("th").textContent();
        if(id.includes(rowId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const detailsOrderId = await page.locator(".col-text").textContent();
    expect(id.includes(detailsOrderId)).toBeTruthy();
}
)

test('new test', async ()=>{

    const productName = "ZARA COAT 3";
    const email = "selenium@hello.com";
    const page =  await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})