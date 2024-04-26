const groupMembershipModel = require('../../models/groupMembership');
const friendshipController = require('../../controllers/Friendship');
const chatGroupModel = require('../../models/chatGroup');
const groupMessageModel = require('../../models/groupMessage');


/**
 * @description get all user group
 * @param req
 * @param res
 * @return {*}
 */

exports.getAllGroupMemberships = async (req, res) => {
    try {
        const groupMemberships = await groupMembershipModel.find();
        res.json(groupMemberships);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving group memberships', error });
    }
};

exports.getGroupMembershipById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Group membership ID is required' });
        }
        const groupMembership = await groupMembershipModel.findById(id);
        if (!groupMembership) return res.status(404).json({ message: 'Group membership not found' });
        res.json(groupMembership);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving group membership', error });
    }
};

exports.getGroupMembershipByGroupId = async (req, res) => {
    try {
        const { groupId } = req.params;

        // Vérifie que les deux identifiants sont fournis dans les paramètres de la requête
        if (!groupId) {
            return res.status(400).json({ message: 'Both groupId are required' });
        }

        const groupMembership = await groupMembershipModel.findOne({ groupId });

        if (!groupMembership) {
            return res.status(404).json({ message: 'Group membership not found' });
        }

        res.json(groupMembership);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving group membership', error });
    }
};

exports.createGroupMembership = async (req, res) => {
    try {
        const { userId, groupId, role } = req.body;

        // Vérification de la présence des champs obligatoires dans le corps de la requête
        if (!userId || !groupId || !role) {
            return res.status(400).json({ message: 'UserId, GroupId, and Role are required for creating group membership' });
        }

        // Création du nouveau group membership
        const newGroupMembership = await groupMembershipModel.create(req.body);
        res.status(201).json(newGroupMembership);
    } catch (error) {
        res.status(500).json({ message: 'Error creating group membership', error });
    }
};



exports.updateGroupMembership = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Group membership ID is required' });
        }
        if (!role) {
            return res.status(400).json({ message: 'Role is required for updating group membership' });
        }

        const updatedGroupMembership = await groupMembershipModel.findByIdAndUpdate(id, { role }, { new: true });

        if (!updatedGroupMembership) {
            return res.status(404).json({ message: 'Group membership not found' });
        }

        res.json(updatedGroupMembership);
    } catch (error) {
        res.status(500).json({ message: 'Error updating group membership', error });
    }
};


exports.deleteGroupMembership = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Group membership ID is required' });
        }
        const deletedGroupMembership = await groupMembershipModel.findByIdAndDelete(id);
        if (!deletedGroupMembership) return res.status(404).json({ message: 'Group membership not found' });

        // Vérifie si l'utilisateur était le dernier membre du groupe
        const remainingMembers = await groupMembershipModel.countDocuments({ groupId: deletedGroupMembership.groupId });
        if (remainingMembers === 0) {
            // Supprime tous les messages associés au groupe
            await GroupMessage.deleteMany({ groupId: deletedGroupMembership.groupId });

            // Supprime le groupe de discussion
            await chatGroupModel.findByIdAndDelete(deletedGroupMembership.groupId);
        }

        res.json({ message: 'Group membership deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group membership', error });
    }
};
