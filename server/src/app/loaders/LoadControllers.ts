module.exports = {
    load: (app:any) => {
        app.use('/api/v1/auth', require('./../controllers/API/v1/Auth'))
    }
};