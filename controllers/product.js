const Produtcs = require('../models').Produtcs
const Owner = require('../models').OwnerProduct
const Mark = require('../models').LabelProduct
const Store = require('../models').Store
const Label = require('../models').Labels
const { Sequelize } = require('sequelize')
const db = require('../models/index')
const Op = db.Sequelize.Op
const Trolley = require('../models').Trolley
const Transaction = require('../models').Transaction
const ProductsImage = require('../models').ProductsImage
const CategoryType1 = require('../models').CategoryType1
const CategoryType2 = require('../models').CategoryType2
const CategoryType3 = require('../models').CategoryType3
const ProductCategory = require('../models').ProductCategory
const ProductVariant = require('../models').ProductVariant
const TipeVariant = require('../models').TipeVariant
const TipeSubVariant = require('../models').TipeSubVariant
const cloudinary = require('../config/storage')
const ProductSubvariant = require('../models').ProductSubvariant

async function All(req, res) {
    try {
        const produts = await Produtcs.findAll({
            order: db.sequelize.random(),
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
                    ],
                    where: {

                    }
                },
                {
                    model: ProductsImage,
                    as: 'productToImage'
                },
                {
                    model: ProductVariant,
                    as: 'productToProductVariant'
                }
            ]
        })

        const total_products = await Produtcs.count({
            include: [
                {
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            model: Store,
                            as: 'ownerToStore'
                        }
                    ],
                    where: {

                    }
                }
            ]
        })

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
                },
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
                {
                    model: ProductCategory,
                    as: 'productToCategory',
                    include: [
                        {
                            model: CategoryType1,
                            as: 'productCategoryToCategory1'
                        },
                        {
                            model: CategoryType2,
                            as: 'productCategoryToCategory2'
                        },
                        {
                            model: CategoryType3,
                            as: 'productCategoryToCategory3'
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
        const {product, category = null, keyword} = req.body

        const findLv1 = await Produtcs.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: keyword
                        }
                    },
                ]
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
                    ],
                    where: {

                    }
                },
                {
                    model: ProductsImage,
                    as: 'productToImage'
                },
                {
                    model: ProductVariant,
                    as: 'productToProductVariant'
                }
            ]
        })

        const findLv2 = await Produtcs.findAll({
            where: {
                [Op.or]: [
                    ...keyword.split(" ").map((word) => ({
                        name: {
                            [Op.substring]: word
                        }
                    }))
                ]
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
                    ],
                    where: {

                    }
                },
                {
                    model: ProductsImage,
                    as: 'productToImage'
                },
                {
                    model: ProductVariant,
                    as: 'productToProductVariant'
                }
            ]
        })

        const common = findLv1.filter(item1 => findLv2.some(item2 => item2.id === item1.id));

        res.json({
            status: 'success',
            message: 'Get data with association',
            data: common
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
            price: 0,
            stock: 0,
            condition: req.body.condition,
            length: req.body.long,
            width: req.body.width,
            height: req.body.height,
        })

        const categories = await ProductCategory.create({
            product_id: newProduct.id,
            type_1: req.body.categories[0],
            type_2: req.body.categories[1],
            type_3: req.body.categories[2],
        })

        for (var image of req.body.images) {
            const uploadResponse = await cloudinary.v2.uploader.upload(image, {
                folder: "products",
                transformation: [
                    { quality: "auto:low" }
                ]
            })
            
            const images = await ProductsImage.create({
                product_id: newProduct.id,
                public_id: uploadResponse.public_id
            })
        }

        for (var variant of req.body.variants) {
            const productVariant = await ProductVariant.create({
                product_id: newProduct.id,
                variant_id: variant.id,
                price: variant.price,
                minimum_purchase: variant.minimum_purchase,
                stock: variant.stock,
                weight: variant.weight
            })

            for (var subvariant of variant.subvariant) {
                const productSubvariant = await ProductSubvariant.create({
                    product_variant: productVariant.id,
                    subvariant_id: subvariant
                })
            }
        }

        const {id} = await Store.findOne({
            where: {
                user_id: req.userID
            }
        })

        const signProduct = await Owner.create({
            store_id: id,
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
        console.error(err)
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
                    where: {

                    }
                },
                {
                    model: Label,
                    as: 'productToLabel',
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: ProductCategory,
                    as: 'productToCategory',
                    include: [
                        {
                            model: CategoryType1,
                            as: 'productCategoryToCategory1'
                        },
                        {
                            model: CategoryType2,
                            as: 'productCategoryToCategory2'
                        },
                        {
                            model: CategoryType3,
                            as: 'productCategoryToCategory3'
                        }
                    ]
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
            order: [
                ['id', 'DESC']
            ],
            limit: req.body.limit,
            offset: req.body.offset,
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

        const length_product = await Produtcs.count({
            limit: req.body.limit,
            offset: req.body.offset,
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
            data: {
                length_product,
                product
            }
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

async function VisitProductShop(req, res) {
    try {

        const {store_id} = await Owner.findOne({
            where: {
                product_id: req.body.id
            }
        })

        const product = await Produtcs.findAll({
            order: db.sequelize.random(),
            limit: req.body.limit,
            offset: req.body.offset,
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
                {
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            model: Store,
                            as: 'ownerToStore',
                            where: {
                                id: store_id
                            }
                        }
                    ]
                }
            ]
        })

        const length_product = await Produtcs.count({
            limit: req.body.limit,
            offset: req.body.offset,
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
                {
                    model: Owner,
                    as: 'productToOwner',
                    include: [
                        {
                            model: Store,
                            as: 'ownerToStore',
                            where: {
                                id: store_id
                            }
                        }
                    ]
                }
            ]
        })

        res.json({
            status: 'success',
            message: 'Product in your store',
            data: {
                length_product,
                product
            }
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

async function TreeListCategory(req, res) {
    try {
        const tree = []

        const categories = await CategoryType1.findAll({
            include: [
                {
                    model: CategoryType2,
                    as: 'type1ToType2',
                    include: [
                        {
                            model: CategoryType3,
                            as: 'type2ToType3'
                        }
                    ]
                }
            ]
        })

        for (var category of categories) {
            for (var subcategory of category.type1ToType2) {
                tree.push({
                    value: [category.id, subcategory.id, null],
                    label: `${category.name} > ${subcategory.name}`
                })
                for (var brand of subcategory.type2ToType3) {
                    tree.push({
                        value: [category.id, subcategory.id, brand.id],
                        label: `${category.name} > ${subcategory.name} > ${brand.name}`
                    })
                }
            }
        }

        res.json({
            status: 'success',
            message: 'Tree list categories',
            data: tree
        })
    } catch (err) {

        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

async function CreateVariant(req, res) {
    try {
        const {id} = await Store.findOne({
            where: {
                user_id: req.userID
            }
        })

        const newVariant = await TipeVariant.create({
            name: req.body.name,
            shop_id: id
        })

        res.json({
            status: 'success',
            message: 'Create Variant',
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

async function CreateSubVariant(req, res) {
    try {
        const newSubVariant = await TipeSubVariant.create({
            name: req.body.name,
            variant_id: req.body.variant_id
        })

        res.json({
            status: 'success',
            message: 'Create Subvariant',
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

async function Variant(req, res) {
    try {
        const {id} = await Store.findOne({
            where: {
                user_id: req.userID
            }
        })

        const globalVariant = await TipeVariant.findAll({
            where: {
                shop_id: null
            }
        })

        const variant = await TipeVariant.findAll({
            where: {
                shop_id: id
            }
        })

        res.json({
            status: 'success',
            message: 'Get variant',
            data: [
                ...globalVariant,
                ...variant
            ]
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Server Internal Error'
        })
    }
}

async function SubVariant(req, res) {
    try {
        const subVariant = await TipeSubVariant.findAll({
            where: {
                variant_id: req.body.variant_id
            }
        })

        res.json({
            status: 'success',
            message: 'Get subvariant',
            data: subVariant
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
    MyStore,
    TreeListCategory,
    CreateVariant,
    CreateSubVariant,
    Variant,
    SubVariant,
    VisitProductShop,
}