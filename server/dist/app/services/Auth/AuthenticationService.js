"use strict";
const AuthenticationService = {
    /**
     * --------------------
     *      Constants
     * --------------------
     * */
    default: {
        default: null,
        authenticationProtocol: "auth0"
    },
    // Helper Imports
    JSONLoader: null,
    rollbar: null,
    // Function Configurations
    method: "auth0",
    environment: "local",
    /**
     * ----------------------------------------
     *      Object Initialization Functions
     * ----------------------------------------
     * */
    readyUp: () => {
        module.exports.rollbar = require('../../services/Rollbar/rollbar');
        module.exports.JSONLoader = require('../../services/Files/helpers/readJSON');
    },
    /**
     * ----------------------------------
     *      Configuration Functions
     * ----------------------------------
     *
     *
     * */
    /**
     * Initialize authentication middleware
     * @param app ExpressJS object
     * @param environment Environment type (local || hosted). Will default to .env. If not available will default to this.environment
     * @param authenticationProtocol Authentication protocol. Default: auth0
     * @param type Type of authentication. (web, m2m)
     * @param options Additional options
     * @param autostart Link middleware once ready
     * @returns {*} Returns app if autostart is true, else function will be returned
     */
    init: (app, environment = module.exports.default.default, authenticationProtocol = module.exports.default.authenticationProtocol, type = 'web', options = module.exports.default.default, autostart = true) => {
        // Surround try catch to catch ANY errors
        try {
            // Get ready to accept requests
            module.exports.readyUp();
            // Switch on different protocols
            switch (authenticationProtocol) {
                // Auth0 auth protocol
                case "auth0":
                    // Create config file
                    const config = module.exports.protocols.auth0.config.create(environment);
                    // Set and attach to middleware if autostart is on
                    if (autostart) {
                        return module.exports.protocols.auth0.middlewares.attach(app, config);
                    }
                    else {
                        return () => {
                            module.exports.protocols.auth0.middlewares.attach(app, config);
                        };
                    }
                default:
                    throw new Error('Unknown Authentication Protocol: ' + authenticationProtocol);
            }
        }
        catch (err) {
            // Push error to main
            module.exports.rollbar.critical(err.toString(), err);
            throw err;
        }
    },
    /**
     * -----------------------------
     *      Protocol Functions
     * -----------------------------
     * Authentication types and middlewares
     *
     * */
    protocols: {
        auth0: {
            config: {
                /**
                 * Create Auth0 configuration JSON
                 *
                 * @param environment Current server environment (local || hosted)
                 * @param baseURL Base URL for authentication. Optional: will be provided
                 * @param port Port that auth will run on
                 * @returns {{clientID: string, issuerBaseURL: string, secret: *}} Auth0 configutation file
                 */
                create: (environment, baseURL = "", port = process.env.SERVER_PORT) => {
                    // If environment is not set, default to .env specification. If that is not known, revert to object environment
                    environment = environment || (process.env.ENVIRONMENT || AuthenticationService.environment);
                    // If the environment process is not set, warn
                    if (process.env.ENVIRONMENT === undefined)
                        module.exports.rollbar.warn(`BEWARE: Server environment could not be pulled from environment. Running as ${environment}.`);
                    // Backbone configuration for Auth0
                    const config = {
                        secret: process.env.AUTH_AUTH0_SECRET,
                        clientID: 'oFTDbO5in1paYSSfMGmStzm2pcB7oRxm',
                        issuerBaseURL: 'https://uniongroup.us.auth0.com',
                        baseURL: undefined,
                        authRequired: undefined
                    };
                    if (environment === 'local') {
                        config.baseURL = 'http://localhost:' + process.env.SERVER_PORT;
                        config.authRequired = false;
                        config.auth0Logout = true;
                    }
                    // Log
                    module.exports.rollbar.debug("Auth0 configuration created.", config);
                    return config;
                }
            },
            /**
             * Auth0 ExpressJS middleware functions
             */
            middlewares: {
                /**
                 * Attach Auth0 Middlware with config file
                 * @param app Server ExpressJS App Object
                 * @param config Generated configuration file
                 * @returns {*} App file
                 */
                attach: (app, config) => {
                    // Import auth package from OpenID
                    const { auth } = require('express-openid-connect');
                    // This auth router attaches /login, /logout, and /callback routes to the baseURL
                    return app.use(auth(config));
                }
            }
        }
    }
};
module.exports = AuthenticationService;
