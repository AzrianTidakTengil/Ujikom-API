const Users = require('../models/index.js').Users
const db = require('../models/index')
const Otp = require('../models').OTP
const Op = db.Sequelize.Op

async function checkEmail(req, res, next) {
   try {
        const isValid = await Users.findOne({
            where: {
                email: req.body.email
            }
        })
        if (isValid) {
            res.status(401).json({
                status: 'failed',
                message: 'email or telephone are ready taken'
            })
        } else {
            next()
        }
   } catch (err) {
    console.log(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
   }
}

async function IsAuthenticated(req, res, next) {
    try {
        if (req.isAuthenticated()) {
            next()
        }
        res.status(401).json({
            status: 'error',
            message: 'Not authenticated'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function ClearExpireOTP(req, res, next) {
    try {
        const code = await Otp.findAll({})

        for (var c of code) {
            const otpTime = new Date(c.createdAt);
            const now = new Date();

            const diffInMs = now - otpTime; // difference in milliseconds
            const diffInMinutes = diffInMs / (1000 * 60); // convert to minutes

            if (diffInMinutes > 5) {
                Otp.destroy({
                    where: {
                        code: c.code
                    }
                })
            } 
        }

        next()
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    checkEmail,
    IsAuthenticated,
    ClearExpireOTP
}