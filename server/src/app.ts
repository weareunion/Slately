
/**
 * Install dependencies
 *
 * */

/**
 *  --- Dependencies ---
 *      ****BASE****
 * */


// Import express client
import express from 'express';

// Import mongoose
const mongoose = require('mongoose');

// Import body parser for JSON objects
const bodyParser = require('body-parser');

// Import the cookieParser in case someone wants a cookie 🍪
const cookieParser = require('cookie-parser');


/**
 *  --- Dependencies ---
 *      **LOGGING**
 * */

const rollbar = require('./app/services/Rollbar/rollbar');
rollbar.info("Strapping new backend server...");
/**
 *  --- Dependencies ---
 *      **SECURITY**
 * */

// Add cors for cross-referencing errors
const cors = require('cors');

// Add helmet for security
const helmet = require('helmet');

// Add morgan for logs
const morgan = require('morgan');

/**
 *  --- Boilerplate ---
 * */

// Create app loader
const app = express();

// Create app router
const app_router = express.Router();


// Add dotenv
require('dotenv/config');

// Connect to DB
mongoose.connect(process.env.SLATELY_NETWORK_DB_MONGO_GENERAL_EXTERNAL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // Log to Console
    console.log('[Slately][Mongoose] Server connection status: ' + mongoose.STATES[mongoose.connection.readyState])
});

/**
 *  --- Load Middleware ---
 * */

console.log('[Slately][Bootstrap] Loading middleware... ')
// Load cookie parser
app.use(cookieParser());


console.log('[Slately][Bootstrap][Middleware] Loading middleware... Authentication Service (Loading)')
// Load authentication middleware
const auth = require('./app/middlewares/Auth');

console.log('[Slately][Bootstrap][Middleware] Loading middleware... Authentication Service (Attaching)')
auth.attach.default(app);




// Add backend greeting message
app.get('/', (req, res) => {
    let Response = require('./app/services/Response/Respond')
    let r = new Response();
    r.changeHTTPStatusCode(401, "Unauthorized");
    r.attachMessage("Looks like you found the backend of the server! Good deal. Just to let you know, only authorized users may access this backend in its raw form, and we prosecute anyone that uses this service malevolently.")
    r.respond(res);
    // res.send(req.oidc.isAuthenticated() ? req.oidc.user : );
});


/**
 *  --- Load Controllers ---
 * */

const ControllerLoader = require("./app/loaders/LoadControllers");

ControllerLoader.load(app);


// Start Server
app.listen(3000);

// Log environemnt
console.log("[Slately] Backend server starting on port " + process.env.SERVER_PORT + " in environment " + process.env.ENVIRONMENT + " in the phase of " + process.env.STAGE);



