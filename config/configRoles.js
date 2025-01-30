require('dotenv').config()

module.exports = {
    secretKey: process.env.SECRET,
    roles: ['user', 'seller', 'admin']
}