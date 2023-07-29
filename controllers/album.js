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

//Export actions
module.exports = {
    test,
    save
}