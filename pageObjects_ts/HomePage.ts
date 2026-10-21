import { Locator, Page } from "@playwright/test";

export class HomePage{

    page:Page;
    products:Locator;
    titlesText:Locator;
    cartIcon:Locator;
    firstProduct:Locator;
    myOrders:Locator;


    constructor(page:Page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.titlesText = page.locator(".card-body b");
        this.cartIcon = page.locator("[routerlink*='cart']");
        this.firstProduct = page.locator("div li").first();
        this.myOrders = page.locator("button[routerlink*='myorders']");
    }

    async addProductToCart(productName:string){
        const titles = await this.titlesText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for(let i=0;i<count;i++){
            if(await this.products.nth(i).locator("b").textContent() === productName){
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cartIcon.click();
        await this.firstProduct.waitFor();
    }

    async navigateToMyOrders(){
        await this.myOrders.click();
    }
}

module.exports = {HomePage};