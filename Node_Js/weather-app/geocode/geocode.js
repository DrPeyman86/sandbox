const request = require('request');

var geocodeAddress = (address, callback) => {
    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGV5bWFuYyIsImEiOiJjanVha3JxdmgwM3RjNDVtbWlwMWZqdHVrIn0.ZJG-omSxAOTroHcYV8A53A`,
        json: true
    }, (error, response, body) =>{//the callback gets called once the data from the HTTP request comes back to the node app.js
        //console.log(JSON.stringify(body, undefined, 2));
        if (error) {
            callback('Unable to connect to Google')
            //console.log('Unable to connect to Google')
        } else if(body.error_message){
            callback(body.error_message, {
                "message": "error received"
            });
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find address')
            //console.log('Unable to find address');
        } else {
            //console.log(body)
            callback(undefined, {//the undefined is to identiy that there was no error in this function, which gets sent back to the caller of this function "errorMessage"
                // "address": body.results[0].formatted_address,
                // "latitude": body.results[0].geometry.location.lat,
                // "longitude": body.results[0].geometry.location.lng
                "address": body.features[0].place_name,
                "latitude": body.features[0].center[1],
                "longitude": body.features[0].center[0]
            })
            // console.log(`Address: ${body.results[0].formatted_address}`)
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
        }   
    })
    
}

module.exports.geocodeAddress = geocodeAddress;