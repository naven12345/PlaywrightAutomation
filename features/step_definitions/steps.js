const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    this.homePage = this.poManager.getHomePage();
    this.cartPage = this.poManager.getCartPage();
    this.orderReviewPage = this.poManager.getOrderReviewPage();
    this.orderHistoryPage = this.poManager.getOrderHistoryPage();

    await loginPage.navigateToURL();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    await this.homePage.addProductToCart(productName);
    await this.homePage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    await this.cartPage.verifyProductIsDisplayed(productName);
    await this.cartPage.clickOnCheckout();
});
When('Enter valid details and place the order', async function () {
    await this.orderReviewPage.searchCountryAndSelect("ind", " India");
    this.id = await this.orderReviewPage.submitAndGetOrderId();
    console.log(this.id);
});
Then('Verify order is present in the order history page', async function () {
    await this.homePage.navigateToMyOrders();
    await this.orderHistoryPage.searchOrderAndSelect(this.id);
    expect(this.id.includes(await this.orderHistoryPage.getOrderId())).toBeTruthy();
});


//------------------------------------------------------------------------------------------

Given('login to application with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    await this.page.locator('#username').fill(username);
    await this.page.locator("[type='password']").fill(password)
    await this.page.locator("[type='submit']").click();
});


Then('verify error message is displayed', async function () {
    let error = this.page.locator("[style*='block']");
    console.log("error message: " + await error.textContent());
    await expect(error).toContainText("Incorrect");
});