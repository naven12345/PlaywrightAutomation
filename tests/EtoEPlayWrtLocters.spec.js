const {test,expect} = require('@playwright/test');

test('@Web end to end flow', async ({page})=>{

    const productName = "ZARA COAT 3";
    const email = "selenium@hello.com";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("selenium@hello.com");
    await page.getByPlaceholder("enter your passsword").fill("Rahul@123");
    await page.getByRole("button",{name:'Login'}).click();
    await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name:'Checkout'}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});

    await page.getByRole("button",{name:'India'}).nth(1).click();

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const value = await page.locator("//tr[@class='ng-star-inserted']//child::label").textContent();
    const id = value.split(" ")[2];
    console.log(id);
    await page.getByRole("button",{name:"  ORDERS"}).click();
    await page.locator("tbody").waitFor();
    await page.locator("tbody tr").filter({hasText:id}).getByRole("button",{name:'View'}).click();
    await expect(page.getByText(id)).toBeVisible();
}
)