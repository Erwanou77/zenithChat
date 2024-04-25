const expressRouter = require('express').Router(),
    userController = require('../../controllers/user'),
    JWTGuard = require('../../config/passport')

module.exports = (app) => {
    // app.get('/users', userController.getAll)
    expressRouter.get('/users', userController.getAll)
    expressRouter.get('/user/:id', JWTGuard.checkIsAuth, userController.getById)
    expressRouter.post('/user', userController.create)
    expressRouter.patch('/user/:id', JWTGuard.checkIsAuth, userController.update)
    expressRouter.delete('/user/:id', JWTGuard.checkIsAuth, userController.delete)
    app.use('/api/v1', expressRouter)
}