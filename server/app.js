
/**
 * Install dependencies
 * */

/**
 *  --- Dependencies ---
 *      ****BASE****
 * */


// Import express client
const express = require('express');

// Import mongoose
const mongoose = require('mongoose');

// Import body parser for JSON objects
const bodyParser = require('body-parser');

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

// Add dotenv
require('dotenv/config');


/**
 *  --- Load Middleware ---
 * */

// Load authentication middleware
const auth = require('./app/middlewares/Auth');
auth.attach.default(app);

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? req.oidc.user : 'Logged out');
});


// Connect to DB
mongoose.connect(process.env.SLATELY_NETWORK_DB_MONGO_GENERAL_EXTERNAL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    // Log to Console
    console.log('[Slately][Mongoose] Connection status: ' + mongoose.STATES[mongoose.connection.readyState])
});




app.listen(process.env.SERVER_PORT);

// Log
rollbar.info("Backend server started on port " + process.env.SERVER_PORT);