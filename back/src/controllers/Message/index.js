const messageModel = require('../../models/message');
const userModel = require('../../models/user')

/**
 * @description get all message individuel
 * @param req
 * @param res
 * @return {*}
 */


exports.getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Friendship ID is required' });
        }
        const message = await messageModel.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        const { senderId, recipientId } = message;
        if (senderId.toString() !== req.user.id && recipientId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving message', error });
    }
};

exports.getConversation = async (req, res) => {
    try {
        const { senderId, recipientId } = req.params;

        // Vérifie si les identifiants de l'expéditeur et du destinataire sont fournis dans les paramètres de la requête
        if (!senderId || !recipientId) {
            return res.status(400).json({ message: 'Both senderId and recipientId are required' });
        }
        if (senderId !== req.user.id && recipientId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        // Recherche les messages entre l'expéditeur et le destinataire spécifiés
        const conversation = await messageModel.find({
            $or: [
                { senderId: senderId, recipientId: recipientId },
                { senderId: recipientId, recipientId: senderId }
            ]
        }).populate({
            path: 'recipientId',
            select: 'username'
        }).populate({
            path: 'senderId',
            select: 'username'
        });
        

        // Vérifie s'il y a des messages dans la conversation
        if (!conversation || conversation.length === 0) {
            return res.status(404).json({ message: 'No messages found for this conversation' });
        }

        res.json(conversation);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving conversation', error });
    }
};


exports.createMessage = async (req, res) => {
    try {
        const { senderId, recipientId, content } = req.body;

        // Vérifier la présence des champs obligatoires
        if (!senderId || !recipientId || !content) {
            return res.status(400).json({ message: 'Sender ID, recipient ID, and content are required' });
        }
        if (senderId !== req.user.id) {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        // Vérifier si senderId et recipientId correspondent à des utilisateurs existants
        const senderExists = await userModel.exists({ _id: senderId });
        const recipientExists = await userModel.exists({ _id: recipientId });
        if (!senderExists || !recipientExists) {
            return res.status(404).json({ message: 'Sender or recipient not found' });
        }
        console.log({
            senderId,
            recipientId,
            content
        });
        // Vérifier si le message appartient à l'utilisateur qui le crée
        const newMessage = await messageModel.create({
            senderId,
            recipientId,
            content
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Friendship ID is required' });
        }
        const { senderId, recipientId } = await messageModel.findById(id);

        if (senderId !== req.user.id && recipientId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }

        const updatedMessage = await messageModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message', error });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Friendship ID is required' });
        }
        const { senderId, recipientId } = await messageModel.findById(id);

        if (senderId !== req.user.id && recipientId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }

        const deletedMessage = await messageModel.findByIdAndDelete(id);
        if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error });
    }
};

