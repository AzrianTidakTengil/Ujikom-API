const Role = require('../models').Roles
const Users = require('../models').Users

async function IsSeller(req, res, next) {
    try {
        const user = await Users.findOne({
            where: {
                id: req.userID
            }
        })

        const validate = await Role.findOne({
            where: {
                id: user.role_id
            }
        })
        if (validate.name === 'seller') {
            next()
        } else {
            res.status(401).json({
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