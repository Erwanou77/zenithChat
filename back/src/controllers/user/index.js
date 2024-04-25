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
        const { username, email, firstname, lastname } = req.body
        const { id } = req.params
        const user = await userModel.findByIdAndUpdate(id, {
            username, email, firstname, lastname
        }, {}).exec()
        return !user
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN UPDATE USER '})
            :
            res.status(200).json({statusCode: 201, message: user})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}
exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
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