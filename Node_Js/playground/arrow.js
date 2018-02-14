var square = x => {
    var result = x * x;
    return result;
}//arrow function
//console.log(square(4));

var user = {
    name: 'Peyman',
    sayHi: () => {//arrow fnction does not bind the keyword "this" to the function itself, so you would not be able to use "this" inside the function
        console.log(arguments)//arrow function also do not bind the arguments objects that is as of an array
        console.log(`Hi. I'm ${this.name}`)
    },
    sayHiAlt () {
        console.log(arguments);//
        console.log(`Hi. I'm ${this.name}`)
    }
}

user.sayHi(1,2,3);