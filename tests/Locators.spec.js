const {test,expect} = require('@playwright/test');

test('@Web playwright locators', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("hello");
    await page.getByRole("button",{name:'Submit'}).click();
    //await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10000}); //step level wait

    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
})

test('test level assertion timeout', async ({page})=>{
    test.setTimeout(60000);
    const customExpect = expect.configure({timeout:9000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("hello");
    await page.getByRole("button",{name:'Submit'}).click();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link",{name:"Shop"}).click();
    await expect(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
})