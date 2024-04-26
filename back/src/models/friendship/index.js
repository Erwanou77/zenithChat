const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addresseeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: String,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true // Ajoute automatiquement les champs createdAt et updatedAt
});

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
