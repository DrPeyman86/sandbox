var fs = require('fs');

//JSON object. 
var data = {
    "name": 'Boobby'
}

fs.writeFile('dataWrite.json', JSON.stringify(data), (err,data) => {
    console.log('write finished', err)
});