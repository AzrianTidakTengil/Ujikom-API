const verify = require('../middleware/verifyToken')
const role = require('../middleware/role')
const store = require('../middleware/store')
const auth = require('../middleware/auth')

module.exports = {
    verify,
    role,
    store,
    auth
}