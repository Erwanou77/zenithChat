const mongoose = require('mongoose');

const groupMembershipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatGroup',
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['member', 'admin'],
        default: 'member'
    }
}, {
    timestamps: { createdAt: 'joinedAt' }
});

const GroupMembership = mongoose.model('GroupMembership', groupMembershipSchema);

module.exports = GroupMembership;
