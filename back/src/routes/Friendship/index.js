const expressRouter = require('express').Router(),
      friendshipController = require('../../controllers/Friendship'),
      JWTGuard = require('../../config/passport');

module.exports = (app) => {
    expressRouter.get('/friendships', JWTGuard.checkIsAuthAdmin, friendshipController.getAllFriendships);
    expressRouter.get('/friendships/:id', JWTGuard.checkIsAuth, friendshipController.getFriendshipById);
    expressRouter.get('/friendships/requester/:requesterId', JWTGuard.checkIsAuth, friendshipController.getFriendRequestsByRequesterId);
    expressRouter.get('/friendships/addressee/:addresseeId', JWTGuard.checkIsAuth, friendshipController.getFriendRequestsByAddresseeId);
    expressRouter.get('/friendships/user/:id', JWTGuard.checkIsAuth, friendshipController.getFriendRequestsByUser);
    expressRouter.post('/friendships', JWTGuard.checkIsAuth, friendshipController.createFriendship);
    expressRouter.put('/friendships/:id', JWTGuard.checkIsAuth, friendshipController.updateFriendship);
    expressRouter.delete('/friendships/:id', JWTGuard.checkIsAuth, friendshipController.deleteFriendship);
    app.use('/api/v1', expressRouter)
}
