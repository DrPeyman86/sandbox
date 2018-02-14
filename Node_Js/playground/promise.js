//store the promise object. we set the promise object equal to the return value of Promise constructor
//the new keyword creates a new instance of the Promise function
//Provide resolve State meaning the PRomise was fulfilled and whatever you wanted to do came back as fulfilled
//Provide reject State meaning the Promise could not fulfill what was asked
//you can only resolve or reject a promise and you can only do one of the 2 once only. Whereas callbacks you can callback many times which can cause problems
var AsyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(typeof a === 'number' && typeof b === 'number') {
                resolve (a + b);
            } else {
                reject('Argumnets must be numbers');
            }
        },1500)
    })
}

AsyncAdd(5,'7').then((res)=> {
    console.log('Result', res)
    return AsyncAdd(res, 33);//this will return a new Promise so that we can CHAIN the promises together. The 2nd '.then()' will be called with this return
}, (errorMessage)=>{//if the function returns a "reject" it will go into the callback of the 'then()'
    console.log(errorMessage)
//if the preeceding chain gets rejected, the proceeding chains will have unexpected results because the callback of the
//promise that got rejected handles the error, so the proceeding 'then()' promises think everything is good with error
//handling and simply continue on. 
//FIX** - to resolve that issue, instead of having a callback() function for each 'then() you may have, remove all of them
//and replace them with a .catch() at the very end of the first callback of the function call
}).then((res)=> {//this chains promises together. This only gets called if first time promise is resolved
    console.log('2nd Result:', res)
}, (errorMessage) => {
    console.log(errorMessage);
});

//do this way rather than method above, so that the .catch() will grab any errorMessage on any of the chain promise calls.
setTimeout(()=>{
    AsyncAdd(5,7).then((res)=> {
        console.log("Result:", res);
        return AsyncAdd(res, 33);
    }).then((res)=> {
        console.log("2nd Results:", res);
    }).catch((errorMessage)=>{
        console.log(errorMessage);
    })
}, 2000)



// var somePromise = new Promise((resolve, reject) =>{
//     setTimeout(()=>{
//         //resolve('Hey it worked')//this is the actual data that could be inside resolve() for example a result of a function could be in there
//         reject('Unable to fulfill promise');
//     }, 2500)   
// })

// //.then() will only only be called if the promise was fulfilled. The value of the "resolve()" will get passed onto the 
// //.then() first argument function
// somePromise.then((msg) => {
//     console.log("Success", msg);
// //the second argumnet of the .then() function below is if the Promise is rejected, so it would enter the second argument of .then()
// }, (errorMessage) =>{
//     console.log('Error:', errorMessage)
// })