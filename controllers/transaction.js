const Transaction = require('../models').Transaction
const Payment = require('../models').Payment
const Products = require('../models').Produtcs
// const Delivery = require('../models').Delivery
const Shipment = require('../models').Shipment
const Trolley = require('../models').Trolley
const LabelShipment = require('../models').LabelShipment
const ItemsTransaction = require('../models').ItemsTransaction

async function List(req, res) {
    try {
        const transaction = await Transaction.findAll({
            where: {
                user_id: req.userID
            }
        })

        res.json({
            status: 'success',
            message: 'get all transaction',
            data: transaction
        })
    } catch (err) {
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
            insurance
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

        const payment = await Payment.create({
            subtotal: 0,
            coupon_payment: coupon_payment,
            fare: fare.min_price,
            coupon_fare: coupon_fare,
            insurance: insurance
        })

        const transaction = await Transaction.create({
            user_id: req.userID,
            trolley_id: 0,
            shipment_id: shipment.id,
            payment_id: payment.id,
            total_price: 0
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
                user_id: trolleysItems.map((val) => parseInt(val.trolley_id))
            },
            include: [
                {
                    model: Products,
                    as: 'trolleyToProduct'
                }
            ]
        })

        const gross_amount = trolley.reduce((acc, val) => acc + (val.trolleyToProduct.price * val.items), 0)
        const finalPayment = await payment.update({
            subtotal: gross_amount
        })
        const finalTransaction = await transaction.update({
            total_price: gross_amount
        })

        res.json({
            status: 'success',
            message: 'create a transaction',
            data: {
                trolley,
                payment: finalPayment,
                transaction: finalTransaction
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
    List,
    Create,
    Destroy
}