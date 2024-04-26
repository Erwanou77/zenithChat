module.exports = (app) => {
    require('./users')(app)
    require('./cinemas')(app)
    require('./Friendship')(app)
    require('./chatGroup')(app)
    require('./groupMembership')(app)
    // require('./groupMessage')(app)
    require('./message')(app)
    require('./auth')(app)
}