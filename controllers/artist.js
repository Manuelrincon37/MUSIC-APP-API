//Import Artist model
const Artist = require("../models/artist")
//Test action
const test = (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Sent from: controllers/artist.js"
    })
}

//Save artist
const save = (req, res) => {
    //Get body data
    let params = req.body
    //Create artist object to save
    let artist = new Artist(params)
    //Save object in DataBase
    artist.save().then((artistSaved) => {

        if (!artistSaved) {
            return res.status(400).send({
                status: "Error",
                message: "Could not save artist in database"
            })
        }
        return res.status(200).send({
            status: "Success",
            message: "Save artist method",
            artistSaved
        })
    }).catch((error) => {
        return res.status(500).send({
            status: "Error",
            message: "Could not save artist in database"
        })
    })
}
//Export actions
module.exports = {
    test,
    save
}