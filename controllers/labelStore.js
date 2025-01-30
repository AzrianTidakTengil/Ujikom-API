const Label = require('../models').LabelStore
const ListLabel = require('../models').ListLabelStore
const db = require('../models/index')
const Op = db.Sequelize.Op

async function List(req, res) {
    try {
        const labelStore = await Label.findAll({})

        res.json({
            status: 'success',
            message: 'get all label for store',
            data: labelStore
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid Server Error'
        })
    }
}

async function Create(req, res) {
    try {
        const newLabel = await Label.create({
            name: req.body.name,
            description: req.body.description
        })
        res.json({
            status: 'success',
            message: 'create label store',
            data: newLabel
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid Server Error'
        })
    }
}

async function Update(req, res) {
    try {
        const label = await Label.update({
            name: req.body.name,
            description: req.body.description
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'update label store',
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
        const label = await Label.destroy({
            where: {
                id: req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'destroy label store'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Invalid Server Serve'
        })
    }
}

class MyStore {
    static async list(req, res) {
        try {
            const store = await ListLabel.findAll({
                where: {
                    store_id: req.body.store
                }
            })
            // const list = store.map((x) => x.label_id)
            const label = await Label.findAll({
                where: {
                    id: store.map((x) => x.label_id)
                }
            })
            // console.log(list)
            res.json({
                status: 'success',
                message: 'get list label my store',
                data: label
            })
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Invalid Server Error'
            })
        }
    }

    static async add(req, res) {
        try {
            const list = []
            for (var label of req.body.labels) {
                const newLabel = await ListLabel.create({
                    store_id: req.body.store,
                    label_id: label
                })
                list.push(newLabel)
            }
            res.json({
                status: 'success',
                message: 'create label for my store',
                data: list
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status: 'error',
                message: 'Invalid Server Error'
            })
        }
    }

    static async update(req, res) {
        try {
            const {store, labels} = req.body
            const created = []
            const deleted = []
            const areNotInList = await ListLabel.findAll({
                where: {
                    [Op.and]: [
                        {
                            store_id: req.body.store
                        }, {
                            label_id: {
                                [Op.notIn]: req.body.labels
                            }
                        }
                    ]
                }
            })

            const listMyStore = await ListLabel.findAll({
                where: {
                    store_id: req.body.store
                }
            })

            const selection = labels.filter((val) => !listMyStore.map((my) => parseInt(my.label_id)).includes(val))

            if (selection) {
                for (var label of selection) {
                    const newLabel = await ListLabel.create({
                        store_id: store,
                        label_id: label
                    })
                    created.push(newLabel)
                }
            }
            if (areNotInList) {
                const destroy = await ListLabel.destroy({
                    where: {
                        store_id: req.body.store,
                        label_id: areNotInList.map((x) => x.label_id)
                    }
                })
                deleted.push(destroy)
            }

            res.json({
                status: 'success',
                message: 'update label my store',
                data: {
                    created,
                    deleted
                }
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                status: 'error',
                message: 'Invalid Server Error: query error'
            })
        }
    }
}

module.exports = {
    List,
    Create,
    Update,
    Destroy,
    MyStore
}