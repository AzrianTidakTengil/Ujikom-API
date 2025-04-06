const { Sequelize, Op } = require('sequelize')
const KeywordProduct = require('../models').KeywordProduct

class Product {
    static async Create(req, res) {
        try {
            const keyword = await KeywordProduct.create({
                label: req.body.keyword,
                user_id: req.userID
            })

            res.json({
                status: 'success',
                message: 'create keyword product'
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                status: 'error',
                message: 'find a product'
            })
        }
    }

    static async Keyword(req, res) {
        try {
            const history = await KeywordProduct.findAll({
                where: {
                    [Op.and]: [
                        {
                            label: {
                                [Op.substring] : Boolean(req.body.keyword) ? req.body.keyword : null
                            },
                        },
                        {
                            user_id: req.userID
                        }
                    ]
                },
                group: ['label']
            })

            const find = await KeywordProduct.findAll({
                where: {
                    label: {
                        [Op.substring]: Boolean(req.body.keyword) ? req.body.keyword : null
                    },
                    user_id: {
                        [Op.is]: null
                    }
                },
                group: ['label']
            })

            const popular = await KeywordProduct.findAll({
                attributes: [
                    'id',
                    'label',
                    [Sequelize.fn('COUNT', Sequelize.col('label')), 'count']
                ],
                group: ['label'],
                order: [[Sequelize.literal('count'), 'DESC']],
                limit: 5
            })

            const result = [
                ...[
                    ...history.map((k) => ({id: k.id, label: k.label, status: 'history'})),
                    ...find.map((k) => ({id: k.id, label: k.label, status: null})),
                ].sort((a, b) => a.label.localeCompare(b.label)),
                ...popular.map((k) => ({id: k.id, label: k.label, status: 'popular'}))
            ]

            res.json({
                status: 'success',
                message: 'keywords',
                data: result
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                status: 'error',
                message: 'find a product'
            })
        }
    }

    static async Delete(req, res) {
        try {
            const keyword = await KeywordProduct.destroy({
                where: {
                    id: req.body.id
                }
            })

            res.json({
                status: 'success',
                message: 'delete a keywords',
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                status: 'error',
                message: 'delete history keyword'
            })
        }
    }
}

module.exports = {
    Product
}