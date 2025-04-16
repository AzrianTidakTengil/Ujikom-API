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
const AddressShop = require('../models').AddressShop
const Otp = require('../models').OTP
const passport = require('passport');
const { transporter } = require('../config/tranposteremail.js');

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
            telephone: null,
            password: CryptoJS.AES.encrypt(req.body.password, config.secretKey).toString(),
            gender: req.body.gender,
            role_id: role.id
        })

        // if (role.id === 2) {
        //     const store = await Store.create({
        //         user_id: newUser.id,
        //         name: req.body.name,
        //         description: req.body.description,
        //         address: null,
        //         category_id: null,
        //     })
        // }
        
        res.json({
            status: 'success',
            message: 'register success',
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Error'
        })
    }
}

async function SignIn(req, res, next) {
    try {
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
                    expiresIn: 7*24*60*60
                })
                res.json({
                    status:'success',
                    message: `Succes to login as ${validate.username}`,
                    accessToken: `${token}`
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

async function GoggleSignUp(req, res) {
    try {
        
    } catch (err) {
        console.error(err)
    }
}

async function GoggleSignCallback(req, res) {
    try {
        const user = await Users.findOne({
            where: {
                id: req.user.id,
                password: 'GOOGLE'
            }
        })

        const store = await Store.findOne({
            where: {
                user_id: req.user.id
            }
        })

        if (user) {
            var token = jwt.sign({
                userID: user.id,
                role: user.role_id,
                store: store ? store.id : null
            }, config.secretKey, {
                expiresIn: 7*24*60*60
            })
            res.redirect('http://localhost:3000/')
        } else {
            res.redirect('http://localhost:3000/register/')
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Logout(req, res) {
    try {
        req.logout(() => {
            res.redirect(`http://localhost:3000`)
        })
    } catch (err) {
        console.error(err)
    }
}

async function VerifyEmail(req, res) {
    try {
        const otp = Math.floor(Math.pow(10, 6 - 1) + Math.random() * 9 * Math.pow(10, 6 - 1)).toString();
        const date = new Date

        const createOtp = await Otp.create({
            code: otp
        })
        
        const emailOTP = await transporter.sendMail({
            from: 'informationpopping@gmail.com',
            to: req.body.email,
            subject: 'Your OTP code is here - Popping Ecommerce',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Your Verification Code</title>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f6f8;
                        margin: 0;
                        padding: 0;
                        }
                        .container {
                        max-width: 480px;
                        margin: 40px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                        }
                        .otp-code {
                        font-size: 32px;
                        font-weight: bold;
                        color: #333;
                        letter-spacing: 4px;
                        text-align: center;
                        margin: 20px 0;
                        }
                        .footer {
                        font-size: 12px;
                        color: #888;
                        text-align: center;
                        margin-top: 30px;
                        }
                    </style>
                </head>
                    <body>
                    <div class="container">
                        <h2>Hello ${req.body.email},</h2>
                        <p>Here is your verification code for Popping Ecommerce:</p>

                        <div class="otp-code">${otp}</div>

                        <p>Please do not share it with anyone.</p>

                        <p>This code will expire in <strong>5 minutes</strong>. If you did not request this code, you can safely ignore this message.</p>

                        <div class="footer">
                        &copy; ${date.getFullYear()} Popping Ecommerce. All rights reserved.
                        </div>
                    </div>
                    </body>
                </html>
            `
        })

        res.json({
            status: 'success',
            message: 'Send code otp',
            data: {
                time: new Date()
            }
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function verifyOTP(req, res) {
    try {
        const code = await Otp.findOne({
            where: {
                code: req.body.code
            }
        })

        if (code) {
            Otp.destroy({
                where: {
                    code: req.body.code
                }
            })

            res.json({
                status: 'success',
                message: 'code otp is right'
            })
        } else {
            res.status(401).json({
                status: 'failed',
                message: 'Code OTP is wrong'
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function ChangeToShop(req, res) {
    try {
        const addressShop = await AddressShop.create({
            address: req.body.address,
            district: req.body.district,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            postal_code: 0,
            latitude: 0,
            longtitude: 0,
        })

        const shop = await Store.create({
            user_id: req.userID,
            name: req.body.name,
            description: req.body.description,
            address: addressShop.id,
            category_id: 0
        })

        const user = await Users.update({
            role_id: 2
        }, {
            where: {
                id: req.userID
            }
        })

        res.json({
            status: 'success',
            message: 'Change role to be a seller'
        })
    } catch(err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    SignUp,
    SignIn,
    GoggleSignUp,
    GoggleSignCallback,
    Logout,
    VerifyEmail,
    verifyOTP,
    ChangeToShop,
}