const expressRouter = require('express').Router(),
    groupMembershipController = require('../../controllers/GroupMembership'),
    JWTGuard = require('../../config/passport');

module.exports = (app) => {
    expressRouter.get('/groupMemberships', JWTGuard.checkIsAuthAdmin, groupMembershipController.getAllGroupMemberships);
    expressRouter.get('/groupMemberships/:id', JWTGuard.checkIsAuth, groupMembershipController.getGroupMembershipById);
    expressRouter.get('/groupMembersShips/:id', JWTGuard.checkIsAuth, groupMembershipController.getGroupMembershipByGroupId);
    expressRouter.put('/groupMemberships/:id', JWTGuard.checkIsAuth, groupMembershipController.updateGroupMembership);
    expressRouter.delete('/groupMemberships/:id', JWTGuard.checkIsAuth, groupMembershipController.deleteGroupMembership);
    app.use('/api/v1', expressRouter);
}
