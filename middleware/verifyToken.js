const jwt = require('jsonwebtoken')
const config = require('../config/configRoles')
const User = require('../models').Users

async function verifyToken(req, res, next) {
    const tokenHeader = req.headers['x-access-token']

    if (tokenHeader) {
        const token = tokenHeader.split(' ')
        if (token[0] === 'Ujikom') {
            if (!token[1]) {
                return res.status(403).json({
                    status: 'error',
                    message: 'No token provided'
                })
            } else {
                jwt.verify(token[1], config.secretKey, (err, decoded) => {
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
        } else {
            return res.status(500).json({
                status: 'error',
                message: 'Incorret token format'
            })
        }
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Private content'
        })
    }
}


module.exports = {
    verifyToken,
}