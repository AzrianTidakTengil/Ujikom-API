const Store = require('../models').Store

async function CheckDoubleStore(req, res, next) {
    try {
        const validate = await Store.findOne({
            where: {
                user_id: req.userID
            }
        })
        if (!validate) {
            next()
        } else {
            res.status(403).json({
                status: 'failed',
                message: 'Store has created with this account'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    CheckDoubleStore
}