const jwt = require('jsonwebtoken')
const config = require('../config/configRoles')
const User = require('../models').Users

async function verifyToken(req, res, next) {
    let tokenHeader = req.headers['x-access-token']

    if (tokenHeader.split(' ')[0] != 'UjiKom') {
        return res.status(500).json({
            status: 'error',
            message: 'Incorret token format'
        })
    }

    let token = tokenHeader.split(' ')[1]

    if (!token) {
        return res.status(403).json({
            status: 'error',
            message: 'No token provided'
        })
    } else {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Internal server error: verify token'
                })
            }
            req.userID = decoded.userID
            req.role = decoded.role
            next()
        })
    }
}


module.exports = {
    verifyToken,
}