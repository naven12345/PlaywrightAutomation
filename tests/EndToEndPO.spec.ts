import {test,expect} from '@playwright/test';
import {customTest} from '../utils_ts/TestBase';
import {POManager} from '../pageObjects_ts/POManager';
import testData from '../utils/PlaceOrderTestData.json';

for(const data of testData){
    test(`end to end flow for product ${data.productName}`, async ({page})=>{
    
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();
    const orderReviewPage = poManager.getOrderReviewPage();
    const orderHistoryPage = poManager.getOrderHistoryPage();

    await loginPage.navigateToURL();
    await loginPage.validLogin(data.userName,data.password);
    await homePage.addProductToCart(data.productName);
    await homePage.navigateToCart();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.clickOnCheckout();
    await orderReviewPage.searchCountryAndSelect("ind"," India");
    let id:any;
    id = await orderReviewPage.submitAndGetOrderId();
    console.log(id);
    await homePage.navigateToMyOrders();
    await orderHistoryPage.searchOrderAndSelect(id);
    expect(id.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
})
}

customTest('end to end flow1', async ({page,testDataForOrder})=>{
    
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();

    await loginPage.navigateToURL();
    await loginPage.validLogin(testDataForOrder.userName,testDataForOrder.password);
    await homePage.addProductToCart(testDataForOrder.productName);
    await homePage.navigateToCart();
})
