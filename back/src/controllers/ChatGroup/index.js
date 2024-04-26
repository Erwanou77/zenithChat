const chatGroupModel = require('../../models/chatGroup');
const groupMembershipModel = require('../../models/groupMembership');
const groupMessageModel = require('../../models/groupMessage');

/**
 * @description get all chat Group
 * @param req
 * @param res
 * @return {*}
 */

exports.getAllChatGroups = async (req, res) => {
    try {
        const chatGroups = await chatGroupModel.find();
        res.json(chatGroups);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat groups', error });
    }
};

exports.getChatGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Chat group ID is required' });
        }
        const chatGroup = await chatGroupModel.findById(req.params.id);
        if (!chatGroup) return res.status(404).json({ message: 'Chat group not found' });
        res.json(chatGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat group', error });
    }
};

exports.getChatGroupsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }

        // Recherche dans la collection groupMembership pour les groupes auxquels l'utilisateur appartient
        const userGroups = await groupMembershipModel.find({ userid: id }).select('groupid');

        // Récupération des détails de chaque groupe de discussion
        const chatGroups = await Promise.all(userGroups.map(async (userGroup) => {
            const group = await chatGroupModel.findById(userGroup.groupid);
            return group;
        }));

        res.json(chatGroups);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat groups by user ID', error });
    }
};

exports.createChatGroup = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required for creating chat group' });
        }

        // Vérifie si un groupe avec le même nom existe déjà
        const existingGroup = await chatGroupModel.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ message: 'A chat group with this name already exists' });
        }

        // Crée le nouveau groupe de discussion
        const newChatGroup = await chatGroupModel.create(req.body);

        // Récupère l'ID du nouveau groupe de discussion
        const groupId = newChatGroup._id;

        // Récupère l'ID de l'utilisateur connecté
        const userId = req.user.id;

        // Crée l'entrée dans la table de membership pour l'utilisateur créateur
        await groupMembershipModel.create({
            userId: userId,
            groupId: groupId,
            role: "admin",
        });

        res.status(201).json(newChatGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat group', error });
    }
};



exports.updateChatGroup = async (req, res) => {
    try {
        // Vérifie d'abord si l'utilisateur est membre du groupe ou un administrateur
        const isMember = await groupMembershipModel.exists({ groupId: req.params.id, userId: req.user.id });
        if (!isMember && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to modify this chat group' });
        }
        const { id } = req.params;
        const { name } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Chat group ID is required' });
        }
        if (!name) {
            return res.status(400).json({ message: 'Name is required for updating chat group' });
        }

        const updatedChatGroup = await chatGroupModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedChatGroup) return res.status(404).json({ message: 'Chat group not found' });
        res.json(updatedChatGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error updating chat group', error });
    }
};

exports.deleteChatGroup = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Chat group ID is required' });
        }

        // Vérifie d'abord si l'utilisateur est membre du groupe ou un administrateur
        const isMember = await groupMembershipModel.exists({ groupId: id, userId: req.user.id });
        if (!isMember && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this chat group' });
        }

        // Vérifie le nombre total de membres dans le groupe
        const totalMembers = await groupMembershipModel.countDocuments({ groupId: id });
        if (totalMembers === 0 || req.user.role == 'admin') {
            // Supprime les messages de groupe associés
            await GroupMessage.deleteMany({ groupId: id });

            // Supprime le groupe de discussion
            const deletedChatGroup = await chatGroupModel.findByIdAndDelete(id);
            if (!deletedChatGroup) {
                return res.status(404).json({ message: 'Chat group not found' });
            }

            return res.json({ message: 'Chat group deleted successfully' });
        } else {
            return res.status(400).json({ message: 'Cannot delete chat group. Other members are still in the group' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting chat group', error });
    }
};

