const Label = require('../models').Labels

async function add(req, res) {
    try {
        const label = await Label.create({
            name: req.body.name
        })

        res.json({
            status: 'success',
            message: 'create a label product',
            data: label
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

async function list(req, res) {
    try {
        const labels = await Label.findAll({})

        res.json({
            status: 'success',
            message: 'get all label product',
            data: labels
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}

module.exports = {
    add,
    list
}