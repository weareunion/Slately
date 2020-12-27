function getJSONObjectFromFile(filename){
    let fs = require('fs');
    let parent = this;
    fs.readFile('student.json', (err, data) => {
        if (err) throw err;
        parent.return(JSON.parse(data));
    });
}

module.exports = getJSONObjectFromFile;