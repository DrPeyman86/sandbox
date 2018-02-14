var express = require('express')
var bodyParser = require('body-parser')//this brings in body-parser
var app = express()//instatntiate the express app
var http = require('http').Server(app)
var io = require('socket.io')(http);
var mongoose = require('mongoose')
const axios = require('axios');//axios already has support for PROMISE. Native Node-js does not

//const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

app.use(express.static(__dirname));
app.use(bodyParser.json());// this tells the app that we expect json to be coming in when .post() is called
app.use(bodyParser.urlencoded({extended:false}));

//console.log(app)

/*needed for the .html call*/
app.get('/address', (req, res) => {
    console.log('Get request')
    res.send('Address Posted');
})

app.post('/address', async (req, res) => {
    var address = `${req.body.address} ${req.body.address1} ${req.body.city} ${req.body.state} ${req.body.zip}`
    
    var encodedURL = encodeURIComponent(address);
    var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`

    //axious has built in support for Promise. You do not need a seperate function to return a promise.
    axios.get(geoCodeURL).then((geoResults) =>{
        //console.log(response.data);
        if (geoResults.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find address');
        }
        var address = geoResults.data.results[0].formatted_address;
        var lat = geoResults.data.results[0].geometry.location.lat;
        var lng = geoResults.data.results[0].geometry.location.lng

        // var returnToClient = {"address":address
        //                 ,"latitude":lat
        //                 ,"longitude":lng
        //                 //"currentTemperature":temperature
        //                 //,"apparentTemperature":apparentTemperature
        //                 }            
        //io.emit('address', returnToClient)

        
        var weatherURL = `https://api.darksky.net/forecast/6c923894fbd0fcd49f74928372a65339/${lat},${lng}`
        return Promise.all([axios.get(weatherURL),{"address":address, "lat":lat, "lng":lng}]);
        
    }).then((weatherResponse)=>{//this .then() gets called from the return axios.get(weatherURL); chained promises. 
        console.log(weatherResponse);
        var address = weatherResponse[1].address
        var lat = weatherResponse[1].lat
        var lng = weatherResponse[1].lng
        var temperature = weatherResponse[0].data.currently.temperature;
        var apparentTemperature = weatherResponse[0].data.currently.apparentTemperature;
        
        var returnToClient = {"address":address
                        ,"latitude":lat
                        ,"longitude":lng
                        ,"currentTemperature":temperature
                        ,"apparentTemperature":apparentTemperature
                        }            
        io.emit('address', returnToClient)
    })
    .catch((errorMessage)=>{
        if (errorMessage.code === 'ECONNREFUSED') {
            console.log('Could not connect to the URL');
        } else {
            console.log('Error:',errorMessage.message);
        }
        //console.log(errorMessage);
    })
 
    res.sendStatus(200)
    
})

/*needed for the .html call*/
var server = http.listen(3200, _callBackFunction());

function _callBackFunction () {
    return () => {
        console.log('Weather app listening to port:', server.address().port);
    } 
}