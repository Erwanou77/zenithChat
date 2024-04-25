require("dotenv").config()

const passport = require('passport'),
        userModel = require('../../models/user');
const {generateToken} = require("../../utils/generateToken");
// const {hashPassword} = require("../../utils/bcrypt");




exports.signUp = async (req, res) => {
    try {
        const { username, email, firstname, lastname, password } = req.body;

        // Vérifie que tous les champs requis sont fournis
        if (!username || !email || !firstname || !lastname || !password) {
            return res.status(400).json({ statusCode: 400, message: 'All fields are required' });
        }

        // Vérifie si un utilisateur existe déjà avec le même nom d'utilisateur ou la même adresse e-mail
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // Si un utilisateur existe déjà avec le même nom d'utilisateur ou la même adresse e-mail, renvoie une erreur
            return res.status(400).json({ statusCode: 400, message: 'User with this username or email already exists' });
        }


        // Crée un nouvel utilisateur avec le mot de passe crypté
        const newUser = await userModel.create({
            username,
            email,
            password,
            firstname,
            lastname,
            role: 'user',
        });

        // Renvoie la réponse appropriée en fonction de la réussite ou de l'échec de la création de l'utilisateur
        return res.status(201).json({ statusCode: 201, message: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
};




exports.login = async (req, res, next) => {

    passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err) {
            return res.status(400).json({ statusCode: 400, message: err.message });
        }
        if (!user) {
            return res.status(422).json({ statusCode: 422, message: info });
        }
        try {
            // Si l'authentification est réussie et que le mot de passe est valide, générez un jeton JWT pour l'utilisateur
            const token = generateToken({
                _id: user.id,
                email: user.email,
                firstname: user.firstname
            });
            
            // Renvoie la réponse avec le jeton JWT et les informations de l'utilisateur
            return res.status(200).json({
                statusCode: 200,
                message: {
                    user: user,
                    token: `Bearer ${token}`
                }
            });
        } catch (error) {
            // En cas d'erreur lors de la génération du jeton JWT ou de la comparaison des mots de passe, renvoie une erreur
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal server error' });
        }
    })(req, res, next);
};

