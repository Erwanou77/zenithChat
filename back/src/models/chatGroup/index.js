const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Ajoute automatiquement les champs createdAt et updatedAt
});

const ChatGroup = mongoose.model('ChatGroup', chatGroupSchema);

module.exports = ChatGroup;
