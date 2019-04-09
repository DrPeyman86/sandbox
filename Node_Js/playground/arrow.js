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

const event = {
    name: "birthday part",
    guestList: ['Peyman','John','Mehmet'],
    // printGuestList: function() {
    //     console.log('Guest list for ' + this.name)
    // }
    printGuestList () {
        console.log('Guest list for ' + this.name)
        //arrow functions do not bind to the this value, but instead bind to the value in the context they were created, which in this case is the printGuestList() method
        this.guestList.forEach((guest)=>{
            console.log(guest + ' is attending ' + this.name);
        })
    }
}

user.sayHi(1,2,3);
event.printGuestList();