const express = require('express');
const mid = require('./middlewareEX');

let app = express();//let declares the scope of the variable in the block. so if this was inside an IF statement and you 
//declared let app, it would only be available inside that IF block. whereas VAR would declare the app globally thenafter. 

//app.use((request, response, next) => {//app.use will call a middleware to execute. 'next' is the callback after the middleware has finished
//app.use could be used to handle authentication before the app starts. So you could match the user with the cookies web user 
//})

app.use(mid('Peyman P'));

app.get('/hello', (request, response) => {
    response.send(`Hello ${request.user.name}`)
})

app.listen(3000);//start a HTTP server using express
