
// console.log('Starting notes.js')

// //module.exports.age = 25;

// module.exports.addNotes = () => {//you can't pass arguments to arrow functions sytax. Write out function() in that case
//     console.log('addNote');
//     return 'Notes Added';
// }

// module.exports.add = function(numberOne, numberTwo) {//you can't pass arguments to arrow functions sytax. Write out function() in that case
//     //console.log('addNote');
//     return numberOne + numberTwo;
// }
const chalk = require('chalk');
const fs = require('fs')

var fetchNotes = function() {
    try {
        //want to make sure we don't overwrite exisitng notes, so we want to save the current notes first than create new note variable with the new notes coming in. 
        var notesString = fs.readFileSync('notes-data.json');
        return notes = JSON.parse(notesString);
    } catch (e) {
        return [];//return empty space if the file doesn't exist so it couldn't fetch anything 
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNotes = (title, from, body) => {
    //console.log('Adding note', title, from, body)
    var notes = fetchNotes();
    var note = {
        title,
        from,
        body
    }
    //filter is an array method
    // var duplicateNotes = notes.filter((note) => {
    //     return note.title === title;
    // })
    //the above line can be simplified to ES6 version coding method
    var duplicateNotes = notes.filter((note) => note.title === title);//this is same thing as above but simplified

    if (duplicateNotes.length === 0) {
        notes.push(note);//push() is an array function which pushes an object to the array
        saveNotes(notes);
        return note //`${JSON.stringify(note)} Successfully added`;//template strings ``
    }
    // else {
    //     return `${JSON.stringify(note)} already exists, not added`;
    // }

}

var getAll = () => {
    //console.log('Getting all notes');
    var allNotes = fetchNotes();
    return allNotes;
}

var readNotes = (title) => {
    //console.log('Reading Note ', title)
    var notes = fetchNotes();
    //var filterReadNote = notes.filter((note) => note.title === title);
    const note = notes.find((note)=> note.title === title)
    if(note){
        //console.log(note.body);
        return chalk.inverse(note.title + ' ' + note.body)
    } else {
        //console.log(chalk.red.inverse("Note not found"))
        return chalk.red.inverse("Note not found")
    }

    //return note[0];
}

 var removeNotes = (title) => {
     //console.log('Removing Notes ', title)
     var notes = fetchNotes();
     var filteredNotes = notes.filter((note) => note.title !== title)
     saveNotes(filteredNotes);

     return notes.length !== filteredNotes.length;
 }

 var logNote = (note) => {
     debugger;
    console.log("--")
    console.log(`Title: ${note.title}`)
    console.log(`From: ${note.from}`)
    console.log(`Body: ${note.body}`)
 }

module.exports = {
    //addNotes: addNotes //if you have a property with the same name as its VALUE, than you remove the second instance of that name like below
    addNotes,
    getAll,
    readNotes,
    removeNotes,
    logNote
}

