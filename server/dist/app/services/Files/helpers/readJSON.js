"use strict";
const getJSONObjectFromFile = (filename) => {
    let fs = require('fs');
    // @ts-ignore
    let parent = this;
    fs.readFile('student.json', (err, data) => {
        if (err)
            throw err;
        parent.return(JSON.parse(data));
    });
};
module.exports = getJSONObjectFromFile;
