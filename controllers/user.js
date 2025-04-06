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

module.exports = {
    GetOne
}