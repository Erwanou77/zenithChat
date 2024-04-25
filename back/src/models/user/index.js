const mongoose = require('mongoose');
const bcrypt = require('../../utils/bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        default: 'user', 
        enum: ['user', 'admin']
    }
}, {
    timestamps: true
});

// Middleware pour hasher le mot de passe avant de le sauvegarder dans la base de données
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hashPassword(user.password); // Utilisez la fonction hashPassword
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Méthode pour comparer les mots de passe hachés avec celui fourni par l'utilisateur lors de la connexion
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.checkPassword(candidatePassword, this.password); // Utilisez la fonction checkPassword
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('User', userSchema, 'users');
