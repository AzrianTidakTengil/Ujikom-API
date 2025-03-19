require('dotenv').config()
const { Status } = require('../config/checkingorderstatus.js')
const config = require('../config/configRoles.js')
const jwt = require('jsonwebtoken')
const Store = require('../models').Store
const User = require('../models').Users
const Payment = require('../models').Payment
const Transaction = require('../models').Transaction
const Trolley = require('../models').Trolley
const Products = require('../models').Produtcs
const db = require('../models/index')
const Op = db.Sequelize.Op
const Owner = require('../models').OwnerProduct
const WorkOperation = require('../models').WorkOperation
const dayjs = require('dayjs')

async function BySeller(req, res) {
    try {
        const shop = await User.findOne({
            attributes: [],
            where: {
                id: req.userID
            },
            include: [
                {
                    attributes: ['name', 'description', 'address', 'postcode'],
                    model: Store,
                    as: 'userToStore'
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'Information Shop',
            data: shop.userToStore
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error: selle not found'
        })
    }
}

async function Add(req, res) {
    try {
        const newStore = await Store.create({
            user_id: req.userID,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            postcode: req.body.postcode,
            category_id: 0,
        })

        var token = jwt.sign({
            userID: req.userID,
            role: req.role,
            store: newStore
        }, config.secretKey, {
            expiresIn: 86400
        })

        res.json({
            status: 'success',
            message: 'create store',
            data: newStore,
            accessToken: `UjiKom ${token}`
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
        const updateStore = await Store.update({
            // user_id: req.userID,
            name: req.body.name,
            description: req.body.description,
            // address: req.body.address,
            // postcode: req.body.postcode,
            // category_id: 0,
        }, {
            where: {
                user_id: req.userID
            }
        })
        res.json({
            status: 'success',
            message: 'update information store'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Balance(req, res) {
    try {
        Status()
        const transaction  = await Transaction.findAll({
            attributes: ['id', 'updatedAt'],
            include: [
                {
                    attributes: ['id', 'order_id', 'payment_method', 'subtype', 'status'],
                    model: Payment,
                    as: 'transactionToPayment',
                    where: {
                        status: 'settlement'
                    }
                },
                {
                    attributes: ['product_id', 'items'],
                    model: Trolley,
                    as: 'transactionToTrolley',
                    include: [
                        {
                            attributes: ['name', 'price'],
                            model: Products,
                            as: 'trolleyToProduct',
                            include: [
                                {
                                    attributes: [],
                                    model: Owner,
                                    as: 'productToOwner',
                                    include: [
                                        {
                                            attributes: ['name', 'description', 'address', 'postcode'],
                                            model: Store,
                                            as: 'ownerToStore',
                                            where: {
                                                user_id: req.userID
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    through: {
                        attributes: [],
                    },
                }
            ]
        })

        const totalBalance = transaction.reduce((acc, order) => acc + (order.transactionToTrolley.reduce((a, val) => a + (val.items * val.trolleyToProduct.price), 0)), 0)

        res.json({
            status: 'success',
            message: 'Balance shop information',
            data: {
                balance: totalBalance,
                transaction
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function InTrolley(req, res) {
    try {
        const product = await Products.findAll({
            include: [
                {
                    model: Trolley,
                    as: 'productToTrolley'
                },
                {
                    attributes: [],
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            attributes: ['name', 'description', 'address', 'postcode'],
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

        const countInTrolley = product.reduce((acc, val) => acc + val.productToTrolley.length, 0)

        res.json({
            status: 'success',
            message: 'Product in trolley',
            data: {
                count: countInTrolley,
                product
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Order(req, res) {
    try {
        const transaction = await Transaction.findAll({
            limit: req.body.limit,
            offset: req.body.offset,
            attributes: ['id', 'updatedAt'],
            include: [
                {
                    attributes: ['id', 'order_id', 'payment_method', 'subtype', 'status'],
                    model: Payment,
                    as: 'transactionToPayment',
                    where: {
                        status: 'settlement'
                    }
                },
                {
                    attributes: ['product_id', 'items'],
                    model: Trolley,
                    as: 'transactionToTrolley',
                    include: [
                        {
                            attributes: ['name', 'price'],
                            model: Products,
                            as: 'trolleyToProduct',
                            include: [
                                {
                                    attributes: [],
                                    model: Owner,
                                    as: 'productToOwner',
                                    include: [
                                        {
                                            attributes: ['name', 'description', 'address', 'postcode'],
                                            model: Store,
                                            as: 'ownerToStore',
                                            where: {
                                                user_id: req.userID
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    through: {
                        attributes: [],
                    },
                }
            ]
        })

        const length_order_process = await Transaction.count({
            include: [
                {
                    model: Payment,
                    as: 'transactionToPayment',
                    where: {
                        status: 'settlement'
                    }
                },
                {
                    model: Trolley,
                    as: 'transactionToTrolley',
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
                                            as: 'ownerToStore',
                                            where: {
                                                user_id: req.userID
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    through: {
                        attributes: [],
                    },
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'List Order Product',
            data: {
                length_order_process,
                transaction
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

async function Operation(req, res) {
    try {
        const [operation, isCreate] = await WorkOperation.findOrCreate({
            where: {
                store_id: req.userID
            },
            default: {
                store_id: req.userID,
                monday: `${dayjs().hour(8).minute(0)}-${dayjs().hour(17).minute(0)}`,
                tuesday: `${dayjs().hour(8).minute(0)}-${dayjs().hour(17).minute(0)}`,
                weknesday: `${dayjs().hour(8).minute(0)}-${dayjs().hour(17).minute(0)}`,
                thursday: `${dayjs().hour(8).minute(0)}-${dayjs().hour(17).minute(0)}`,
                friday: `${dayjs().hour(8).minute(0)}-${dayjs().hour(17).minute(0)}`,
                saturday: `${dayjs().hour(8).minute(0)}-${dayjs().hour(15).minute(0)}`,
                sunday: `holiday`,
            }
        })

        if (isCreate) {
            operation.update({
                monday: `${dayjs().hour(8).minute(0).format('HH:mm')}-${dayjs().hour(17).minute(0).format('HH:mm')}`,
                tuesday: `${dayjs().hour(8).minute(0).format('HH:mm')}-${dayjs().hour(17).minute(0).format('HH:mm')}`,
                weknesday: `${dayjs().hour(8).minute(0).format('HH:mm')}-${dayjs().hour(17).minute(0).format('HH:mm')}`,
                thursday: `${dayjs().hour(8).minute(0).format('HH:mm')}-${dayjs().hour(17).minute(0).format('HH:mm')}`,
                friday: `${dayjs().hour(8).minute(0).format('HH:mm')}-${dayjs().hour(17).minute(0).format('HH:mm')}`,
                saturday: `${dayjs().hour(8).minute(0).format('HH:mm')}-${dayjs().hour(15).minute(0).format('HH:mm')}`,
                sunday: `holiday`,
            })
        }

        res.json({
            status: 'success',
            message: 'hour work operation shop',
            data: operation
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

module.exports = {
    Add,
    Update,
    BySeller,
    Balance,
    InTrolley,
    Order,
    Operation,
}