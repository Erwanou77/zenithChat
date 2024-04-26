const messageModel = require('../../models/message');

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
        const message = await messageModel.findById(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving message', error });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const newMessage = await messageModel.create(req.body);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await messageModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message', error });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await messageModel.findByIdAndDelete(req.params.id);
        if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error });
    }
};
