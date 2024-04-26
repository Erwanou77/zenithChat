const expressRouter = require('express').Router(),
      chatGroupController = require('../../controllers/ChatGroup'),
      JWTGuard = require('../../config/passport');

module.exports = (app) => {
    // Récupérer tous les groupes de discussion
    expressRouter.get('/chatGroups', JWTGuard.checkIsAuthAdmin, chatGroupController.getAllChatGroups);
    
    // Récupérer un groupe de discussion par son ID
    expressRouter.get('/chatGroups/:id', JWTGuard.checkIsAuth, chatGroupController.getChatGroupById);
    
    // Récupérer un groupe de discussion par l'idUSER
    expressRouter.get('/chatGroups/user/:id', JWTGuard.checkIsAuth, chatGroupController.getChatGroupsByUser);

    // Créer un nouveau groupe de discussion
    expressRouter.post('/chatGroups', JWTGuard.checkIsAuth, chatGroupController.createChatGroup);

    // Mettre à jour un groupe de discussion existant
    expressRouter.put('/chatGroups/:id', JWTGuard.checkIsAuth, chatGroupController.updateChatGroup);

    // Supprimer un groupe de discussion
    expressRouter.delete('/chatGroups/:id', JWTGuard.checkIsAuth, chatGroupController.deleteChatGroup);

    app.use('/api/v1', expressRouter);
};