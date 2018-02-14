const request = require('request');

var geoCodeAddress = ((address)=> {
    return new Promise((resolve, reject) => {
        var encodedURL = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`,
            json: true
        }, (error, response, body) =>{//the callback gets called once the data from the HTTP request comes back to the node app.js
            //console.log(JSON.stringify(body, undefined, 2));
            if (error) {
                //callback('Unable to connect to Google')
                //console.log('Unable to connect to Google')
                reject('Error to connect to Google');
            } else if (body.status === 'ZERO_RESULTS') {
                //callback('Unable to find address')
                //console.log('Unable to find address');
                reject('No records returned');
            } else if (body.status === 'OK') {
                //console.log(body.results[0].formattted_address);
                resolve({//the undefined is to identiy that there was no error in this function, which gets sent back to the caller of this function "errorMessage"
                    "address": body.results[0].formatted_address,
                    "latitude": body.results[0].geometry.location.lat,
                    "longitude": body.results[0].geometry.location.lng
                })
                // console.log(`Address: ${body.results[0].formatted_address}`)
                // console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
                // console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
            }   
        })
    })
})

geoCodeAddress('30066').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}).catch((errorMessage)=> {
    console.log(errorMessage);
})