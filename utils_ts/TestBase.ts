import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    userName: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
    {
        testDataForOrder : {
            userName : "selenium@hello.com",
            password : "Rahul@123",
            productName : "ZARA COAT 3",
        }
    }
)