const Rollbar = require("rollbar");
const rollbar = new Rollbar({
    accessToken: '4816aec76536488cad0f8ae679e58b64',
    captureUncaught: true,
    captureUnhandledRejections: true,
    verbose: (process.env.ENVIRONMENT === 'development')
});

module.exports = rollbar;