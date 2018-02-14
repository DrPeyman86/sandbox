var fs = require('fs')
var data = require('./data.json')

console.log(data.name);//when you do data.name it means that data.name is an object and not just a string


fs.readFile('./data.json', 'utf-8' ,(err,data) => {//either have function(err,data) or (err,data) => {} which is same thing as function() {}. But more compact
    //this is not in JSON so you can't do data.name because it is currently a string only. 
    console.log(data);    

    //if you parse out the data into a JSON object. then you can access the individual properties of the JSON object
    var data = JSON.parse(data)
    console.log(data.name);
})