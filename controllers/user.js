const Users = require('../models').Users
const Store = require('../models').Store

async function GetOne(req, res) {
    try {
        const user = await Users.findOne({
            attributes: ['username', 'firstname', 'lastname', 'email', 'telephone', 'avatar'],
            where: {
                id: req.userID
            },
            include: [
                {
                    model: Store,
                    as: 'userToStore'
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'get all transaction',
            data: user
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Password(req, res) {
    try {
        const user = await Users.update({
            password: req.body.password,
        }, {
            where: {
                id: req.userID
            }
        })
    } catch(err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    GetOne,
    Password
}