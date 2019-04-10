const https = require('https');
const url = "https://api.darksky.net/forecast/6c923894fbd0fcd49f74928372a65339/37.8267,-122.4233"

const request = https.request(url, (response)=>{
    let data = ''

    response.on('data', (chunk)=>{
        //chunk comes back as a buffer. we need to convert to a string. That's why defined data as empty string above so it can be set to the chunk but as a string
        //console.log(chunk);
        data = data + chunk.toString();
    })

    response.on('end', ()=>{
        //response.on('data') gets called when data comes back. When it comes back, before it goes to the .end listener, you can do certain things to the data.
        //then it enters the response.on('end) listener. so data would equal the data set in response.on('data');
        //console.log(data)
        const body = JSON.parse(data);
        console.log(body);
    })
})

//request on error listens to if there was a error on the request. 
request.on('error', ()=>{
    console.log('An error occrred', error);
})

request.end();