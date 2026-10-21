import {LoginPage} from './LoginPage';
import {HomePage} from './HomePage';
import {CartPage} from './CartPage';
import {OrderReviewPage} from './OrderReviewPage';
import {OrderHistoryPage} from './OrderHistoryPage';
import {Page} from '@playwright/test';
export class POManager{

    loginPage : LoginPage;
    homePage : HomePage;
    cartPage : CartPage;
    orderReviewPage : OrderReviewPage;
    orderHistoryPage : OrderHistoryPage;
    page : Page;

    constructor(page:Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getHomePage(){
        return this.homePage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getOrderReviewPage(){
        return this.orderReviewPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }
}
module.exports = {POManager};