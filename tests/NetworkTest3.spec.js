const {test,expect} = require('@playwright/test');


test('abort network calls test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
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

test('get network calls test',async ({browser})=>{
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
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
});