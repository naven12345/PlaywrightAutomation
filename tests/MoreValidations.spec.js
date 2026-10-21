const {test,expect} = require('@playwright/test');

test.describe.configure({mode:'parallel'})

test("popup validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goBack();
    // await page.locator("https://www.google.com/");
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href='lifetime-access']:visible").click();
    const subscribers = await framePage.locator(".text h2 span").textContent();
    console.log(subscribers);
})

test("screenshot and visual validations", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test('visual compare',async({page})=>{
    await page.goto("https://udaan.com/");
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png');
})