const {expect} = require('@playwright/test');
class OrderReviewPage {

    constructor(page) {
        this.page = page;
        this.searchCountry = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator("//section[contains(@class,'ta-results')]");
        this.userEmail = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderSubmitText = page.locator(".hero-primary");
        this.orderId = page.locator("//tr[@class='ng-star-inserted']//child::label");
    }

    async searchCountryAndSelect(countryCode, countryName) {
        await this.searchCountry.pressSequentially(countryCode, { delay: 100 });
        await this.countryDropdown.waitFor();
        const count1 = await this.countryDropdown.locator("button").count();
        for (let i = 0; i < count1; i++) {
            const text = await this.countryDropdown.locator("button").nth(i).textContent();
            if (text === countryName) {
                await this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async submitAndGetOrderId() {
        expect(this.userEmail).toHaveText("selenium@hello.com");
        await this.submit.click();
        expect(this.orderSubmitText).toHaveText("Thankyou for the order.");
        const id = await this.orderId.textContent();
        return id;
    }
}
module.exports = { OrderReviewPage };