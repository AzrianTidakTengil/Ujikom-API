require('dotenv').config()
const config = require('../config/configRoles.js')
const jwt = require('jsonwebtoken')
const Store = require('../models').Store
const User = require('../models').Users


async function BySeller(req, res) {
    try {
        const shop = await User.findOne({
            attributes: [],
            where: {
                id: req.userID
            },
            include: [
                {
                    attributes: ['name', 'description', 'address', 'postcode'],
                    model: Store,
                    as: 'userToStore'
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'Information Shop',
            data: shop.userToStore
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error: selle not found'
        })
    }
}

async function Add(req, res) {
    try {
        const newStore = await Store.create({
            user_id: req.userID,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            postcode: req.body.postcode,
            category_id: 0,
        })

        var token = jwt.sign({
            userID: req.userID,
            role: req.role,
            store: newStore
        }, config.secretKey, {
            expiresIn: 86400
        })

        res.json({
            status: 'success',
            message: 'create store',
            data: newStore,
            accessToken: `UjiKom ${token}`
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Update(req, res) {
    try {
        const updateStore = await Store.update({
            user_id: req.userID,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            postcode: req.body.postcode,
            category_id: 0,
        }, {
            where: {
                id: req.body.id
            }
        })
        res.json({
            status: 'success',
            message: 'update information store'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    Add,
    Update,
    BySeller
}