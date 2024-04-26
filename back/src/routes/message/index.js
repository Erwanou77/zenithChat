const expressRouter = require('express').Router(),
      messageController = require('../../controllers/Message');
      JWTGuard = require('../../config/passport');

module.exports = (app) => {
    expressRouter.get('/messages', JWTGuard.checkIsAuthAdmin, messageController.getAllMessages);
    expressRouter.get('/messages/:id', JWTGuard.checkIsAuth, messageController.getMessageById);
    expressRouter.get('/messages/conversation/:senderId/:recipientId', JWTGuard.checkIsAuth, messageController.getConversation);
    expressRouter.post('/messages', JWTGuard.checkIsAuth, messageController.createMessage);
    expressRouter.put('/messages/:id', JWTGuard.checkIsAuth, messageController.updateMessage);
    expressRouter.delete('/messages/:id', JWTGuard.checkIsAuth, messageController.deleteMessage);
    app.use('/api/v1', expressRouter)
}
