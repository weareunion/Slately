const controller = require("../controllers/Auth/AuthController");

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
        default: (app) => {
            controller.init(app);
        }
    }

}