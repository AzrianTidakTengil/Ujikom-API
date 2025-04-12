const Trolley = require('../models').Trolley
const Products = require('../models').Produtcs
const Owner = require('../models').OwnerProduct
const Store = require('../models').Store
const db = require('../models/index')
const Op = db.Sequelize.Op
const { Sequelize } = require('sequelize')
const ProductsImage = require('../models').ProductsImage
const ProductVariant = require('../models').ProductVariant
const TipeVariant = require('../models').TipeVariant
const TipeSubVariant = require('../models').TipeSubVariant
const ProductSubvariant = require('../models').ProductSubvariant

async function All(req, res) {
    try {
        const trolley = await Trolley.findAll({
            where: {
                id: req.body.id
            },
            include: [
                {
                    model: Products,
                    as: 'trolleyToProduct',
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
                }
            ],
        })

        res.json({
            status: 'success',
            message: 'get a some trolley',
            data: trolley
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function List(req, res) {
    try {
        const trolley =  await Trolley.findAll({
            where: {
                user_id: req.userID
            },
            include: [
                {
                    model: Products,
                    as: 'trolleyToProduct',
                    include: [
                        {
                            model: ProductsImage,
                            as: 'productToImage'
                        },
                        {
                            model: ProductVariant,
                            as: 'productToProductVariant',
                            include: [
                                {
                                    model: TipeVariant,
                                    as: 'productVariantToVariant'
                                },
                                {
                                    model: ProductSubvariant,
                                    as: 'productVariantToSubVariant',
                                    include: [
                                        {
                                            model: TipeSubVariant,
                                            as: 'subVariantTosubVariant'
                                        }
                                    ]
                                }
                            ]
                        },
                    ],
                }
            ],
        })

        res.json({
            status: 'success',
            message: 'trolley user',
            data: trolley,
            price: trolley.reduce((acc, val) => acc + (val.trolleyToProduct.price * val.items), 0)
        })
    } catch (err) {
        console.error(err)
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
            const inTrolley = await Trolley.findOne({
                where: {
                    product_id: product.id
                }
            })

            if (inTrolley) {
                inTrolley.update({
                    items: inTrolley.items + product.items
                })
            } else {
                const item = await Trolley.create({
                    user_id: req.userID,
                    product_id: product.id,
                    items: product.items,
                })
                trolley.push(item)
            }
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
    All,
    List,
    Create,
    Update,
    Destroy
}