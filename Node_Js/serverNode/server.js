var express = require('express')
var bodyParser = require('body-parser')//this brings in body-parser
var app = express()//instatntiate the express app
var http = require('http').Server(app)
var io = require('socket.io')(http);
var mongoose = require('mongoose')

app.use(express.static(__dirname))//this includes the file to use. .static() tells that it is a static file. _dirname passes the entire directory. get a preparation file for the HTML _dirname sends the entire directory to include all files 
app.use(bodyParser.json())// this tells the app that we expect json to be coming in when .post() is called
app.use(bodyParser.urlencoded({extended:false}));

mongoose.Promise = Promise//this tells mongoose library we want to use the pre-built in ES6 Promise library rather than the normal version of mongoose promise library

//the user name and password would typically be stored somewhere safe in a real project that connects to your db
var dbUrl = 'mongodb://user:user@ds249707.mlab.com:49707/learning_node_pc'

//we are setting up a model and schema for our message object that will be passed to the DB. We are defining what the name and datatypes the DB should be expecting are
var Message = mongoose.model('Message', {//capital letter first means it's a MODEL. 
   name: String,
   message: String,
   add_date: {type: Date, default: Date.now}//default to date
})
/*
var messages = [
    {name:'Peyman', message:"Hi theres"}//,
    //{name:'Pemy', message:"Hello"}
]

var messagetwo = [
    {name: 'Peyman', message:'Hello'}
]*/

//specify the route where the .get() should look to
//.get() creates an endpoint so that our front end can request a .get() call. without a .get() or .post() the front end wouldn not be able to use .get() or .post() calls in its javascript
app.get('/messages', (req, res) => {//'messages' specifies the route
    //res.send(messages)
    Message.find({}, (err, message) => {
        res.send(message)
    })
    //console.log('here');
})

//.post() creates an endpoint so that our front end can request a .post() call 
/*Old way of doing app.post where even though we had chain dependencies and used promises, it was hard to read*/
/*Old way of doing app.post where even though we had chain dependencies and used promises, it was hard to read*/
/*Old way of doing app.post where even though we had chain dependencies and used promises, it was hard to read*/
// app.post('/messages', (req, res) => {
//     //console.log(req.body);
//     var message = new Message(req.body)
//     //console.log(message);
//     //
//     /*old way of writing message.save()*/
//     //message.save((err) => {//<--this message.save() creates a Nested callback issue since the message will be sent to page regardless if it finds a "badword" below.
//     /*new way of writing message.save() so that it acts more like a synchoronus way where only if it finds no errors, does it save, the .then() will execute if it finds no errors*/
//     message.save()
//     .then(()=> {
//         /*if(err) {
//             sendStatus(500)
//         }*/

//         /*Message.findOne({message: 'badword'}, (err, censored) => {
//             if(censored) {
//                 console.log('censored words found', censored)
//                 Message.remove({_id: censored.id}, (err) => {
//                     console.log('removed censored word')
//                 })
//             }
//         }) 

//         //messages.push(req.body);
//         io.emit('message', req.body) 
//         res.sendStatus(200)//send status(200) means everyting is ok. It is code. like 404, 505...*/
//         console.log('saved')
//         return Message.findOne({message: 'badword'})//this returns the results of the first chain and sends it to the next .then() chain promised. which would be the one around line 87
           

//     })
//     //these are dependency chains
//     .then(censored => {
//         if(censored) {
//             console.log('censored words found', censored)
//             return Message.remove({_id: censored.id})//return it so that it becomes a promise to the next .then()
//         } 
        
//         io.emit('message', req.body)
//         res.sendStatus(200)
//     })
//     .catch((err)=> {
//         res.sendStatus(500)
//         return console.error(err) 
//     })
    
// })
/*Old way of doing app.post where even though we had chain dependencies and used promises, it was hard to read*/
/*Old way of doing app.post where even though we had chain dependencies and used promises, it was hard to read*/
/*Old way of doing app.post where even though we had chain dependencies and used promises, it was hard to read*/


/*new way to post, better to read*/
app.post('/messages', async (req, res) => {

    try {
        //throw 'some'
        //console.log(req.body);
        var message = new Message(req.body)
        //console.log(message);
        //
        /*old way of writing message.save()*/
        //message.save((err) => {//<--this message.save() creates a Nested callback issue since the message will be sent to page regardless if it finds a "badword" below.
        /*new way of writing message.save() so that it acts more like a synchoronus way where only if it finds no errors, does it save, the .then() will execute if it finds no errors*/
        var savedMessage = await message.save()
        console.log('saved')
        
        var censored = await Message.findOne({message: 'badword'})//this returns the results of the first chain and sends it to the next .then() chain promised. which would be the one around line 87

        //these are dependency chains
        if(censored) {
            //console.log('censored words found', censored)
            await Message.remove({_id: censored.id})//return it so that it becomes a promise to the next .then()
        } 
        else {
            io.emit('message', req.body)
        }

        res.sendStatus(200)

    } catch(error) {
            res.sendStatus(500)
            return console.error(error) 
    } finally {
        console.log('message post called')
    }    
    
})

//a callback function for the socket connection even to let us know when a user connects
io.on('connection', (socket) => {
    console.log('a user connected')
})


mongoose.connect(dbUrl, {useMongoClient: true}, (err) => {
    console.log('mongo db connection', err)
})

//add call back to display that the port is being listened to
//var server = http.listen(3000, () => {
//    console.log('server is listening to port', server.address().port);
//})

//when you instal socket.io, you can no longer use Express alone for backend, need to use Node HTTP server so that both express and socket.io will run
var server = http.listen(3000, _callbackServerPort())

function _callbackServerPort() {
    return () => {
        console.log('server is listening to port', server.address().port);
    };
}

