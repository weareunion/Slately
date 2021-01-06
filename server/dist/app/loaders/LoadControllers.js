"use strict";
module.exports = {
    load: (app) => {
        app.use('/api/v1/auth', require('./../controllers/API/v1/Auth'));
    }
};
