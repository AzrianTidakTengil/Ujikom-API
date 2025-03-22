const Users = require('../models').Users
const Addresses = require('../models').Address
const HasAddress = require('../models').AddressUser
const Store = require('../models').Store
const AddressShop = require('../models').AddressShop
const db = require('../models/index')
const Op = db.Sequelize.Op

async function All(req, res) {
    try {
        const addressUser = await Addresses.findOne({
            include: [
                {
                    model: HasAddress,
                    as: 'selectedAddressUser',
                    where: {
                        user_id: req.userID
                    }
                },
                {
                    model: HasAddress,
                    as: 'defaultAddressUser',
                },
            ]
        })

        const address = await Addresses.findAll({
            order: [
                ['id', 'ASC']
            ],
            where: {
                user_id: req.userID
            },
            include: [
                {
                    model: HasAddress,
                    as: 'defaultAddressUser',
                },
            ]
        })

        const data = [
            addressUser,
            ...address.filter((val) => val.id !== addressUser.id)
        ]

        res.json({
            status: 'success',
            message: 'get an addresses user',
            data
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
        const address = await Addresses.findOne({
            include: [
                {
                    model: HasAddress,
                    as: 'selectedAddressUser',
                },
            ]
        })

        res.json({
            status: 'success',
            message: 'get an address user',
            data: address
        })
    } catch (err) {
        req.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Find(req, res) {
    try {
        const address = await Addresses.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.substring]: req.body.name
                    },
                    receiver: {
                        [Op.substring]: req.body.name
                    },
                    address: {
                        [Op.substring]: req.body.name
                    },
                    postal_code: {
                        [Op.substring]: req.body.name
                    },
                    telephone: {
                        [Op.substring]: req.body.name
                    },
                    country: {
                        [Op.substring]: req.body.name
                    },
                    province: {
                        [Op.substring]: req.body.name
                    },
                    city: {
                        [Op.substring]: req.body.name
                    },
                    district: {
                        [Op.substring]: req.body.name
                    },
                    notes: {
                        [Op.substring]: req.body.name
                    }
                }
            }
        })

        res.json({
            status: 'success',
            message: 'find an addresses user',
            data: address
        })
    } catch (err) {
        req.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function Create(req, res) {
    try {
        const {name, receiver, address, postal_code, telephone, country, province, city, district, notes, latitude, longtitude} = req.body

        const create = await Addresses.create({
            user_id: req.userID,
            name: name,
            receiver: receiver,
            address: address,
            postal_code: postal_code,
            telephone: telephone,
            country: country,
            province: province,
            city: city,
            district: district,
            notes: notes,
            latitude: latitude,
            longtitude: longtitude
        })

        const [addressUser, createOptionUser] = await HasAddress.findOrCreate({
            where: {
                user_id: req.userID
            },
            default: {
                user_id:req.userID,
                default: create.id,
                selected: create.id
            }
        })

        if (createOptionUser) {
            addressUser.update({
                default: create.id,
                selected: create.id
            })
        } else {
            addressUser.update({
                selected: create.id
            })
        }

        res.json({
            status: 'success',
            message: 'get an addresses user',
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
        const {id, name, receiver, address, postal_code, telephone, country, province, city, district, notes, latitude, longtitude} = req.body

        const update = await Addresses.update({
            user_id: req.userID,
            name: name,
            receiver: receiver,
            address: address,
            postal_code: postal_code,
            telephone: telephone,
            country: country,
            province: province,
            city: city,
            district: district,
            notes: notes,
            latitude: latitude,
            longtitude: longtitude
        }, {
            where: {
                id: id
            }
        })

        const [addressUser, createOptionUser] = await HasAddress.findOrCreate({
            where: {
                user_id: req.userID
            },
            default: {
                user_id:req.userID,
                default: id,
                selected: id
            }
        })

        if (createOptionUser) {
            addressUser.update({
                default: id,
                selected: id
            })
        } else {
            addressUser.update({
                selected: id
            })
        }

        res.json({
            status: 'success',
            message: 'update an addresses user',
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error: update'
        })
    }
}

async function Destroy(req, res) {
    try {
        const destroy = await Addresses.destroy({
            where: {
                id: req.body.id
            }
        })

        res.json({
            status: 'success',
            message: 'delete an addresses user',
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function addressUser(req, res) {
    try {
        const address = await HasAddress.update({
            user_id: req.userID,
            default: req.body.default,
            selected: req.body.select
        })

        res.json({
            status: 'success',
            message: 'update information an address user',
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

class Shop {
    static async Get(req, res) {
        try {
            const address = await Store.findOne({
                attributes: ['name'],
                where: {
                    user_id: req.userID
                },
                include: [
                    {
                        model: AddressShop,
                        as: 'shopToAddress'
                    }
                ]
            })
    
            res.json({
                status: 'success',
                message: 'Get Information Address Shop',
                data: address
            })
        } catch (err) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error: address shop'
            })
        }
    }

    static async CreateOrUpdate(req, res) {
        try {
            const {name, receiver, address, postal_code, telephone, country, province, city, district, notes, latitude, longtitude} = req.body

            const shop = await Store.findOne({
                where: {
                    user_id: req.userID
                }
            })

            if (shop.address.length == 0 || !shop.address || shop.address == 0) {
                const addressShop = await AddressShop.create({
                    address: address,
                    district: district,
                    city: city,
                    province: province,
                    country: country,
                    postal_code: postal_code,
                    latitude: latitude,
                    longtitude: longtitude
                })

                shop.update({
                    address: addressShop.id
                })
            } else {
                const addressShop = await AddressShop.update({
                    address: address,
                    district: district,
                    city: city,
                    province: province,
                    country: country,
                    postal_code: postal_code,
                    latitude: latitude,
                    longtitude: longtitude
                }, {
                    where: {
                        id: shop.address
                    }
                })
            }

            res.json({
                status: 'success',
                message: 'create or update information an address shop',
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error: create or update address shop'
            })
        }
    }
}

module.exports = {
    All,
    One,
    Find,
    Create,
    Update,
    Destroy,
    addressUser,
    Shop
}