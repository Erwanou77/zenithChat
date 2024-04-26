const friendshipModel = require('../../models/friendship');
const { login } = require('../auth');

/**
 * @description get all demande amis
 * @param req
 * @param res
 * @return {*}
 */

exports.getAllFriendships = async (req, res) => {
    try {
        const friendships = await friendshipModel.find();
        res.json(friendships);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving friendships', error });
    }
};

exports.getFriendshipById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Friendship ID is required' });
        }
        const friendship = await friendshipModel.findById(id);
        if (!friendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }
        res.json(friendship);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving friendship', error });
    }
};

exports.getFriendRequestsByRequesterId = async (req, res) => {
    try {
        const { requesterId } = req.params;
        if (!requesterId) {
            return res.status(400).json({ message: 'Requester ID is required' });
        }
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (requesterId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        const friendRequests = await friendshipModel.find({ requesterId });
        res.json(friendRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving friend requests by requester ID', error });
    }
};

exports.getFriendRequestsByAddresseeId = async (req, res) => {
    try {
        const { addresseeId } = req.params;
        if (!addresseeId) {
            return res.status(400).json({ message: 'Addressee ID is required' });
        }
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (addresseeId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        const friendRequests = await friendshipModel.find({ addresseeId });
        res.json(friendRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving friend requests by addressee ID', error });
    }
};

exports.createFriendship = async (req, res) => {
    try {
        const { requesterId, addresseeId, status } = req.body;
        if (!requesterId || !addresseeId || !status) {
            return res.status(400).json({ message: 'Requester ID, Addressee ID, and Status are required' });
        }
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (requesterId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        const newFriendship = await friendshipModel.create(req.body);
        res.status(201).json(newFriendship);
    } catch (error) {
        res.status(500).json({ message: 'Error creating friendship', error });
    }
};

exports.updateFriendship = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Friendship ID is required' });
        }
        const friendship = await friendshipModel.findById(id);
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (friendship.requesterId.toString() !== req.user.id && friendship.addresseeId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        const updatedFriendship = await friendshipModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFriendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }
        res.json(updatedFriendship);
    } catch (error) {
        res.status(500).json({ message: 'Error updating friendship', error });
    }
};

exports.deleteFriendship = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Friendship ID is required' });
        }
        const friendship = await friendshipModel.findById(id);
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (friendship.requesterId.toString() !== req.user.id && friendship.addresseeId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        const deletedFriendship = await friendshipModel.findByIdAndDelete(id);
        if (!deletedFriendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }
        res.json({ message: 'Friendship deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting friendship', error });
    }
};
