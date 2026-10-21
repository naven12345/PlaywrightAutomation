const {test,expect} = require('@playwright/test');

test('browser context test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await page.locator('#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning")
    await page.locator("[type='submit']").click();
    let error = page.locator("[style*='block']");
    console.log("error message: "+await error.textContent());
    await expect(error).toContainText("Incorrect");
});

test('@Web products test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("[type='submit']");

    await username.fill("rahulshetty");
    await password.fill("learning")
    await signIn.click();
    let error = page.locator("[style*='block']");
    console.log("error message: "+await error.textContent());
    await expect(error).toContainText("Incorrect");

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
});

test('Ecommerce products test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());
    const email = page.locator('#userEmail');
    const password = page.locator("#userPassword");
    const login = page.locator("#login");

    await email.fill("selenium@hello.com");
    await password.fill("Rahul@123")
    await login.click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());
});

test('page test',async({page})=>{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});