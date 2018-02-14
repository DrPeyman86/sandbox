var getUser = function (id, callbacks) {//the callback callback function will be called after the "id" has been determined so that the callback can determine the name of that user "id"
    var user = {
        id: id,
        name: 'Peyman'
    }
    setTimeout(()=>{
        callbacks(user);//call the callback function, but pass in the user as an argument because below the callback expects the "userObject"
    }, 3000)//add 3 second delay to the call to callback function
    
}

getUser(31, (userObject) => {//call the callback function only if the userObject is defined and has returned with certain info on the user.
    console.log(userObject);//if the user returns you can do what you want here. This would be sort of like the .success() function in ajax call. You can print and send to client at this point
})