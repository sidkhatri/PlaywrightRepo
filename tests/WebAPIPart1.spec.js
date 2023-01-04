const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "bob@bob2000.com", userPassword:"Bobiscool3000!"};
const orderPayload = {orders:[{country: "Cuba", productOrderedId:"63a7764f03841e9c9a5f1551"}]};
let token;
let orderId; 

test.beforeAll( async()=>{
    const apiContext = await request.newContext(); 

   const loginResponse =  await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data : loginPayLoad
    })

    expect((await loginResponse).ok()).toBeTruthy(); //this validates if the API returns a 200, 201, etc.
    console.log(loginResponse);
    const loginResponseJson = await loginResponse.json();  //this stores json response in loginResponseJson
    token = loginResponseJson.token; //this returns the token from within in the loginResponseJson
    console.log(token); //this logs the token to the console


});


test('Browser Context Playwright Test',async ({page}) =>{
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
    
    
    
            const userNameEmail = page.locator('#userEmail');
            const passwordBox = page.locator("#userPassword");
            const loginBtn = page.locator('#login');
            const cardTitles = page.locator(".card-body h5");
            const cartTitles = page.locator(".card-body button");
            const cartIcon = page.locator("//body/app-root[1]/app-dashboard[1]/app-sidebar[1]/nav[1]/ul[1]/li[4]/button[1]");
            const checkOutBtn = page.locator("//button[contains(text(),'Checkout')]");
            const monthOption = page.locator("//body//app-root//select[1]");       
            const yearOption = page.locator("//body//app-root//select[2]");
            const cvvInput = page.locator("(//input[@type='text'])[2]");
            const nameOnCard = page.locator("(//input[@type='text'])[3]");
            const applyCoupon = page.locator("(//input[@type='text'])[4]");
            const applyCouponBtn = page.locator("//button[contains(text(),'Apply Coupon')]");
            const selectCountry = page.locator("//input[@placeholder='Select Country']");
          const itemQuantity = page.locator("//div[contains(text(),'Quantity: 1')]");
            const placeOrder = page.locator(".action__submit");
    

            page.addInitScript(value => {
                window.localStorage.setItem('token', value); 
            }, token);
            await page.goto("https://www.rahulshettyacademy.com/client")
            
            
            //wait for network to become idle...meaning this is intelligently wait no need for hardsleeps
            //console.log(await page.locator("[style*='block']").textContent());
            //await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //since it's containText partial string is enough
            
            //locator method will intelligently wait and you don't need to put an explicit wait 
            //type -- fill method to enter text into field
            //you can use fill to clear 
        
            //console.log(await page.locator("//a[contains(text(),'iphone X')]").textContent());
            //await expect(page.locator("//a[contains(text(), 'iphone X')]")).toContainText('iphone');
            console.log(await cardTitles.nth(0).textContent());
            console.log(await cardTitles.nth(1).textContent());
            const allTitles = await cardTitles.allTextContents(); 
            console.log(allTitles);
            await cartTitles.nth(5).click(); 
            await cartIcon.click();    
            await page.waitForLoadState('networkidle'); 
            await page.locator("div li").first().waitFor(); 
            const bool = await page.locator("h3:has-text('iPhone 13 Pro')").isVisible();
            expect(bool).toBeTruthy(); 
            console.log(bool); 
            await checkOutBtn.click(); 
            await page.waitForLoadState('networkidle');
            await monthOption.selectOption({index: 5}); 
            await page.waitForLoadState('networkidle');
            await yearOption.selectOption({index: 29});   
            await page.waitForLoadState('networkidle');
            await cvvInput.fill("579");
            await nameOnCard.fill("Bob Sakamano"); 
            await applyCoupon.fill("rahulshettyacademy");
            await page.waitForLoadState('networkidle'); 
            await applyCouponBtn.click(); 
            await page.waitForLoadState('networkidle');
            await page.waitForLoadState('networkidle'); 
            await selectCountry.click(); 
            await selectCountry.waitFor(); 
            await selectCountry.type("Ukraine",{delay: 200}); 
            await page.waitForLoadState('networkidle');
            //console.log(itemQuantity); 
            console.log(await itemQuantity.textContent());
            expect(await page.locator("//div[contains(text(),'Quantity: 1')]")).toContainText('1');
            await page.waitForLoadState('networkidle');
            await placeOrder.click(); 
            await page.waitForLoadState('networkidle');
            await page.waitForLoadState('networkidle');
            await page.waitForLoadState('networkidle');
            page.pause(); 
    
            //console.log(allTitles[0]);
            //await expect(allTitles).toContain(allTitles[3]);
    
    
    });
    


