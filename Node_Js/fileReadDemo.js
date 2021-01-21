var fs = require('fs')

// fs.readdir('c:/', (err,data) => {
//     console.log(data);
// })

fs.mkdirSync('./uploads/packingLists', {recursive: true}, (err,data)=>{
    if(err) {
        //if path exists it will enter here
        console.log(err)
    } else {
        //if path does not exist, it will enter here
        console.log(data)
    }
})