const Transaction = require('../models').Transaction
const Payment = require('../models').Payment
const Products = require('../models').Produtcs
// const Delivery = require('../models').Delivery
const Shipment = require('../models').Shipment
const Trolley = require('../models').Trolley
const LabelShipment = require('../models').LabelShipment
const ItemsTransaction = require('../models').ItemsTransaction
const Users = require('../models').Users
const midtransClient = require('midtrans-client') 
const db = require('../models/index')
const Op = db.Sequelize.Op

async function One(req, res) {
    try {
        const {id} = req.body

        const transaction = await Transaction.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Payment,
                    as: 'transactionToPayment'
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'get a transaction',
            data: {
                transaction
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

async function Find(req, res) {
    try {
        const transaction = await Transaction.findAll({
            attributes: ['id', 'total_price', 'payment_type', 'subtype', 'createdAt'],
            order: [
                ['id', 'DESC']
            ],
            limit: req.body.limit,
            offset: req.body.offset,
            where: {
                user_id: req.userID
            },
            include: [
                {
                    attributes: ['id', 'product_id', 'items'],
                    model: Trolley,
                    as: 'transactionToTrolley',
                    include: [
                        {
                            model: Products,
                            as: 'trolleyToProduct',
                            where: {
                                name: {
                                    [Op.substring]: req.body.name
                                }
                            }
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
            message: 'find all transaction',
            data: transaction
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function List(req, res) {
    try {
        const transaction = await Transaction.findAll({
            attributes: ['id', 'total_price', 'payment_type', 'subtype', 'createdAt'],
            order: [
                ['id', 'DESC']
            ],
            limit: req.body.limit,
            offset: req.body.offset,
            where: {
                user_id: req.userID
            },
            include: [
                {
                    attributes: ['id', 'product_id', 'items'],
                    model: Trolley,
                    as: 'transactionToTrolley',
                    include: [
                        {
                            model: Products,
                            as: 'trolleyToProduct'
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
            message: 'get all transaction',
            data: transaction
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            status:'error',
            message: 'Server Internal Server'
        })
    }
}

async function Create(req, res) {
    try {
        const {
            label,
            items,
            coupon_payment,
            coupon_fare,
            insurance,
            method_payment,
            bank = '',
            store = ''
        } = req.body

        const shipment = await Shipment.create({
            label_id: label,
            delivery_id: '0',
            start_date: new Date(),
            end_date: new Date(new Date().getDate() + 3)
        })

        const fare = await LabelShipment.findOne({
            where: {
                id: label
            }
        })

        const user = await Users.findOne({
            where: {
                id: req.userID,
            }
        })

        const transaction = await Transaction.create({
            user_id: req.userID,
            shipment_id: shipment.id,
            payment_id: 0,
            total_price: 0,
            payment_type: method_payment,
            subtype: bank ?? store ?? null
        })

        for (var item of items) {
            const newItemsTransaction = await ItemsTransaction.create({
                transaction_id: transaction.id,
                trolley_id: item
            })
        }

        const trolleysItems = await ItemsTransaction.findAll({
            where: {
                transaction_id: transaction.id,
            }
        })

        const trolley =  await Trolley.findAll({
            where: {
                id: trolleysItems.map((val) => parseInt(val.trolley_id))
            },
            include: [
                {
                    model: Products,
                    as: 'trolleyToProduct'
                }
            ]
        })

        const gross_amount = trolley.reduce((acc, val) => acc + (val.trolleyToProduct.price * val.items), 0)

        const finalTransaction = await transaction.update({
            total_price: gross_amount
        })


        if (method_payment  === 'qris') {
            fetch('https://api.sandbox.midtrans.com/v2/charge', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic U0ItTWlkLXNlcnZlci1reUt5dmVYX1RGQ3VnbGxIQ19WZDE1WVQ6'
                },
                body: JSON.stringify({
                    payment_type: "qris",
                    transaction_details: {order_id: `id-payment-${finalTransaction.id}`, gross_amount: finalTransaction.total_price},
                    customer_details: {
                        first_name: user.firstname,
                        last_name: user.lastname,
                        email: user.email,
                        phone: user.telephone,
                    },
                    custom_expiry: {expiry_duration: 24, unit: 'hour'},
                })
            }).then(res => res.json()).then(data => {
                Payment.create({
                    order_id: data.order_id,
                    payment_method: data.payment_type,
                    subtype: null,
                    payment_code: data.actions[0].url,
                    status: 'pending'
                }).then((data) => {
                    transaction.update({
                        payment_id: data.id
                    })
                    res.json({
                        status: 'success',
                        message: 'create a transaction',
                        data: {
                            trolley,
                            transaction
                        }
                    })
                })
            })
        } else if (method_payment === 'bank_transfer') {
            fetch('https://api.sandbox.midtrans.com/v2/charge', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic U0ItTWlkLXNlcnZlci1reUt5dmVYX1RGQ3VnbGxIQ19WZDE1WVQ6'
                },
                body: JSON.stringify({
                    payment_type: "bank_transfer",
                    bank_transfer: {
                        bank: bank
                    },
                    transaction_details: {order_id: `id-payment-${finalTransaction.id}`, gross_amount: finalTransaction.total_price},
                    customer_details: {
                        first_name: user.firstname,
                        last_name: user.lastname,
                        email: user.email,
                        phone: user.telephone,
                    },
                    custom_expiry: {expiry_duration: 24, unit: 'hour'},
                })
            }).then(res => res.json()).then(payment => {
                Payment.create({
                    order_id: payment.order_id,
                    payment_method: payment.payment_type,
                    subtype: bank,
                    payment_code: bank === 'permata' ? payment.permata_va_number : payment.va_numbers[0].va_number,
                    status: 'pending'
                }).then((data) => {
                    transaction.update({
                        payment_id: data.id
                    })
                    res.json({
                        status: 'success',
                        message: 'create a transaction',
                        data: {
                            trolley,
                            transaction
                        }
                    })
                })
            })
        } else if (method_payment === 'echannel') {
            fetch('https://api.sandbox.midtrans.com/v2/charge', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic U0ItTWlkLXNlcnZlci1reUt5dmVYX1RGQ3VnbGxIQ19WZDE1WVQ6'
                },
                body: JSON.stringify({
                    payment_type: "echannel",
                    echannel : {
                        bill_info1 : "Payment For: ",
                        bill_info2 : "Item Popping E-commerce",
                    },
                    transaction_details: {order_id: `id-payment-${finalTransaction.id}`, gross_amount: finalTransaction.total_price},
                    customer_details: {
                        first_name: user.firstname,
                        last_name: user.lastname,
                        email: user.email,
                        phone: user.telephone,
                    },
                    custom_expiry: {expiry_duration: 24, unit: 'hour'},
                })
            }).then(res => res.json()).then(payment => {
                Payment.create({
                    order_id: payment.order_id,
                    payment_method: payment.payment_type,
                    subtype: null,
                    payment_code: `${payment.bill_key} ${payment.biller_code}`,
                    status: 'pending'
                }).then((data) => {
                    transaction.update({
                        payment_id: data.id
                    })
                    res.json({
                        status: 'success',
                        message: 'create a transaction',
                        data: {
                            trolley,
                            transaction
                        }
                    })
                })
            })
        } else if (method_payment === 'cstore') {
            fetch('https://api.sandbox.midtrans.com/v2/charge', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic U0ItTWlkLXNlcnZlci1reUt5dmVYX1RGQ3VnbGxIQ19WZDE1WVQ6'
                },
                body: JSON.stringify({
                    payment_type: "cstore",
                    cstore: {
                        store: store,
                        message: 'Pembayaran barang Popping Ecommerce'
                    },
                    transaction_details: {order_id: `id-payment-${finalTransaction.id}`, gross_amount: finalTransaction.total_price},
                    customer_details: {
                        first_name: user.firstname,
                        last_name: user.lastname,
                        email: user.email,
                        phone: user.telephone,
                    },
                    custom_expiry: {expiry_duration: 24, unit: 'hour'},
                })
            }).then(res => res.json()).then(payment => {
                Payment.create({
                    order_id: payment.order_id,
                    payment_method: payment.payment_type,
                    subtype: store,
                    payment_code: store === 'indomaret' ? `${payment.merchant_id} ${payment.payment_code}` : payment.payment_code,
                    status: 'pending'
                }).then((data) => {
                    transaction.update({
                        payment_id: data.id
                    })
                    res.json({
                        status: 'success',
                        message: 'create a transaction',
                        data: {
                            trolley,
                            transaction,
                        }
                    })
                })
            })
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Destroy(req, res) {
    try {
        const transaction = await Transaction.findOne({
            where: {
                id: req.body.id
            }
        })

        const payment = await Payment.destroy({
            where: {
                id: transaction.payment_id
            }
        })

        const shipment = await Shipment.destroy({
            where: {
                id: transaction.shipment_id
            }
        })

        const items = await ItemsTransaction.destroy({
            where: {
                transaction_id: req.body.id
            }
        })

        await transaction.destroy()
        
        res.json({
            status: 'success',
            message: 'delete a transaction'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    One,
    Find,
    List,
    Create,
    Destroy
}