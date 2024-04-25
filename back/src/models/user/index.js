const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user', // Par défaut, le rôle est défini sur 'user'
        enum: ['user', 'admin'] // Définition des valeurs autorisées pour le champ "role"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema, 'users');