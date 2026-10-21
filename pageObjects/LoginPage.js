class LoginPage{

    constructor(page){
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInBtn = page.locator("[value='Login']");
    }


    async navigateToURL(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName,password){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};