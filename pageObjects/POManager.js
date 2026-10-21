const {LoginPage} = require('./LoginPage');
const {HomePage} = require('./HomePage');
const {CartPage} = require('./CartPage');
const {OrderReviewPage} = require('./OrderReviewPage');
const {OrderHistoryPage} = require('./OrderHistoryPage');

class POManager{


    constructor(page){
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