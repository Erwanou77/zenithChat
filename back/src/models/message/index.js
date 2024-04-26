const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: String,
}, {
    timestamps: true // Ajoute automatiquement les champs createdAt et updatedAt
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
