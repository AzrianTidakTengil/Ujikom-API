const Users = require('../models/index.js').Users
const db = require('../models/index')
const Op = db.Sequelize.Op

async function checkEmailOrTel(req, res, next) {
   try {
        const isValid = await Users.findOne({
            where: {
                [Op.or]: {
                    email: req.body.email,
                    telephone: req.body.telephone
                }
            }
        })
        if (isValid) {
            res.status(400).json({
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

module.exports = {
    checkEmailOrTel
}