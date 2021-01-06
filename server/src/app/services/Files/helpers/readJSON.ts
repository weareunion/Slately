const getJSONObjectFromFile = (filename: string) => {
    let fs = require('fs');
    // @ts-ignore
    let parent:any = this;
    fs.readFile('student.json', (err: any, data: any) => {
        if (err) throw err;
        parent.return(JSON.parse(data));
    });
}

module.exports = getJSONObjectFromFile;