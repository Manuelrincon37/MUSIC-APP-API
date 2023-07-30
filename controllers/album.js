//Import models
const Album = require("../models/album")
//Impor dependencies
const fs = require("node:fs")
const path = require("node:path")
//Test action
const test = (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Sent from: controllers/album.js"
    })
}

const save = (req, res) => {
    //Get body data to save
    let params = req.body
    //Create object to save
    let album = new Album(params)
    //Save object
    album.save().then((albumStored) => {
        if (!albumStored) {
            return res.status(400).send({
                status: "Error",
                message: "Could not save album",
            })
        }
        return res.status(200).send({
            status: "Success",
            message: "Save album method",
            album
        })
    }).catch((error) => {
        return res.status(400).send({
            status: "Error",
            message: "Save album error",
        })
    })
}
const oneAlbum = (req, res) => {
    //Get album id
    let albumId = req.params.id
    //Find & populate album info
    Album.findById(albumId).populate({ path: "artist" }).exec()
        .then((album) => {
            if (!album) {
                return res.status(404).send({
                    status: "Error",
                    message: "Album not found"
                })
            }
            return res.status(200).send({
                status: "Success",
                message: "Get one album method",
                album
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Get album error",
            })
        })
}

const list = (req, res) => {
    //Get artist id by url params 
    let artistId = req.params.artistId
    //Get all albums  of DB
    //Populate aritst info
    if (!artistId) {
        return res.status(404).send({
            status: "Error",
            message: "Artist id not recived"
        })
    }
    Album.find({ artist: artistId }).populate("artist")
        .exec()
        .then((albums) => {
            if (!albums) {
                return res.status(404).send({
                    status: "Error",
                    message: "Albums not found"
                })
            }
            //Return result
            return res.status(200).send({
                status: "Success",
                message: "List albums method",
                albums
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Get albums error",
                error
            })
        })
}

const update = (req, res) => {
    //Get url params
    let albumId = req.params.albumId
    //Get body data
    let data = req.body
    //Find and update info
    Album.findByIdAndUpdate(albumId, data, { new: true }).
        then((albumUpdated) => {
            if (!albumUpdated) {
                return res.status(400).send({
                    status: "Error",
                    message: "Could not update album"
                })
            }
            return res.status(200).send({
                status: "Error",
                message: "Update albums method",
                albumUpdated
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Update album error"
            })
        })
}
const upload = (req, res) => {
    //Set upload configuration of Multer
    //Get artist id
    let albumId = req.params.id
    //Get & check image file 
    if (!req.file) {
        return res.status(404).send({
            status: "Error",
            message: "No iamge file sended"
        })
    }
    //Get file.name
    let image = req.file.originalname
    //Get image info (extention)
    const imageSplit = image.split("\.")
    const extention = imageSplit[1]
    //Check if has a valid extention
    if (extention != "png" && extention != "jpg" && extention != "jpeg" && extention != "gif") {
        //Delete file
        const filePath = req.file.path
        const fileDeleted = fs.unlinkSync(filePath)
        //Return error
        return res.status(400).send({
            status: "Error",
            message: "Unvalid file extention"
        })
    }
    //If vali --> return response
    Album.findOneAndUpdate({ _id: albumId }, { image: req.file.filename }, { new: true })
        .then((albumUpdated) => {
            if (!albumUpdated) {
                return res.status(500).send({
                    status: "Error",
                    message: "Upload file error"
                })
            }
            return res.status(200).send({
                status: "Success",
                messahe: "Upload img method",
                artist: albumUpdated,
                file: req.file
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Find user error"
            })
        })
}

const image = (req, res) => {
    //Get params from URL
    const file = req.params.file
    //Mount file real path
    const filePath = "./uploads/albums/" + file
    //Chekc if file exist
    fs.stat(filePath, (error, exist) => {
        if (error || !exist) {
            return res.status(404).send({
                status: "Error",
                message: "File not found"
            })
        }
        //Return file as it is
        return res.sendFile(path.resolve(filePath))
    })
}
//Export actions
module.exports = {
    test,
    save,
    oneAlbum,
    list,
    update,
    upload,
    image
}