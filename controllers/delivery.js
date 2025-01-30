const Delivery = require('../models').Delivery
const LabelDelivery = require('../models').LabelDelivery

async function List(req, res) {
    try {
        const delivery = await Delivery.findAll({})
        res.json({
            status: 'success',
            message: 'get inforamtion delivery',
            data: delivery
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
        const delivery = Delivery.create({
            name: req.body.name,
            label_id: req.body.label
        })

        res.json({
            status: 'success',
            message: 'create a delivery',
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Destroy(req, res) {
    try {
        const delivery = await Delivery.destroy({
            where: {
                id:  req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'destroy a delivery',
        })
    } catch (err) {
        res.status(500).json({
            status : 'error',
            message: 'Internal Server Error'
        })
    }
}

class Label {
    static async List(req, res) {
        try {
            const label = await LabelDelivery.findAll({})

            res.json({
                status: 'success',
                message: 'List a label delivery',
                data: label
            })
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            })
        }
    }

    static async Create(req, res) {
        try {
            const label = await LabelDelivery.create({
                name: req.body.name
            })

            res.json({
                status: 'success',
                message: 'create a label delivery',
                data: label
            })
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            })
        }
    }

    static async Update(req, res) {
        try {
            const label = await LabelDelivery.update({
                name: req.body.name
            }, {
                where: {
                    id: req.body.id
                }
            })

            res.json({
                status: 'success',
                message: 'update a label delivery',
                data: req.body.name
            })
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            })
        }
    }

    static async Destroy(req, res) {
        try {
            const name = await LabelDelivery.findOne({where: {id: req.body.id}})
            const label = await LabelDelivery.destroy({
                where: {
                    id: req.body.id
                }
            })

            res.json({
                status: 'success',
                message: 'create a label delivery',
                data: name.name
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            })
        }
    }
}

module.exports = {
    List,
    Create,
    Destroy,
    Label
}