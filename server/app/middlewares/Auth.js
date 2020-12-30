const controller = require("../services/Auth/AuthenticationService");

module.exports = {
    /**
     * --------------------
     *      Constants
     * --------------------
     * */


    /**
     * --------------------------
     *      Interface Methods
     * --------------------------
     * */

    attach: {
        /**
         * Attach authentication middleware with the default settings
         * @param app ExpressJS object
         */
        default: (app) => {
            controller.init(app, process.env.ENVIRONMENT);
        },
        /**
         * Attach machine to machine middleware with the default settings
         * @param app ExpressJS object
         */
        m2m: (app) => {
            controller.init(app, process.env.ENVIRONMENT, "m2m");
        }
    }

}