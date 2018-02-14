// var obj = {
//     name: "Peyman"
// };

// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);


// var personString = '{"name": "Peyman","age": 31}'//add properties and values
// var person = JSON.parse(personString);//convert a string to an object 

// console.log(typeof person);
// console.log(person);

const fs = require('fs')

var originalNote = {
    title: 'Some title',
    body: 'Some body'    
};
var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString, () => {
    console.log('File Written');
});

var noteString = fs.readFileSync('notes.json')
var note = JSON.parse(noteString)

console.log(typeof note)
console.log(note.title)