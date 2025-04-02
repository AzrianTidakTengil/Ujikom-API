const auth = require('../controllers/auth')
const produtcs = require('../controllers/product')
const label = require('../controllers/label')
const store = require('../controllers/store')
const labelStore = require('../controllers/labelStore')
const delivery = require('../controllers/delivery')
const trolley = require('../controllers/trolley')
const transaction = require('../controllers/transaction')
const user = require('../controllers/user')
const address = require("../controllers/address")
const image = require("../controllers/image")

module.exports = {
    auth,
    produtcs,
    label,
    store,
    labelStore,
    delivery,
    trolley,
    transaction,
    user,
    address,
    image
}