const {expect} = require('@playwright/test');

class CartPage{

    constructor(page){
        this.page = page;
        this.checkoutIcon = page.locator("//button[text()='Checkout']");
    }

    async verifyProductIsDisplayed(productName){
        const condition = await this.getProductLocator(productName).isVisible();
        expect(condition).toBeTruthy();
    }

    async clickOnCheckout(){
        await this.checkoutIcon.click();
    }

    getProductLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports = {CartPage};