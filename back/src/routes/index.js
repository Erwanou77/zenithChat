module.exports = (app) => {
    require('./users')(app)
    require('./cinemas')(app)
    require('./auth')(app)
}