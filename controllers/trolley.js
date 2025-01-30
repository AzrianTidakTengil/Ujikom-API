const Trolley = require('../models').Trolley
const Products = require('../models').Produtcs
const db = require('../models/index')
const Op = db.Sequelize.Op

async function List(req, res) {
    try {
        const trolley =  await Trolley.findAll({
            where: {
                user_id: req.userID
            },
            include: [
                {
                    model: Products,
                    as: 'trolleyToProduct'
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'trolley user',
            data: trolley,
            price: trolley.reduce((acc, val) => acc + (val.trolleyToProduct.price * val.items), 0)
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Create(req, res) {
    try {
        const trolley = []
        for (var product of req.body.products) {
            const item = await Trolley.create({
                user_id: req.userID,
                product_id: product.id,
                items: product.items,
            })
            trolley.push(item)
        }
        res.json({
            status: 'success',
            message: 'create a item in trolley',
            data: trolley
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
        const trolley = await Trolley.update({
            user_id: req.userID,
            product_id: req.body.product,
            items: req.body.items
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'update item trolley'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid Server Error'
        })
    }
}

async function Destroy(req, res) {
    try {
        const trolley = await Trolley.destroy({
            where: {
                id: req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'destroy a item'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid Server Error'
        })
    }
}

module.exports = {
    List,
    Create,
    Update,
    Destroy
}