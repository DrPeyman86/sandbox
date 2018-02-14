const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    console.log(latitude,longitude);
    request({
        url: `https://api.darksky.net/forecast/6c923894fbd0fcd49f74928372a65339/${latitude},${longitude}`,
        json: true
    }, (error, response, body) =>{//the callback gets called once the data from the HTTP request comes back to the node app.js
        //console.log(JSON.stringify(body, undefined, 2));
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                "currentTemperature": body.currently.temperature,
                "apparentTemperature": body.currently.apparentTemperature
            })
            // console.log(`Address: ${body.results[0].formatted_address}`)
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
        } else {
            callback('Unable to fetch weather');
        }  
    })

}

module.exports.getWeather = getWeather;