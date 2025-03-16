const Produtcs = require('../models').Produtcs
const Owner = require('../models').OwnerProduct
const Mark = require('../models').LabelProduct
const Store = require('../models').Store
const Label = require('../models').Labels
const db = require('../models/index')
const Op = db.Sequelize.Op
const Trolley = require('../models').Trolley
const Transaction = require('../models').Transaction


async function All(req, res) {
    try {
        const produts = await Produtcs.findAll({
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            model: Store,
                            as: 'ownerToStore'
                        }
                    ]
                }
            ]
        })

        const total_products = await Produtcs.count()

        res.json({
            status: 'success',
            message: 'Get all produts',
            data: produts,
            total_products
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function One(req, res) {
    try {
        const product = await Produtcs.findOne({
            where: {
                id: req.body.id
            },
            include: [
                {
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            model: Store,
                            as: 'ownerToStore'
                        }
                    ]
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'Get a product',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Find(req, res) {
    try {
        const {product, category = null} = req.body

        const find = await Produtcs.findAll({
            where: {
                name: {
                    [Op.substring]: req.body.name
                }
            },
            include: [
                {
                    model: Mark,
                    as: 'productToLabel',
                    where: {
                        label_id: {
                            [Op.or]: req.body.category
                        }
                    }
                },{
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            model: Store,
                            as: 'ownerToStore'
                        }
                    ]
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'Get data with association',
            data: find
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error: query error'
        })
    }
}

async function Create(req, res) {
    try {
        const newProduct = await Produtcs.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        })

        const signProduct = await Owner.create({
            store_id: req.body.store_id,
            product_id: newProduct.id
        })

        if (newProduct) {
            res.json({
                status: 'success',
                message: 'add product to store',
                data: newProduct,
                owner: signProduct
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

async function Destroy(req, res) {
    try {
        const destroy = await Produtcs.destroy({
            where: {
                id: req.body.id
            }
        })

        const destroyOwnerProduct = await Owner.destroy({
            where: {
                product_id: req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'destroy product from store'
        })
    } catch (err) {
        res.json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

async function Update(req, res) {
    try {
        const edit = await Produtcs.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'update detail data product',
            data: edit
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

async function MarkProduct(req, res) {
    try {
        const {product, labels} = req.body
        const created = []
        const deleted = []
        const areNotInList = await Mark.findAll({
            where: {
                [Op.and]: [
                    {
                        product_id: product
                    }, {
                        label_id: {
                            [Op.notIn]: labels
                        }
                    }
                ]
            }
        })

        const listProduct = await Mark.findAll({
            where: {
                product_id: product
            }
        })

        const selection = labels.filter((val) => !listProduct.map((my) => parseInt(my.label_id)).includes(val))

        if (selection) {
            for (var label of selection) {
                const newLabel = await Mark.create({
                    product_id: product,
                    label_id: label
                })
                created.push(newLabel)
            }
        }
        if (areNotInList) {
            const destroy = await Mark.destroy({
                where: {
                    product_id: req.body.product,
                    label_id: areNotInList.map((x) => x.label_id)
                }
            })
            deleted.push(destroy)
        }

        res.json({
            status: 'success',
            message: 'mark a product',
            data: [
                created,
                deleted
            ]
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

async function Popular(req, res) {
    try {
        const topProduct = await Produtcs.findAll({
            limit: 10,
            attributes: ['name'],
            include: [
                {
                    model: Trolley,
                    as: 'productToTrolley',
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'Product popular',
            data: topProduct
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error: cannot find popular'
        })
    }
}

async function MyStore(req, res) {
    try {
        const product = await Produtcs.findAll({
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            model: Store,
                            as: 'ownerToStore',
                            where: {
                                user_id: req.userID
                            }
                        }
                    ]
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'Product in your store',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

module.exports = {
    All,
    One,
    Find,
    Create,
    Destroy,
    Update,
    MarkProduct,
    Popular,
    MyStore
}