const fs = require('fs');

function getFileContents(path){
    const file = fs.readFileSync(__dirname + path);
    return file
}

exports.getFileContents = getFileContents;