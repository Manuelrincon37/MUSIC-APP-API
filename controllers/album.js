//Import models
const Album = require("../models/album")
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
//Export actions
module.exports = {
    test,
    save,
    oneAlbum,
    list
}