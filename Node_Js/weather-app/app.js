var express = require('express')
var bodyParser = require('body-parser')//this brings in body-parser
var app = express()//instatntiate the express app
var http = require('http').Server(app)
var io = require('socket.io')(http);
var mongoose = require('mongoose')

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
    try {
        var address = `${req.body.address} ${req.body.address1} ${req.body.city} ${req.body.state} ${req.body.zip}`
        //console.log(address);

        geocode.geocodeAddress(address, (errorMessage, results) => {
            if (errorMessage) {
                //console.log(errorMessage);
                var returnToClient = errorMessage
                io.emit('address', returnToClient)
                return;
            } else {
                //console.log(JSON.stringify(results, undefined, 2));//the second parameter just put UNDEFINED just to skip over the filtering option which we don't need
                //console.log(results);
                //console.log(results.Latitude + '' + results.Longitude);
                //var returnToClient = results//JSON.stringify(results, undefined, 2);

                weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults) => {
                    if (errorMessage) {
                        //var returnToClient = errorMessage;
                        console.log(errorMessage)
                    } else {
                        //var returnToClient = results
                        console.log(results + '  ' + weatherResults);
                        var returnToClient = {"address":results.address
                                    ,"latitude":results.latitude
                                    ,"longitude":results.longitude
                                    ,"currentTemperature":weatherResults.currentTemperature
                                    ,"apparentTemperature":weatherResults.apparentTemperature
                                    }            
                    }
                    io.emit('address', returnToClient)
                })
            }
        })

        
        
        //6c923894fbd0fcd49f74928372a65339
        
        
        
        /*request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (error, response, body) => {
            //console.log(JSON.stringify(body,undefined,2));
            console.log(`Address: ${body.results[0].formatted_address}`)
            //console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
            //console.log(`Longitude: ${body.results[0].geometry.location.lng}`)

            var returnToClient = {"address": body.results[0].formatted_address, "latitude": body.results[0].geometry.location.lat, "longitude": body.results[0].geometry.location.lng};

            io.emit('address', returnToClient)
        })*/
    } catch (error){
        console.log(error);
    } finally {
        console.log('address post called')
    } 
    res.sendStatus(200)
    
})

// const argv = yargs
//     .options({
//       a: {
//           demand: true,
//           alias: 'address',
//           describe: 'Address to fetch weather for',
//           string: true//it always tells yargs to parse the a option, as a string
//       }  
//     })
//     .help()
//     .alias('help', 'h')//if you want to alias the help
//     .argv;

//     console.log(argv.a);

// geocode.geocodeAddress(argv.a, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));//the second parameter just put UNDEFINED just to skip over the filtering option which we don't need
//     }
// });

//console.log('here');

/*needed for the .html call*/
var server = http.listen(3200, _callBackFunction());

function _callBackFunction () {
    return () => {
        console.log('Weather app listening to port:', server.address().port);
    } 
}