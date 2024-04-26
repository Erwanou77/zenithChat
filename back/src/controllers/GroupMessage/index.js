const groupMessageModel = require('../../models/groupMessage');
const groupMembershipModel = require('../../models/groupMembership');
const chatGroupModel = require('../../models/chatGroup');

/**
 * @description get all message group
 * @param req
 * @param res
 * @return {*}
 */


exports.getAllGroupMessages = async (req, res) => {
    try {
        const groupMessages = await groupMessageModel.find();
        res.json(groupMessages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving group messages', error });
    }
};

exports.getGroupMessageById = async (req, res) => {
    try {
        const groupMessage = await groupMessageModel.findById(req.params.id);
        if (!groupMessage) return res.status(404).json({ message: 'Group message not found' });
        res.json(groupMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving group message', error });
    }
};

exports.getGroupMessagesByGroupId = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id; // ID de l'utilisateur authentifié

        if (!groupId) {
            return res.status(400).json({ message: 'Group ID is required' });
        }

        // Vérifie si l'utilisateur est membre du groupe
        const isUserMember = await groupMembershipModel.exists({ userId, groupId });

        // Si l'utilisateur n'est pas membre et n'est pas administrateur, renvoie une erreur Unauthorized
        if (!isUserMember && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }

        const groupMessages = await groupMessageModel.find({ groupId }).populate({
            path: 'senderId',
            select: ['_id', 'username']
        });
        

        // Vérifie s'il n'y a aucun message pour ce groupe
        if (groupMessages.length === 0) {
            return res.status(404).json({ message: 'No group messages found for the specified group ID' });
        }

        // Renvoie les messages du groupe
        res.json(groupMessages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving group messages by group ID', error });
    }
};


exports.createGroupMessage = async (req, res) => {
    try {
        const { groupId, content } = req.body;
        const senderId = req.user; // Récupérer l'ID de l'utilisateur authentifié

        // Vérification des champs obligatoires
        if (!groupId || !content) {
            return res.status(400).json({ message: 'Group ID and Content are required' });
        }

        const userId = senderId; // ID de l'utilisateur authentifié
        // Vérifie si l'utilisateur est membre du groupe
        const isUserMember = await groupMembershipModel.exists({ userId, groupId });

        // Si l'utilisateur n'est pas membre et n'est pas administrateur, renvoie une erreur Unauthorized
        if (!isUserMember && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }

        const newGroupMessage = await groupMessageModel.create({ groupId, senderId, content });
        res.status(201).json(newGroupMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating group message', error });
    }
};


exports.updateGroupMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        // Vérification si le message existe et appartient à l'utilisateur
        const existingGroupMessage = await groupMessageModel.findById(id);
        if (!existingGroupMessage) {
            return res.status(404).json({ message: 'Group message not found' });
        }
        if (existingGroupMessage.senderId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'does not belong to the user' });
        }
        // Mise à jour du message de groupe
        const updatedGroupMessage = await groupMessageModel.findByIdAndUpdate(id, { content }, { new: true });
        if (!updatedGroupMessage) {
            return res.status(404).json({ message: 'Group message not found' });
        }

        res.json(updatedGroupMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating group message', error });
    }
};


exports.deleteGroupMessage = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Vérification si le message existe et appartient à l'utilisateur
        const existingGroupMessage = await groupMessageModel.findById(id);
        if (!existingGroupMessage || existingGroupMessage.senderId !== req.user) {
            return res.status(404).json({ message: 'Group message not found or does not belong to the user' });
        }

        const deletedGroupMessage = await groupMessageModel.findByIdAndDelete(id);
        if (!deletedGroupMessage) return res.status(404).json({ message: 'Group message not found' });
        res.json({ message: 'Group message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group message', error });
    }
};
