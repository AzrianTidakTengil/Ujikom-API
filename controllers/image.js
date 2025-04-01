require('dotenv').config()
const cloudinary = require('../config/storage')
const Users = require('../models').Users

async function TestImage(req, res) {
    try {

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

async function UploadImage(req, res) {
    try {
        const { image } = req.body; // Base64 or file URL
        const uploadResponse = await cloudinary.v2.uploader.upload(image, {
            folder: "avatar",
            transformation: [
                { quality: "auto:low" }
            ]
        
        });

        const {avatar} = await Users.findOne({
            where: {
                id: req.userID
            }
        })

        if (avatar) {
            const deleteImage = await cloudinary.v2.uploader.destroy(avatar, {
                resource_type: 'image'
            })
        }

        const user = await Users.update({
            avatar: uploadResponse.public_id
        },{
            where: {
                id: req.userID
            }
        })
        
        res.json({
            status: 'success',
            message: 'Update Foto Profile User',
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: err.message ?? 'Internal Server Error',
        })
    }
}

async function DeleteImage(req, res) {
    try {
        const {avatar} = await Users.findOne({
            where: {
                id: req.userID
            }
        })

        const deleteImage = await cloudinary.v2.uploader.destroy(avatar, {
            resource_type: 'image'
        })
        
        const user = await Users.update({
            avatar: null
        },{
            where: {
                id: req.userID
            }
        })

        res.json({
            status: 'success',
            message: 'Delete Foto Profile User',
            data: avatar
        })    
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    UploadImage,
    TestImage,
    DeleteImage
}