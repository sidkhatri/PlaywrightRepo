const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test',async ({page}) =>{ 

    await page.goto("https://www.amazon.com"); //goes to the URL
    console.log(await page.title()); 
    const searchBox = page.locator("#twotabsearchtextbox");
    const searchButton = page.locator("#nav-search-submit-button"); 
    const searchResults = page.locator("//span[contains(text(),'Waterman Graduate Allure Fountain Pen, Blue Lacque')]");
    //const searchDropDown = page.locator(".discover-textnav-pill div"[2]);
    
    const filterSelect = page.locator("//body[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[3]/span[1]/div[1]/div[1]/div[1]/div[4]/ul[1]/li[2]/span[1]/a[1]/div[1]/label[1]/i[1]");
    //const filterSelectResult = page.locator("//body[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[3]/span[1]/div[1]/div[1]/div[1]/div[2]/ul[1]/li[2]/span[1]/a[1]/div[1]/label[1]/i[1]");
    await searchBox.fill("fountain pen starter kit");
    await searchButton.click(); 
    await filterSelect.click(); 
    //console.log(expect ((await filterSelectResult.isChecked())));

    //await page.waitForLoadState('networkidle');
    //await Promise.all(
    //    [ 
          //page.waitForLoadState('networkidle'),
      //      page.waitForNavigation(), 
             //wait for navigation to be present
        //   searchButton.click(),]
    //);
    page.pause(); 

    console.log(await searchResults.allTextContents());
    //expect (await page.locator("//span[contains(text(),'Waterman Graduate Allure Fountain Pen, Blue Lacque')]")).toContainText('Waterman');
    //console.log(await searchResults.nth(2).textContent());

    
    page.pause(); 

    await searchResults.click(); 
    page.pause(); 











});