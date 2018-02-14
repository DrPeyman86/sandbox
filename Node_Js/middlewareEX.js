//typically when you use Express to return a middleware reponse, you would want to return the middlewar as a function
//so that the middleware function will make the app function differently based on "username" in this case
function create(username) {
    return function(request, response, next) {
        request.user = { name: username}
        next();//call the callback function to continue with the app
    }
}

module.exports = create;