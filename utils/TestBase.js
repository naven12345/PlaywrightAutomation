const base = require('@playwright/test');


exports.customTest = base.test.extend(
    {
        testDataForOrder : {
            userName : "selenium@hello.com",
            password : "Rahul@123",
            productName : "ZARA COAT 3",
        }
    }
)