import { expect,Locator, Page } from "@playwright/test";


export class CartPage{

    page:Page;
    checkoutIcon:Locator;


    constructor(page:Page){
        this.page = page;
        this.checkoutIcon = page.locator("//button[text()='Checkout']");
    }

    async verifyProductIsDisplayed(productName:string){
        const condition = await this.getProductLocator(productName).isVisible();
        expect(condition).toBeTruthy();
    }

    async clickOnCheckout(){
        await this.checkoutIcon.click();
    }

    getProductLocator(productName:string){
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports = {CartPage};