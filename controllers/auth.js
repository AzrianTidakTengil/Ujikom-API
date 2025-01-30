require('dotenv').config()
const bcrypt = require('bcryptjs')
const db = require('../models/index')
const jwt = require('jsonwebtoken')
const models = require('../models/index');
const Users = require('../models/index.js').Users
const Roles = require('../models/index.js').Roles
const Store = require('../models').Store
const Op = db.Sequelize.Op
const CryptoJS = require('crypto-js')
const config = require('../config/configRoles.js')

async function SignUp(req, res, next) {
    try {
        const role = await Roles.findOne({where: {name: req.body.role}})
        if (!role) {

        }
        const newUser = await Users.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            telephone: req.body.telephone,
            password: CryptoJS.AES.encrypt(req.body.password, config.secretKey).toString(),
            role_id: role.id
        })

        if (role.id === 2) {
            const store = await Store.create({
                user_id: newUser.id,
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                postcode: req.body.postcode,
                category_id: 0,
            })
        }
        
        res.json({
            status: 'success',
            message: 'register success',
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error'
        })
    }
}

async function SignIn(req, res, next) {
    try {
        console.log(req.body)
        const validate = await Users.findOne({
            where: {
                [Op.or]: {
                    email: req.body.user,
                    telephone: req.body.user
                }
            }
        })
        if (!validate) {
            res.status(400).json({
                status:'failed',
                message:'Invalid Email or telephon'
            })
        }
        else {
            const store = await Store.findOne({
                where: {
                    user_id: validate.id
                }
            })
            const decrypt = CryptoJS.AES.decrypt(validate.password, config.secretKey).toString(CryptoJS.enc.Utf8)
            if (decrypt == req.body.password) {
                var token = jwt.sign({
                    userID: validate.id,
                    role: validate.role_id,
                    store: store
                }, config.secretKey, {
                    expiresIn: 86400
                })
                res.json({
                    status:'success',
                    message: `Succes to login as ${validate.username}`,
                    accessToken: `UjiKom ${token}`
                })
            }
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error Login',
        })
    }
}

module.exports = {
    SignUp,
    SignIn
}