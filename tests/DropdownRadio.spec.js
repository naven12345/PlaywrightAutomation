const {test,expect} = require('@playwright/test');


test('@Web products test',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("[type='submit']");
    const documentLink = page.locator("[href*='documents-request']");

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Consultant");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText")
    //await page.pause();
});

test('window handle test',async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const username = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    let text = await newPage.locator(".red").textContent();
    console.log(text);
    let arrayText = text.split("@");
    let domain = arrayText[1].split(" ")[0];
    console.log("domain: "+domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});