
const cinemaModel = require("../../models/cinema");
/**
 * @description get all products
 * @param req
 * @param res
 * @return {*}
 */

exports.getAll = async (req, res) => {
    try {
        const cinemas = await cinemaModel.find().exec()
        return !cinemas
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN RETRIEVE ALL cinemas '})
            :
            res.status(200).json({statusCode: 200, message: cinemas})
    } catch (e) {
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.create = async (req, res) => {
    try {
        const { title, genre, isVisible, userId } = req.body
        const cine = await cinemaModel.create({
            title,
            genre,
            isVisible,
            userId,
        })
        return !cine
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN CREATE NEW CINE '})
            :
            res.status(200).json({statusCode: 201, message: cine})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}


exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const cine = await cinemaModel.findById(id).exec()
        return !cine
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR in getby id '})
            :
            res.status(200).json({statusCode: 201, message: cine})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.update = async (req, res) => {
    try {
        const { title, genre, isVisible } = req.body
        const { id } = req.params
        const cine = await cinemaModel.findByIdAndUpdate(id, {
            title, genre, isVisible
        }, {}).exec()
        return !cine
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN UPDATE CINE '})
            :
            res.status(200).json({statusCode: 201, message: cine})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}
exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const cine = await cinemaModel.findByIdAndDelete(id)
        console.log(cine)
        return !cine
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN DELETE CINE '})
            :
            res.status(200).json({statusCode: 201, message: cine})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

