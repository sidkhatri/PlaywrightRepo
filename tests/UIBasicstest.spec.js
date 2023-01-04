const {test, expect} = require('@playwright/test');


test('Browser Context Playwright Test',async ({browser}) =>{
//playwright code 
//page is default global
//step1
//step2
//step3
//await will only work if the entire function is declared as async
//must have awaits in your code to ensure that code is executed in order written (as JS is asynchrnous by default)
// '=>' allows for the creation of an anonymous function 
//wrap browser in curly braces to recognize it as a playwright fixture;  in general fixtures are global variables that are available 
//across your entire project

//chrome -- plugins / cookies
//both context and page are created automatically for you by playwright if you just want to open a page in a browser 
//usually just do page.goto if there is no context info entered only if you have browser,page declared above
const context = await browser.newContext();  //only allows for new context Browser

const page = await context.newPage(); //creates a page to automate
const userName = page.locator('#username');
const password = page.locator("[type='password']");
const signInBtn = page.locator('#signInBtn');
const cardTitles = page.locator(".card-body a");

await page.goto("https://rahulshettyacademy.com/loginpagePractise"); //goes to the URL
console.log(await page.title()); 
//supports css and xpath but cssselector is preferred 
await userName.type("rahulshetty");
await password.type("learning");
//race condition -- try to execute steps out of order 
await Promise.all(
    [ 
        page.waitForNavigation(), 
         //wait for navigation to be present
        signInBtn.click(),]
);

console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //since it's containText partial string is enough

//locator method will intelligently wait and you don't need to put an explicit wait 
//type -- fill method to enter text into field
//you can use fill to clear 

await userName.fill("");
await userName.fill("rahulshettyacademy"); 
await password.fill("learning"); 
await signInBtn.click(); 
//console.log(await page.locator("//a[contains(text(),'iphone X')]").textContent());
//await expect(page.locator("//a[contains(text(), 'iphone X')]")).toContainText('iphone');
console.log(await cardTitles.nth(0).textContent());
console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents(); 
console.log(allTitles);
console.log(allTitles[0]);
await expect(allTitles).toContain(allTitles[3]);


});

test('UI Controls Test',async ({page}) =>{
 
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const dropDown = page.locator("select.form-control");
    const radioBtn = page.locator(".radiotextsty").last();
    const okPopup = page.locator("#okayBtn");
    const terms = page.locator("#terms");
    const blinkText = page.locator("[href*='documents-request']"); 


await page.goto("https://rahulshettyacademy.com/loginpagePractise"); //goes to the URL
console.log(await page.title()); 
//supports css and xpath but cssselector is preferred 
await userName.type("rahulshettyacademy");
await password.type("learning");
await dropDown.selectOption("consult"); 
await radioBtn.click(); //this will click on User radio button
await okPopup.click();  
await expect(radioBtn).toBeChecked(); 
await terms.click(); 
await expect(terms).toBeChecked(); 
await terms.uncheck(); //uncheck a selected checkbox special playwright method
expect(await terms.isChecked()).toBeFalsy();  //expect the terms checkbox to be return as unchecked or false.  
await expect(blinkText).toHaveAttribute("class", "blinkingText"); 
//await page.pause(); //this will open inspector so you can see the dropdown optiom being selected before browser closes;  This will pause your test

//await keyword is used on inside or outside depending on where the action is being performed on an element
    
    
    });

    test('Child Windows Test',async ({browser}) =>{ 

        const context = await browser.newContext();  //only allows for new context Browser
        const page = await context.newPage(); //creates a page to automate
        await page.goto("https://rahulshettyacademy.com/loginpagePractise");
        const userName = page.locator('#username');
        const blinkText = page.locator("[href*='documents-request']");    
        
       const [newPage] =await Promise.all([

        context.waitForEvent('page'),  //this lets playwright know that new page will open before clicking on link  
        blinkText.click(),

        ]);
         var text =await newPage.locator(".red").textContent(); 
        const textArray = text.split("@"); 
        const domain = textArray[1].split(" ")[0];  //right side of @ sign and then you take the left side [0] of rahulshetty
        console.log(domain); 
        await page.locator("#username").type(domain); //switches back to the parent window page from child window of newPage
        console.log(await page.locator("#username").textContent());
    }); 

    test('Rahul Shetty Register Test',async ({browser}) =>{
        //playwright code 
        //page is default global
        //step1
        //step2
        //step3
        //await will only work if the entire function is declared as async
        //must have awaits in your code to ensure that code is executed in order written (as JS is asynchrnous by default)
        // '=>' allows for the creation of an anonymous function 
        //wrap browser in curly braces to recognize it as a playwright fixture;  in general fixtures are global variables that are available 
        //across your entire project
        
        //chrome -- plugins / cookies
        //both context and page are created automatically for you by playwright if you just want to open a page in a browser 
        //usually just do page.goto if there is no context info entered only if you have browser,page declared above
        const context = await browser.newContext();  //only allows for new context Browser
        
        const page = await context.newPage(); //creates a page to automate
        const userNameEmail = page.locator('#userEmail');
        const passwordBox = page.locator("#userPassword");
        const loginBtn = page.locator('#login');
        const cardTitles = page.locator(".card-body h5");
        
        await page.goto("https://www.rahulshettyacademy.com/client"); //goes to the URL
        console.log(await page.title()); 
        //supports css and xpath but cssselector is preferred 
        await userNameEmail.type("bob@bob2000.com");
        await passwordBox.type("Bobiscool3000!");
        await loginBtn.click();
        //console.log(await page.locator("[style*='block']").textContent());
        //await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //since it's containText partial string is enough
        
        //locator method will intelligently wait and you don't need to put an explicit wait 
        //type -- fill method to enter text into field
        //you can use fill to clear 
    
        //console.log(await page.locator("//a[contains(text(),'iphone X')]").textContent());
        //await expect(page.locator("//a[contains(text(), 'iphone X')]")).toContainText('iphone');
        console.log(await cardTitles.nth(0).textContent());
        console.log(await cardTitles.nth(1).textContent());
        //const allTitles = await cardTitles.allTextContents(); 
        //console.log(allTitles);
        //console.log(allTitles[0]);
        //await expect(allTitles).toContain(allTitles[3]);
        
        
        });