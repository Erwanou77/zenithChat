const expressRouter = require('express').Router(),
      groupMessageController = require('../../controllers/GroupMessage'),
      JWTGuard = require('../../config/passport');


module.exports = (app) => {
    // Route pour récupérer tous les messages de groupe
    expressRouter.get('/groupMessages', JWTGuard.checkIsAuthAdmin, groupMessageController.getAllGroupMessages);

    // Route pour récupérer un message de groupe par son ID
    expressRouter.get('/groupMessage/:id', JWTGuard.checkIsAuth, groupMessageController.getGroupMessageById);

    // Route pour récupérer un message de groupe par son GROUPID
    expressRouter.get('/groupMessages/:groupId', JWTGuard.checkIsAuth, groupMessageController.getGroupMessagesByGroupId);

    // Route pour créer un nouveau message de groupe
    expressRouter.post('/groupMessages', JWTGuard.checkIsAuth, groupMessageController.createGroupMessage);

    // Route pour mettre à jour un message de groupe par son ID
    expressRouter.put('/groupMessages/:id', JWTGuard.checkIsAuth, groupMessageController.updateGroupMessage);

    // Route pour supprimer un message de groupe par son ID
    expressRouter.delete('/groupMessages/:id', JWTGuard.checkIsAuth, groupMessageController.deleteGroupMessage);
    app.use('/api/v1', expressRouter)
}
