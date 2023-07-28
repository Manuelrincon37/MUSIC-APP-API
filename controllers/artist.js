//Import Artist model
const Artist = require("../models/artist")
//Import mongoose pagination
const mongoosePagination = require("mongoose-pagination")
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

//Get one artist method 
const oneArtist = (req, res) => {
    //Get URL params
    const aritstId = req.params.id
    //Find in DB
    Artist.findById(aritstId).then((artist) => {
        if (!artist) {
            return res.status(404).send({
                status: "Error",
                message: "Artist not found"
            })
        }
        return res.status(200).send({
            status: "Success",
            message: "Get one artist method",
            artist
        })
    }).catch((error) => {
        return res.status(500).send({
            status: "Error",
            message: "Find artist Error"
        })
    })
}

//Get list of artists
const list = (req, res) => {
    //May get a page
    let page = 1
    if (req.params.page) {
        page = req.params.page
    }
    //Define artist per page
    const itemsPerpage = 5
    //Find & paginate
    Artist.find().paginate(page, itemsPerpage)
        .then(async (artists) => {
            const total = await Artist.countDocuments()
            if (!artists) {
                return res.status(400).send({
                    status: "Error",
                    message: "Could not list artists"
                })
            }
            return res.status(200).send({
                status: "Success",
                message: "List artists",
                artists,
                page,
                itemsPerpage,
                total
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Could not list artists"
            })
        })
}

const update = (req, res) => {
    //Get artist id from URL params
    const artistId = req.params.id
    //Get body data
    const bodyData = req.body
    //find & update artist
    Artist.findByIdAndUpdate(artistId, bodyData, { new: true })
        .then((artistUpdated) => {
            if (!artistUpdated) {
                return res.status(400).send({
                    status: "Error",
                    message: "Could not update artist"
                })
            }
            return res.status(200).send({
                status: "Success",
                message: "Update artist method",
                artistUpdated
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Update artist Error"
            })
        })
}

const remove = async (req, res) => {
    //Get artist id from url params
    const artistId = req.params.id
    //Find and delete artist with "await"
    try {
        const artistRemoved = await Artist.findByIdAndDelete(artistId)
        //Return result
        return res.status(200).send({
            status: "Success",
            message: "Delete artist method",
            artistRemoved
        })
    } catch (error) {
        return res.status(500).send({
            status: "Error",
            message: "Delete artist Error",
            error
        })
    }


}
//Export actions
module.exports = {
    test,
    save,
    oneArtist,
    list,
    update,
    remove
}