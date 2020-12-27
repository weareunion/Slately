module.exports = {
    /**
     * --------------------
     *      Constants
     * --------------------
     * */
    default: null,

    // Helper Imports
    JSONLoader: require('../../services/Files/helpers/readJSON'),
    // Function Configurations
    method: "auth0",
    stage: "local",

    /**
     * ----------------------------------
     *      Configuration Functions
     * ----------------------------------
     *
     *
     * */

    init: (app, stage = this.default, authenticationProtocol = this.default, options = this.default, autostart = true) => {
        const { auth } = require('express-openid-connect');

        const config = {
            authRequired: false,
            auth0Logout: true,
            secret: 'a long, randomly-generated string stored in env',
            baseURL: 'http://localhost:3000',
            clientID: 'oFTDbO5in1paYSSfMGmStzm2pcB7oRxm',
            issuerBaseURL: 'https://uniongroup.us.auth0.com'
        };


// auth router attaches /login, /logout, and /callback routes to the baseURL
        return app.use(auth(config));

    }

}

