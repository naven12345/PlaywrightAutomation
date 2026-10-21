const excelJs = require('exceljs');
const {test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

async function excelWriteTest(searchText,replaceValue,change,filePath){
    
    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await excelReadTest(worksheet,searchText)

    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replaceValue;
    await workbook.xlsx.writeFile(filePath);
}


async function excelReadTest(worksheet,searchText){
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber)=>
        {
        row.eachCell((cell,colNumber)=>
            {
            if(cell.value===searchText){
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}

//excelWriteTest("Banana",500,{rowChange:0,colChange:2},"C:/Users/NAVEEN/Downloads/JsExcelTestData.xlsx");

test('Excel validation upload and download',async({page})=>{
    const textSearch = "Banana";
    const updatedValue = "500";
    await page.goto("https://rahulshettyacademy.com/upload-download-test");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    const download = await downloadPromise;
    const filePath = "C:/Users/NAVEEN/Downloads/download.xlsx";
    await download.saveAs(filePath);
    excelWriteTest("Banana",500,{rowChange:0,colChange:2},filePath);
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(filePath);
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has:textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);
})