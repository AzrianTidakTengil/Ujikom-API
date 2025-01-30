const Role = require('../models').Roles

async function IsSeller(req, res, next) {
    try {
        const validate = await Role.findOne({
            where: {
                id: req.role
            }
        })
        if (validate.name === 'seller') {
            next()
        } else {
            res.status(500).json({
                status: 'failed',
                message: 'Role is not register'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Role is not seller'
        })
    }
}


async function IsAdmin(req, res, next) {
    try {
        const validate = await Role.findOne({
            where: {
                id: req.role
            }
        })
        if (validate.name === 'admin') {
            next()
        } else {
            res.status(500).json({
                status: 'failed',
                message: 'Role is not register'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Role is not admin'
        })
    }
}

module.exports = {
    IsSeller,
    IsAdmin
}