const userModel = require('../../models/user')
/**
 * @description get all users
 * @param req
 * @param res
 * @return {*}
 */


exports.getAll = async (req, res) => {
    try {
        const users = await userModel.find().exec()
        return !users
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN RETRIEVE ALL USERS '})
            :
            res.status(200).json({statusCode: 200, message: users})
    } catch (e) {
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.create = async (req, res) => {
    try {
        const { username, email, firstname, lastname, password } = req.body

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

        const user = await userModel.create({
            username,
            email,
            password,
            firstname,
            lastname,
            user:"user",
        })
        return !user
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN CREATE NEW USER '})
            :
            res.status(200).json({statusCode: 201, message: user})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}


exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        const user = await userModel.findById(id).exec()
        return !user
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR in getby id '})
            :
            res.status(200).json({statusCode: 201, message: user})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.update = async (req, res) => {
    try {
        const { username, email, firstname, lastname, password } = req.body;
        const { id } = req.params;

        // Vérifie que tous les champs requis sont fournis
        if (!username || !email || !firstname || !lastname || !password) {
            return res.status(400).json({ statusCode: 400, message: 'All fields are required' });
        }

        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }

        // Met à jour les informations de l'utilisateur
        const user = await userModel.findByIdAndUpdate(id, {
            username, email, firstname, lastname
        }, { new: true });

        // Renvoie la réponse appropriée en fonction de la réussite ou de l'échec de la mise à jour de l'utilisateur
        return !user
            ? res.status(400).json({ statusCode: 400, message: 'ERROR IN UPDATE USER' })
            : res.status(200).json({ statusCode: 200, message: user });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ statusCode: 500, message: e.message });
    }
};



exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        // Vérifie si l'utilisateur connecté est l'utilisateur ciblé ou un administrateur
        if (id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
        }
        const user = await userModel.findByIdAndDelete(id)
        console.log(user)
        return !user
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN DELETE USER '})
            :
            res.status(200).json({statusCode: 201, message: user})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}