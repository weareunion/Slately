let express = require('express');
let app = express.Router();

app.get('/', (req, res) => {
    res.send('gorcha');
})

module.exports = app;