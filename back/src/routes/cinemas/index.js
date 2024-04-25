const expressRouter = require('express').Router(),
    cinemaController = require('../../controllers/cinema');
    JWTGuard = require('../../config/passport')

module.exports = (app) => {
    expressRouter.get('/cinemas', JWTGuard.checkIsAuth, cinemaController.getAll)
    expressRouter.get('/cine/:id', JWTGuard.checkIsAuth, cinemaController.getById)
    expressRouter.post('/cine', JWTGuard.checkIsAuth, cinemaController.create)
    expressRouter.patch('/cine/:id', JWTGuard.checkIsAuth, cinemaController.update)
    expressRouter.delete('/cine/:id', JWTGuard.checkIsAuth, cinemaController.delete)
    app.use('/api/v1', expressRouter)
}


