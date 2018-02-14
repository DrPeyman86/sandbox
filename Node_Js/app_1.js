//console.log('Starting App');
var fs = require('fs');
//var os = require('os');
var _ = require('lodash');
var yargs = require('yargs')

const notes = require('./notes.js');

var titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: {
            describe: "Enter a body for note",
            demand: true,
            alias: 'b'
        },
        from: {
            description: "Who note is from",
            demand: true,
            alias: 'f'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()//returns some useful information
    .argv;

var command = argv._[0];
//console.log('process argv', process.argv);
//console.log('argv', argv)
//console.log('command', command)

//command = "read";
//argv.title = "to buy2"
//debugger
if (command === 'add') {
    //console.log('notes added')
    var noteReturn = notes.addNotes(argv.title, argv.from, argv.body)
    //console.log(noteReturn)
    if (noteReturn) {
        console.log("Note taken")
        notes.logNote(noteReturn);
    } else {
        console.log("Note title exists");
    }
    
}
else if (command === 'list') {
    //console.log('notes listed')
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s).`)
    allNotes.forEach((note) => notes.logNote(note));
}
else if (command === 'read') {
    //console.log('notes removed')
    var readNote = notes.readNotes(argv.title);
    var message = readNote ? `Message: ${readNote.title}, ${readNote.from}, ${readNote.body}` : 'Note with that title not found';
    console.log(message);
}
else if (command === 'remove') {
    //console.log('notes read')
    var noteRemoved = notes.removeNotes(argv.title); 
    var message = noteRemoved ? `Note was removed` : 'Note not removed';//ternary operator
    console.log(message);
}
else {
    console.log('Command not recognized')
}
// var user = os.userInfo()

// fs.appendFile('hello.txt', `Hello ${os.userInfo().username}, you are ${notes.age}.`, () =>{
//     console.log('You are awesome')
// })
// console.log(_.isString(true))
// console.log(_.isString('Add'))

//var fs = ["peyman","test","peyman","1","2","2","1","5","5",5, 4, 3, 7,5,7];

//console.log(_.uniq(fs));



//console.log(notes.add(2,-4));

//JSON object. 
// var data = {
//     "name": 'Boobby'
// }



// console.log(user);

// fs.appendFile('dataWrite.json', JSON.stringify(data), (err,data) => {
//     console.log('write finished', err)
// });