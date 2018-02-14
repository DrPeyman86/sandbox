fs = require('fs');



/*async*/
//data = fs.readdirSync('c:/');
//console.log('data', data);

/*sync*/

function phoneNumber(err, data) {
    console.log('data:', data);
}

fs.readdir('c:/', phoneNumber)

console.log("this comes after");