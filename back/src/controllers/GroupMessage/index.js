const groupMessageModel = require('../../models/groupMessage');

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

exports.createGroupMessage = async (req, res) => {
    try {
        const { groupId, content } = req.body;
        const senderId = req.user; // Récupérer l'ID de l'utilisateur authentifié

        // Vérification des champs obligatoires
        if (!groupId || !content) {
            return res.status(400).json({ message: 'Group ID and Content are required' });
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
        if (!existingGroupMessage || existingGroupMessage.senderId !== req.user) {
            return res.status(404).json({ message: 'Group message not found or does not belong to the user' });
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
        const deletedGroupMessage = await groupMessageModel.findByIdAndDelete(req.params.id);
        if (!deletedGroupMessage) return res.status(404).json({ message: 'Group message not found' });
        res.json({ message: 'Group message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group message', error });
    }
};
