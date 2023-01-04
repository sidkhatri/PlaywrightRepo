class APIUtils 
{
    
    costructor(apiContext){
        this.apiContext = apiContext; 
    }
    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login")
        {
                data: loginPayLoad;
        }

        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await tokenResponse.json();
        token = loginResponse.token;

        console.log(token); 
        return token; 

    } 

    async createOrder(){
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order" 
        {
            {
              data : orderPayload,
              headers:{
                        'Authorization' :this.getToken(),
                        'Content-Type'  :'application/json'
              },  

        }) 
        const orderResponseJson = await orderResponse.json(); 
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
        return orderId; 

    });  



}