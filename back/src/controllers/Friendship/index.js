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
        const friendships = await friendshipModel.find().populate('requesterId').populate('addresseeId');
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
        const friendRequests = await friendshipModel.find({ requesterId }).populate({
            path: 'requesterId',
            select: 'username'
        }).populate({
            path: 'addresseeId',
            select: 'username'
        });

        // const friendRequests = await friendshipModel.find({ requesterId }).populate('requesterId').populate('addresseeId');
        
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
        console.log(addresseeId);
        // const friendRequests = await friendshipModel.find({ addresseeId }).populate('requesterId').populate('addresseeId');
        const friendRequests = await friendshipModel.find({ addresseeId }).populate({
            path: 'requesterId',
            select: 'username'
        }).populate({
            path: 'addresseeId',
            select: 'username'
        });
        res.json(friendRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving friend requests by addressee ID', error });
    }
};

exports.getFriendRequestsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        console.log(req.user.id);
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }

        // Recherche des demandes d'amis où l'utilisateur spécifié est soit le demandeur soit le destinataire
        const friendRequests = await friendshipModel.find({
            $or: [
                { requesterId: id },
                { addresseeId: id }
            ]
        }).populate({
            path: 'requesterId',
            select: 'username'
        }).populate({
            path: 'addresseeId',
            select: 'username'
        });

        // Construire une réponse personnalisée
        // const customResponse = friendRequests.map(request => {
        //     const { _id, requesterId, addresseeId, status } = request;
        //     const isUserRequester = requesterId.toString() === id;
        //     const friendId = isUserRequester ? requesterId : addresseeId;
        //     const userRequester = isUserRequester ? addresseeId : requesterId;
        //     return {
        //         friendRequestId: _id,
        //         UserRequester: userRequester,
        //         friendId: friendId,
        //         status: status
        //     };
        // });

        res.json(friendRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving friend requests by user ID', error });
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
