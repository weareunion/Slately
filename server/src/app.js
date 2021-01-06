/**
 * Install dependencies
 * */
/**
 *  --- Dependencies ---
 *      ****BASE****
 * */
// Import express client
var express = require('express');
// Import mongoose
var mongoose = require('mongoose');
// Import body parser for JSON objects
var bodyParser = require('body-parser');
// Import the cookieParser in case someone wants a cookie 🍪
var cookieParser = require('cookie-parser');
/**
 *  --- Dependencies ---
 *      **LOGGING**
 * */
var rollbar = require('./app/services/Rollbar/rollbar');
rollbar.info("Strapping new backend server...");
/**
 *  --- Dependencies ---
 *      **SECURITY**
 * */
// Add cors for cross-referencing errors
var cors = require('cors');
// Add helmet for security
var helmet = require('helmet');
// Add morgan for logs
var morgan = require('morgan');
/**
 *  --- Boilerplate ---
 * */
// Create app loader
var app = express();
// Add dotenv
require('dotenv/config');
// Connect to DB
mongoose.connect(process.env.SLATELY_NETWORK_DB_MONGO_GENERAL_EXTERNAL, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    // Log to Console
    console.log('[Slately][Mongoose] Server connection status: ' + mongoose.STATES[mongoose.connection.readyState]);
});
/**
 *  --- Load Middleware ---
 * */
// Load cookie parser
app.use(cookieParser());
// Load authentication middleware
var auth = require('./app/middlewares/Auth');
auth.attach["default"](app);
// Add backend greeting message
app.get('/', function (req, res) {
    var Response = require('./app/services/Response/Respond');
    var r = new Response();
    r.changeHTTPStatusCode(401, "Unauthorized");
    r.attachMessage("Looks like you found the backend of the server! Good deal. Just to let you know, only authorized users may access this backend in its raw form, and we prosecute anyone that uses this service malevolently.");
    r.respond(res);
    // res.send(req.oidc.isAuthenticated() ? req.oidc.user : );
});
/**
 *  --- Load Controllers ---
 * */
var ControllerLoader = require("./app/loaders/LoadControllers");
ControllerLoader.load(app);
// Start Server
app.listen(process.env.SERVER_PORT);
// Log environemnt
console.log("[Slately] Backend server starting on port " + process.env.SERVER_PORT + " in environment " + process.env.ENVIRONMENT + " in the phase of " + process.env.STAGE);
